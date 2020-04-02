import { Task } from './task.model';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { environment } from '../../environments/environment'

const BACKEND_URL =  environment.apiUrl + '/api/posts';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = [];
  private postsUpdated = new Subject<{tasks:Task[]}>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getTasks() {
    this.httpClient.get<{message: string, tasks: any}>(
     BACKEND_URL).pipe(
        map((taskData) => {
        return { tasks: taskData.tasks.map(task => {
          return {
            title: task.title,
            description: task.description,
            id: task._id,
            date: moment(task.date).format('LLLL'),
            priority: task.priority
          };
        })
      };
      }))
    .subscribe((transformedTaskData) => {
      this.tasks = transformedTaskData.tasks;
      this.postsUpdated.next({tasks: [...this.tasks]
      });
    });
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  getTask(id: string) {
    return this.httpClient.get<{_id: string; title: string; description: string, date: string, priority: string }>('http://localhost:3000/api/posts/' + id);
  }

  addTask(task: Task) {
    this.httpClient.post<{message: string, task: Task}>(BACKEND_URL, task)
    .subscribe((responseData) => {
      this.router.navigate(['/']);
    });

  }

  updateTask(task) {
    this.httpClient
    .put(BACKEND_URL + '/' + task.id, task)
    .subscribe(response => {
    this.router.navigate(['/']);
    });
  }

  deleteTask(postId: string) {
    return this.httpClient.delete(BACKEND_URL + '/' + postId);
  }


}
