import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';

import { IAppState } from '@app/store/states/app.state';
import { apiCallInject } from '@app/store/actions/api.actions';
import { selectToken } from '@app/store/selectors/auth.selector';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private store: Store<IAppState>) {}

  injectToken(req, token) {
    if (!token) {
      return req;
    }
    const header = { Authorization: `Bearer ${token}` };
    this.store.dispatch(apiCallInject(header));
    return req.clone({ setHeaders: header });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.pipe(
      select(selectToken),
      first(),
      mergeMap(token => next.handle(this.injectToken(req, token))),
    );
  }
}
