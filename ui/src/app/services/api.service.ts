import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessagesService } from './messages.service';
import { Request } from '@app/models/request.model';
import { Response } from '@app/models/response.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  submitRequest(request: Request): Observable<Response> {

    if (request.method.toLowerCase() === 'get') {
      return this.http
        .get<any>(request.url, {
          observe: 'response',
          params: request.payload,
        })
        .pipe(
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
          catchError(this.handleError<any>(`${request.url}`)),
        );
    }
  }
}
