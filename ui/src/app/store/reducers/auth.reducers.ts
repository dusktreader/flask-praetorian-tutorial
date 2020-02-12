import { createReducer, on, State, Action } from '@ngrx/store';
import { signInOk, signOut, refresh, disableOk, enableOk } from '@app/store/actions/auth.actions';
import { initialState, IState } from '@app/store/states/auth.state';

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

  )(state, action);
}
