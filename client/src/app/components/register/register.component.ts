import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerUser;
  public userName = '';
  constructor(private router: Router, private _authService: AuthService, private _hotelService: HotelService) { }

  customError = (statusText, statusMessage) => {
    return {
      statusText: statusText,
      message: statusMessage
    }
  }
  
  openRegisterModal = async() => {
    await Swal.fire({
      icon: 'info',
      title: 'Sign up / Register your account',
      html:
      '<input id="email" type="email" class="swal2-input" autocomplete="off" placeholder="email" required>' +
      '<input id="username" type="text" class="swal2-input" autocomplete="off" placeholder="username" required>' +
      '<input id="password" type="password" class="swal2-input" autocomplete="off" placeholder="password" required>' +
      '<b>Already have an account?</b>&nbsp' +
      '<a href="/login">Click here to login</a> ',
      focusConfirm: false,
      confirmButtonColor: '#9c27b0',
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: () => {
          this.registerUser = {
            email: (document.getElementById('email') as HTMLInputElement).value,
            username: (document.getElementById('username') as HTMLInputElement).value,
            password: (document.getElementById('password') as HTMLInputElement).value
          }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if(!this.registerUser.username || !this.registerUser.password || !this.registerUser.email) {
          const error = this.customError("Missing field found!", "Please enter all the fields");
          this.showError(error);
        }
        else {
          if(!this.validateEmail(this.registerUser.email)) { 
            const error = this.customError("Invalid email format!", "Please enter valid email format (eg. example@example.com)");
            this.showError(error);
          }
          else {
            this._authService.register(this.registerUser).subscribe(
              (res) => {
                this.redirectToHomePage();
                localStorage.setItem('order-my-food-token', res.token);
                localStorage.setItem('order-my-food-username', res.username);
                localStorage.setItem('order-my-food-email', res.email);
                localStorage.setItem('order-my-food-userId', res.userId);
                this.router.navigateByUrl("/hotels");
              },
              (error) => {
                if(error.error == 'Email already exist!') {
                  const error = this.customError("Email already exist!", "Please try with some other email");
                  this.showError(error);
                }
              }
            )
          }
        }
      }
    })
  }

  validateEmail = (emailID) => {
    let atpos = emailID.indexOf("@");
    let dotpos = emailID.lastIndexOf(".");
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
      return false;
    }
    return true;
  }

  redirectToHomePage = () => {
    Swal.fire({
      icon: 'success',
      title: 'Your account has been registered successfully',
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
        this.openRegisterModal();
      }
    })
  }

  ngOnInit(): void {
    this.openRegisterModal();
  }

}
