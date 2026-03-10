import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserSelectors } from '../ngxs/user/user.selectors';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  const token = store.selectSnapshot(UserSelectors.userToken);

  if (token) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
  }

  return next(req);
};
