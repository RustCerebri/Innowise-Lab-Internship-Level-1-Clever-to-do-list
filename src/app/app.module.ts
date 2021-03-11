import { ChunkPipe } from './modules/task-list/component/calendar/format.pipe';
import { CalendarComponent } from './modules/task-list/component/calendar/calendar.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { SharedModule } from './shared/components/shared.module';
import { AuthService } from './shared/services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { TaskListComponent } from './modules/task-list/task-list.component';
import { ChangeTaskComponent } from './modules/change-task/change-task.component';
import { AddNewTaskComponent } from './modules/add-new-task/add-new-task.component';
import { AuthComponent } from './modules/auth/auth.component';
import { RegComponent } from './modules/reg/reg.component';
import { EnterComponent } from './modules/enter/enter.component';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DayComponent } from './modules/task-list/component/day/day.component';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FB_CONFIG } from './fb.config';



const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EnterComponent,
    RegComponent,
    AuthComponent,
    AddNewTaskComponent,
    ChangeTaskComponent,
    TaskListComponent,
    CalendarComponent,
    ChunkPipe,
    DayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FB_CONFIG),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [AuthService, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }

