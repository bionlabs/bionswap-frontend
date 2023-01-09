import React, { ReactNode, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'state';
import { useChain, useSignMessage } from 'hooks';
import { setAccessToken, SIGN_MESSAGE } from 'state/auth/actions';
import { connectSign } from 'api/auth';
import { useCookies } from 'react-cookie';

type Props = {};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const triggerSignMessage = useAppSelector((state) => state.auth.triggerSignMessage);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const isSigningRef = useRef(false);
  const { account, signer } = useChain();

  const [cookies, setCookie, removeCookie] = useCookies(['sigToken'])


  const {
    data: sig,
    error,
    isLoading,
    signMessage,
  } = useSignMessage({
    onSettled: () => {
      isSigningRef.current = false;
    },
    onSuccess: () => {

    }
  });
  
  useEffect(() => {
    if (signer && !isSigningRef.current && !accessToken) {
      isSigningRef.current = true;
      signMessage({ message: SIGN_MESSAGE });
    }
  }, [accessToken, signMessage, signer, triggerSignMessage]);

  useEffect(() => {
    if (!account || !sig) {
      return;
    }

    const login = async () => {
      const { token } = await connectSign(account, sig);
      setCookie('sigToken', token);
    };
    login();
  }, [account, cookies.sigToken, dispatch, removeCookie, setCookie, sig]);

  useEffect(() => {
    dispatch(setAccessToken(cookies.sigToken));
    if(!account){
      removeCookie('sigToken');
      dispatch(setAccessToken(undefined));
    }
  }, [account, cookies.sigToken, dispatch, removeCookie]);

  return <>{children}</>;
};

export default AuthProvider;
