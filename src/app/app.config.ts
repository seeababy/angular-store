import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { BasketState } from './core/ngxs/basket/basket.state';

const states = [BasketState];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), 
    provideAnimationsAsync(), 
    provideStore([...states],
    withNgxsStoragePlugin({
      keys: [...states]
    }),
    withNgxsReduxDevtoolsPlugin(),
  )
]
};
