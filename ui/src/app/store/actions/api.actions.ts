import { createAction, Action } from '@ngrx/store';

import { Request } from '@app/models/request.model';
import { Response } from '@app/models/response.model';

export interface IApiCall {
  request: Request;
  response?: Response;
  okActioners: (Response) => Array<Action>;
  failActioners: (Response, Error) => Array<Action>;
  failError?: Error;
}

export const TApiCall = '[API] Request to API';
export const apiCall = createAction(TApiCall, (payload: IApiCall) => ({
  payload,
}));

export const TApiCallStart = '[API] Request to API starting';
export const apiCallStart = createAction(TApiCallStart, (payload: IApiCall) => ({
  payload,
}));

export const TApiCallOk = '[API] Request to API succeeded';
export const apiCallOk = createAction(TApiCallOk, (payload: IApiCall) => ({
  payload,
}));

export const TApiCallFail = '[API] Request to API failed';
export const apiCallFail = createAction(TApiCallFail, (payload: IApiCall) => ({
  payload,
}));

export const TApiCallInject = '[API] Request to API injected with token';
export const apiCallInject = createAction(TApiCallInject, (payload: any) => ({
  payload,
}));
