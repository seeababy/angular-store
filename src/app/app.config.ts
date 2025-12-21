import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngxs/store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { routes } from './app.routes';
import { BasketState } from './core/ngxs/basket/basket.state';
import { UserState } from './core/ngxs/user/user.state';

const states = [
  BasketState,
  UserState
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),

    provideStore(
      states,
      withNgxsStoragePlugin({
        keys: states
      }),
      withNgxsReduxDevtoolsPlugin()
    )
  ]
};