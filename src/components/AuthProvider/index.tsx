import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'state';
import { useChain, useSignMessage } from 'hooks';
import { useCookies } from 'react-cookie';
import { setAccessToken, SIGN_MESSAGE } from 'state/auth/actions';
import { connectSign } from 'api/auth';

type Props = {};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const triggerSignMessage = useAppSelector((state) => state.auth.triggerSignMessage);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const isSigningRef = useRef(false);
  const [cookies, setCookie, removeCookie] = useCookies(['signature', 'sigToken'])

  const {
    data: sig,
    error,
    isLoading,
    signMessage,
  } = useSignMessage({
    onSettled: () => {
      isSigningRef.current = false;
    },
  });
  const { account, signer } = useChain();

  const login = useCallback(async() => {
    if(account && signer && sig){
      const { token } = await connectSign(account, sig);
      setCookie('signature', sig);
      setCookie('sigToken', token);
    }
  }
  ,[account, setCookie, sig, signer]
  )

  useEffect(() => {
    if (signer && !isSigningRef.current && !accessToken) {
      isSigningRef.current = true;
      signMessage({ message: SIGN_MESSAGE });
    }
  }, [accessToken, signMessage, signer, triggerSignMessage]);

  useEffect(() => {
    if(!cookies.sigToken || !cookies.signature || !signer){
      login();
    }
    if(!account && !signer){
      removeCookie('sigToken');
      removeCookie('signature');
    }
  }, [account, cookies.sigToken, cookies.signature, dispatch, login, removeCookie, setCookie, sig, signer]);

  useEffect(() => {
    dispatch(setAccessToken(cookies.sigToken));
  }, [account, cookies.sigToken, dispatch]);

  console.log(signer)

  return <>{children}</>;
};

export default AuthProvider;
