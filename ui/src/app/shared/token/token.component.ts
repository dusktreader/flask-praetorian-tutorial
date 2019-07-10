import { Component, OnInit } from '@angular/core';

import { UsersService, User } from '../../users.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent implements OnInit {
  private tokenData: any;
  private accessRemains = 0;
  private refreshRemains = 0;
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.currentToken.subscribe(token => (this.tokenData = token));
    this.usersService.accessRemaining$.subscribe(
      remains => (this.accessRemains = remains),
    );
    this.usersService.refreshRemaining$.subscribe(
      remains => (this.refreshRemains = remains),
    );
  }
}
