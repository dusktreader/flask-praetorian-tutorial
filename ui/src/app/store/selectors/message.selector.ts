import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAppState } from '@app/store/states/app.state';
import { IState as IMessageState } from '@app/store/states/message.state';

export const selectFeature = createFeatureSelector<IAppState, IMessageState>('message');

export const selectMessages = createSelector(
  selectFeature,
  (state: IMessageState) => state.messages,
);
