import { createAction } from '@ngrx/store';

export const TSignIn = '[Auth] Sign In';
export interface ISignIn {
  username: string;
  password: string;
  token: string;
}
export const signIn = createAction(TSignIn, (payload: ISignIn) => ({
  payload,
}));
export const TSignInOk = '[Auth] Sign in succeeded';
export const signInOk = createAction(TSignInOk, (payload: ISignIn) => ({
  payload,
}));

export const TSignInFail = '[Auth] Sign in failed';
export const signInFail = createAction(TSignInFail, (message: string) => ({
  message,
}));

export const TSignOut = '[Auth] Sign Out';
export const signOut = createAction(TSignOut);
