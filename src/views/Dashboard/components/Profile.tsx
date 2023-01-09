import React, { useEffect, useState } from 'react';
import { styled, Box, Typography, Stack, Container, Skeleton, Button, Popover } from '@mui/material';
import { useAccount } from 'wagmi';
import { shortenAddress } from 'utils/format';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import AvatarModal from 'components/AvatarModal';
import { getMyList } from 'api/avatar';
import { getUserInfo } from 'api/user';
import { useBionAvatarContract } from 'hooks/useContract';
import { useChain, useDarkMode, useNativeCurrencyBalances, useSingleCallResult } from 'hooks';
import { useAppSelector } from 'state';
import Image from 'next/image';

const Profile = () => {
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

  useEffect(() => {
    if(!accessToken){
      setUserInfo(null);
    }
  }, [accessToken])
  

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
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
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
        <VerifyButton variant="contained" fullWidth disabled>
          Request for verification
        </VerifyButton>
        <Stack width="100%" gap="5px">
          <Stack direction="row" width="100%" justifyContent="space-between">
            <Typography fontSize={14} color="text.secondary">
              Gas balance:
            </Typography>
            {balance ? (
              <Typography>
                {balance?.toFixed(3)} {balance.currency.symbol}
              </Typography>
            ) : (
              <Skeleton width="150px" height="50px" />
            )}
          </Stack>
          <Stack direction="row" width="100%" justifyContent="space-between">
            <Typography fontSize={14} color="text.secondary">
              Rank:
            </Typography>
            <Stack direction="row" spacing={0.5}>
              <Stack>
                <Image src="/ranks/icons/oval.svg" alt="" width={20} height={20} />
              </Stack>
              <Typography fontWeight={500} sx={{color: theme => (theme.palette as any).extra.ranks.oval}}>Oval</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" width="100%" justifyContent="space-between">
            <Stack direction="row" spacing={0.5}>
              <Stack onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                <AiOutlineInfoCircle />
              </Stack>
              <Typography fontSize={14} color="text.secondary">
                Bion Point:
              </Typography>
              <Popover
                sx={{
                  pointerEvents: 'none',
                  overflow: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Box p="8px 20px">
                  <Typography fontSize={12}>Get BP by playing in Game Center and airdrops</Typography>
                </Box>
              </Popover>
            </Stack>
            <Typography>0 BP</Typography>
          </Stack>
        </Stack>
      </Stack>
      <AvatarModal
        open={openModal}
        onDismiss={handleToggleModal}
        avatars={avatars}
        handleChooseAvatar={handleUpdateAvatar}
      />
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  flex: 0 0 364px;
  border-radius: 8px;
  border: 1px solid ${(prop) => (prop.theme.palette as any).extra.card.divider};
  background-color: ${(prop) => (prop.theme.palette as any).extra.card.background};
  box-shadow: 0 4px 20px rgb(14 14 17 / 10%);
  width: 100%;
  margin-top: -64px;
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
`;

export default Profile;
