import { Routes } from '@angular/router';
import { AppRoutesConfig } from '../../../app.routes-config';
import { unauthoriziedGuard } from '../../../core/guards/unauthorizied-guard';

export const routes: Routes = [
    {
        path: AppRoutesConfig.Registration,
        canActivate: [unauthoriziedGuard],
        loadComponent: () =>
            import('../pages/registration/registration').then(
                (m) => m.Registration
            ),
    },
    {
        path: AppRoutesConfig.Login,
        canActivate: [unauthoriziedGuard],
        loadComponent: () =>
            import('../pages/login/login').then(
                (m) => m.Login
            ),
    }
];