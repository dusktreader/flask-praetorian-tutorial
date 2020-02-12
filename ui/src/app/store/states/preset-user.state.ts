import { PresetUser } from '@app/models/preset-user.model';

export interface IState {
  users?: Array<PresetUser>;
}

export const initialState: IState = {};
