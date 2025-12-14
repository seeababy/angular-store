import { Routes } from '@angular/router';
import { AppRoutesConfig } from '../../../app.routes-config';
import { authoriziedGuard } from '../../../core/guards/authorizied-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('../../layout/pages/layout/layout').then(
                (m) => m.Layout
            ),
        children: [
            {
                path: '',
                redirectTo: AppRoutesConfig.Home,
                pathMatch: 'full',
            },
            {
                path: AppRoutesConfig.Home,
                loadComponent: () =>
                    import('../../home/pages/home-page/home-page').then(
                        (m) => m.HomePage
                    ),
            },
            {
                path: AppRoutesConfig.Account,
                canActivate: [authoriziedGuard],
                loadComponent: () =>
                    import('../../account/pages/user-page/user-page').then(
                        (c) => c.UserPage
                    ),
            },
        ],
    }
];