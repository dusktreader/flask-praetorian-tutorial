import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IEndpoint } from '@app/models/endpoint.model';
import { IAppState } from '@app/store/states/app.state';
import { EStatus } from '@app/store/states/endpoint-indicator.state';
import {
  endpointIndicator,
  endpointIndicatorSuccess,
  endpointIndicatorFail,
} from '@app/store/actions/endpoint-indicator.actions';
import { selectRequest } from '@app/store/selectors/api.selector';
import { selectStatus } from '@app/store/selectors/endpoint-indicator.selector';

@Component({
  selector: 'app-endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.scss'],
})
export class EndpointListComponent implements OnInit {

  @Input() endpoints: Array<IEndpoint> = [];
  @Input() name: string;
  @Output() fire = new EventEmitter<string>();

  statuses: any;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.statuses = {};
    this.endpoints.forEach(ep => {
      this.statuses[ep.name] = this.store.pipe(select(selectStatus, ({
        endpointName: ep.name,
        endpointListName: this.name,
      })));
    });
  }

  onFire(endpointName: string) {
    this.store.dispatch(endpointIndicator({ endpointListName: this.name, endpointName }));
    this.fire.emit(name);
  }
}
