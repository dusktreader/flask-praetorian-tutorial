import { createReducer, on, State, Action } from '@ngrx/store'; import {
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
      endpointKey: payload.endpointKey,
    })),

    on(endpointIndicatorSuccess, (previousState, { payload }) => ({
      ...previousState,
      status: EStatus.success,
      endpointKey: payload.endpointKey,
    })),

    on(endpointIndicatorFail, (previousState, { payload }) => ({
      ...previousState,
      status: EStatus.fail,
      endpointKey: payload.endpointKey,
    })),

  )(state, action);
}
