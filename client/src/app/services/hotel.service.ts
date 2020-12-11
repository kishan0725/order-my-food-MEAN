import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { IHotel } from '../models/hotel';
import { catchError } from 'rxjs/operators';
import { ICartItem } from '../models/cart-item';
import { environment } from 'src/environments/environment';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private url: string = (environment.baseURL) ? `${environment.baseURL}api/hotels` : 'api/hotels';
  private orderURL: string = (environment.baseURL) ? `${environment.baseURL}api/order` : 'api/order';
  public hasUserName = false;
  public userName = '';
  public email = '';
  public userId = '';
  public cartItems = [];
  public orderHistory = [];
  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  orderHistoryChange: Subject<any> = new Subject<any>();

  userNameChange: Subject<string> = new Subject<string>();

  emailChange: Subject<string> = new Subject<string>();

  userIdChange: Subject<string> = new Subject<string>();

  cartItemsChange: Subject<ICartItem[]> = new Subject<ICartItem[]>();

  constructor(private httpClient: HttpClient) {
    this.cartItemsChange.subscribe((value: ICartItem[]) => {
      this.cartItems.push(value);
    });
    this.userNameChange.subscribe((name) => {
      this.userName = name;
    });
    this.emailChange.subscribe((email) => {
      this.email = email;
    });
    this.userIdChange.subscribe((userId) => {
      this.userId = userId;
    });
    this.orderHistoryChange.subscribe((orderHist) => {
      this.orderHistory = orderHist;
    })
  }

  public getHotels = (): Observable<IHotel[]> => {
    return this.httpClient.get<IHotel[]>(this.url).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public getHotel = (hotelId: string): Observable<IHotel> => {
    return this.httpClient.get<IHotel>(`${this.url}/${hotelId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public saveOrder = (orders, userId): Observable<any> => {
    this.clearAllCartItems();
    return this.httpClient.post<any>(`${this.orderURL}/${userId}`, orders).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public getOrders = (userId): Observable<IOrder[]> => {
    return this.httpClient.get<IOrder[]>(`${this.orderURL}/${userId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public setUserName = (name) => {
    this.userNameChange.next(name);
  }

  public setEmail = (email) => {
    this.emailChange.next(email);
  }

  public setUserId = (userId) => {
    this.userIdChange.next(userId);
  }

  public setCartItem = (item) => {
    this.cartItemsChange.next(item);
  }

  public setOrderHistory = (orderHist) => {
    this.orderHistoryChange.next(orderHist)
  }

  public removeCartItem = (item) => {
    this.cartItems = this.cartItems.filter((menu) => menu.id != item.id);
  }

  public clearAllCartItems = () => {
    this.cartItems = [];
  }

}
