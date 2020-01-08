import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatAccordion } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

import { IAppState } from '@app/store/states/app.state';
import { selectToken } from '@app/store/selectors/auth.selector';

@Component({
  selector: 'app-section-nav',
  templateUrl: './section-nav.component.html',
  styleUrls: ['./section-nav.component.scss'],
})
export class SectionNavComponent implements OnInit {
  @ViewChild('accordion', {static: false}) Accordion: MatAccordion;
  sectionName = 'fuckall';
  token$: Observable<string>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<IAppState>,
  ) {}

  ngOnInit() {
    this.token$ = this.store.pipe(select(selectToken));

    this.token$.pipe(
      tap(token => console.log('TOKEN? ', token)),
      // filter(token => !!token),
    ).subscribe(token => this.Accordion.closeAll());
  }
}
