import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { switchMap } from "rxjs";
import { CourseService } from "src/app/features/courses/services/course.service";

export const courseResolver: ResolveFn<any> = (route) => {
  const id = route.paramMap.get('id');
  const courseService = inject(CourseService);

  if (!id) {
    throw new Error('Id is requied')
  }

  return courseService.getCourseById(id);
};
