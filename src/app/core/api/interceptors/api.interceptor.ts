import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url: string = req.url.replace('@', environment.APP_HOST);
    const clone = req.clone({ url });

    return next.handle(clone).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
}
