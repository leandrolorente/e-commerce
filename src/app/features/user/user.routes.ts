import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/my-orders/my-orders.component').then(m => m.MyOrdersComponent)
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  }
];
