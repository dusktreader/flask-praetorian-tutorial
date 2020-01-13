export enum EStatus {
  started = '-',
  success = 'ok',
  fail = 'x',
}

export interface IState {
  endpointKey?: string;
  status?: EStatus;
}

export const initialState: IState = {};
