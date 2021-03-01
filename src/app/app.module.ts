import { SharedModule } from './shared/components/shared.module';
import { AuthService } from './shared/services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { MonthElComponent } from './modules/task-list/component/month-el/month-el.component';
import { CurrentTaskComponent } from './modules/task-list/component/current-task/current-task.component';
import { TaskListComponent } from './modules/task-list/task-list.component';
import { ChangeTaskComponent } from './modules/change-task/change-task.component';
import { AddNewTaskComponent } from './modules/add-new-task/add-new-task.component';
import { PageTitleComponent } from './shared/page-title/page-title.component';
import { AuthComponent } from './modules/auth/auth.component';
import { RegComponent } from './modules/reg/reg.component';
import { EnterComponent } from './modules/enter/enter.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WeekComponent } from './components/week/week.component';
import { HeaderComponent } from './shared/header/header.component';
import { ButtonComponent } from './shared/button/button.component';
import { ScrollBarComponent } from './modules/task-list/component/scroll-bar/scroll-bar.component';
import { DateElComponent } from './modules/task-list/component/date-el/date-el.component';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

var config = {
  apiKey: "AIzaSyC_XKJIZMz2TQq_wL2VB-WNQFofSmhT-jY",
  authDomain: "apptask-8b3d3.firebaseapp.com",
  databaseURL: "https://apptask-8b3d3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "apptask-8b3d3",
  storageBucket: "apptask-8b3d3.appspot.com",
  messagingSenderId: "774538452111",
}

@NgModule({
  declarations: [
    AppComponent,
    WeekComponent,
    HeaderComponent,
    EnterComponent,
    ButtonComponent,
    RegComponent,
    AuthComponent,
    PageTitleComponent,
    AddNewTaskComponent,
    ChangeTaskComponent,
    TaskListComponent,
    CurrentTaskComponent,
    ScrollBarComponent,
    DateElComponent,
    MonthElComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFireModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

