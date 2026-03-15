import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Logout } from '../ngxs/user/user.actions';
import { catchError, tap, throwError } from 'rxjs';
import { AppRoutesConfig } from '../../app.routes-config';

export const handleerrorInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        store.dispatch(new Logout());
        router.navigate(['/', AppRoutesConfig.Auth, AppRoutesConfig.Login]);
      }
      return throwError(() => error);
    }),
  );
};
