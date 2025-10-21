import { Component, inject } from '@angular/core';
import { MediaCard } from '../../shared/media-card/media-card';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, map, combineLatest, switchMap, shareReplay } from 'rxjs';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { TMDBService } from '../../services/tmdb.service';
import { mapDataPagination } from '../../utils/map-data-pagination';
import { MediaTypes } from '../../models/media';
import { TranslocoModule } from '@jsverse/transloco';
import { TMDBApiSearchMultiResponse } from '../../models/tmdb-api';
import { PaginationButtons } from '../../shared/pagination-buttons/pagination-buttons';

@Component({
  selector: 'clqt-search-page',
  imports: [AsyncPipe, MediaCard, TranslocoModule, TitleCasePipe, PaginationButtons],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  private readonly route = inject(ActivatedRoute);
  private readonly tMDBService = inject(TMDBService);

  protected readonly pageSubject$ = new BehaviorSubject<number>(1);

  protected readonly queryParam$ = this.route.queryParamMap.pipe(
    filter((queryParams) => queryParams.has('query')),
    map((queryParams) => queryParams.get('query')!),
  );

  protected readonly mediasSelected$ = combineLatest([this.pageSubject$, this.queryParam$]).pipe(
    switchMap(([page, queryParam]) =>
      this.tMDBService
        .searchMulti(queryParam, { page })
        .pipe(
          map((response: TMDBApiSearchMultiResponse) =>
            this.tMDBService.mapMediasSearchResult(response),
          ),
        ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  protected readonly moviesSelected$ = this.mediasSelected$.pipe(
    map((res) => res.results.filter((result) => result.media_type === MediaTypes.Movie)),
  );

  protected readonly tvShowsSelected$ = this.mediasSelected$.pipe(
    map((res) => res.results.filter((result) => result.media_type === MediaTypes.TV)),
  );

  protected readonly availablePages$ = this.mediasSelected$.pipe(map(mapDataPagination));
}
