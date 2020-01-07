import { createAction } from '@ngrx/store';

export const TAdd = '[Message] Add message';
export interface IAdd {
  message: string;
  snackBar?: boolean;
}
export const add = createAction(TAdd, (payload: IAdd) => ({
  payload,
}));
