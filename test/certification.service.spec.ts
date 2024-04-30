import { CertificationService } from '../src/app/tmdb/certification/certification.service';
import { TmdbApiService } from '../src/common/service/tmdb-api/tmdb-api.service';
import { Test, TestingModule } from '@nestjs/testing';
import { of, firstValueFrom } from 'rxjs';

describe('Test for Certification Services', () => {
  let service: CertificationService;
  let tmdbApiService: jest.Mocked<TmdbApiService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificationService,
        {
          provide: TmdbApiService,
          useValue: {
            makeGetRequest: jest.fn(() =>
              of({ data: [{ id: 1, name: 'PG-13' }] }),
            ),
          },
        },
      ],
    }).compile();

    service = module.get<CertificationService>(CertificationService);
    tmdbApiService = module.get(TmdbApiService) as jest.Mocked<TmdbApiService>;
  });

  it('should call makeGetRequest and return movie certifications', async () => {
    const result = await firstValueFrom(service.getMovieCertifications());
    expect(result).toEqual([{ id: 1, name: 'PG-13' }]);
    expect(tmdbApiService.makeGetRequest).toHaveBeenCalledWith(
      '/certification/movie/list',
    );
  });
});
