import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
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

const states = [BasketState, UserState, ProductsState, OrdersState, CategoriesState];

const localStorageStates = [UserState, CategoriesState];

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

    provideStore(
      states,
      withNgxsStoragePlugin({
        keys: localStorageStates,
      }),
      withNgxsReduxDevtoolsPlugin(),
    ),
  ],
};
