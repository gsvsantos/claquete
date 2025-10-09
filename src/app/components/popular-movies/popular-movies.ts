import { Component, inject, OnInit } from '@angular/core';
import { ListMovies } from '../list-movies/list-movies';
import { gsTiposBotaoEnum, gsTiposGuiaEnum, gsVariant, GsButtons } from 'gs-buttons';
import { exhaustMap, filter, Observable, scan, startWith, Subject, tap } from 'rxjs';
import { Movie } from '../../models/movie';
import { TMDBService } from '../../services/tmdb-service';

@Component({
  selector: 'cqt-popular-movies',
  imports: [ListMovies, GsButtons],
  templateUrl: './popular-movies.html',
  styleUrl: './popular-movies.scss',
})
export class PopularMovies implements OnInit {
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
      startWith(void 0),
      filter(() => !this.finalPageReached),
      exhaustMap(() =>
        this.tMDBService
          .selectPopularMovies(this.pageIndex)
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
