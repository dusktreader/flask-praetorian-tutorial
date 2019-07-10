import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-response-viewer',
  templateUrl: './response-viewer.component.html',
  styleUrls: ['./response-viewer.component.scss'],
})
export class ResponseViewerComponent implements OnInit {
  constructor(private backendService: BackendService) {}

  responseData = {};

  ngOnInit() {
    this.backendService.responseData.subscribe(
      data => (this.responseData = data),
    );
  }
}
