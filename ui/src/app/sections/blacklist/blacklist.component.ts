import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IEndpoint } from '@app/models/endpoint.model';
import { apiCall } from '@app/store/actions/api.actions';
import { add as addMessage } from '@app/store/actions/message.actions';
import { refresh } from '@app/store/actions/auth.actions';
import { selectUsername, selectToken } from '@app/store/selectors/auth.selector';
import { IAppState } from '@app/store/states/app.state';
import {
  endpointIndicatorSuccess,
  endpointIndicatorFail
} from '@app/store/actions/endpoint-indicator.actions';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss'],
})
export class BlacklistComponent implements OnInit {
  endpoints: Array<IEndpoint>;
  currentUsername: string;
  currentToken: string;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.pipe(select(selectUsername)).subscribe(username => this.currentUsername = username);
    this.store.pipe(select(selectToken)).subscribe(token => this.currentToken = token);
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
      {
        name: 'disable',
        icon: 'no_meeting_room',
        label: 'Disable User',
        description: 'This endpoint may be used to disable access for a user',
      },
      {
        name: 'blacklist',
        icon: 'cancel',
        label: 'Blacklist',
        description: 'This endpoint may be used to blacklist a non access-expired token',
      },
    ];
  }

  fire(endpointKey: string) {
    if (endpointKey === 'blacklist-protected') {
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
    } else if (endpointKey === 'blacklist-refresh') {
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
    } else if (endpointKey === 'blacklist-disable') {
      this.store.dispatch(apiCall({
        request: {
          method: 'post',
          url: 'http://localhost:5000/disable_user',
          payload: {
            username: this.currentUsername,
          },
        },
        okActioners: (response) => ([
          endpointIndicatorSuccess({ endpointKey }),
          addMessage({
            message: `Successfully disabled user`,
            snackBar: true,
          }),
        ]),
        failActioners: (response, err) => ([
          addMessage({
            message: `Failed to disable user`,
            snackBar: true,
            consoleData: err,
          }),
          endpointIndicatorFail({ endpointKey }),
        ]),
      }));
    } else if (endpointKey === 'blacklist-blacklist') {
      this.store.dispatch(apiCall({
        request: {
          method: 'post',
          url: 'http://localhost:5000/blacklist_token',
          payload: {
            token: this.currentToken,
          },
        },
        okActioners: (response) => ([
          endpointIndicatorSuccess({ endpointKey }),
          addMessage({
            message: `Successfully blacklisted user`,
            snackBar: true,
          }),
        ]),
        failActioners: (response, err) => ([
          addMessage({
            message: `Failed to blacklist user`,
            snackBar: true,
            consoleData: err,
          }),
          endpointIndicatorFail({ endpointKey }),
        ]),
      }));
    }
  }
}
