import { Routes } from '@angular/router';
import { AppRoutesConfig } from '../../../app.routes-config';
import { authoriziedGuard } from '../../../core/guards/authorizied-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../layout/pages/layout/layout')
        .then(m => m.Layout),
    children: [
      {
        path: '',
        redirectTo: AppRoutesConfig.Home,
        pathMatch: 'full',
      },
      {
        path: AppRoutesConfig.Home,
        loadComponent: () =>
          import('../../home/pages/home-page/home-page')
            .then(m => m.HomePage),
      },
      {
        path: AppRoutesConfig.Basket,
        loadComponent: () =>
          import('../../basket/pages/basket-page/basket-page')
            .then(m => m.BasketPage),
      },
      {
        path: AppRoutesConfig.Office,
        canActivate: [authoriziedGuard],
        loadChildren: () =>
          import('../../office/routes/routes')
            .then(c => c.routes),
      },

      {
        path: AppRoutesConfig.ProductPage,
        loadChildren: () =>
          import('../../product/routes/routes')
            .then(m => m.routes),
      },

      {
        path: AppRoutesConfig.MakeOrder,
        loadComponent: () => 
          import('../../make-orders/pages/make-orders/make-orders')
            .then(c => c.MakeOrders)
      }
    ],
  },
];