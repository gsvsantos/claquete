import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Media} from '../models/media';
import { TMDBApiMediaDetailsResponse, TMDBApiMediaResponse } from '../models/tmdb-api';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  public selectMediasByType(mediaType: string, pageIndex = 1, quantity = 20, category: string): Observable<Media[]> {
    const fullUrl = `${this.baseUrl}/${mediaType}/${category}?language=en-US&page=${pageIndex}`;

    return this.mapList(fullUrl, quantity);
  }

  private mapList(fullUrl: string, quantity: number): Observable<Media[]> {
    return this.http
      .get<TMDBApiMediaResponse>(fullUrl, {
        headers: { Authorization: environment.apiKey },
      })
      .pipe(
        map((obj) => {
          return obj.results
            .map((result) => {
              return this.mapMedia(result);
            })
            .slice(0, quantity);
        }),
      );
  }

  private mapMedia(obj: TMDBApiMediaDetailsResponse): Media {
    return {
      title: obj.title,
      name: obj.name,
      poster_path: obj.poster_path,
      release_date: obj.release_date,
      first_air_date: obj.first_air_date,
      vote_average: obj.vote_average,
      overview: obj.overview,
    };
  }
}
