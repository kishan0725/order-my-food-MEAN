import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept = (req, next) => {
    let authToken = this._authService.getAuthToken();
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
