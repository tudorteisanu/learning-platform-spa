import { APP_INITIALIZER, inject } from "@angular/core";
import { AuthService } from "./features/auth/services/auth.service";

const appInitializerFn = () => {
  const authService = inject(AuthService);

  const token = localStorage.getItem('accessToken');

  if (token) {
    authService.setToken(token);
    return () => authService.fetchProfile();
  }


  return () => true;
};


export const provideAppInitializer = () => {
  return {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFn,
    deps: [],
    multi: true, // Ensure multiple initializers can be combined
  }
}
