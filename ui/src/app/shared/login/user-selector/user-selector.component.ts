import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UsersService, User } from '../../../users.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent implements OnInit {
  users: User[];
  selectedUser: User;
  name = new FormControl('');

  constructor(private usersService: UsersService) {}
  ngOnInit() {
    this.usersService.getUsers().subscribe(users => (this.users = users));
    this.usersService.selectedUser.subscribe(
      user => (this.selectedUser = user),
    );
  }

  onUserSelection(event: any) {
    this.usersService.setSelectedUser(event.value);
  }
}
