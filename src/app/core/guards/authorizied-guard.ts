import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserSelectors } from '../ngxs/user/user.selectors';
import { AppRoutesConfig } from '../../app.routes-config';

export const authoriziedGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  const isAuthorized = store.selectSnapshot(UserSelectors.isAuthorized);

  if (!isAuthorized) {
    router.navigate(['/', AppRoutesConfig.Auth, AppRoutesConfig.Login]);
    return false;
  }

  return true;
};