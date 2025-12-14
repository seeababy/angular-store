import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AppRoutesConfig } from '../../app.routes-config';

export const authoriziedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/', AppRoutesConfig.Auth, AppRoutesConfig.Login]);
    return false;
  }
  return true;
};
