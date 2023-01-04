import React, { useEffect, useState } from 'react';
import { styled, Box, Typography, Stack, Container, Skeleton } from '@mui/material';
import { useAccount } from 'wagmi';
import { shortenAddress } from 'utils/format';
import { MobileProp } from 'configs/Type/Mobile/type';
import AvatarModal from 'components/AvatarModal';
import { getMyList } from 'api/avatar';
import { getUserInfo } from 'api/user';
import { useBionAvatarContract } from 'hooks/useContract';
import { useChain, useDarkMode, useNativeCurrencyBalances, useSingleCallResult } from 'hooks';
import { useAppSelector } from 'state';
import { toastError } from 'hooks/useToast';

const Header = ({ isMobile }: MobileProp) => {
  const { address } = useAccount();
  const { account } = useChain();
  const [openModal, setOpenModal] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [hoverAvatar, setHoverAvatar] = useState(false);
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
        toastError(error);
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
        toastError(error);
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
      toastError(error);
      console.log('error====>', error);
    }
  };

  const balance = useNativeCurrencyBalances(address ? [address] : [])?.[address ?? ''];
  const { darkMode } = useDarkMode();

  return (
    <>
      <Wrapper
        sx={{
          backgroundImage: darkMode
            ? `url('/images/dashboard_banner_light.png')`
            : `url('/images/dashboard_banner_light.png')`,
        }}
      >
        <Container>
          <Stack
            alignItems={isMobile ? 'start' : 'center'}
            flexDirection={isMobile ? 'column' : 'row'}
            justifyContent="start"
            gap="15px"
            width="100%"
          >
            <AvatarBox
              onMouseEnter={() => setHoverAvatar(true)}
              onMouseLeave={() => setHoverAvatar(false)}
              onClick={handleToggleModal}
            >
              <img
                src={
                  userInfo?.avatar?.imageURL
                    ? `/images/bitendoGameboy/${userInfo?.avatar?.typeId}.svg`
                    : '/images/bitendoGameboy/Default.svg'
                }
                alt=""
                width="120px"
                height="120px"
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '40%',
                  left: '13%',
                  display: hoverAvatar ? 'block' : 'none',
                }}
              >
                <Typography variant="captionPoppins" sx={{ color: 'primary.main' }}>
                  Change avatar
                </Typography>
              </Box>
            </AvatarBox>
            <Box>
              <Box display="flex" alignItems="center" gap="10px">
                <Typography fontSize="24px">{address ? shortenAddress(address) : 'N/A'}</Typography>
              </Box>
              {balance ? (
                <Typography fontSize="44px" fontWeight="700">
                  {balance?.toFixed(3)} {balance.currency.symbol}
                </Typography>
              ) : (
                <Skeleton width="150px" height="50px" />
              )}
            </Box>
          </Stack>
        </Container>
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
  background-color: ${(props) => props.theme.palette.background.default};
  padding: 3rem 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  object-fit: cover;
`;

const AvatarBox = styled(Box)`
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

export default Header;
