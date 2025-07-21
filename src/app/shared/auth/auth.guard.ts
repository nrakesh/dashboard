import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {NGXLogger} from 'ngx-logger';
import {map} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkLoginStatus().pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true; // Success, allow access
      } else {
        router.navigate(['/login']); // Failed, redirect to login
        return false;
      }
    })
  );
};

/*
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const logger = inject(NGXLogger);


  if (authService.isLoggedIn()) {
    logger.debug('User logged in');
    return true; // User is logged in, allow access to the route
  } else {
    logger.debug('Unauthenticated user');
    // User is not logged in, redirect to the login screen
    router.navigate(['/login']);
    return false; // Block access to the route
  }
};
 */
