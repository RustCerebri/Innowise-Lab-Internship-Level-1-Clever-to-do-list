import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  @Input() date: any;
  @Output() public onAddEvent = new EventEmitter();
  public monthNames: Array<string> = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public dayNames: Array<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  constructor() { }

  ngOnInit(): void {
  }


  public chooseDate(): void {
    this.onAddEvent.next(this.date.date);
  }

}
