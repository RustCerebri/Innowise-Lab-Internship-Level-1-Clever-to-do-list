import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'chunk'
})

export class ChunkPipe implements PipeTransform {

  transform(calendarDaysArray: any, chunkSize: number): any {
    let calendarDays = [];
    let weekDays = [];

    calendarDaysArray.map((day,index) => {
        weekDays.push(day);
        // здесь нам нужно использовать ++ перед переменной, иначе индекс увеличится
        // после сравнения, а нам нужно, чтобы это происходило ДО
        if (++index % chunkSize  === 0) {
          calendarDays.push(weekDays);
          weekDays = [];
        }
    });
    return calendarDays;
  }
}
