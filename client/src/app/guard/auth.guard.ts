import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HotelService } from '../services/hotel.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router, private _hotelService: HotelService) { }

  canActivate(): boolean {
    if(this._authService.isAuthenticatedUser()) {
      let userName = localStorage.getItem('order-my-food-username');
      let email = localStorage.getItem('order-my-food-email');
      let userId = localStorage.getItem('order-my-food-userId');
      this._hotelService.setUserName(userName);
      this._hotelService.setEmail(email);
      this._hotelService.setUserId(userId);
      return true;
    } else {
      this._router.navigateByUrl('/login');
      return false
    }
  }
  
}
