import { ResolveFn } from "@angular/router";

export const courseIdResolver: ResolveFn<any> = (route) => {
  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Id is requied')
  }

  return Number(id);
};
