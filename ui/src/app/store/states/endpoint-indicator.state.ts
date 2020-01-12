export enum EStatus {
  started,
  success,
  fail,
}

export interface IState {
  endpointListName?: string;
  endpointName?: string;
  status?: EStatus;
}

export const initialState: IState = {};
