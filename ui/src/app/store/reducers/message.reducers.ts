import { createReducer, on, State, Action } from '@ngrx/store';
import { add } from '../actions/message.actions';
import { initialState, IState } from '../states/message.state';
import { Message } from '@app/models/message.model';

export function reducer(state: IState | undefined, action: Action) {
  return createReducer(
    initialState,

    on(add, (previousState, { payload }) => ({
      ...previousState,
      messages: [...previousState.messages, new Message(payload.message)],
    })),
  )(state, action);
}
