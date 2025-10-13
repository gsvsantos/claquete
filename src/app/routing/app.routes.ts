import { Routes } from '@angular/router';
import { MainMenu } from '../components/main-menu/main-menu';
import { Medias as Medias } from '../components/medias/medias';
import { ListMedias } from '../components/list-medias/list-medias';
import { MediaDetails } from '../components/media-details/media-details';
import { Favorites } from '../components/favorites/favorites';
import { ListPageTitleResolver } from './route-title.resolver';
import { NotFound } from '../components/not-found/not-found';
import { NotAuthorized } from '../components/not-authorized/not-authorized';
import { tokenIsValidGuard } from '../guards/token-is-valid.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'main-menu', pathMatch: 'full' },
  { path: 'main-menu', component: MainMenu, title: 'Main Menu', canActivate: [tokenIsValidGuard] },
  {
    path: ':mediaType/all',
    component: Medias,
    title: ListPageTitleResolver,
    canActivate: [tokenIsValidGuard],
  },
  {
    path: ':mediaType/:category',
    component: ListMedias,
    title: ListPageTitleResolver,
    canActivate: [tokenIsValidGuard],
  },
  {
    path: ':mediaType/details/:id',
    component: MediaDetails,
    title: 'Details',
    canActivate: [tokenIsValidGuard],
  },
  { path: 'favorites', component: Favorites, title: 'Favorites', canActivate: [tokenIsValidGuard] },
  { path: '401', component: NotAuthorized, title: 'Not Authorized' },
  { path: '**', component: NotFound, title: 'Not Found' },
];
