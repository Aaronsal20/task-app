import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs"

import * as DataActions from "./task-list.actions";
import { TasksService } from '../tasks.service';

@Injectable()
export class DataEffects {
  constructor(private actions: Actions, private taskService: TasksService) {}

  @Effect()
  loadData = this.actions.pipe(
    ofType(DataActions.GET_TASKS_BEGIN),
    switchMap(() => {
      return this.taskService.getTasks().pipe(
        map(data => new DataActions.LoadDataBegin({data})),
        catchError(error =>
          of(new DataActions.LoadDataFailure(error))
        )
      );
    })
  );
}
