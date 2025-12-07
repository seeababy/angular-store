import { Routes } from '@angular/router';
import { AppRoutesConfig } from '../../../app.routes-config';

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
            }
        ],
    }
];