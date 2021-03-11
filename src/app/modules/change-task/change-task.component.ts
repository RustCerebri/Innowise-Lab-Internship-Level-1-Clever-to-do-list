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

    public form: FormGroup;
    public task: Task;
    public submitted = false;

    public uSub: Subscription;

    public title: FormControl;
    public description: FormControl;
    public time: FormControl;
    public date: FormControl;

  constructor (
    private route: ActivatedRoute,
    private TaskService: TaskService) {}

  ngOnInit () : void {
    this.initFormFields();
    this.form = this.createForm();

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.TaskService.getById(params['id'])
        })
    ).subscribe((task: Task)=> {
      this.task = task;
      this.fillFormControls(task);
    })
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  public submit(): void {
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

  private initFormFields(): void {
    this.title = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.date = new FormControl('', Validators.required);
    this.time = new FormControl('', Validators.required);
  }

  private createForm(): FormGroup {
    const form = new FormGroup({
      title: this.title,
      description: this.description,
      date: this.date,
      time: this.time
    });

    return form;
  }

  private fillFormControls(task: Task): void {
    this.title.setValue(task.title);
    this.description.setValue(task.description);
    this.time.setValue(task.time);
    this.date.setValue(task.date);
  }

}
