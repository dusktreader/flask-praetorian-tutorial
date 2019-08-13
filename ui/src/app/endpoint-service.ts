import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BackendService } from './backend.service';
import { MessagesService } from './messages.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {

  constructor(
    public messagesService: MessagesService,
    private backendService: BackendService,
    private userService: UsersService,
  ) {}

  protected() {
  }
}
