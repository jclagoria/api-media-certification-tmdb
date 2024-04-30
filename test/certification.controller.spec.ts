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
          },
        },
      ],
    }).compile();

    controller = module.get<CertificationController>(CertificationController);
    service = module.get<CertificationService>(CertificationService);
  });

  it('', async () => {
    expect(await firstValueFrom(controller.getMovieCertifications())).toEqual([
      { id: 1, name: 'PG-13' },
    ]);
  });
});
