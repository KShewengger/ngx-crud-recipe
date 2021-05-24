import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.getErrorMessage(error);
          return throwError(errorMessage);
        })
      )
  }

  getErrorMessage(error: HttpErrorResponse | ErrorEvent): string {
    return error instanceof ErrorEvent
      ? `Client Side Error - Error: ${error.error.message}`
      : `Server Side Error - Error Code: ${error.status} ${error.message}`;
  }

}
