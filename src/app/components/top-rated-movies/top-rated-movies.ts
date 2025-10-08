import { Component, inject } from '@angular/core';
import { ListMovies } from "../list-movies/list-movies";
import { GsButtons, gsTiposBotaoEnum, gsTiposGuiaEnum, gsVariant } from "gs-buttons";
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { TMDBService } from '../../services/tmdb-service';

@Component({
  selector: 'cqt-top-rated-movies',
  imports: [ListMovies, GsButtons],
  templateUrl: './top-rated-movies.html',
  styleUrl: './top-rated-movies.scss',
})
export class TopRatedMovies {
  public buttonType = gsTiposBotaoEnum;
  public targetType = gsTiposGuiaEnum;
  public variant = gsVariant;
  public movies$?: Observable<Movie[]>;

  private readonly tMDBService = inject(TMDBService);

  public ngOnInit(): void {
    this.movies$ = this.tMDBService.selectTopRatedMovies();
  }
}
