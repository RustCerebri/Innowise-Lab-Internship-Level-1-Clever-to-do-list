import { Component, OnInit, Output, Pipe, PipeTransform, EventEmitter } from '@angular/core';




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
    this.isPastDate = d.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    console.log(this.date);

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


  @Output() public onAddEvent = new EventEmitter();

  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


  public displayMonth: string;
  public displayDay: string;
  private dayIndex: number = 0;
  private date: Date = new Date;
  private currentDate: number = 0;



  ngOnInit(): void {
    this.currentDate = this.date.getDate();
    this.generateCalendarDays(this.dayIndex);
    // console.log(this.monthIndex);


  }

  private generateCalendarDays(dayIndex: number): void {
    this.calendar = [];

    let day: Date = new Date(new Date().setDate(new Date().getDate() +dayIndex ));
    this.displayMonth = this.monthNames[day.getMonth()];
    this.displayDay = this.dayNames[day.getUTCDay()];
    let dateToAdd = day;
    this.calendar = [];
    console.log(this.calendar);

    for (var i = 0; i < 6; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() +1));
    }
  }

   public increaseMonth() {
      this.dayIndex++;
      this.generateCalendarDays(this.dayIndex);
    }




  public decreaseMonth() {
    this.dayIndex--
    this.generateCalendarDays(this.dayIndex);
  }

  public setCurrentMonth() {
    this.dayIndex = 0;
    this.generateCalendarDays(this.dayIndex);
  }

  public chooseDate(date) {
    this.onAddEvent.next(date);
    console.log(date);
  }


}
