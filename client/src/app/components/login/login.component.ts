import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginUser;

  constructor(private router: Router, private _authService: AuthService, private _hotelService: HotelService) { }

  customError = (statusText, statusMessage) => {
    return {
      statusText: statusText,
      message: statusMessage
    }
  }

  openLoginModal = async() => {
    await Swal.fire({
      icon: 'info',
      title: 'Login into your account',
      html:
      '<input id="email" type="email" class="swal2-input" autocomplete="off" placeholder="email" required>' +
      '<input id="password" type="password" class="swal2-input" autocomplete="off" placeholder="password" required>' +
      '<b>New User?</b>&nbsp' +
      '<a href="/register">Click here to register</a> ',
      focusConfirm: false,
      confirmButtonColor: '#9c27b0',
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: () => {
          this.loginUser = {
            email: (document.getElementById('email') as HTMLInputElement).value,
            password: (document.getElementById('password') as HTMLInputElement).value
          }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if(!this.loginUser.email || !this.loginUser.password) {
          const error = this.customError("Missing username or password!", "Please enter all the fields");
          this.showError(error);
        }
        else {
          this._authService.login(this.loginUser).subscribe(
            (res) => {
              this.redirectToHomePage();
              localStorage.setItem('order-my-food-token', res.token);
              localStorage.setItem('order-my-food-username', res.username);
              localStorage.setItem('order-my-food-email', res.email);
              localStorage.setItem('order-my-food-userId', res.userId);
              this.router.navigateByUrl("/hotels");
            },
            (error) => {
              if(error.statusText == 'Unauthorized') {
                const error = this.customError("Invalid Username or Password", "Please enter valid credentials");
                this.showError(error);
              }
              if(error.error == "Email doesn't exist!") {
                const error = this.customError("Email doesn't exist!", "Please enter valid credentials");
                this.showError(error);
              }
              if(error.error == "Incorrect Password!") {
                const error = this.customError("Incorrect Password!", "Please enter valid credentials");
                this.showError(error);
              }
            }
          )
        }
      }
    })
  }

  redirectToHomePage = () => {
    Swal.fire({
      icon: 'success',
      title: 'Logged in successfully',
      html: 'Redirecting to the dashboard...',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    }).then((result) => { })
  }

  showError = (error) => {
    Swal.fire({
      icon: 'error',
      title: error.statusText,
      text: error.message,
      showConfirmButton: true,
      confirmButtonText: "Try Again",
      confirmButtonColor: '#9c27b0',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.openLoginModal();
      }
    })
  }

  ngOnInit(): void {
    this.openLoginModal();
  }

}
