import { Routes } from "@angular/router";
import { AppRoutesConfig } from "../../../app.routes-config";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('../pages/product-page/product-page')
                .then(m => m.ProductPage),
        children: [
            {
                path: '',
                redirectTo: AppRoutesConfig.ProductAbout,
                pathMatch: 'full',
            },

            {
                path: AppRoutesConfig.ProductAbout,
                loadComponent: () =>
                    import('../pages/about-page/about-page')
                        .then(m => m.AboutPage),
            },
            {
                path: AppRoutesConfig.ProductCharacteristics,
                loadComponent: () =>
                    import('../pages/characteristics-page/characteristics-page')
                        .then(m => m.CharacteristicsPage),
            },
            {
                path: AppRoutesConfig.ProductReviews,
                loadComponent: () =>
                    import('../pages/reviews-page/reviews-page')
                        .then(m => m.ReviewsPage),
            }
        ]
    }
    
];