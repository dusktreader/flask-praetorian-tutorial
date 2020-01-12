import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';

import { IAppState } from '@app/store/states/app.state';
import { IState as IAuthState } from '@app/store/states/auth.state';

const jwtHelper = new JwtHelperService();

export const selectFeature = createFeatureSelector<IAppState, IAuthState>('auth');

export const selectUsername = createSelector(
  selectFeature,
  (state: IAuthState) => state.username,
);

export const selectToken = createSelector(
  selectFeature,
  (state: IAuthState) => state.token,
);

export const selectTokenData = createSelector(
  selectFeature,
  (state: IAuthState) => state.token ? jwtHelper.decodeToken(state.token) : {},
);
