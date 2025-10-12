import { Routes } from '@angular/router';
import { MainMenu } from '../components/main-menu/main-menu';
import { Medias as Medias } from '../components/medias/medias';
import { ListMedias } from '../components/list-medias/list-medias';
import { MediaDetails } from '../components/media-details/media-details';
import { Favorites } from '../components/favorites/favorites';
import { ListPageTitleResolver } from './route-title.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'main-menu', pathMatch: 'full' },
  { path: 'main-menu', component: MainMenu, title: 'Main Menu' },
  { path: ':mediaType/all', component: Medias, title: ListPageTitleResolver },
  { path: ':mediaType/:category', component: ListMedias, title: ListPageTitleResolver },
  { path: ':mediaType/details/:id', component: MediaDetails, title: 'Details' },
  { path: 'favorites', component: Favorites, title: 'Favorites' },
  { path: '**', redirectTo: 'main-menu', pathMatch: 'full' },
];
