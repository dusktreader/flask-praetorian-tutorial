import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IEndpoint } from '@app/models/endpoint.model';
import { apiCall } from '@app/store/actions/api.actions';
import { add as addMessage } from '@app/store/actions/message.actions';
import { IAppState } from '@app/store/states/app.state';
import {
  endpointIndicatorSuccess,
  endpointIndicatorFail
} from '@app/store/actions/endpoint-indicator.actions';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
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
        name: 'protected-admin',
        icon: 'security',
        label: 'Protected (Admin Required)',
        description: 'This endpoint may only be accessed by users with the "admin" role',
      },
      {
        name: 'proteted-operator',
        icon: 'touch_app',
        label: 'Protected (Operator Accepted)',
        description: 'This endpoint may be accessed by any user with the "operator" role',
      },
    ];
  }

  fire(endpointKey: string) {
    const endpointMap = {
      'roles-protected': 'http://localhost:5000/protected',
      'roles-protected-admin': 'http://localhost:5000/protected_admin_required',
      'roles-protected-operator': 'http://localhost:5000/protected_operator_accepted',
    };
    this.store.dispatch(apiCall({
      request: {
        method: 'get',
        url: endpointMap[endpointKey],
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
        }),
        endpointIndicatorFail({ endpointKey }),
      ]),
    }));
  }
}
