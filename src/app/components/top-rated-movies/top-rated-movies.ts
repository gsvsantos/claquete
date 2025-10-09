import { Component, inject } from '@angular/core';
import { ListMovies } from '../list-movies/list-movies';
import { GsButtons, gsTiposBotaoEnum, gsTiposGuiaEnum, gsVariant } from 'gs-buttons';
import { exhaustMap, filter, Observable, scan, startWith, Subject, tap } from 'rxjs';
import { Movie } from '../../models/movie';
import { TMDBService } from '../../services/tmdb-service';

@Component({
  selector: 'clqt-top-rated-movies',
  imports: [ListMovies, GsButtons],
  templateUrl: './top-rated-movies.html',
  styleUrl: './top-rated-movies.scss',
})
export class TopRatedMovies {
  public buttonType = gsTiposBotaoEnum;
  public targetType = gsTiposGuiaEnum;
  public variant = gsVariant;
  public movies$?: Observable<Movie[]>;
  public get finalPageReached(): boolean {
    return this.pageIndex >= 520;
  }

  private pageIndex: number = 1;
  private readonly clickLoadMore$ = new Subject<void>();
  private readonly tMDBService = inject(TMDBService);

  public ngOnInit(): void {
    const page$ = this.clickLoadMore$.pipe(
      startWith(void 1),
      filter(() => !this.finalPageReached),
      exhaustMap(() =>
        this.tMDBService
          .selectTopRatedMovies(this.pageIndex, 18)
          .pipe(tap(() => (this.pageIndex += 1))),
      ),
    );

    this.movies$ = page$.pipe(scan((accumulated, newPage) => [...accumulated, ...newPage]));
  }

  public loadMore(): void {
    if (this.finalPageReached) return;

    this.clickLoadMore$.next();
  }
}
