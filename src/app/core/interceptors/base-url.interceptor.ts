// src/app/core/interceptors/base-url.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.apiBaseUrl; // Define your base URL in `environment.ts`.

  // Only prepend the base URL if the request does not already have an absolute URL.
  const isAbsoluteUrl = req.url.startsWith('http');
  const updatedReq = req.clone({
    url: isAbsoluteUrl ? req.url : `${baseUrl}${req.url}`,
  });

  return next(updatedReq);
};
