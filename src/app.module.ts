import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HealthController } from './app/health/health.controller';
import { HealthService } from './app/health/health.service';
import { SecurityHeadersMiddleware } from './common/middleware/security-headers.middleware';
import { ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SecurityHeadersMiddleware).forRoutes('*');
  }
}
