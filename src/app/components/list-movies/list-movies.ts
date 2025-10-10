import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { exhaustMap, filter, Observable, of, scan, startWith, Subject, switchMap, tap } from 'rxjs';
import { Movie } from '../../models/movie';
import { GsButtons, gsTiposBotaoEnum, gsTiposGuiaEnum, gsVariant } from 'gs-buttons';
import { TMDBService } from '../../services/tmdb-service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'clqt-list-movies',
  imports: [AsyncPipe, GsButtons],
  templateUrl: './list-movies.html',
  styleUrl: './list-movies.scss',
})
export class ListMovies implements OnInit {
  @Input() public movies$?: Observable<Movie[]>;
  public buttonType = gsTiposBotaoEnum;
  public targetType = gsTiposGuiaEnum;
  public variant = gsVariant;
  public get finalPageReached(): boolean {
    return this.pageIndex >= 520;
  }

  private pageIndex: number = 1;
  private readonly clickLoadMore$ = new Subject<void>();
  private readonly route = inject(ActivatedRoute);
  private readonly tMDBService = inject(TMDBService);

  public ngOnInit(): void {
    this.movies$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const movieType = params.get('type');

        if (!movieType) {
          return of([]);
        }

        this.pageIndex = 1;

        const page$ = this.clickLoadMore$.pipe(
          startWith(void 0),
          filter(() => !this.finalPageReached),
          exhaustMap(() =>
            this.tMDBService
              .selectMoviesByType(this.pageIndex, 18, movieType)
              .pipe(tap(() => (this.pageIndex += 1))),
          ),
        );

        return page$.pipe(
          scan((accumulated, newPage) => [...accumulated, ...newPage], [] as Movie[]),
        );
      }),
    );
  }

  public loadMore(): void {
    if (this.finalPageReached) return;

    this.clickLoadMore$.next();
  }
}
