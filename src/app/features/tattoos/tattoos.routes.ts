import { Routes } from '@angular/router';

export const TATTOOS_ROUTES: Routes = [
  {
    path: 'body-map',
    loadComponent: () => import('./pages/body-map/body-map.component').then(m => m.BodyMapComponent)
  },
  {
    path: '',
    loadComponent: () => import('./pages/tattoo-list/tattoo-list.component').then(m => m.TattooListComponent)
  }
];
