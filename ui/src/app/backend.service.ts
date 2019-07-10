import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessagesService } from './messages.service';
import { UsersService, User } from './users.service';

export interface Request {
  method: string;
  url: string;
  payload?: any;
  header?: any;
}

export interface Response {
  status: number;
  statusText: string;
  body: any;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private requestDataSubject: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly requestData: Observable<
    any
  > = this.requestDataSubject.asObservable();

  private responseDataSubject: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly responseData: Observable<
    any
  > = this.responseDataSubject.asObservable();

  constructor(
    public messagesService: MessagesService,
    public usersService: UsersService,
    private http: HttpClient,
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.messagesService.add(
        `request to ${operation} failed: ${error.message}`,
        true,
      );
      return of(result as T);
    };
  }

  submitRequest(request: Request) {
    this.messagesService.add('Submitting request: ' + request);

    if (request.method.toLowerCase() === 'get') {
      return this.http
        .get<any>(request.url, {
          observe: 'response',
          params: request.payload,
        })
        .pipe(
          tap(response => {
            this.messagesService.add(`Received Response: ${response}`);
            this.responseDataSubject.next(response);
          }),
          catchError(this.handleError<any>(`$apiRouteName`)),
        );
    }

    if (request.method.toLowerCase() === 'post') {
      return this.http
        .post<any>(request.url, request.payload, {
          observe: 'response',
        })
        .pipe(
          map(response => ({
            status: response.status,
            statusText: response.statusText,
            body: response.body,
          })),
          tap(response => {
            this.messagesService.add(`Received Response: ${response}`);
            this.responseDataSubject.next(response);
          }),
          catchError(this.handleError<any>(`${request.url}`)),
        );
    }
  }
}
