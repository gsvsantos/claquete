import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { TMDBService } from '../../services/tmdb-service';
import { CarouselMovies } from '../carousel-movies/carousel-movies';

@Component({
  selector: 'clqt-main-menu',
  imports: [CarouselMovies],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})
export class MainMenu {
  public popularMovies$?: Observable<Movie[]>;
  public topRatedmovies$?: Observable<Movie[]>;

  private readonly quantity = 12;
  private readonly tMDBService = inject(TMDBService);

  public ngOnInit(): void {
    this.popularMovies$ = this.tMDBService.selectMoviesByType(1, this.quantity, 'popular');
  }
}
