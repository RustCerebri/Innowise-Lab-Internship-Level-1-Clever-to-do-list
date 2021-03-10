import { Task} from './../../shared/components/interfaces';
import { TaskService } from './../../shared/components/task-service';
import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import {format} from 'date-fns';



@Component({
selector: 'app-task-list',
templateUrl: './task-list.component.html',
styleUrls: ['./task-list.component.scss'],
})

export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  pTask: Subscription;
  dTask: Subscription;
  searchStr: Date;
  date: Date;


   constructor(private TaskService: TaskService) {}

  ngOnInit () : void {
      this. pTask = this.TaskService.getAll().subscribe(tasks => {
        this.tasks = tasks;
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

  getCurrentDate(date) {
    this.tasks = this.tasks.filter(item => format(date.date, "yyyy-MM-dd")===item.date);
    console.log((this.tasks));



  }

}



