import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAppState } from '@app/store/states/app.state';
import { IState } from '@app/store/states/endpoint-indicator.state';

export const selectFeature = createFeatureSelector<IAppState, IState>('endpointIndicator');

export const selectStatus = createSelector(
  selectFeature,
  (state: IState, props: any) => {
    if (state.endpointKey ===  props.endpointKey && state.status) {
      return state.status;
    } else {
      return null;
    }
  },
);
