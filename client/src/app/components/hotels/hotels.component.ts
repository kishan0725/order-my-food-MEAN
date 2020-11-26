import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Router } from '@angular/router';
import { ISortOption } from '../../models/sort-option';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  
  public hotels = [];
  public hotelsConstant = [];
  public userName = '';

  sortOptions: ISortOption[] = [
    {value: 'name', viewValue: 'Name'},
    {value: 'rating', viewValue: 'Rating'},
    {value: 'reviews', viewValue: 'Review'}
  ];

  selectedValue = this.sortOptions[0].value; // default sorting

  constructor(private _hotelService: HotelService, private router: Router) { }

  inputName = async() => {
    await Swal.fire({
      title: 'Your name?',
      text: "We keep your name confidential!",
      input: 'text',
      confirmButtonColor: '#9c27b0',
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter your name!'
        }
        else {
          this._hotelService.setUserName(value);
          this.userName = this._hotelService.userName;
        }
      }
    });
  }

  searchQuery = (query) => {
    this.hotels = this.hotelsConstant.filter((hotel) =>  JSON.stringify(hotel).toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  sortHotels = (selectedValue) => {

    if (selectedValue === 'rating'){
      this.hotels = this.hotels.sort((a,b) => {
        return b.rating - a.rating
      });
    }

    else if (selectedValue === 'reviews'){
      this.hotels = this.hotels.sort((a,b) => {
        return b.reviews - a.reviews
      });
    }

    else if (selectedValue === 'name'){
       function compareName (a, b)  {
        // case-insensitive comparison
        a = a.toLowerCase();
        b = b.toLowerCase();
      
        return (a < b) ? -1 : (a > b) ? 1 : 0;
      }
      this.hotels = this.hotels.sort((a,b) => {
        return compareName(a.name, b.name)
      });
    }
  }

  goToHotel = (hotel) => {
    this.router.navigate(['/hotels', hotel.id])
  }

  showError = (error) => {
    Swal.fire({
      icon: 'error',
      title: error.status,
      text: error.message,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }

  ngOnInit(): void {
    this._hotelService.getHotels().subscribe(
      (data) => {
        this.hotelsConstant = this.hotels = data;
        this.sortHotels(this.selectedValue);
        this.userName = this._hotelService.userName;
      },
      (error) => {
        if(error.status === 401) {
          this.router.navigateByUrl('/login');
        }
        else {
          console.log(error);
          this.showError(error);
        }
      }
    );
  }

}
