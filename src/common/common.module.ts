import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TmdbApiService } from './service/tmdb-api/tmdb-api.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [TmdbApiService],
  exports: [TmdbApiService],
})
export class CommonModule {}
