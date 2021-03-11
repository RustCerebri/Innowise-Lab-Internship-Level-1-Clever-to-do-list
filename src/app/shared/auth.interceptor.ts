import { AuthService } from './services/auth.service';
import { Observable, throwError } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor (
    private auth: AuthService,
    private router: Router
  ) {
  }

  public intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     if (this.auth.isAuthenticated()) {
       req = req.clone({
         setParams: {
           auth: this.auth.token
         }
       })
     }
      return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse)=> {
          if (error.status === 401) {
            this.auth.logout();
            this.router.navigate(['/authentication', 'enter'])
          }
          return throwError(error)
        })
      )
    }
}
