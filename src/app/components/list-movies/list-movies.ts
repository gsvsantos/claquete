import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { exhaustMap, filter, Observable, scan, startWith, Subject, tap } from 'rxjs';
import { Movie } from '../../models/movie';
import { GsButtons, gsTiposBotaoEnum, gsTiposGuiaEnum, gsVariant } from 'gs-buttons';
import { TMDBService } from '../../services/tmdb-service';
import { ActivatedRoute } from '@angular/router';

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
    const movieType = this.route.snapshot.paramMap.get('type');
    console.log(movieType);

    const page$ = this.clickLoadMore$.pipe(
      startWith(void 1),
      filter(() => !this.finalPageReached),
      exhaustMap(() =>
        this.tMDBService
          .selectMoviesByType(this.pageIndex, 18, movieType as string)
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
