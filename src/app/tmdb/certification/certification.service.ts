import { Injectable } from '@nestjs/common';
import { TmdbApiService } from '../../../common/service/tmdb-api/tmdb-api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CertificationService {
  constructor(private apiService: TmdbApiService) {}

  getMovieCertifications() {
    return this.fetchCertifications('/certification/movie/list');
  }

  getTvCertifications() {
    return this.fetchCertifications('/certification/tv/list');
  }

  private fetchCertifications(endpoint: string): Observable<any> {
    return this.apiService
      .makeGetRequest(endpoint)
      .pipe(map((response) => response.data));
  }
}
