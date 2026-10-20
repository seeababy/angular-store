import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngxs/store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';

import { routes } from './app.routes';
import { BasketState } from './core/ngxs/basket/basket.state';
import { UserState } from './core/ngxs/user/user.state';
import { ProductsState } from './core/ngxs/products/products.state';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { handleerrorInterceptor } from './core/interceptors/handleerror-interceptor';
import { OrdersState } from './core/ngxs/orders/orders.state';
import { CategoriesState } from './core/ngxs/categories/categories.state';
import { ProductFiltersState } from './core/ngxs/product-filters/product-filters.state';

const states = [
  BasketState,
  UserState,
  ProductsState,
  ProductFiltersState,
  OrdersState,
  CategoriesState,
];

const localStorageStates = [UserState, CategoriesState];

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    ),
    provideHttpClient(withInterceptors([authInterceptor, handleerrorInterceptor])),
    provideAnimationsAsync(),

    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'uk',
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),

    provideStore(
      states,
      withNgxsStoragePlugin({
        keys: localStorageStates,
      }),
      withNgxsReduxDevtoolsPlugin(),
    ),
  ],
};
