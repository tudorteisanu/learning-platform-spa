import { Route } from '@angular/router';
import { CoursesOverviewComponent } from './components/courses-overview/courses-overview.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { courseResolver } from './resolvers/course.resolver';
import { courseLessonsResolver } from './resolvers/course-lessons.resolver';
import { courseIdResolver } from './resolvers/course-id.resolver';

export const coursesRoutes: Route[] = [
  { path: '', component: CoursesOverviewComponent },
  {
    path: ':id',
    component: CourseDetailsComponent,
    resolve:  {
      courseId:  courseIdResolver,
      courseResolver,
      courseLessonsResolver
    },
  },
];
