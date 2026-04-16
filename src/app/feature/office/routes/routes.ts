import { Routes } from '@angular/router';
import { AppRoutesConfig } from '../../../app.routes-config';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/office-page/office-page').then((c) => c.OfficePage),
    children: [
      {
        path: '',
        redirectTo: AppRoutesConfig.UserPage,
        pathMatch: 'full',
      },
      {
        path: AppRoutesConfig.UserPage,
        loadComponent: () => import('../pages/user-page/user-page').then((c) => c.UserPage),
      },
      {
        path: AppRoutesConfig.OrderPage,
        loadComponent: () => import('../pages/order-page/order-page').then((c) => c.OrderPage),
      }
    ],
  },
];
