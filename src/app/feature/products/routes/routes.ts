import { Routes } from '@angular/router';
import { AppRoutesConfig } from '../../../app.routes-config';


export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutesConfig.Categories,
    pathMatch: 'full',
  },

  {
    path: AppRoutesConfig.Categories,
    loadComponent: () =>
      import('../pages/categories-page/categories-page').then((c) => c.CategoriesPage),
  },
  {
    path: AppRoutesConfig.Products,
    loadComponent: () => import('../pages/products-page/products-page').then((c) => c.ProductsPage),
  },
];
