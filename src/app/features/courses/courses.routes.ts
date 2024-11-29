// src/app/features/courses/courses.routes.ts
import { Route } from '@angular/router';
import { CoursesOverviewComponent } from './pages/courses-overview/courses-overview.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';

export const coursesRoutes: Route[] = [
  { path: '', component: CoursesOverviewComponent },
  { path: ':id', component: CourseDetailsComponent },
];
