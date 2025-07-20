import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {NGXLogger} from 'ngx-logger'; // Your service for checking login status

export const authGuard: CanActivateFn = (route, state) => {
  // Inject the services you need
  const router = inject(Router);
  const logger = inject(NGXLogger);

  // Check if the user is authenticated
  logger.debug(` User is attempting to access: ${state.url}`);
  return true; // Always allow access for now
};
