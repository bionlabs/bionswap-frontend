import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const SIGN_MESSAGE =
  'Greetings from BionSwap!\n\nSign this message to log into the system.\n\nThis signature will not cost you any fees.';

export const requireSignMessage = createAction('auth/requireSignMessage');

export const setAccessToken = createAction<string | undefined>('auth/setAccessToken');

export const logOut = createAction('auth/logOut');
