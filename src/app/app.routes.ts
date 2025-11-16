import { Routes } from '@angular/router';
import { AppRoutesConfig } from './app.routes-config';

export const routes: Routes = [
    {
        path: AppRoutesConfig.Home,
        loadComponent: () =>
            import('./feature/home/pages/home-page/home-page').then(
                (m) => m.HomePage
            ),
    }
];
