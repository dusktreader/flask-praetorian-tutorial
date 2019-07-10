import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-request-viewer',
  templateUrl: './request-viewer.component.html',
  styleUrls: ['./request-viewer.component.scss'],
})
export class RequestViewerComponent implements OnInit {

  constructor(private backendService: BackendService) {}

  requestData = {};

  ngOnInit() {
    this.backendService.requestData.subscribe(data => this.requestData = data);
  }
}
