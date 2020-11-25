import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { Store, select } from '@ngrx/store';

import { IAppState } from '@app/store/states/app.state';
import { selectUserDisplay } from '@app/store/selectors/auth.selector';
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

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent implements OnInit {
  userString$: Observable<string>;

  accessRemains$: Observable<number>;
  accessRemainsHuman$: Observable<string>;
  accessRemainsPct$: Observable<number>;

  refreshRemainsHuman$: Observable<string>;
  refreshRemainsPct$: Observable<number>;

  constructor(
    private store: Store<IAppState>,
  ) {}


  ngOnInit() {
    this.userString$ = this.store.pipe(select(selectUserDisplay));

    this.accessRemains$ = this.store.pipe(select(selectAccessRemaining));
    this.accessRemainsHuman$ = this.store.pipe(select(selectAccessRemainingHuman));
    this.accessRemainsPct$ = this.store.pipe(select(selectAccessRemainingPct));

    this.refreshRemainsHuman$ = this.store.pipe(select(selectRefreshRemainingHuman));
    this.refreshRemainsPct$ = this.store.pipe(select(selectRefreshRemainingPct));
  }
}
