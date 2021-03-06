import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, mergeMap, catchError, switchMap, concatMap } from 'rxjs/operators';

import { ApiService } from '@app/services/api.service';
import { add as addMessage } from '@app/store/actions/message.actions';

import {
  apiCall,
  apiCallStart,
  apiCallOk,
  apiCallFail,
} from '@app/store/actions/api.actions';

@Injectable()
export class ApiEffects {
  apiCall$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiCall),
      map(action => action.payload),
      switchMap(payload => ([
        apiCallStart(payload),
        addMessage({
          message: 'Submitting Request',
          consoleData: payload.request
        }),
      ])),
    );
  });

  apiCallStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiCallStart),
      map(action => action.payload),
      mergeMap(payload =>
        this.apiService.submitRequest(payload.request).pipe(
          map(resp => {
            return apiCallOk({ ...payload, response: resp });
          }),
          catchError(err => of(apiCallFail({ ...payload, response: err }))),
          ),
        ),
      );
  });

  apiCallOk$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiCallOk),
      map(action => action.payload),
      switchMap(payload => ([
        ...payload.okActioners(payload.response),
        addMessage({
          message: 'Received Success Response',
          consoleData: payload.response ,
        }),
      ])),
    );
  });

  apiCallFail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiCallFail),
      map(action => action.payload),
      switchMap(payload => ([
        ...payload.failActioners(payload.response, payload.response),
        addMessage({
          message: 'Received Fail Response',
          consoleData: payload.response ,
        }),
      ])),
    );
  });

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router,
  ) {}
}
