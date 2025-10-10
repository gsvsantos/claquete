import { Routes } from '@angular/router';
import { MainMenu } from './components/main-menu/main-menu';
import { Movies } from './components/movies/movies';
import { ListMovies } from './components/list-movies/list-movies';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-menu',
    pathMatch: 'full',
  },
  { path: 'main-menu', component: MainMenu },
  { path: 'movies', component: Movies },
  { path: 'movies/:type', component: ListMovies },
];
