import { AuthService } from './../../shared/services/auth.service';
import { take, tap } from 'rxjs/operators';
import { Task} from './../../shared/components/interfaces';
import { TaskService } from './../../shared/components/task-service';
import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import {format} from 'date-fns';
import { AngularFireAuth } from '@angular/fire/auth';




@Component({
selector: 'app-task-list',
templateUrl: './task-list.component.html',
styleUrls: ['./task-list.component.scss'],
})

export class TaskListComponent implements OnInit, OnDestroy {

  private allTasks: Task[] = [];
  public filteredTasks: Task[] = [];
  searchStr: Date;
  date: Date;


   constructor(private taskService: TaskService, private fireAuth: AngularFireAuth) {}

  ngOnInit () : void {
    this.fireAuth.user.subscribe(res => {
      this.taskService.getAll(res.uid).pipe(take(1), tap(res=> console.log(res)
      )).subscribe(tasks => this.allTasks = tasks);
    });

  }


  remove (id: string) {
    this.taskService.remove(id).pipe(take(1)).subscribe(()=>{
      this.allTasks = this.allTasks.filter(post => post.id !== id)
    })
  }

  ngOnDestroy() : void {

  }

  getCurrentDate(date) {
    this.filteredTasks = this.allTasks.filter(item => format(date.date, "yyyy-MM-dd")===item.date);
  }

}



