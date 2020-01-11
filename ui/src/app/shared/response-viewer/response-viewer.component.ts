import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Response } from '@app/models/response.model';
import { IAppState } from '@app/store/states/app.state';
import { selectResponse } from '@app/store/selectors/api.selector';

@Component({
  selector: 'app-response-viewer',
  templateUrl: './response-viewer.component.html',
  styleUrls: ['./response-viewer.component.scss'],
})
export class ResponseViewerComponent implements OnInit {

  private response$: Observable<Response>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.response$ = this.store.pipe(
      select(selectResponse),
    );
  }
}
