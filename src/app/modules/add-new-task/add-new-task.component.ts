import { TaskService } from './../../shared/components/task-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import { Task } from './../../shared/components/interfaces';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.scss']
})


export class AddNewTaskComponent implements OnInit {

  form: FormGroup;
  title: FormControl;
  description: FormControl;
  date: FormControl;
  time: FormControl;


  constructor (private TaskService: TaskService) {}
  ngOnInit () : void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required)
    })
  }

  submit () {
    if (this.form.invalid) {
      return
    }
    const task: Task = {
      title: this.form.value.title,
      description: this.form.value.description,
      date: this.form.value.date,
      time: this.form.value.time
    }

    this.TaskService.create(task).subscribe(() => {
      this.form.reset()
    })
  }

}
