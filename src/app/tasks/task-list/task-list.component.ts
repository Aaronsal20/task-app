import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Task } from '../task.model';

import { Subscription } from 'rxjs';
import { TasksService } from '../tasks.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  totalPosts = 10;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  isLoading = false;
  userId: string;
  private postSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public postsService: TasksService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getTasks();
    this.postSub = this.postsService.getPostUpdatedListener()
    .subscribe((taskData: {tasks: Task[]}) => {
      this.isLoading = false;
      this.tasks = taskData.tasks;
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postsService.deleteTask(id).subscribe(() => {
      this.postsService.getTasks();
    }), () => {
      this.isLoading = false;
    };
  }

}
