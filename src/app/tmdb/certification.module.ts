import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { CertificationController } from './certification/certification.controller';
import { CertificationService } from './certification/certification.service';

@Module({
  imports: [CommonModule],
  controllers: [CertificationController],
  providers: [CertificationService],
})
export class CertificationModule {}
