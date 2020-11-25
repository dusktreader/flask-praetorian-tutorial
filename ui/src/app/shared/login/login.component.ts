import { Component, OnInit , ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatExpansionPanel } from '@angular/material';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { Store, select } from '@ngrx/store';

import { IAppState } from '@app/store/states/app.state';
import { add as addMessage } from '@app/store/actions/message.actions';
import { signIn, signOut } from '@app/store/actions/auth.actions';
import { selectToken, selectUserDisplay } from '@app/store/selectors/auth.selector';
import {
  selectAccessRemaining,
  selectAccessRemainingPct,
  selectAccessRemainingHuman,
} from '@app/store/selectors/timer.selector';
import {
  selectRefreshRemaining,
  selectRefreshRemainingPct,
  selectRefreshRemainingHuman,
} from '@app/store/selectors/timer.selector';
import { selectPresetUsers } from '@app/store/selectors/preset-user.selector';
import { fetch as fetchPresetUsers } from '@app/store/actions/preset-user.actions';

import { Request } from '@app/models/request.model';
import { PresetUser } from '@app/models/preset-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('panel', {static: false}) Panel: MatExpansionPanel;
  token$: Observable<string>;
  titleString$: Observable<string>;
  userString$: Observable<string>;

  accessRemains$: Observable<number>;
  accessRemainsHuman$: Observable<string>;
  accessRemainsPct$: Observable<number>;

  refreshRemainsHuman$: Observable<string>;
  refreshRemainsPct$: Observable<number>;

  presetUsers$: Observable<Array<PresetUser>>;
  loginForm: FormGroup;

  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
  ) {}


  ngOnInit() {
    this.store.dispatch(fetchPresetUsers());
    this.presetUsers$ = this.store.pipe(
      select(selectPresetUsers),
      filter(users => !!users),
    );
    this.loginForm = this.formBuilder.group({
      presetSelector: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loginForm.get('presetSelector').valueChanges.subscribe(
      presetValue => {
        if (!presetValue) {
          this.loginForm.patchValue(
            {
              username: '',
              password: '',
            },
            { emitEvent: false },
          );
        } else {
          this.loginForm.patchValue(
            {
              username: presetValue.username,
              password: presetValue.password,
            },
            { emitEvent: false },
          );
        }
      },
    );
    this.loginForm.get('username').valueChanges.pipe(
      filter(username => !!username),
    ).subscribe(
      _ => this.loginForm.patchValue(
        { presetSelector: '' },
        { emitEvent: false },
      )
    );
    this.token$ = this.store.pipe(select(selectToken));
    this.token$.pipe(
      filter(token => !!token && !!this.Panel),
    ).subscribe(token => {
      this.Panel.close();
    });
    this.userString$ = this.store.pipe(select(selectUserDisplay));
    this.titleString$ = this.userString$.pipe(
      map( userString => userString ? `Signed in as ${userString}` : 'Not Signed In'),
    );

    this.accessRemains$ = this.store.pipe(select(selectAccessRemaining));
    this.accessRemainsHuman$ = this.store.pipe(select(selectAccessRemainingHuman));
    this.accessRemainsPct$ = this.store.pipe(select(selectAccessRemainingPct));

    this.refreshRemainsHuman$ = this.store.pipe(select(selectRefreshRemainingHuman));
    this.refreshRemainsPct$ = this.store.pipe(select(selectRefreshRemainingPct));
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

  reset() {
    this.store.dispatch(addMessage({
      message: 'Reseting preset users',
    }));
    // this.store.dispatch(reset());
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
