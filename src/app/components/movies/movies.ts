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
    this.popularMovies$ = this.tMDBService.selectMoviesByType(1, this.quantity, 'popular');
    this.topRatedMovies$ = this.tMDBService.selectMoviesByType(1, this.quantity, 'top_rated');
    this.upcomingMovies$ = this.tMDBService.selectMoviesByType(1, this.quantity, 'upcoming');
    this.nowPlayingMovies$ = this.tMDBService.selectMoviesByType(1, this.quantity, 'now_playing');
  }
}
