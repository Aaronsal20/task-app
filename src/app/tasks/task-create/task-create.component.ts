import { Component, OnInit, } from '@angular/core';
import { Task } from '../task.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: [ './task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private taskId: string;
  public task: Task;
  public isLoading = false;
  form: FormGroup;
  selectedValue: any;


  priorityTypes = [
    {value: 'Low', viewValue: 'Low'},
    {value: 'Medium', viewValue: 'Medium'},
    {value: 'High', viewValue: 'High'}
  ];

  constructor(public tasksService: TasksService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)]
      }),
      'description': new FormControl(null, { validators: [Validators.required] }),
      'date': new FormControl(null),
      'priority' : new FormControl({value: 0}),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.taskId = paramMap.get('id');
        this.isLoading = true;
        this.tasksService.getTask(this.taskId).subscribe(taskData => {
          this.isLoading = false;
          this.task = {
            id: taskData._id,
            title: taskData.title,
            description: taskData.description,
            date: taskData.date,
            priority: taskData.priority
          };
          this.form.setValue({title: this.task.title,
            description: this.task.description,
            date: this.task.date,
            priority: this.task.priority
          });
          this.selectedValue = this.task.priority;
        });
      } else {
        this.mode = 'create';
        this.taskId = null;
      }
    });
  }

  onAddTask() {
    const task: Task = {
      id: null,
      title: this.form.value.title,
    description: this.form.value.description,
    date: this.form.value.date,
    priority: this.form.value.priority
    };
    console.log("TaskCreateComponent -> onAddTask -> task", task);
    this.isLoading = true;
    if (this.mode === 'create') {

    this.tasksService.addTask(task);
  } else {
    const task2: Task = {
      id: this.taskId,
      title: this.form.value.title,
    description: this.form.value.description,
    date: this.form.value.date,
    priority: this.form.value.priority
    };
    this.tasksService.updateTask(task2);
  }
    this.form.reset();
  }

}
