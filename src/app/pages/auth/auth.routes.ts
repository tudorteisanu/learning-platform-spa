import { Route } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { ResetPassowordPageComponent } from './components/reset-passoword-page/reset-passoword-page.component';
import { loggedInGuard } from '@/App/features/auth/guards/loggedIn.guard';

export const authRoutes: Route[] = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [loggedInGuard]
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [loggedInGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
  },
  {
    path: 'reset-password',
    component: ResetPassowordPageComponent,
  },
];
