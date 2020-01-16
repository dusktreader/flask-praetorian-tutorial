import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

import { IAppState } from '@app/store/states/app.state';
import { selectTitle } from '@app/store/selectors/router.selector';

@Component({
  selector: 'app-section-nav',
  templateUrl: './section-nav.component.html',
  styleUrls: ['./section-nav.component.scss'],
})
export class SectionNavComponent implements OnInit {
  title$: Observable<string>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.title$ = this.store.pipe(select(selectTitle));
  }
}
