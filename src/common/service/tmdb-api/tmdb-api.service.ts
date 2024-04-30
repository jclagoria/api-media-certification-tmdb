import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, throwError } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';
import { catchError } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { ServiceError } from '../../../core/utils/error.manager';

@Injectable()
export class TmdbApiService {
  private readonly URL_BASE: string;
  private readonly TOKEN_ACCESS_SITE: string;
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.URL_BASE = this.configService.get<string>('URL_BASE');
    this.TOKEN_ACCESS_SITE =
      this.configService.get<string>('TOKEN_ACCESS_SITE');
  }

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
