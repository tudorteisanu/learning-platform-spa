import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loggedIn = toSignal(authService.loggedIn$, {initialValue: false});

  if (loggedIn()) {
    return router.navigateByUrl('/')
  }

  return true;
};
