import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { TMDBService } from '../../services/tmdb.service';
import { LanguageService, TmdbLanguageCode } from '../../services/language.service';
import {
  TMDBApiSearchMultiResponse,
  TMDBApiSearchResult,
  TMDBApiSearchMovieResult,
  TMDBApiSearchTvResult,
  TMDBImagePath,
} from '../../models/tmdb-api';

interface SearchItemView {
  id: number;
  mediaType: 'movie' | 'tv';
  title: string;
  subtitle: string | null;
  posterUrl: string | null;
  routerLink: string[];
}

@Component({
  selector: 'clqt-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private readonly tMDBService = inject(TMDBService);
  private readonly languageService = inject(LanguageService);

  public readonly minimumLength: number = 2;
  public readonly imageBaseUrl: string = 'https://image.tmdb.org/t/p/w92';
  public readonly searchControl: FormControl<string> = new FormControl<string>('', {
    nonNullable: true,
  });

  private readonly isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  public readonly queryText$: Observable<string> = this.searchControl.valueChanges.pipe(
    map((text: string) => text.trim()),
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
  );

  public readonly isQueryTooShort$: Observable<boolean> = this.queryText$.pipe(
    map((text: string) => text.length > 0 && text.length < this.minimumLength),
  );

  public readonly viewItems$: Observable<SearchItemView[]> = combineLatest([
    this.queryText$,
    this.languageService.currentLanguage$,
  ]).pipe(
    switchMap(([text, languageCode]: [string, TmdbLanguageCode]) => {
      const canSearch: boolean = text.length >= this.minimumLength;
      if (!canSearch) {
        this.isLoadingSubject.next(false);
        return of([] as SearchItemView[]);
      }
      this.isLoadingSubject.next(true);

      return this.tMDBService
        .searchMulti(text, { language: languageCode, includeAdult: false })
        .pipe(
          map((response: TMDBApiSearchMultiResponse) =>
            response.results.filter(this.isMovieOrTv).map(this.mapResultToView),
          ),
          catchError(() => of([] as SearchItemView[])),
          finalize(() => this.isLoadingSubject.next(false)),
        );
    }),
  );

  public readonly hasResults$: Observable<boolean> = this.viewItems$.pipe(
    map((items: SearchItemView[]) => items.length > 0),
  );

  public readonly showEmptyState$: Observable<boolean> = combineLatest([
    this.viewItems$,
    this.isQueryTooShort$,
    this.queryText$,
  ]).pipe(
    map(
      ([items, tooShort, text]: [SearchItemView[], boolean, string]) =>
        items.length === 0 && !tooShort && text.length >= this.minimumLength,
    ),
  );

  private readonly isMovieOrTv = (
    result: TMDBApiSearchResult,
  ): result is TMDBApiSearchMovieResult | TMDBApiSearchTvResult =>
    result.media_type === 'movie' || result.media_type === 'tv';

  private readonly mapResultToView = (
    result: TMDBApiSearchMovieResult | TMDBApiSearchTvResult,
  ): SearchItemView => {
    if (result.media_type === 'movie') {
      return {
        id: result.id,
        mediaType: 'movie',
        title: result.title,
        subtitle: result.release_date ?? null,
        posterUrl: this.buildPosterUrl(result.poster_path),
        routerLink: ['/', 'movie', 'details', String(result.id)],
      };
    }
    return {
      id: result.id,
      mediaType: 'tv',
      title: result.name,
      subtitle: result.first_air_date ?? null,
      posterUrl: this.buildPosterUrl(result.poster_path),
      routerLink: ['/', 'tv', 'details', String(result.id)],
    };
  };

  private buildPosterUrl(path: TMDBImagePath): string | null {
    return path ? `${this.imageBaseUrl}${path}` : null;
  }
}
