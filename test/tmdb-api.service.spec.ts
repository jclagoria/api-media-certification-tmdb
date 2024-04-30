import { TmdbApiService } from '../src/common/service/tmdb-api/tmdb-api.service';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { mockMovieCertifications } from './mocks/axiosResponse';
import { of, throwError } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';

describe('Test for connection with TMDB Service', () => {
  let service: TmdbApiService;
  let httpService: HttpService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TmdbApiService,
        {
          provide: HttpService,
          useValue: { get: jest.fn() },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key) => {
              if (key === 'TOKEN_ACCESS_SITE') {
                return 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODdiNDNmYzJlY2UwYjEzYWYwODAzYjJjNDA3MzYzNyIsInN1YiI6IjYwNmQxZGFlMGQyZjUzMDA0MGE1OWI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tMFZsz1GZM1ZX-WOp737Hv7ViYg4mV_ujBdT1WN4gmo';
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<TmdbApiService>(TmdbApiService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should return data on successful GET request', () => {
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockMovieCertifications));

    service.makeGetRequest('certification/movie/list').subscribe({
      next: (res) => expect(res.data).toEqual(mockMovieCertifications.data),
      error: () => fail('Should have succeeded!'),
    });
  });

  it('should handle Axios error', () => {
    const axiosError: Partial<AxiosError> = {
      response: {
        status: 404,
        data: { status_code: 404, status_message: 'Not Found' },
        statusText: '',
        headers: undefined,
        config: undefined,
      },
      isAxiosError: true,
    };
    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => axiosError));

    service.makeGetRequest('/certification/movie/list').subscribe({
      next: () => fail('Should have failed!'),
      error: (e) => expect(e.message).toContain('Not Found'),
    });
  });
});
