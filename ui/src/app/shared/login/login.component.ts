import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { UsersService, User } from '../../users.service';
import { BackendService, Request } from '../../backend.service';
import { MessagesService } from '../../messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private backendService: BackendService,
    private messagesService: MessagesService,
    private formBuilder: FormBuilder,
  ) {}

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
    this.usersService.selectedUser.subscribe(user =>
      this.loginForm.patchValue({
        username: user.username,
        password: user.password,
      }),
    );
  }

  login() {
    const loginValues = this.loginForm.value;
    this.messagesService.add(
      `Attempting to login with ${loginValues.username}:${loginValues.password}`,
    );
    const request = {
      method: 'post',
      url: 'http://localhost:5010/login',
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
}
