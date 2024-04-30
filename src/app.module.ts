import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './app/health/health.controller';
import { HealthService } from './app/health/health.service';
import { SecurityHeadersMiddleware } from './common/middleware/security-headers.middleware';
import { CertificationModule } from './app/tmdb/certification.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './common/interceptor/error.interceptor';

@Module({
  imports: [
    CertificationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
  ],
  controllers: [HealthController],
  providers: [
    HealthService,
    { provide: APP_INTERCEPTOR, useClass: ErrorInterceptor },
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SecurityHeadersMiddleware).forRoutes('*');
  }
}
