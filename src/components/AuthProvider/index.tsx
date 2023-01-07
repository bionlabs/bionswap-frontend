import React, { ReactNode, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'state';
import { useChain, useSignMessage } from 'hooks';
import { setAccessToken, SIGN_MESSAGE } from 'state/auth/actions';
import { connectSign } from 'api/auth';

type Props = {};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const triggerSignMessage = useAppSelector((state) => state.auth.triggerSignMessage);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const isSigningRef = useRef(false);

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
      dispatch(setAccessToken(token));
    };

    login();
  }, [account, dispatch, sig]);

  useEffect(() => {
    dispatch(setAccessToken(undefined));
  }, [account, dispatch]);

  console.log(sig)

  return <>{children}</>;
};

export default AuthProvider;
