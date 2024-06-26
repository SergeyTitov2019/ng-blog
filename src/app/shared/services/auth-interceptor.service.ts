import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private auth: AuthService,
              private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthenticated() && this.auth.token !== null ){
      req = req.clone(({
        setParams: {
          auth: this.auth.token.toString()
        }
      }))
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
        console.log('[Interceptor Error]: ', error);
        if(error.status === 401){
          this.auth.logout()
          this.router.navigate(['/admin', 'login'], {
            queryParams: {
              authFailed: true
            }
          })
        }
        return throwError(error)
      }))
  }
}
