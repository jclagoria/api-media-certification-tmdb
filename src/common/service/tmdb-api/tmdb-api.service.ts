import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, throwError } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';
import { catchError } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { ServiceError } from '../../../core/utils/error.manager';

@Injectable()
export class TmdbApiService {
  private readonly URL_BASE = 'https://api.themoviedb.org/3';
  private readonly TOKEN_ACCESS_SITE =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODdiNDNmYzJlY2UwYjEzYWYwODAzYjJjNDA3MzYzNyIsInN1YiI6IjYwNmQxZGFlMGQyZjUzMDA0MGE1OWI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tMFZsz1GZM1ZX-WOp737Hv7ViYg4mV_ujBdT1WN4gmo';
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  makeGetRequest<T>(endpoint: string): Observable<AxiosResponse<T>> {
    const url = `${this.URL_BASE}${endpoint}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.TOKEN_ACCESS_SITE}`,
      },
    };

    return this.httpService.get<T>(url, options).pipe(
      catchError((error: AxiosError) => {
        if (error.response) {
          // Extracting detailed information from the Axios error response
          // @ts-ignore
          const { status_code, status_message }: unknown = error.response.data;
          return throwError(
            () =>
              new ServiceError(
                error.response.status,
                status_message || 'Error with external API request',
                status_code,
              ),
          );
        }
        // Generic error handling for non-Axios errors
        return throwError(() => new Error('Internal server error'));
      }),
    );
  }
}
