import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, mergeMap, catchError, switchMap, concatMap } from 'rxjs/operators';

import { ApiService } from '@app/services/api.service';

import {
  signIn,
  signInFail,
  signInOk,
  signOut,
  reset,
} from '@app/store/actions/auth.actions';
import { apiCall } from '@app/store/actions/api.actions';

import { add as addMessage } from '@app/store/actions/message.actions';

@Injectable()
export class AuthEffects {
  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signIn),
      map(action => action.payload),
      map(payload => apiCall({
        request: {
          method: 'post',
          url: 'http://localhost:5000/login',
          payload: {
            username: payload.username,
            password: payload.password,
          },
        },
        okActioners: (response) => ([
          signInOk({
            ...payload,
            token: response.body.access_token,
          }),
          addMessage({
            message: `Successfully logged in ${payload.username}`,
            snackBar: true,
          }),
        ]),
        failActioners: (response, err) => ([signInFail(err)]),
      })),
    );
  });

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router,
  ) {}
}
