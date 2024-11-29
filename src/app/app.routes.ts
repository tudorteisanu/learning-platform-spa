import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./features/courses/courses.routes').then(m => m.coursesRoutes),
  },
  {
    path: 'lessons',
    loadChildren: () => import('./features/lessons/lessons.routes').then(m => m.lessonsRoutes),
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.routes').then(m => m.profileRoutes),
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
