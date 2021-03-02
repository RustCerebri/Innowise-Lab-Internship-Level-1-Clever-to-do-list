import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {FbCreateResponse, Task } from './interfaces';
import {map} from 'rxjs/operators';

@Injectable ({providedIn: 'root'})

export class TaskService {
  constructor(private http: HttpClient) {}

  create(task: Task): Observable<Task> {
    return this.http.post(`${environment.fbDbUrl}/tasks.json`, task)
    .pipe(map((response: FbCreateResponse) => {
      return {
        ... task,
        id: response.name
      }
    }))
  }

  getAll(): Observable<Task[]> {
    return this.http.get(`${environment.fbDbUrl}/tasks.json`)
    .pipe(map((response: {[key: string]: any})=> {
      return Object
        .keys(response)
        .map(key => ({
          ...response[key],
          id: key
        }))
    }))
  }

  remove(id: string) {

  }

}