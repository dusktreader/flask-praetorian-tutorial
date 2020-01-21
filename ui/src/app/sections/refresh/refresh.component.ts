import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IEndpoint } from '@app/models/endpoint.model';
import { apiCall } from '@app/store/actions/api.actions';
import { add as addMessage } from '@app/store/actions/message.actions';
import { refresh } from '@app/store/actions/auth.actions';
import { IAppState } from '@app/store/states/app.state';
import {
  endpointIndicatorSuccess,
  endpointIndicatorFail
} from '@app/store/actions/endpoint-indicator.actions';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss'],
})
export class RefreshComponent implements OnInit {
  endpoints: Array<IEndpoint>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.endpoints = [
      {
        name: 'protected',
        icon: 'lock',
        label: 'Protected',
        description: 'This endpoint may be accessed by any user that is logged in',
      },
      {
        name: 'refresh',
        icon: 'refresh',
        label: 'Refresh',
        description: 'This endpoint may be used to request a refreshed token',
      },
    ];
  }

  fire(endpointKey: string) {
    if (endpointKey === 'refresh-protected') {
      this.store.dispatch(apiCall({
        request: {
          method: 'get',
          url: 'http://localhost:5000/protected',
        },
        okActioners: (response) => ([
          endpointIndicatorSuccess({ endpointKey }),
          addMessage({
            message: `Successfully accessed protected route`,
            snackBar: true,
          }),
        ]),
        failActioners: (response, err) => ([
          addMessage({
            message: `Failed to access protected route`,
            snackBar: true,
            consoleData: err,
          }),
          endpointIndicatorFail({ endpointKey }),
        ]),
      }));
    } else if (endpointKey === 'refresh-refresh') {
      this.store.dispatch(apiCall({
        request: {
          method: 'get',
          url: 'http://localhost:5000/refresh',
        },
        okActioners: (response) => ([
          endpointIndicatorSuccess({ endpointKey }),
          addMessage({
            message: `Successfully refreshed token`,
            snackBar: true,
          }),
          refresh({
            token: response.body.access_token,
          }),
        ]),
        failActioners: (response, err) => ([
          addMessage({
            message: `Failed to refresh token`,
            snackBar: true,
            consoleData: err,
          }),
          endpointIndicatorFail({ endpointKey }),
        ]),
      }));
    }
  }
}
