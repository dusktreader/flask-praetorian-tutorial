import { createReducer, on, Action } from '@ngrx/store';
import * as moment from 'moment';

import { tick } from '../actions/timer.actions';
import { initialState, IState } from '../states/timer.state';

export function reducer(state: IState | undefined, action: Action) {
  return createReducer(
    initialState,

    on(tick, (previousState) => ({
      ...previousState,
      now: moment(),
    })),
  )(state, action);
}
