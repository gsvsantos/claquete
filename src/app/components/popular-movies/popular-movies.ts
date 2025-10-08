import { Component, inject, OnInit } from '@angular/core';
import { ListMovies } from '../list-movies/list-movies';
import { gsTiposBotaoEnum, gsTiposGuiaEnum, gsVariant, GsButtons } from 'gs-buttons';
import { Observable } from 'rxjs';
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
  
  private readonly tMDBService = inject(TMDBService);

  public ngOnInit(): void {
    this.movies$ = this.tMDBService.selectPopularMovies();
  }
}
