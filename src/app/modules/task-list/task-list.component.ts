
import { Task, CalDate} from './../../shared/components/interfaces';
import { TaskService } from './../../shared/components/task-service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';




@Component({
selector: 'app-task-list',
templateUrl: './task-list.component.html',
styleUrls: ['./task-list.component.scss'],
})

export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  pTask: Subscription;
  dTask: Subscription;
  searchStr = '';


  calDates: CalDate[] = [{
    currentDate: new Date (),
    month: new Date (0, 0, 0, 0),
    day: 'wed',
    week: 'sex'
  }];

  dayInMontArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  dayArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];





  constructor(private TaskService: TaskService) {}

  ngOnInit () : void {
      this. pTask = this.TaskService.getAll().subscribe(tasks => {
        this.tasks = tasks
      })
  }


  remove (id: string) {
    this.dTask = this.TaskService.remove(id).subscribe(()=>{
      this.tasks = this.tasks.filter(post => post.id !== id)
    })
  }

  ngOnDestroy() : void {
    if (this.pTask) {
      this.pTask.unsubscribe()
    }
    if (this.dTask) {
      this.dTask.unsubscribe()
    }
  }

}



