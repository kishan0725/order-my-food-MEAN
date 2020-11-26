import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() public userName;

  constructor(private router: Router, private _authService: AuthService) { }

  goToHome = () => {
    this.router.navigateByUrl("/hotels");
  }

  logoutUser = () => {
    this.redirectToLoginPage()
  }

  redirectToLoginPage = () => {
    Swal.fire({
      icon: 'success',
      title: 'Logging out',
      html: 'Redirecting to the login page...',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    }).then((result) => {
      this._authService.logoutUser();
    })
  }


  ngOnInit(): void {
  }

}
