import { Route } from '@angular/router';
import { LessonDetailsComponent } from './components/lesson-details/lesson-details.component';
import { LessonEditComponent } from './components/lesson-edit/lesson-edit.component';
import { lessonIdResolver } from './resolvers/lesson.resolver';

export const lessonsRoutes: Route[] = [
  {
    path: ':id',
    component: LessonDetailsComponent,
    resolve: { lessonId: lessonIdResolver },
  },
  {
    path: ':id/edit',
    component: LessonEditComponent,
    resolve: { lessonId: lessonIdResolver },
  },
];
