import { Action } from '@ngrx/store';

import * as TaskListActions from './task-list.actions';

const initialState = {
  tasks: [

  ]
};

export function taskListReducer(state = initialState, action: TaskListActions.ActionsUnion) {
  switch (action.type) {
    case TaskListActions.ADD_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    }
    case TaskListActions.GET_TASKS_BEGIN: {
      console.log(action.payload);
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    }
    default:
      return state;
  }
}
