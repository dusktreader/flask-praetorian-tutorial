import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAppState } from '@app/store/states/app.state';
import { IState as IApiState } from '@app/store/states/api.state';

export const selectFeature = createFeatureSelector<IAppState, IApiState>('api');

export const selectRequest = createSelector(
  selectFeature,
  (state: IApiState) => state.request ? state.request : {},
);

export const selectResponse = createSelector(
  selectFeature,
  (state: IApiState) => state.response ? state.response : {},
);
