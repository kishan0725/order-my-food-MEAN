import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {

  @Input() public hotelName;
  @Input() public hotelThumbnail;
  @Input() public hotelImage;
  @Input() public cuisines;
  @Input() public rating;
  @Input() public review;

  public math = Math;

  constructor() { }

  ngOnInit(): void {
  }

}
