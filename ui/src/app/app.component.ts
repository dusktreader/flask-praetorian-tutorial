import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IAppState } from '@app/store/states/app.state';
import { selectRouter, selectSnapshot, selectTitle } from '@app/store/selectors/router.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}
  ngOnInit() {
    this.store.pipe(select(selectRouter)).subscribe(whatever => console.log('ROUTER: ', whatever));
    this.store.pipe(select(selectSnapshot)).subscribe(whatever => console.log('SNAPSHOT: ', whatever));
    this.store.pipe(select(selectTitle)).subscribe(whatever => console.log('TITLE: ', whatever));
  }
}
