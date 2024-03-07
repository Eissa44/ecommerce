import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('loginToken') != null) {
      let cartToken: any = { token: localStorage.getItem('loginToken') };

      request = request.clone({
        setHeaders: cartToken,
      });
    }

    return next.handle(request);
  }
}
