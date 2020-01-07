import { createReducer, on, State, Action } from '@ngrx/store';
import { apiCall, apiCallOk, apiCallFail } from '../actions/api.actions';
import { initialState, IState } from '../states/api.state';

export function reducer(state: IState | undefined, action: Action) {
  return createReducer(
    initialState,

    on(apiCall, (previousState, { payload }) => ({
      ...previousState,
      request: payload.request,
      state: 'dispatching api call',
    })),

    on(apiCallOk, (previousState, { payload }) => ({
      ...previousState,
      response: payload.response,
      state: 'successful api call',
    })),

    on(apiCallFail, (previousState, { payload }) => ({
      ...previousState,
      response: payload.response,
      state: 'failed api call',
    })),
  )(state, action);
}
