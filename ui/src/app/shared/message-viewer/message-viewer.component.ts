import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from '@app/store/states/app.state';
import { selectMessages } from '@app/store/selectors/message.selector';

@Component({
  selector: 'app-message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.scss'],
})
export class MessageViewerComponent implements OnInit {
  messages$: Observable<string[]>;
  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.messages$ = this.store.pipe(
      select(selectMessages),
    );
  }
}
