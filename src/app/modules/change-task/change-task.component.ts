import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-task',
  templateUrl: './change-task.component.html',
  styleUrls: ['./change-task.component.scss']
})


export class ChangeTaskComponent implements OnInit {
  constructor (private activatedRoute: ActivatedRoute) {}
  ngOnInit () : void {
    const taskId = this.activatedRoute.snapshot.params.id;
    console.log(taskId);


  }
}
