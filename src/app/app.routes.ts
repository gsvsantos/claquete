import { Routes } from '@angular/router';
import { MainMenu } from './components/main-menu/main-menu';
import { PopularMovies } from './components/popular-movies/popular-movies';
import { TopRatedMovies } from './components/top-rated-movies/top-rated-movies';
import { Movies } from './components/movies/movies';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-menu',
    pathMatch: 'full',
  },
  { path: 'main-menu', component: MainMenu },
  { path: 'movies', component: Movies },
  { path: 'movies/popular', component: PopularMovies },
  { path: 'movies/top-rated', component: TopRatedMovies },
];
