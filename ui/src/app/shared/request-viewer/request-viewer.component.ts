import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Request } from '@app/models/request.model';
import { IAppState } from '@app/store/states/app.state';
import { selectRequest } from '@app/store/selectors/api.selector';

@Component({
  selector: 'app-request-viewer',
  templateUrl: './request-viewer.component.html',
  styleUrls: ['./request-viewer.component.scss'],
})
export class RequestViewerComponent implements OnInit {

  private request$: Observable<Request>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.request$ = this.store.pipe(
      select(selectRequest),
    );
  }
}
