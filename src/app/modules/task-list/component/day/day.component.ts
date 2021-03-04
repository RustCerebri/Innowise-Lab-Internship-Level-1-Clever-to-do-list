import { Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as EventEmitter from 'events';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  @Input() date: any;
  @Output() onAdd: EventEmitter = new EventEmitter();
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  constructor() { }

  ngOnInit(): void {
  }


  chooseDate(date) {

    this.onAdd.emit(date);
  }

}
