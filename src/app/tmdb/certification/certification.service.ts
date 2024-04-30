import { Injectable } from '@nestjs/common';
import { TmdbApiService } from '../../../common/service/tmdb-api/tmdb-api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CertificationService {
  constructor(private apiService: TmdbApiService) {}

  getMovieCertifications() {
    return this.apiService
      .makeGetRequest('/certification/movie/list')
      .pipe(map((response) => response.data));
  }
}
