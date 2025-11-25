import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/admin-products/admin-products.component').then(m => m.AdminProductsComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/admin-orders/admin-orders.component').then(m => m.AdminOrdersComponent)
  },
  {
    path: 'schedule',
    loadComponent: () => import('./pages/admin-schedule/admin-schedule.component').then(m => m.AdminScheduleComponent)
  }
];
