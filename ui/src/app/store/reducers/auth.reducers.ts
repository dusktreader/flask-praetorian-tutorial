import { createReducer, on, State, Action } from '@ngrx/store';
import { signInOk, signOut, refresh } from '../actions/auth.actions';
import { initialState, IState } from '../states/message.state';

export function reducer(state: IState | undefined, action: Action) {
  return createReducer(
    initialState,

    on(signInOk, (previousState, { payload }) => ({
      ...previousState,
      token: payload.token,
      username: payload.username,
    })),

    on(signOut, (previousState) => initialState),

    on(refresh, (previousState, { payload }) => ({
      ...previousState,
      token: payload.token,
    })),

    on(reset, (previousState) => ({


  )(state, action);
}
