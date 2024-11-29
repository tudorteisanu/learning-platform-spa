// src/app/features/courses/courses.routes.ts
import { Route } from '@angular/router';
import { LessonDetailsComponent } from './pages/lesson-details/lesson-details.component';

export const lessonsRoutes: Route[] = [
  { path: ':id', component: LessonDetailsComponent },
];
