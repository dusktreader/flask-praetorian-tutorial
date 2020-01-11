import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IEndpoint } from '@app/models/endpoint.model';
import { IAppState } from '@app/store/states/app.state';
import { selectRequest } from '@app/store/selectors/api.selector';

@Component({
  selector: 'app-endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.scss'],
})
export class EndpointListComponent implements OnInit {

  @Input() endpoints: Array<IEndpoint> = [];
  @Output() fire = new EventEmitter<string>();

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {}

  onFire(route: string) {
    this.fire.emit(route);
  }
}
