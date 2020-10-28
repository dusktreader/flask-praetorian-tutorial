import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as moment from 'moment';
import * as humanize from 'humanize-duration';

import { IAppState } from '@app/store/states/app.state';
import { IState as ITimerState } from '@app/store/states/timer.state';
import { selectTokenData } from '@app/store/selectors/auth.selector';

const humanizer = humanize.humanizer();
export const selectFeature = createFeatureSelector<IAppState, ITimerState>('timer');

export const selectNow = createSelector(
  selectFeature,
  (state: ITimerState) => state.now,
);

export const selectAccessRemaining = createSelector(
  selectNow,
  selectTokenData,
  (now: moment.Moment, tokenData: any) => {
    console.log("NOW: ", now.unix());
    console.log("EXP: ", tokenData.exp);
    return tokenData.exp - now.unix();
  },
);

export const selectAccessRemainingPct = createSelector(
  selectAccessRemaining,
  selectTokenData,
  (remains: number, tokenData: any) => Math.floor(
    (remains * 100.0) / (tokenData.exp - tokenData.iat),
  ),
);

export const selectAccessRemainingHuman = createSelector(
  selectAccessRemaining,
  (remains: number) => {
    console.log("REMAINS: ", remains);
    return remains > 0 ? humanizer(remains * 1000) : 'Expired';
  },
);

export const selectRefreshRemaining = createSelector(
  selectNow,
  selectTokenData,
  (now: moment.Moment, tokenData: any) => tokenData.rf_exp - now.unix(),
);

export const selectRefreshRemainingPct = createSelector(
  selectRefreshRemaining,
  selectTokenData,
  (remains: number, tokenData: any) => Math.floor(
    (remains * 100.0) / (tokenData.rf_exp - tokenData.iat),
  ),
);

export const selectRefreshRemainingHuman = createSelector(
  selectRefreshRemaining,
  (remains: number) => remains > 0 ? humanizer(remains * 1000) : 'Expired',
);
