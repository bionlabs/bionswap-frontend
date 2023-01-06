import React, { useEffect, useState } from 'react';
import { styled, Box, Typography, Stack, Container, Skeleton, Button } from '@mui/material';
import { useAccount } from 'wagmi';
import { shortenAddress } from 'utils/format';
import { MobileProp } from 'configs/Type/Mobile/type';
import AvatarModal from 'components/AvatarModal';
import { getMyList } from 'api/avatar';
import { getUserInfo } from 'api/user';
import { useBionAvatarContract } from 'hooks/useContract';
import { useChain, useDarkMode, useNativeCurrencyBalances, useSingleCallResult } from 'hooks';
import { useAppSelector } from 'state';
import Image from 'next/image';

const Header = ({ isMobile }: MobileProp) => {
  const { address } = useAccount();
  const { account } = useChain();
  const [openModal, setOpenModal] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [avatars, setAvatars] = useState([]);
  const bionAvatarContract = useBionAvatarContract();
  const claimed = useSingleCallResult(bionAvatarContract, 'claimeds', [account])?.result?.[0] || false;
  const [tokenId, setTokenId] = useState('');
  const [loadingClaim, setLoadingClaim] = useState(false);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const [currentTime, setCurrentTime] = useState(Date.now() / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now() / 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getAvatars = async () => {
      try {
        const res = await getMyList(address || '');
        setAvatars(res);
      } catch (error) {
        console.log('error====>', error);
      }
    };

    getAvatars();
  }, [address, claimed, accessToken]);

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        if (!accessToken) return;

        const rest = await getUserInfo();
        setUserInfo(rest);
      } catch (error) {
        console.log('error====>', error);
      }
    };

    getUserInformation();
  }, [address, accessToken, account, openModal]);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleUpdateAvatar = async (param: string) => {
    try {
      setOpenModal(false);
    } catch (error) {
      console.log('error====>', error);
    }
  };

  const balance = useNativeCurrencyBalances(address ? [address] : [])?.[address ?? ''];
  const { darkMode } = useDarkMode();

  return (
    <>
      <Wrapper p={'0 32px 32px'}>
        <Stack width="100%" spacing={3}>
          <Stack>
            <AvatarBox onClick={handleToggleModal}>
              <Image
                src={
                  userInfo?.avatar?.imageURL
                    ? `/images/bitendoGameboy/${userInfo?.avatar?.typeId}.svg`
                    : '/images/bitendoGameboy/Default.svg'
                }
                alt=""
                width={110}
                height={110}
              />
            </AvatarBox>
            <Typography fontSize={32} fontWeight={600}>
              Anonymous
            </Typography>
            <Typography fontSize="18px">@{address ? shortenAddress(address) : 'N/A'}</Typography>
          </Stack>
          <Stack width="100%" spacing={2}>
            
            <VerifyButton variant="contained" fullWidth disabled>
              Verify profile
            </VerifyButton>
            <Stack direction="row" width="100%" justifyContent="space-between">
              <Typography fontSize={14} color='text.secondary'>Gas balance:</Typography>
              {balance ? (
                <Typography>
                  {balance?.toFixed(3)} {balance.currency.symbol}
                </Typography>
              ) : (
                <Skeleton width="150px" height="50px" />
              )}
            </Stack>
          </Stack>
        </Stack>
      </Wrapper>
      <AvatarModal
        open={openModal}
        onDismiss={handleToggleModal}
        avatars={avatars}
        handleChooseAvatar={handleUpdateAvatar}
      />
    </>
  );
};

const Wrapper = styled(Box)`
  flex: 0 0 364px;
  border-radius: 8px;
  border: 1px solid ${(prop) => (prop.theme.palette as any).extra.card.divider};
  background-color: ${(prop) => (prop.theme.palette as any).extra.card.background};
  box-shadow: 0 4px 20px rgb(14 14 17 / 10%);
  width: 100%;
`;

const AvatarBox = styled(Box)`
  margin: -40px auto 0;
  background-color: ${(props) => props.theme.palette.background.default};
  * {
    transition: 0.12s ease-in;
  }
  position: relative;
  cursor: pointer;
  :hover {
    img {
      opacity: 0.5;
    }
  }
  img {
    object-fit: cover;
  }
`;
const VerifyButton = styled(Button)`
  padding: 12px 25px;
`

export default Header;
