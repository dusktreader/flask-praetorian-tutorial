import { createReducer, on, State, Action } from '@ngrx/store';
import { apiCall, apiCallOk, apiCallFail, apiCallInject } from '../actions/api.actions';
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

    on(apiCallFail, (previousState, { payload }) => {
      return ({
        ...previousState,
        response: payload.response,
        state: 'failed api call',
      });
    }),

    on(apiCallInject, (previousState, { payload }) => ({
      ...previousState,
      request: { ...previousState.request, header: payload },
      state: 'injected token header into api call',
    })),
  )(state, action);
}
