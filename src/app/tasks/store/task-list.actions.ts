import { Action } from '@ngrx/store';
import { Task } from '../task.model';
import { HttpClient } from '@angular/common/http';

export const ADD_TASK = 'ADD_TASK';
export const GET_TASKS_BEGIN = 'GET_TASKS_BEGIN';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';

export const GET_TASKS_FAILURE = 'GET_TASKS_FAILURE';


export class AddTask implements Action {
  readonly type = ADD_TASK;
 constructor (public payload: Task) {}
}

export class LoadDataBegin implements Action {
  readonly type = GET_TASKS_BEGIN;
  constructor(public payload: { data: any }) {}
}
export class LoadDataSuccess  implements Action {
  readonly type = GET_TASKS_SUCCESS;
  constructor(public payload: { data: any }) {}
}
export class LoadDataFailure  implements Action {
  readonly type = GET_TASKS_FAILURE;
  constructor(public payload: { data: any }) {}
}

export type ActionsUnion = AddTask | LoadDataBegin | LoadDataSuccess | LoadDataFailure;


