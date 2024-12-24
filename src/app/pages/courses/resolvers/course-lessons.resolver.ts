import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { LessonsService } from "@/App/features/lessons/services/lessons.service";

export const courseLessonsResolver: ResolveFn<any> = (route, state) => {
  const courseId = route.paramMap.get('id');
  const lessonsService = inject(LessonsService);

  if (!courseId) {
    throw new Error('Id is requied')
  }

  return lessonsService.fetch({courseId, responseType: 'short'});
};
