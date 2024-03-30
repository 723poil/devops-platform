import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { OctokitModule } from 'nestjs-octokit';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { OctoModule } from './octokit/octo.module';

@Module({
  imports: [
    TerminusModule,
    HttpModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),

    OctokitModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService,],
      useFactory: async (configService: ConfigService) => ({
        octokitOptions: {
          auth: configService.get<string>('GITHUB_AUTH_TOKEN'),
        }
      }),
    }),

    OctoModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
