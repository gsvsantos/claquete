import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Movie } from '../models/movie';
import { TMDBApiMovieDetailsResponse, TMDBApiMovieResponse } from '../models/tmdb-api';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = 'https://api.themoviedb.org/3/movie';

  public selectPopularMovies(): Observable<Movie[]> {
    const popularUrl = `${this.baseUrl}/popular?language=en-US`;

    return this.http
      .get<TMDBApiMovieResponse>(popularUrl, {
        headers: { Authorization: environment.apiKey },
      })
      .pipe(
        map((obj) => {
          return obj.results.map((result) => {
            return this.mapMovie(result);
          });
        }),
      );
  }

  public selectTopRatedMovies(): Observable<Movie[]> {
    const popularUrl = `${this.baseUrl}/top_rated?language=en-US`;

    return this.http
      .get<TMDBApiMovieResponse>(popularUrl, {
        headers: { Authorization: environment.apiKey },
      })
      .pipe(
        map((obj) => {
          return obj.results.map((result) => {
            return this.mapMovie(result);
          });
        }),
      );
  }

  private mapMovie(obj: TMDBApiMovieDetailsResponse): Movie {
    return {
      title: obj.title,
      poster_path: obj.poster_path,
      release_date: obj.release_date,
      vote_average: obj.vote_average,
      overview: obj.overview,
    };
  }
}
