import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { ErrorInterceptor } from '../../../common/interceptor/error.interceptor';

@Controller('certifications')
@UseInterceptors(ErrorInterceptor)
export class CertificationController {
  constructor(private certificationService: CertificationService) {}

  @Get('movies')
  getMovieCertifications() {
    return this.certificationService.getMovieCertifications();
  }

  @Get('tv')
  getTvCertifications() {
    return this.certificationService.getTvCertifications();
  }
}
