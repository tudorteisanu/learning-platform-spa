import { Route } from '@angular/router';
import { CoursesOverviewComponent } from './courses-overview/courses-overview.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { courseResolver } from './resolvers/course.resolver';
import { courseLessonsResolver } from './resolvers/course-lessons.resolver';

export const coursesRoutes: Route[] = [
  { path: '', component: CoursesOverviewComponent },
  {
    path: ':id',
    component: CourseDetailsComponent,
    resolve: [
      courseResolver,
      courseLessonsResolver,
    ]
  },
];
