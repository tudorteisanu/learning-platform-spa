import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const isAbsoluteUrl = req.url.startsWith('http');

  if (isAbsoluteUrl) {
    return next(req);
  }

  return next(req.clone({
    url: `${environment.apiBaseUrl}${req.url}`,
  }));
};
