import { Routes } from '@angular/router';
import { MainMenu } from './components/main-menu/main-menu';
import { Medias as Medias } from './components/medias/medias';
import { ListMedias } from './components/list-medias/list-medias';
import { MediaDetails } from './components/media-details/media-details';
import { Favorites } from './components/favorites/favorites';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-menu',
    pathMatch: 'full',
  },
  { path: 'main-menu', component: MainMenu },
  { path: ':mediaType/all', component: Medias },
  { path: ':mediaType/:category', component: ListMedias },
  { path: ':mediaType/details/:id', component: MediaDetails },
  { path: 'favorites', component: Favorites },
  {
    path: '**',
    redirectTo: 'main-menu', // 404
    pathMatch: 'full',
  },
];
