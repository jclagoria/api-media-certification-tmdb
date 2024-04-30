import { CertificationController } from '../src/app/tmdb/certification/certification.controller';
import { CertificationService } from '../src/app/tmdb/certification/certification.service';
import { Test, TestingModule } from '@nestjs/testing';
import { of, firstValueFrom } from 'rxjs';

describe('Test for Certifications Movies Controller', () => {
  let controller: CertificationController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: CertificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificationController],
      providers: [
        {
          provide: CertificationService,
          useValue: {
            getMovieCertifications: jest.fn(() =>
              of([{ id: 1, name: 'PG-13' }]),
            ),
            getTvCertifications: jest.fn(() => of([{ id: 2, name: 'TV-MA' }])),
          },
        },
      ],
    }).compile();

    controller = module.get<CertificationController>(CertificationController);
    service = module.get<CertificationService>(CertificationService);
  });

  it('should return an array of movie certifications', async () => {
    const movieResults = await firstValueFrom(
      controller.getMovieCertifications(),
    );
    expect(movieResults).toEqual([{ id: 1, name: 'PG-13' }]);
    expect(service.getMovieCertifications).toHaveBeenCalled();
  });

  it('should return an array of tv certifications', async () => {
    const tvResults = await firstValueFrom(controller.getTvCertifications());
    expect(tvResults).toEqual([{ id: 2, name: 'TV-MA' }]);
    expect(service.getTvCertifications).toHaveBeenCalled();
  });
});
