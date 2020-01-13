import { createAction, Action } from '@ngrx/store';

export interface IEndpointIndicator {
  endpointKey: string;
}

export const TEndpointIndicator = '[EndpointIndicator] Go';
export const endpointIndicator = createAction(TEndpointIndicator, (payload: IEndpointIndicator) => ({
  payload,
}));

export const TEndpointIndicatorSuccess = '[EndpointIndicator] Success';
export const endpointIndicatorSuccess = createAction(TEndpointIndicatorSuccess, (payload: IEndpointIndicator) => ({
  payload,
}));

export const TEndpointIndicatorFail = '[EndpointIndicator] Fail';
export const endpointIndicatorFail = createAction(TEndpointIndicatorFail, (payload: IEndpointIndicator) => ({
  payload,
}));
