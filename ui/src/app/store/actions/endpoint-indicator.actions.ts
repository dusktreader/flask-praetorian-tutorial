import { createAction, Action } from '@ngrx/store';

export interface IEndpointIndicator {
  endpointListName: string;
  endpointName: string;
}

export const TEndpointIndicator = '[EndpointIndicator] Go';
export const endpointIndicator = createAction(TEndpointIndicator, (payload: IEndpointIndicator) => ({
  payload,
}));

export const endpointIndicatorSuccess = createAction(TEndpointIndicator, (payload: IEndpointIndicator) => ({
  payload,
}));

export const endpointIndicatorFail = createAction(TEndpointIndicator, (payload: IEndpointIndicator) => ({
  payload,
}));
