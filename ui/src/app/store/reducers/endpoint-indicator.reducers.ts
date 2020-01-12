import { createReducer, on, State, Action } from '@ngrx/store';
import {
  endpointIndicator,
  endpointIndicatorSuccess,
  endpointIndicatorFail,
} from '../actions/endpoint-indicator.actions';
import { initialState, IState, EStatus } from '../states/endpoint-indicator.state';

export function reducer(state: IState | undefined, action: Action) {
  return createReducer(
    initialState,

    on(endpointIndicator, (previousState, { payload }) => ({
      ...previousState,
      status: EStatus.started,
      endpointListName: payload.endpointListName,
      endpointName: payload.endpointName,
    })),

    on(endpointIndicatorSuccess, (previousState, { payload }) => ({
      ...previousState,
      status: EStatus.success,
      endpointListName: payload.endpointListName,
      endpointName: payload.endpointName,
    })),

    on(endpointIndicatorFail, (previousState, { payload }) => ({
      ...previousState,
      status: EStatus.fail,
      endpointListName: payload.endpointListName,
      endpointName: payload.endpointName,
    })),

  )(state, action);
}
