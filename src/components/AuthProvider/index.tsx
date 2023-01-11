import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'state';
import { useChain, useDisconnect, useSignMessage } from 'hooks';
import { setAccessToken, SIGN_MESSAGE } from 'state/auth/actions';
import { connectSign } from 'api/auth';
import { useCookies } from 'react-cookie';
import { toastSuccess } from 'hooks/useToast';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const triggerSignMessage = useAppSelector((state) => state.auth.triggerSignMessage);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const isSigningRef = useRef(false);
  const { account, signer } = useChain();

  const [cookies, setCookie, removeCookie] = useCookies(['sigToken']);
  const { disconnect } = useDisconnect();

  const { data: sig, signMessage } = useSignMessage({
    onSettled: () => {
      isSigningRef.current = false;
    },
    onSuccess: () => {
      toastSuccess('You have successfully logged in');
    },
    onError: () => {
      disconnect();
    },
  });

  const login = useCallback(async () => {
    if (account && sig) {
      const { token } = await connectSign(account, sig);
      setCookie('sigToken', token);
    }
  }, [account, setCookie, sig]);

  useEffect(() => {
    if (signer && !isSigningRef.current && !accessToken) {
      isSigningRef.current = true;
      signMessage({ message: SIGN_MESSAGE });
    }
  }, [accessToken, signMessage, signer, triggerSignMessage]);

  useEffect(() => {
    login();
  }, [account, login, removeCookie]);

  useEffect(() => {
    dispatch(setAccessToken(cookies.sigToken));
  }, [cookies.sigToken, dispatch]);

  useEffect(() => {
    if (!account) {
      removeCookie('sigToken');
    }
  }, [account, dispatch, removeCookie]);

  return <>{children}</>;
};

export default AuthProvider;
