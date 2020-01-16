import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';

import { IAppState } from '@app/store/states/app.state';
import { IState as IRouterState } from '@app/store/states/router.state';

export const selectRouter = createFeatureSelector<IAppState, IRouterState>('router');

export const selectSnapshot = createSelector(
  selectRouter,
  (state: IRouterState) => state ? state.state : {},
);

export const selectTitle = createSelector(
  selectSnapshot,
  (snapshot: any) => snapshot && snapshot.root ? snapshot.root.firstChild.data.title : 'untitled',
);
