import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from '@app/services/api.service';

import { add, IAdd } from '@app/store/actions/message.actions';

@Injectable()
export class MessageEffects {
  add$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(add),
        tap(action => {
          if (action.payload.snackBar) {
            this.snackBar.open(action.payload.message, 'x', { duration: 3000 });
          }
          console.log(action.payload.message);
          if (action.payload.consoleData) {
            console.log('Additional data: ', action.payload.consoleData);
          }
        }),
      );
    },
    { dispatch: false },
  );

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}
}
