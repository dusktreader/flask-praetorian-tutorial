import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, mergeMap, catchError, switchMap, concatMap } from 'rxjs/operators';

import { ApiService } from '@app/services/api.service';

import { fetch, fetchOk } from '@app/store/actions/preset-user.actions';
import { apiCall } from '@app/store/actions/api.actions';

import { add as addMessage } from '@app/store/actions/message.actions';

@Injectable()
export class PresetUserEffects {

  fetch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetch),
      map(() => apiCall({
        request: {
          method: 'get',
          url: 'http://localhost:5000/get_preset_users',
        },
        okActioners: (response) => ([
          fetchOk(response.body.preset_users.map(apiUser => ({
            username: apiUser.username,
            password: apiUser.password,
            roles: apiUser.roles.split(','),
          }))),
          addMessage({
            message: 'Successfully loaded preset users',
            snackBar: true,
          }),
        ]),
        failActioners: (response, err) => ([]),
      })),
    );
  });

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router,
  ) {}
}
