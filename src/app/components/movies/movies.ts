import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { TMDBService } from '../../services/tmdb-service';
import { CarouselMovies } from "../carousel-movies/carousel-movies";

@Component({
  selector: 'clqt-movies',
  imports: [CarouselMovies],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies {
  public popularMovies$?: Observable<Movie[]>;
  public topRatedMovies$?: Observable<Movie[]>;
  public upcomingMovies$?: Observable<Movie[]>;
  public nowPlayingMovies$?: Observable<Movie[]>;

  public carouselTest$?: Observable<Movie[]>;

  private readonly quantity = 12;
  private readonly tMDBService = inject(TMDBService);

  public ngOnInit(): void {
    this.popularMovies$ = this.tMDBService.selectPopularMovies(1, this.quantity);
    this.topRatedMovies$ = this.tMDBService.selectTopRatedMovies(1, this.quantity);
    this.upcomingMovies$ = this.tMDBService.selectUpcomingMovies(1, this.quantity);
    this.nowPlayingMovies$ = this.tMDBService.selectNowPlayingMovies(1, this.quantity);
  }
}
