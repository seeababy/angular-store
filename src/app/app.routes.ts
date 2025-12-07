import { Routes } from '@angular/router';
import { AppRoutesConfig } from './app.routes-config';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./feature/layout/routes/routes').then(
                (m) => m.routes
            ),
    },

    {
        path: AppRoutesConfig.Auth,
        loadChildren: () =>
            import('./feature/auth/routes/routes').then(
                (m) => m.routes
            ),
    }
];
