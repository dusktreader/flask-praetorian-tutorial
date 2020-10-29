import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  endpoints: Array<IEndpoint>;
  nameParts$: Observable<any>;
  registerForm: FormGroup;

  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.nameParts$ = this.store.pipe(
      select(selectTokenData),
      filter(tokenData => !!tokenData),
      map(tokenData => ({
        fullname: `${tokenData.firstname} ${tokenData.surname}`,
        nickname: tokenData.nickname,
      })),
    );
    this.registerForm = this.formBuilder.group({
      presetSelector: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.endpoints = [
      {
        name: 'register',
        icon: 'assignment',
        label: 'Register',
        description: 'This endpoint may be used to register a new user',
      },
    ];
  }

  fire(endpointKey: string) {
    const endpointMap = {
      'register-register': 'http://localhost:5000/register',
    };
    this.store.dispatch(apiCall({
      request: {
        method: 'post',
        url: endpointMap[endpointKey],
        payload: this.registerForm.value,
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
