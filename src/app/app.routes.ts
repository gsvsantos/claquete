import { Routes } from '@angular/router';
import { MainMenu } from './components/main-menu/main-menu';
import { Medias as Medias } from './components/medias/medias';
import { ListMedias } from './components/list-medias/list-medias';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-menu',
    pathMatch: 'full',
  },
  { path: 'main-menu', component: MainMenu },
  { path: ':mediaType/all', component: Medias },
  { path: ':mediaType/:category', component: ListMedias },
  {
    path: '**',
    redirectTo: 'main-menu', // 404
    pathMatch: 'full',
  },
];
