import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FbCreateResponse, Task } from './interfaces';
import { map} from 'rxjs/operators';



@Injectable({ providedIn: 'root' })

export class TaskService {

  constructor(private http: HttpClient) { }

  public create(task: Task): Observable<Task> {
    return this.http.post(`${environment.fbDbUrl}/tasks.json`, task)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...task,
          id: response.name
        }
      }))
  }

  public getAll(uid): Observable<Task[]> {
    return this.http.get(`${environment.fbDbUrl}/tasks.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key
            }))
        }),
      map(data => data.filter(res => res.autorId === uid)))
  }

  public getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${environment.fbDbUrl}/tasks/${id}.json`)
      .pipe(map((task: Task) => {
        return {
          ...task, id
        }
      }))
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/tasks/${id}.json`);
  }

  public update(task: Task): Observable<Task> {
    return this.http.patch<Task>(`${environment.fbDbUrl}/tasks/${task.id}.json`, task);
  }

}
