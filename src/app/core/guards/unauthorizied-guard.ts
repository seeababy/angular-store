import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AppRoutesConfig } from '../../app.routes-config';

export const unauthoriziedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    router.navigate(['/', AppRoutesConfig.Home]);
    return false;
  }
  return true;
};
