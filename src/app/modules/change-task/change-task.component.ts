import { Task, Params } from './../../shared/components/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from './../../shared/components/task-service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-change-task',
  templateUrl: './change-task.component.html',
  styleUrls: ['./change-task.component.scss']
})


export class ChangeTaskComponent implements OnInit, OnDestroy {

    form: FormGroup;
    task: Task;
    submitted = false;

    uSub: Subscription;

  constructor (
    private route: ActivatedRoute,
    private TaskService: TaskService) {}

  ngOnInit () : void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.TaskService.getById(params['id'])
        })
    ).subscribe((task: Task)=> {
      this.task = task;
      this.form = new FormGroup ( {
        title: new FormControl(task.title, Validators.required),
        description: new FormControl(task.description, Validators.required),
        date: new FormControl(task.date, Validators.required),
        time: new FormControl(task.time, Validators.required)
      })
    })
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    this.submitted = true;

    this.uSub = this.TaskService.update({
      ...this.task,
      title: this.form.value.title,
      description: this.form.value.description,
      date: this.form.value.date,
      time: this.form.value.time

    }).subscribe(()=> {
      this.submitted = false;
    })
  }

}
