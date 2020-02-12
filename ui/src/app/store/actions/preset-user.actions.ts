import { createAction } from '@ngrx/store';

import { PresetUser } from '@app/models/preset-user.model';

export const TFetch = '[PresetUsers] Fetch';
export const fetch = createAction(TFetch);

export const TFetchOk = '[PresetUsers] Fetch succeeded';
export interface IFetchOk {
  presetUsers: Array<PresetUser>;
}
export const fetchOk = createAction(TFetchOk, (payload: IFetchOk) => ({
  payload,
}));
