import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';

@Injectable()
export class RestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const req = request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token') ?? '',
      }),
    });
    return next.handle(req);
  }
}
