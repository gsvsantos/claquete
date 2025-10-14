import { Routes } from '@angular/router';
import { ListPageTitleResolver } from './route-title.resolver';
import { tokenIsValidGuard } from '../guards/token-is-valid.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'main-menu', pathMatch: 'full' },
  {
    path: 'main-menu',
    loadComponent: () =>
      import('../components/main-menu/main-menu').then((component) => component.MainMenu),
    title: 'Claquete',
    canActivate: [tokenIsValidGuard],
  },
  {
    path: ':mediaType/all',
    loadComponent: () =>
      import('../components/medias/medias').then((component) => component.Medias),
    title: ListPageTitleResolver,
    canActivate: [tokenIsValidGuard],
  },
  {
    path: ':mediaType/:category',
    loadComponent: () =>
      import('../components/list-medias/list-medias').then((component) => component.ListMedias),
    title: ListPageTitleResolver,
    canActivate: [tokenIsValidGuard],
  },
  {
    path: ':mediaType/details/:id',
    loadComponent: () =>
      import('../components/media-details/media-details').then(
        (component) => component.MediaDetails,
      ),
    title: 'Details',
    canActivate: [tokenIsValidGuard],
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('../components/favorites/favorites').then((component) => component.Favorites),
    title: 'Favorites',
    canActivate: [tokenIsValidGuard],
  },
  {
    path: '401',
    loadComponent: () =>
      import('../components/not-authorized/not-authorized').then(
        (component) => component.NotAuthorized,
      ),
    title: 'Not Authorized',
  },
  {
    path: '**',
    loadComponent: () =>
      import('../components/not-found/not-found').then((component) => component.NotFound),
    title: 'Not Found',
  },
];
