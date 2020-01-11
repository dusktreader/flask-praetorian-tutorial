import { Component, OnInit } from '@angular/core';
import { IEndpoint } from '@app/models/endpoint.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  endpoints: Array<IEndpoint>;

  constructor() {}

  ngOnInit() {
    this.endpoints = [
      {
        name: 'roles-protected',
        icon: 'lock',
        label: 'Protected',
        description: 'This endpoint may be accessed by any user that is logged in',
        route: 'protected',
      },
      {
        name: 'roles-protected-admin',
        icon: 'security',
        label: 'Protected (Admin Required)',
        description: 'This endpoint may only be accessed by users with the "admin" role',
        route: 'protected-admin',
      },
      {
        name: 'roles-proteted-operator',
        icon: 'touch_app',
        label: 'Protected (Operator Accepted)',
        description: 'This endpoint may be accessed by any user with the "operator" role',
        route: 'protected-operator',
      },
    ];
  }
}
