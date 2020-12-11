import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRegisterUser } from '../models/register-user';
import { ILoginUser } from '../models/login-user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerURL: string = (environment.baseURL) ? `${environment.baseURL}api/register` : 'api/register';
  private loginURL: string = (environment.baseURL) ? `${environment.baseURL}api/login` : 'api/login';
  private isUserLoggedIn: boolean = false;

  userLogStatusChange: Subject<boolean> = new Subject<boolean>();

  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  constructor(private httpClient: HttpClient, private _router: Router) {
    this.userLogStatusChange.subscribe((value) => {
      this.isUserLoggedIn = value;
    })
  }

  public register = (user: IRegisterUser): Observable<any> => {
    return this.httpClient.post<any>(this.registerURL, user).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public login = (user: ILoginUser): Observable<any> => {
    return this.httpClient.post<any>(this.loginURL, user).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public userLoggedIn = () => {
    this.userLogStatusChange.next(true);
  }

  public userLoggedOut = () => {
    this.userLogStatusChange.next(false);
  }

  public isAuthenticatedUser = () => {
    return !!localStorage.getItem('order-my-food-token');
  }

  public getAuthToken = () => {
    return localStorage.getItem('order-my-food-token');
  }

  public logoutUser = () => {
    localStorage.removeItem('order-my-food-token');
    localStorage.removeItem('order-my-food-username');
    localStorage.removeItem('order-my-food-email');
    localStorage.removeItem('order-my-food-userId');
    this._router.navigateByUrl('/login');
  }

}
