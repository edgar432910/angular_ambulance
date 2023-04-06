import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError, catchError, retry, mergeMap } from 'rxjs';
import { StorageApplication } from '../../core/application/storage.application';
import { AuthApplication } from '../../core/application/auth.application';
import { Tokens } from '../../core/application/tokens.interface';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private storageApplication: StorageApplication,
    private injector: Injector
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.toLowerCase().includes('/users/login')) {
      return next.handle(req);
    }
    const authApplication: AuthApplication = this.injector.get(AuthApplication);
    const accessToken = this.storageApplication.getField('accessToken');
    const requestCloned = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + accessToken),
    });
    return next.handle(requestCloned).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          console.log('Errorer en el frontend');
          errorMessage = `Error: ${error.error.message}`;
        } else {
          console.log('Errorer en el Back');
          errorMessage = `Error: ${
            error.error.name ? error.error.name : error.message
          }`;
          if (error.status === 409) {
            console.log('Token expired');
            const refreshToken = this.storageApplication.getField(
              'refreshToken'
            ) as string;
            return authApplication.getNewAccessToken(refreshToken).pipe(
              retry(3),
              mergeMap((response: Tokens) => {
                this.storageApplication.setField(
                  'accesssToken',
                  response.accessToken
                );
                const requestCloned = req.clone({
                  headers: req.headers.append(
                    'Authorization',
                    `Bearer ${response.accessToken}`
                  ),
                });
                return next.handle(requestCloned);
              })
            );
          } else if (error.status === 401) {
            console.log('Token modify');
            authApplication.logout();
          }
        }
        return throwError(() => new Error(errorMessage));
      })
    );
    // obtener el access
  }
}
