import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { IEndpoint } from '@app/models/endpoint.model';
import { apiCall } from '@app/store/actions/api.actions';
import { add as addMessage } from '@app/store/actions/message.actions';
import { IAppState } from '@app/store/states/app.state';
import { selectTokenData } from '@app/store/selectors/auth.selector';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss'],
})
export class RegisterConfirmComponent implements OnInit {
  endpoints: Array<IEndpoint>;
  currentToken: string;

  constructor(
    private store: Store<IAppState>,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.currentToken = this.activatedRoute.snapshot.queryParams.token;

    this.endpoints = [
      {
        name: 'confirm',
        icon: 'check_circle',
        label: 'Confirm',
        description: 'This endpoint may be used to confirm registration',
      },
    ];
  }

  fire(endpointKey: string) {
    const endpointMap = {
      'confirm-confirm': 'http://localhost:5000/finalize',
    };

    this.store.dispatch(apiCall({
      request: {
        method: 'get',
        url: endpointMap[endpointKey],
        header: { Authorization: `Bearer ${this.currentToken}` },
      },
      okActioners: (response) => ([
        addMessage({
          message: `Successfully finalized registration`,
          snackBar: true,
        }),
      ]),
      failActioners: (response, err) => ([
        addMessage({
          message: `Failed to finalize registration`,
          snackBar: true,
          consoleData: err,
        }),
      ]),
    }));
  }
}
