import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() public hotel;

  @Output() addToMyCartEvent = new EventEmitter();

  constructor() { }

  addToMyCart = (menu) => {
    this.addToMyCartEvent.emit(menu);
  }

  ngOnInit(): void {
  }

}
