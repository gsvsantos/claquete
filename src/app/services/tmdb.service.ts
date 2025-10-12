import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Media, ThisMediaDetails } from '../models/media';
import {
  TMDBApiMediaDetailsResponse,
  TMDBApiMediaListDetailsResponse,
  TMDBApiMediaListResponse,
} from '../models/tmdb-api';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';
  private readonly cache: CacheService = inject(CacheService);

  public getMediasByType(
    mediaType: string,
    pageIndex: number = 1,
    quantity: number = 20,
    category: string,
  ): Observable<Media[]> {
    const fullUrl: string = `${this.baseUrl}/${mediaType}/${category}?language=en-US&page=${pageIndex}`;

    const cachedList: Media[] | undefined = this.cache.get<Media[]>(fullUrl);
    if (cachedList !== undefined) {
      return of(cachedList.slice(0, quantity));
    }

    return this.http
      .get<TMDBApiMediaListResponse>(fullUrl, {
        headers: { Authorization: environment.apiKey },
      })
      .pipe(
        map((apiResponse: TMDBApiMediaListResponse): Media[] =>
          apiResponse.results.map(
            (result: TMDBApiMediaListDetailsResponse): Media =>
              this.mapMediaDetailsFromList(result),
          ),
        ),
        tap((fullList: Media[]): void => {
          this.cache.put<Media[]>(fullUrl, fullList);
        }),
        map((fullList: Media[]): Media[] => fullList.slice(0, quantity)),
      );
  }

  public getMediaDetails(mediaType: string, mediaId: number): Observable<ThisMediaDetails> {
    const fullUrl: string = `${this.baseUrl}/${mediaType}/${mediaId}?append_to_response=videos,credits&language=en-US`;

    const cachedDetails: ThisMediaDetails | undefined = this.cache.get<ThisMediaDetails>(fullUrl);
    if (cachedDetails !== undefined) {
      return of(cachedDetails);
    }

    return this.http
      .get<TMDBApiMediaDetailsResponse>(fullUrl, {
        headers: { Authorization: environment.apiKey },
      })
      .pipe(
        map(
          (apiResponse: TMDBApiMediaDetailsResponse): ThisMediaDetails =>
            this.mapMediaDetailsFromDetails(apiResponse),
        ),
        tap((details: ThisMediaDetails): void => {
          this.cache.put<ThisMediaDetails>(fullUrl, details);
        }),
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
