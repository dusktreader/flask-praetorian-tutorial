import { RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';

export interface IState {
  state: RouterReducerState<SerializedRouterStateSnapshot>;
}
