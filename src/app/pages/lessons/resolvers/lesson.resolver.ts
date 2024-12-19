import { ResolveFn } from "@angular/router";

export const lessonIdResolver: ResolveFn<any> = (route, state) => {
  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Id is requied')
  }

  return id;
};
