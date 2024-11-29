import { Routes } from "@angular/router";

export const adminRoutes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('src/app/admin/features/courses/admin-courses.routes')
      .then(m => m.adminCoursesRoutes),
  },
]
