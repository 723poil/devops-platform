import { INestApplication } from '@nestjs/common';
import { PrometheusInterceptor } from '../interceptors/prometheus.interceptor';

export function setNestAppInterceptors<T extends INestApplication>(
  app: T,
): void {
  app.useGlobalInterceptors(new PrometheusInterceptor());
}
