import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAppState } from '@app/store/states/app.state';
import { IState as IPresetUserState } from '@app/store/states/preset-user.state';

export const selectFeature = createFeatureSelector<IAppState, IPresetUserState>('presetUsers');

export const selectPresetUsers = createSelector(
  selectFeature,
  (state: IPresetUserState) => state ? state.users : [],
);
