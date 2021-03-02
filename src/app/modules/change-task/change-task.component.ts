import { Task, Params } from './../../shared/components/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from './../../shared/components/task-service';
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';



@Component({
  selector: 'app-change-task',
  templateUrl: './change-task.component.html',
  styleUrls: ['./change-task.component.scss']
})


export class ChangeTaskComponent implements OnInit {

    form: FormGroup;

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
      this.form = new FormGroup ( {
        title: new FormControl(task.title, Validators.required),
        description: new FormControl(task.description, Validators.required)
      })
    })
  }
}
