import { ChunkPipe } from './modules/task-list/component/calendar/format.pipe';
import { CalendarComponent } from './modules/task-list/component/calendar/calendar.component';
import { SearchPipe } from './shared/services/search.pipe';
import { AuthInterceptor } from './shared/auth.interceptor';
import { SharedModule } from './shared/components/shared.module';
import { AuthService } from './shared/services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { TaskListComponent } from './modules/task-list/task-list.component';
import { ChangeTaskComponent } from './modules/change-task/change-task.component';
import { AddNewTaskComponent } from './modules/add-new-task/add-new-task.component';
import { PageTitleComponent } from './shared/page-title/page-title.component';
import { AuthComponent } from './modules/auth/auth.component';
import { RegComponent } from './modules/reg/reg.component';
import { EnterComponent } from './modules/enter/enter.component';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WeekComponent } from './components/week/week.component';
import { HeaderComponent } from './shared/header/header.component';
import { ButtonComponent } from './shared/button/button.component';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

var config = {
  apiKey: "AIzaSyC_XKJIZMz2TQq_wL2VB-WNQFofSmhT-jY",
  authDomain: "apptask-8b3d3.firebaseapp.com",
  databaseURL: "https://apptask-8b3d3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "apptask-8b3d3",
  storageBucket: "apptask-8b3d3.appspot.com",
  messagingSenderId: "774538452111",
};

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
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
    SearchPipe,
    CalendarComponent,
    ChunkPipe
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
  providers: [AuthService, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }

