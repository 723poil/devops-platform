import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  OnModuleInit,
} from '@nestjs/common';
import { Counter, Gauge, Histogram } from 'prom-client';
import { Observable, tap } from 'rxjs';

export class PrometheusInterceptor implements NestInterceptor, OnModuleInit {
  private readonly requestSuccessHistogram: Histogram<
    'handler' | 'controller' | 'method' | 'status'
  > = new Histogram({
    name: 'nestjs_success_requests',
    help: 'NestJs success requests - duration in seconds',
    labelNames: ['handler', 'controller', 'method', 'status'],
    buckets: [
      0.0001, 0.001, 0.005, 0.01, 0.025, 0.05, 0.075, 0.09, 0.1, 0.25, 0.5, 1,
      2.5, 5, 10,
    ],
  });
  // status code != 2XX
  private readonly requestFailHistogram: Histogram<
    'handler' | 'controller' | 'error' | 'method'
  > = new Histogram({
    name: 'nestjs_fail_requests',
    help: 'NestJs fail requests - duration in seconds',
    labelNames: ['handler', 'controller', 'status', 'method'],
    buckets: [
      0.0001, 0.001, 0.005, 0.01, 0.025, 0.05, 0.075, 0.09, 0.1, 0.25, 0.5, 1,
      2.5, 5, 10,
    ],
  });
  private readonly failureCounter: Counter<
    'handler' | 'controller' | 'status' | 'method'
  > = new Counter({
    name: 'nestjs_requests_failed_count',
    help: 'NestJs requests that failed',
    labelNames: ['handler', 'controller', 'status', 'method'],
  });

  static registerServiceInfo(serviceInfo: {
    domain: string;
    name: string;
    version: string;
  }): PrometheusInterceptor {
    new Gauge({
      name: 'nestjs_info',
      help: 'NestJs service version info',
      labelNames: ['domain', 'name', 'version'],
    }).set(
      {
        domain: serviceInfo.domain,
        name: `${serviceInfo.domain}.${serviceInfo.name}`,
        version: serviceInfo.version,
      },
      1,
    );

    return new PrometheusInterceptor();
  }

  onModuleInit(): any {
    this.requestSuccessHistogram.reset();
    this.requestFailHistogram.reset();
    this.failureCounter.reset();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const originUrl = context.switchToHttp().getRequest().url.toString();

    const method = context.switchToHttp().getRequest().method.toString();
    const labels = {
      controller: context.getClass().name,
      handler: context.getHandler().name,
      method: method,
      status: context.switchToHttp().getResponse().statusCode,
    };

    const failLabels = {
      ...labels,
      status: context.switchToHttp().getResponse().statusCode,
    };

    try {
      const requestSuccessTimer =
        this.requestSuccessHistogram.startTimer(labels);
      const requestFailTimer = this.requestFailHistogram.startTimer(failLabels);
      return next.handle().pipe(
        tap({
          next: () => {
            if (this.isAvailableMetricsUrl(originUrl)) {
              requestSuccessTimer();
            }
            // Handle the next event here
          },
          error: () => {
            if (this.isAvailableMetricsUrl(originUrl)) {
              requestFailTimer();
              this.failureCounter.labels(failLabels).inc(1);
            }

            // Handle the error event here
          },
        }),
      );
    } catch (error) {}
  }

  private isAvailableMetricsUrl(url: string): boolean {
    const excludePaths = 'metrics';
    if (url.includes(excludePaths)) {
      return false;
    }
    return true;
  }
}
