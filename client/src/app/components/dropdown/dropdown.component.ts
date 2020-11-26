import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() public selectedValue;
  @Input() public sortOptions;

  @Output() sortEvent = new EventEmitter();

  constructor() { }

  sortHotels = (selectedValue) => {
    this.sortEvent.emit(selectedValue);
  }

  ngOnInit(): void {
  }

}
