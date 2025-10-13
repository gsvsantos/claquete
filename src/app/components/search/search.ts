import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { TMDBService } from '../../services/tmdb.service';
import { LanguageService, TmdbLanguageCode } from '../../services/language.service';
import { SearchItemView, TMDBApiSearchMultiResponse } from '../../models/tmdb-api';

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
  private readonly languageCode$: Observable<TmdbLanguageCode> =
    this.languageService.currentLanguage$.pipe(distinctUntilChanged());

  public readonly minimumLength: number = 3;
  public readonly searchControl: FormControl<string> = new FormControl<string>('', {
    nonNullable: true,
  });

  private readonly isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  public readonly queryText$: Observable<string> = this.searchControl.valueChanges.pipe(
    distinctUntilChanged(),
    debounceTime(300),
    map((text: string) => text.trim()),
    startWith(''),
  );

  public readonly isQueryTooShort$: Observable<boolean> = this.queryText$.pipe(
    map((text: string) => text.length > 0 && text.length < this.minimumLength),
  );

  public readonly viewItems$: Observable<SearchItemView[]> = combineLatest([
    this.queryText$,
    this.languageCode$,
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
            this.tMDBService.mapMultiSearchToResult(response.results),
          ),
          finalize(() => this.isLoadingSubject.next(false)),
        );
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
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
}
