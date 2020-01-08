import { Message } from '@app/models/message.model';

export interface IState {
  messages: Array<Message>;
}

export const initialState: IState = {
  messages: [],
};
