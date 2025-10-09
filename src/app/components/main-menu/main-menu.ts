import { Component, inject } from '@angular/core';
import { ListMovies } from '../list-movies/list-movies';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { TMDBService } from '../../services/tmdb-service';

@Component({
  selector: 'cqt-main-menu',
  imports: [ListMovies],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})
export class MainMenu {
  public popularMovies$?: Observable<Movie[]>;
  public topRatedmovies$?: Observable<Movie[]>;

  private readonly quantity = 6;
  private readonly tMDBService = inject(TMDBService);

  public ngOnInit(): void {
    this.popularMovies$ = this.tMDBService.selectPopularMovies(1, this.quantity);
    this.topRatedmovies$ = this.tMDBService.selectTopRatedMovies(1, this.quantity);
  }
}
