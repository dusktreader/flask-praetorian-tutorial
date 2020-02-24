import { createReducer, on, State, Action } from '@ngrx/store';
import { fetchOk } from '@app/store/actions/preset-user.actions';
import { initialState, IState } from '@app/store/states/auth.state';

export function reducer(state: IState | undefined, action: Action) {
  return createReducer(
    initialState,

    on(fetchOk, (previousState, { payload }) => ({
      ...previousState,
      users: payload,
    })),

  )(state, action);
}
