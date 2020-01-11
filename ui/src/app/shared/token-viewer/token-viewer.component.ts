import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from '@app/store/states/app.state';

import { selectTokenData } from '@app/store/selectors/auth.selector';

@Component({
  selector: 'app-token-viewer',
  templateUrl: './token-viewer.component.html',
  styleUrls: ['./token-viewer.component.scss'],
})
export class TokenViewerComponent implements OnInit {
  private tokenData$: Observable<any>;
  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.tokenData$ = this.store.pipe(
      select(selectTokenData),
    );
  }
}
