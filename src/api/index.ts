import axios from 'axios';
import { requireSignMessage } from 'state/auth/actions';
import { store } from '../state';

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const authRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

authRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 401 && originalRequest.url !== '/auth/connect-sign') {
      store.dispatch(requireSignMessage());
    }

    return Promise.reject(err);
  },
);
