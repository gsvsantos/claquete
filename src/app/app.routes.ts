import { Routes } from '@angular/router';
import { MainMenu } from './components/main-menu/main-menu';
import { PopularMovies } from './components/popular-movies/popular-movies';
import { TopRatedMovies } from './components/top-rated-movies/top-rated-movies';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-menu',
    pathMatch: 'full',
  },
  { path: 'main-menu', component: MainMenu },
  { path: 'popular', component: PopularMovies },
  { path: 'top-rated', component: TopRatedMovies },
];
