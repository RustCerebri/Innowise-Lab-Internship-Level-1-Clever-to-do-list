import { TaskService } from './../../shared/components/task-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Task } from './../../shared/components/interfaces';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.scss']
})


export class AddNewTaskComponent implements OnInit {

  public form: FormGroup;
  public title: FormControl;
  public description: FormControl;
  public date: FormControl;
  public time: FormControl;

  public userID: string;


  constructor(private taskService: TaskService, private fireAuth: AngularFireAuth) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required)
    })
    this.getUserID();

  }

  private getUserID() {
    this.fireAuth.currentUser
    .then(res =>(this.userID = res.uid))
  }


  public submit() {

    if (this.form.invalid) {
      return
    }
    const task: Task = {
      title: this.form.value.title,
      description: this.form.value.description,
      date: this.form.value.date,
      time: this.form.value.time,
      autorId: this.userID
    }

    this.taskService.create(task).subscribe(() => {
      this.form.reset()
    })
  }

}
