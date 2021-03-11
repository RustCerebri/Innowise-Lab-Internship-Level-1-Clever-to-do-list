import { AuthService } from './../../shared/services/auth.service';
import { take } from 'rxjs/operators';
import { Task} from './../../shared/components/interfaces';
import { TaskService } from './../../shared/components/task-service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import {format} from 'date-fns';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
selector: 'app-task-list',
templateUrl: './task-list.component.html',
styleUrls: ['./task-list.component.scss'],
})

export class TaskListComponent implements OnInit, OnDestroy {

  public filteredTasks: Task[] = [];
  public searchStr: Date;
  public date: Date;

  private allTasks: Task[] = [];



  constructor(private taskService: TaskService, private fireAuth: AngularFireAuth, private authService: AuthService, private router: Router) {}

  ngOnInit () : void {
    this.fireAuth.user.subscribe(res => {
      if (res) {
        this.taskService.getAll(res.uid)
          .pipe(
            take(1),
           )
          .subscribe(tasks => {
            this.allTasks = tasks;
            const currentDate: Date = new Date();
            this.getCurrentDate(currentDate);
          });
      }
    });

  }


  public remove (id: string): void {
    this.taskService.remove(id).pipe(take(1)).subscribe(()=>{
      this.allTasks = this.allTasks.filter(post => post.id !== id)
    })
  }

  ngOnDestroy() : void {

  }

  public getCurrentDate(date): void {
    this.filteredTasks = this.allTasks.filter(item => format(date, "yyyy-MM-dd")===item.date);

  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/enter']);
  }

}



