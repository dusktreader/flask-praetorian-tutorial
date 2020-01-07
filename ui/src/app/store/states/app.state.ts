import {
  IState as IApiState,
  initialState as initialApiState,
} from './api.state';
import {
  IState as IAuthState,
  initialState as initialAuthState,
} from './auth.state';
import {
  IState as IMessageState,
  initialState as initialMessageState,
} from './message.state';

export interface IAppState {
  api?: IApiState;
  auth?: IAuthState;
  message?: IMessageState;
}

export const initialAppState: IAppState = {
  api: initialApiState,
  auth: initialAuthState,
  message: initialMessageState,
};
