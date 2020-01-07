import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { humanizeDuration } from 'humanize-duration';

import { Store } from '@ngrx/store';
import { IAppState } from '@app/store/states/app.state';
import { add as addMessage } from '@app/store/actions/message.actions';
import { apiCall } from '@app/store/actions/api.actions';

import { Request } from '@app/models/request.model';

export interface PresetLogin {
  username: string;
  password: string;
  comment: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  presetLogins: Array<PresetLogin> = [
    {
      username: 'TheDude',
      password: 'abides',
      comment: 'basic user',
    },
    {
      username: 'Walter',
      password: 'calmerthanyouare',
      comment: 'admin user',
    },
    {
      username: 'Donnie',
      password: 'iamthewalrus',
      comment: 'operator user',
    },
    {
      username: 'Maude',
      password: 'andthorough',
      comment: 'admin user',
    },
  ];
  loginForm: FormGroup;

  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
  ) {}


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      presetSelector: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loginForm.get('presetSelector').valueChanges.subscribe(
      presetValue => this.loginForm.patchValue({
        username: presetValue.username,
        password: presetValue.password,
      })
    );
  }

  login() {
    const { username, password } = this.loginForm.value;
    this.store.dispatch(addMessage({
      message: `Attempting to login with ${username}:${password}`,
    }));

    this.store.dispatch(apiCall({
      request: {
        method: 'post',
        url: 'http://localhost:5000/login',
        payload: { username, password },
      },
      okActioner: (response) => addMessage({
        message: 'Completed login circuit?',
      }),
      failActioner: (response, err) => addMessage({
        message: `Login blowed up: ${err}`,
      }),
    }));
  }
}
