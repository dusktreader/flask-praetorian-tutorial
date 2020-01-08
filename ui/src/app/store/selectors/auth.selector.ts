import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAppState } from '@app/store/states/app.state';
import { IState as IAuthState } from '@app/store/states/auth.state';

export const selectFeature = createFeatureSelector<IAppState, IAuthState>('auth');

export const selectToken = createSelector(
  selectFeature,
  (state: IAuthState) => state.token,
);
