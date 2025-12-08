import { Routes } from '@angular/router';
import { AppRoutesConfig } from '../../../app.routes-config';

export const routes: Routes = [
    {
        path: AppRoutesConfig.Registration,
        loadComponent: () =>
            import('../pages/registration/registration').then(
                (m) => m.Registration
            ),
    },
    {
        path: AppRoutesConfig.Login,
        loadComponent: () =>
            import('../pages/login/login').then(
                (m) => m.Login
            ),
    }
];