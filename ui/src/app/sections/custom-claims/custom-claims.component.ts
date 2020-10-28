import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { IEndpoint } from '@app/models/endpoint.model';
import { apiCall } from '@app/store/actions/api.actions';
import { add as addMessage } from '@app/store/actions/message.actions';
import { IAppState } from '@app/store/states/app.state';
import { selectTokenData } from '@app/store/selectors/auth.selector';
import {
  endpointIndicatorSuccess,
  endpointIndicatorFail
} from '@app/store/actions/endpoint-indicator.actions';

@Component({
  selector: 'app-custom-claims',
  templateUrl: './custom-claims.component.html',
  styleUrls: ['./custom-claims.component.scss'],
})
export class CustomClaimsComponent implements OnInit {
  endpoints: Array<IEndpoint>;
  fullName$: Observable<string>;
  nickName$: Observable<string>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.fullName$ = this.store.pipe(
      select(selectTokenData),
      filter(tokenData => !!tokenData),
      map(tokenData => `${tokenData.firstname}${tokenData.surname}`),
    );
    this.nickName$ = this.store.pipe(
      select(selectTokenData),
      filter(tokenData => !!tokenData),
      map(tokenData => tokenData.nickname),
    );
    this.endpoints = [
      {
        name: 'protected',
        icon: 'lock',
        label: 'Protected',
        description: 'This endpoint may be accessed by any user that is logged in',
      },
    ];
  }

  fire(endpointKey: string) {
    const endpointMap = {
      'custom-claims-protected': 'http://localhost:5000/protected',
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
          consoleData: err,
        }),
        endpointIndicatorFail({ endpointKey }),
      ]),
    }));
  }
}
