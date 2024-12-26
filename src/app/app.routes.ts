import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes),
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.routes').then(m => m.coursesRoutes),
  },
  {
    path: 'lessons',
    loadChildren: () => import('./pages/lessons/lessons.routes').then(m => m.lessonsRoutes),
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.routes').then(m => m.profileRoutes),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/config/admin.routes').then(m => m.adminRoutes)
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  }
];
