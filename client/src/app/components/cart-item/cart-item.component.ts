import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() public cartItems;

  @Output() removeQuantityEvent = new EventEmitter();
  @Output() addQuantityEvent = new EventEmitter(); 
  @Output() removeItemEvent = new EventEmitter(); 

  constructor() { }

  removeQuantity = (cartItem) => {
    this.removeQuantityEvent.emit(cartItem);
  }

  addQuantity = (cartItem) => {
    this.addQuantityEvent.emit(cartItem);
  }

  removeItem = (cartItem) => {
    this.removeItemEvent.emit(cartItem);
  }

  ngOnInit(): void {
  }

}
