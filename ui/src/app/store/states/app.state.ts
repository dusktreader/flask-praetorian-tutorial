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
import {
  IState as ITimerState,
  initialState as initialTimerState,
} from './timer.state';
import {
  IState as IEndpointIndicatorState,
  initialState as initialEndpointIndicatorState,
} from './timer.state';

export interface IAppState {
  api?: IApiState;
  auth?: IAuthState;
  message?: IMessageState;
  timer?: ITimerState;
  endpointIndicator?: IEndpointIndicatorState;
}

export const initialAppState: IAppState = {
  api: initialApiState,
  auth: initialAuthState,
  message: initialMessageState,
  timer: initialTimerState,
  endpointIndicator: initialEndpointIndicatorState,
};
