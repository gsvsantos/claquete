import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Movie } from '../models/movie';
import { TMDBApiMovieListsDetailsResponse, TMDBApiMovieListsResponse } from '../models/tmdb-api';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = 'https://api.themoviedb.org/3/movie';

  public selectMoviesByType(pageIndex = 1, quantity = 20, type: string): Observable<Movie[]> {
    const fullUrl = `${this.baseUrl}/${type}?language=en-US&page=${pageIndex}`;

    return this.mapList(fullUrl, quantity);
  }

  private mapList(fullUrl: string, quantity: number): Observable<Movie[]> {
    return this.http
      .get<TMDBApiMovieListsResponse>(fullUrl, {
        headers: { Authorization: environment.apiKey },
      })
      .pipe(
        map((obj) => {
          return obj.results
            .map((result) => {
              return this.mapMovie(result);
            })
            .slice(0, quantity);
        }),
      );
  }

  private mapMovie(obj: TMDBApiMovieListsDetailsResponse): Movie {
    return {
      title: obj.title,
      poster_path: obj.poster_path,
      release_date: obj.release_date,
      vote_average: Math.round(obj.vote_average * 10),
      overview: obj.overview,
    };
  }
}
