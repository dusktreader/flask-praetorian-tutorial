import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { humanizeDuration } from 'humanize-duration';

import { Store } from '@ngrx/store';
import { IAppState } from '@app/store/states/app.state';

import { BackendService, Request } from '../../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
  ) {}

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
    // this.usersService.selectedUser.subscribe(user =>
    //   this.loginForm.patchValue({
    //     username: user.username,
    //     password: user.password,
    //   }),
    // );
  }

  login() {
    const loginValues = this.loginForm.value;
    this.store.dispatch(
    this.messagesService.add(
      `Attempting to login with ${loginValues.username}:${loginValues.password}`,
    );
    const request = {
      method: 'post',
      url: 'http://localhost:5000/login',
      payload: {
        username: loginValues.username,
        password: loginValues.password,
      },
    };

    this.backendService.submitRequest(request).subscribe(response => {
      if (response) {
        this.messagesService.add(
          `Successfully logged in ${this.loginForm.value.username}!`,
          true,
        );
        this.usersService.setToken(response.body.access_token);
      }
    });
  }

  accessLabel(value: number | null) {
    if (!value) {
      value = 10;
    }
    return humanizeDuration(value * 1000);
  }
}
