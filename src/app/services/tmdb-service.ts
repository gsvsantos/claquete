import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Media, ThisMediaDetails } from '../models/media';
import {
  TMDBApiMediaDetailsResponse,
  TMDBApiMediaListDetailsResponse,
  TMDBApiMediaListResponse,
} from '../models/tmdb-api';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  public getMediasByType(
    mediaType: string,
    pageIndex = 1,
    quantity = 20,
    category: string,
  ): Observable<Media[]> {
    const fullUrl = `${this.baseUrl}/${mediaType}/${category}?language=en-US&page=${pageIndex}`;

    return this.mapList(fullUrl, quantity);
  }

  public getMediaDetails(mediaType: string, mediaId: number): Observable<ThisMediaDetails> {
    const fullUrl = `${this.baseUrl}/${mediaType}/${mediaId}?append_to_response=videos,credits&language=en-US`;

    return this.http
      .get<TMDBApiMediaDetailsResponse>(fullUrl, {
        headers: { Authorization: environment.apiKey },
      })
      .pipe(map((obj) => this.mapMediaDetailsFromDetails(obj)));
  }

  private mapList(fullUrl: string, quantity: number): Observable<Media[]> {
    return this.http
      .get<TMDBApiMediaListResponse>(fullUrl, {
        headers: { Authorization: environment.apiKey },
      })
      .pipe(
        map((obj) =>
          obj.results.map((result) => this.mapMediaDetailsFromList(result)).slice(0, quantity),
        ),
      );
  }

  private mapMediaDetailsFromList(obj: TMDBApiMediaListDetailsResponse): Media {
    return {
      id: obj.id,
      title: obj.title,
      name: obj.name,
      poster_path: obj.poster_path,
      release_date: obj.release_date ?? null,
      first_air_date: obj.first_air_date ?? null,
      vote_average: obj.vote_average,
      overview: obj.overview,
    };
  }

  private mapMediaDetailsFromDetails(obj: TMDBApiMediaDetailsResponse): ThisMediaDetails {
    return {
      id: obj.id,
      title: obj.title,
      name: obj.name,
      poster_path: obj.poster_path,
      release_date: obj.release_date ?? null,
      first_air_date: obj.first_air_date ?? null,
      vote_average: obj.vote_average,
      overview: obj.overview,
      backdrop_path: obj.backdrop_path,
      genres: obj.genres,
      status: obj.status,
      tagline: obj.tagline,
      runtime: obj.runtime ?? null,
      episode_run_time: obj.episode_run_time,
      number_of_seasons: obj.number_of_seasons,
      number_of_episodes: obj.number_of_episodes,
      belongs_to_collection: obj.belongs_to_collection,
      vote_count: obj.vote_count,
      credits: obj.credits, 
      videos: obj.videos,
    };
  }
}
