import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  constructor(private backendService: BackendService) {}

  ngOnInit() {}
}
