import { createReducer } from '@reduxjs/toolkit';
import { authRequest } from 'api';
import { logOut, requireSignMessage, setAccessToken } from './actions';

export type AuthState = {
  triggerSignMessage: boolean;
  accessToken?: string;
};

const initialState: AuthState = {
  triggerSignMessage: true,
};

export default createReducer<AuthState>(initialState, (builder) =>
  builder
    .addCase(requireSignMessage, (state) => {
      state.triggerSignMessage = !state.triggerSignMessage;
    })
    .addCase(setAccessToken, (state, { payload: token }) => {
      state.accessToken = token;
      authRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    })
    .addCase(logOut, (state) => {
      state.accessToken = undefined;
    }),
);
