import { createAction } from '@ngrx/store';

export const TSignIn = '[Auth] Sign In';
export interface ISignIn {
  username: string;
  password: string;
  token?: string;
}
export const signIn = createAction(TSignIn, (payload: ISignIn) => ({
  payload,
}));
export const TSignInOk = '[Auth] Sign in succeeded';
export const signInOk = createAction(TSignInOk, (payload: ISignIn) => ({
  payload,
}));

export const TSignOut = '[Auth] Sign Out';
export const signOut = createAction(TSignOut);

export const TRefresh = '[Auth] Refresh Token';
export interface IRefresh {
  token: string;
}
export const refresh = createAction(TRefresh, (payload: IRefresh) => ({
  payload,
}));

export const TDisable = '[Auth] Disable User';
export interface IDisable {
  username: string;
}
export const disable = createAction(TDisable, (payload: IDisable) => ({
  payload
}));

export const TDisableOk = '[Auth] Disable User succeeded';
export const disableOk = createAction(TDisableOk, (payload: IDisable) => ({
  payload
}));

export const TEnable = '[Auth] Enable User';
export interface IEnable {
  username: string;
}
export const enable = createAction(TEnable, (payload: IEnable) => ({
  payload
}));

export const TEnableOk = '[Auth] Enable User succeeded';
export const enableOk = createAction(TEnableOk, (payload: IEnable) => ({
  payload
}));
