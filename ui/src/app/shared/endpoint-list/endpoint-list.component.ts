import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

interface EndpointStatus {
  endpoint: IEndpoint;
  selector: Observable<EStatus>;
  color: Observable<string>;
}

@Component({
  selector: 'app-endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.scss'],
})
export class EndpointListComponent implements OnInit {

  @Input() endpoints: Array<IEndpoint> = [];
  @Input() name: string;
  @Output() fire = new EventEmitter<string>();

  endpointStatuses: Array<EndpointStatus>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.endpointStatuses = this.endpoints.map(ep => ({
      endpoint: ep,
      selector: this.store.pipe(select(selectStatus, ({ endpointKey: this.getKey(ep) }))),
      color: this.store.pipe(
        select(selectStatus, ({ endpointKey: this.getKey(ep) })),
        map(status => {
          if (status === EStatus.started) {
            return 'primary';
          } else if (status === EStatus.success) {
            return 'accent';
          } else {
            return 'warn';
          }
        }),
      ),
    }));
  }

  getKey(endpoint: IEndpoint) {
    return `${this.name}-${endpoint.name}`;
  }

  onFire(endpoint: IEndpoint) {
    const endpointKey = this.getKey(endpoint);
    this.store.dispatch(endpointIndicator({ endpointKey }));
    this.fire.emit(endpointKey);
  }
}
