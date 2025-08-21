import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
      },
      {
        path: 'library',
        loadComponent: () => import('./pages/library/library').then(m => m.LibraryComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then(m => m.SettingsComponent)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'game/:id',
    loadComponent: () => import('./pages/game-detail/game-detail').then(m => m.GameDetailComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFoundComponent)
  }
];
