import { Routes } from "@angular/router";

export const adminCoursesRoutes: Routes = [
  {
    path: 'create',
    loadComponent: () => import('src/app/admin/features/courses/pages/create-course/create-course.component')
      .then(m => m.CreateCourseComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('src/app/admin/features/courses/pages/edit-course/edit-course.component')
      .then(m => m.EditCourseComponent),
  }
]