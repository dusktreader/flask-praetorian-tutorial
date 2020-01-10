import { Component, OnInit , ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatExpansionPanel } from '@angular/material';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { humanizeDuration } from 'humanize-duration';

import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/states/app.state';
import { add as addMessage } from '@app/store/actions/message.actions';
import { signIn, signOut } from '@app/store/actions/auth.actions';
import { selectToken, selectUsername } from '@app/store/selectors/auth.selector';

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
  @ViewChild('panel', {static: false}) Panel: MatExpansionPanel;
  token$: Observable<string>;
  titleString$: Observable<string>;
  username$: Observable<string>;
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
    this.token$ = this.store.pipe(select(selectToken));
    this.token$.pipe(
      filter(token => !!token && !!this.Panel),
    ).subscribe(token => {
      this.Panel.close();
    });
    this.username$ = this.store.pipe(select(selectUsername));
    this.titleString$ = this.username$.pipe(
      map( username => username ? `Signed in as ${username}` : 'Sign In'),
    );
  }

  login() {
    const { username, password } = this.loginForm.value;
    this.store.dispatch(addMessage({
      message: `Attempting to login with ${username}:${password}`,
    }));

    this.store.dispatch(signIn({ username, password }));
  }

  logout() {
    this.store.dispatch(addMessage({
      message: 'Logging Out',
    }));

    this.store.dispatch(signOut());
    this.loginForm.setValue(
      {
        presetSelector: '',
        username: '',
        password: '',
      },
      { emitEvent: false }
    );
    this.Panel.close();
  }
}
