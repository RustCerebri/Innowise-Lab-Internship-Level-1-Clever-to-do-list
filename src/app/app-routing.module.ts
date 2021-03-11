import { NgModule } from '@angular/core';
import { ChangeTaskComponent } from './modules/change-task/change-task.component';
import { AddNewTaskComponent } from './modules/add-new-task/add-new-task.component';
import { AuthComponent } from './modules/auth/auth.component';
import { RegComponent } from './modules/reg/reg.component';
import { TaskListComponent } from './modules/task-list/task-list.component';
import { EnterComponent } from './modules/enter/enter.component';
import { RouterModule } from "@angular/router";

@NgModule ({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'enter',
        pathMatch: 'full',
      },
      {
        path: 'enter',
        component: EnterComponent
      },
      {
        path: 'registration',
        component: RegComponent
      },
      {
        path: 'authentication',
        component: AuthComponent
      },
      {
        path: 'task-list',
        component: TaskListComponent
      },
      {
        path: 'add-new-task',
        component: AddNewTaskComponent
      },
      {
        path: 'change-task/:id',
        component: ChangeTaskComponent
      }
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {};
