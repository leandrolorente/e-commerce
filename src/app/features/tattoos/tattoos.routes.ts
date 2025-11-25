import { Routes } from '@angular/router';

export const TATTOOS_ROUTES: Routes = [
  {
    path: 'body-map',
    loadComponent: () => import('./pages/body-map/body-map.component').then(m => m.BodyMapComponent)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/tattoo-detail/tattoo-detail.component').then(m => m.TattooDetailComponent)
  },
  {
    path: '',
    loadComponent: () => import('./pages/tattoo-list/tattoo-list.component').then(m => m.TattooListComponent)
  }
];
