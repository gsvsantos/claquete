import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, skip, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Media, ThisMediaDetails } from '../models/media';
import {
  TMDBApiMediaDetailsResponse,
  TMDBApiMediaListDetailsResponse,
  TMDBApiMediaListResponse,
  TMDBApiSearchMultiResponse,
} from '../models/tmdb-api';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';
  private readonly cache: CacheService = inject(CacheService);
  private readonly local = inject(LocalStorageService);
  private readonly languageService: LanguageService = inject(LanguageService);
  private buildCacheKey(url: string, params?: HttpParams): string {
    return params ? `${url}?${params.toString()}` : url;
  }

  public constructor() {
    this.languageService.currentLanguage$.pipe(skip(1)).subscribe(() => {
      this.cache.removeByPrefix(this.baseUrl);
    });
  }

  public searchMulti(
    query: string,
    options?: { language?: string; page?: number; includeAdult?: boolean },
  ): Observable<TMDBApiSearchMultiResponse> {
    const trimmedQuery: string = query.trim();
    if (!trimmedQuery) {
      return of({ page: 1, results: [], total_pages: 0, total_results: 0 });
    }

    const language: string = options?.language ?? this.languageService.getCurrentLanguage();
    const params = new HttpParams()
      .set('query', trimmedQuery)
      .set('language', language)
      .set('page', String(options?.page ?? 1))
      .set('include_adult', String(!!options?.includeAdult));

    const url: string = `${this.baseUrl}/search/multi`;
    const cacheKey: string = this.buildCacheKey(url, params);
    const cached = this.cache.get<TMDBApiSearchMultiResponse>(cacheKey);
    if (cached !== undefined) return of(cached);

    return this.http
      .get<TMDBApiSearchMultiResponse>(url, {
        headers: { Authorization: environment.apiKey, Accept: 'application/json' },
        params,
      })
      .pipe(tap((res) => this.cache.put(cacheKey, res)));
  }

  public getMediasByType(
    mediaType: string,
    pageIndex: number = 1,
    quantity: number = 20,
    category: string,
  ): Observable<Media[]> {
    const url: string = `${this.baseUrl}/${mediaType}/${category}`;
    const params = new HttpParams()
      .set('language', this.languageService.getCurrentLanguage())
      .set('page', String(pageIndex));

    const cacheKey: string = this.buildCacheKey(url, params);
    const cachedList: Media[] | undefined = this.cache.get<Media[]>(cacheKey);
    if (cachedList !== undefined) return of(cachedList.slice(0, quantity));

    return this.http
      .get<TMDBApiMediaListResponse>(url, {
        headers: { Authorization: environment.apiKey },
        params,
      })
      .pipe(
        map((apiResponse) =>
          apiResponse.results.map((result) => this.mapMediaDetailsFromList(result, mediaType)),
        ),
        tap((fullList) => this.cache.put<Media[]>(cacheKey, fullList)),
        map((fullList) => fullList.slice(0, quantity)),
        map((fullList) => {
          const favoriteIds = new Set(this.local.getFavoritesSnapshot().map((media) => media.id));
          return fullList.map((media) => ({ ...media, favorite: favoriteIds.has(media.id) }));
        }),
      );
  }

  public getMediaDetails(mediaType: string, mediaId: number): Observable<ThisMediaDetails> {
    const url: string = `${this.baseUrl}/${mediaType}/${mediaId}`;
    const params = new HttpParams()
      .set('append_to_response', 'videos,credits')
      .set('language', this.languageService.getCurrentLanguage());

    const cacheKey: string = this.buildCacheKey(url, params);
    const cachedDetails: ThisMediaDetails | undefined = this.cache.get<ThisMediaDetails>(cacheKey);
    if (cachedDetails !== undefined) return of(cachedDetails);

    return this.http
      .get<TMDBApiMediaDetailsResponse>(url, {
        headers: { Authorization: environment.apiKey },
        params,
      })
      .pipe(
        map((apiResponse) => this.mapMediaDetailsFromDetails(apiResponse, mediaType)),
        tap((details) => this.cache.put<ThisMediaDetails>(cacheKey, details)),
        map((details) => {
          const favoriteIds = new Set(this.local.getFavoritesSnapshot().map((media) => media.id));
          return { ...details, favorite: favoriteIds.has(details.id) };
        }),
      );
  }

  private mapMediaDetailsFromList(obj: TMDBApiMediaListDetailsResponse, mediaType: string): Media {
    return {
      mediaType: mediaType,
      favorite: false,
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
  private mapMediaDetailsFromDetails(
    obj: TMDBApiMediaDetailsResponse,
    mediaType: string,
  ): ThisMediaDetails {
    return {
      mediaType: mediaType,
      favorite: false,
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
