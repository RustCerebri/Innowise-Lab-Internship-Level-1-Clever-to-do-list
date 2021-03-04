import { Component, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import * as EventEmitter from 'events';



export class CalendarDay {


  public date: Date;
  public title: string;
  public isPastDate: boolean;
  public isToday: boolean;
  public currentDate: Date;

  public getDateString() {
    return this.date.toISOString().split("T")[0]
  }

  constructor(d: Date) {
    this.date = d;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }

}

@Pipe({
  name: 'chunk'
})

export class ChunkPipe implements PipeTransform {

  transform(calendarDaysArray: any, chunkSize: number): any {
    let calendarDays = [];
    let weekDays = [];

    calendarDaysArray.map((day,index) => {
        weekDays.push(day);
        if (++index % chunkSize  === 0) {
          calendarDays.push(weekDays);
          weekDays = [];
        }
    });
    return calendarDays;
  }
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

export class CalendarComponent implements OnInit {


  @Output() public onAddEvent: EventEmitter = new EventEmitter();

  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


  public displayMonth: string;
  public displayDay: string;
  private monthIndex: number = 0;


  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);

  }

  private generateCalendarDays(monthIndex: number): void {

    this.calendar = [];



    let day: Date = new Date(new Date().setDate(new Date().getDay() + monthIndex));

    this.displayMonth = this.monthNames[day.getMonth()];

    this.displayDay = this.dayNames[day.getUTCDay()];

    let dateToAdd = day;
    this.calendar = [];
    for (var i = 0; i < 5; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

   public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);


  }

  public decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);


  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }


  public chooseDate(date) {
    this.onAddEvent.emit(date);
  }


}
