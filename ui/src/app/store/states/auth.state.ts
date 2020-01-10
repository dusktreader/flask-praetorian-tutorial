export interface IState {
  token?: string;
  username?: string;
  accessRemaining?: number;
  refreshRemaining?: number;
}

export const initialState: IState = {};
