import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { MessagesService } from './messages.service';

export interface User {
  username: string;
  description?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private jwtHelperService: JwtHelperService = new JwtHelperService();

  private accessTicker;
  private accessRemaining: BehaviorSubject<number> = new BehaviorSubject(0);
  public readonly accessRemaining$: Observable<
    number
  > = this.accessRemaining.asObservable();

  private refreshTicker;
  private refreshRemaining: BehaviorSubject<number> = new BehaviorSubject(0);
  public readonly refreshRemaining$: Observable<
    number
  > = this.refreshRemaining.asObservable();

  private selectedUserSubject: BehaviorSubject<User> = new BehaviorSubject({
    username: '',
    password: '',
  });
  public readonly selectedUser: Observable<
    User
  > = this.selectedUserSubject.asObservable();

  private currentTokenSubject: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly currentToken: Observable<
    any
  > = this.currentTokenSubject.asObservable();

  constructor(public messagesService: MessagesService) {}

  updateTimers() {
    const now = Date.now() / 1000.0;

    const token = this.currentTokenSubject.value.tokenData;

    const accessRemains = Math.floor(
      ((token.exp - now) * 100.0) / (token.exp - token.iat),
    );
    if (accessRemains > 0) {
      this.accessRemaining.next(accessRemains);
    } else {
      clearInterval(this.accessTicker);
      this.accessRemaining.next(0);
    }

    const refreshRemains = Math.floor(
      ((token.rf_exp - now) * 100.0) / (token.rf_exp - token.iat),
    );
    if (refreshRemains > 0) {
      this.refreshRemaining.next(refreshRemains);
    } else {
      clearInterval(this.refreshTicker);
      this.refreshRemaining.next(0);
    }
  }

  setToken(token: string) {
    const tokenJson = {
      rawToken: token,
      tokenData: this.jwtHelperService.decodeToken(token),
    };
    this.currentTokenSubject.next(tokenJson);

    this.accessTicker = setInterval(() => {
      this.updateTimers();
    }, 500);
    this.refreshTicker = setInterval(() => {
      this.updateTimers();
    }, 500);
  }

  getUsers(): Observable<User[]> {
    return of([
      { username: 'TheDude', description: 'TheDude', password: 'abides' },
      {
        username: 'Walter',
        description: 'Walter (admin)',
        password: 'calmerthanyouare',
      },
      {
        username: 'Donnie',
        description: 'Donnie (operator)',
        password: 'iamthewalrus',
      },
      {
        username: 'Maude',
        description: 'Maude (operator, admin)',
        password: 'andthorough',
      },
      { username: 'TheStranger', description: 'TheStranger', password: '' },
    ]);
  }

  setSelectedUser(user: User) {
    this.selectedUserSubject.next(user);
    this.messagesService.add(`Selected User: ${user.username}`);
  }
}
