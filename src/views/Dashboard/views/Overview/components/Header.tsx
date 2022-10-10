import React, { useEffect, useState } from 'react';
import { styled, Box, Typography, Button } from '@mui/material';
import { useAccount } from 'wagmi';
import { shortenAddress } from 'utils/format';
import Image from 'next/image';
import { MobileProp } from 'configs/Type/Mobile/type';
import AvatarModal from 'components/AvatarModal';
import { getMyList } from 'api/avatar';
import { getUserInfo, updateAvatar } from 'api/user';
import { useBionAvatarContract } from 'hooks/useContract';
import { useChain, useSingleCallResult } from 'hooks';
import NTFConfitmModal from 'components/NTFConfitmModal';
import { useAppSelector } from 'state';

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
  const isWhitelisted = useSingleCallResult(bionAvatarContract, 'isWhitelisted', [account])?.result?.[0] || false;
  const tokenIdCounter = Number(useSingleCallResult(bionAvatarContract, 'tokenIdCounter')?.result?.[0] || 0)
  console.log("🚀 ~ file: Header.tsx ~ line 27 ~ Header ~ tokenIdCounter", tokenIdCounter)
  const [tokenId, setTokenId] = useState('');
  const [loadingClaim, setLoadingClaim] = useState(false)
  const accessToken = useAppSelector((state) => state.auth.accessToken);

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

  }, [address, accessToken, account, openModal])

  

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleToggleConfirmModal = () => {
    setOpenModalConfirm(!openModalConfirm);
  };

  const handleUpdateAvatar = async (param: string) => {
    try {
      const res = await updateAvatar(param);
      setOpenModal(false);
    } catch (error) {
      console.log('error====>', error);
    }
  };

  const handleClaimNFT = async () => {
    try {
      if (!bionAvatarContract || !account) return;
      setLoadingClaim(true);
      const tx = await bionAvatarContract.mint();
      const receipt = await tx.wait();
      const event = receipt.events?.find((e: any) => {
        return e.event === 'Transfer';
      });
      const tokenId = event?.args?.[2]?.toNumber();
      setTokenId(tokenId);
      setLoadingClaim(false);
      handleToggleConfirmModal();
    } catch (error) {
      setLoadingClaim(false);
      console.log('error====>', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="30px">
      {!claimed && isWhitelisted && (
        <WrapBanner>
          <Flex flexDirection="column" gap="15px">
            <Typography variant="h5Samsung" fontWeight="700" color="text.primary">
            Congratulations! You have been whitelist
            </Typography>
            <Typography variant="body3Samsung" fontWeight="500" color="primary.main">
            Please claim before the rewards are exhausted: {310 - tokenIdCounter} remaining NFTs
            </Typography>
            <Claim onClick={handleClaimNFT} disabled={loadingClaim}>
              <Typography variant="body3Poppins" fontWeight="600" color="#000000">
                {loadingClaim ? 'Loading....' : 'Claim now'}
              </Typography>
            </Claim>
          </Flex>
        </WrapBanner>
      )}
      <Box
        display="flex"
        alignItems={isMobile ? 'start' : 'center'}
        gap="15px"
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <AvatarBox
          onMouseEnter={() => setHoverAvatar(true)}
          onMouseLeave={() => setHoverAvatar(false)}
          onClick={handleToggleModal}
        >
          <img
            src={userInfo?.avatar?.imageURL ? `/images/bitendoGameboy/${userInfo?.avatar?.typeId}.svg` : '/images/bitendoGameboy/Default.svg'}
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
            <Typography variant="h6Samsung">{address ? 'Anonymous-User' : 'N/A'}</Typography>
            <Box>
              <Tag sx={{ backgroundColor: 'gray.700' }}>Personal</Tag>
            </Box>
          </Box>
          <Flex mt="10px" gap={isMobile ? '15px' : '40px'}>
            <Box>
              <Box>
                <Typography variant="captionPoppins" sx={{ color: 'gray.400' }}>
                  Wallet Address
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '15px' }}>{address ? shortenAddress(address) : 'N/A'}</Typography>
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography variant="captionPoppins" sx={{ color: 'gray.400' }}>
                  User Type
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="10px">
                <Typography sx={{ fontSize: '15px' }}>{address ? 'Regular User' : 'N/A'}</Typography>
                {/* <Box>
                                <VerifiedIcon sx={{width: '18px',height:'18px', color: 'primary.main'}} />
                            </Box> */}
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography variant="captionPoppins" sx={{ color: 'gray.400' }}>
                  Twitter
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="10px">
                <Typography sx={{ fontSize: '15px' }}>{address ? 'not linked' : 'N/A'}</Typography>
              </Box>
            </Box>
            {/* <Box>
                        <Box>
                            <Typography variant='captionPoppins' sx={{color: 'gray.400'}}>
                            Last Connect
                            </Typography>
                        </Box>
                        <Box display='flex' alignItems='center' gap='10px'>
                            <Typography sx={{fontSize: '15px'}}>
                                N/A
                            </Typography>
                        </Box>
                    </Box> */}
          </Flex>
        </Box>
      </Box>
      <AvatarModal
        open={openModal}
        onDismiss={handleToggleModal}
        avatars={avatars}
        handleChooseAvatar={handleUpdateAvatar}
      />
      <NTFConfitmModal open={openModalConfirm} onDismiss={handleToggleConfirmModal} tokenId={tokenId} />
    </Box>
  );
};

const Flex = styled(Box)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const Tag = styled(Box)`
  border-radius: 4px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  font-size: 12px;
`;
const AvatarBox = styled(Box)`
  * {
    transition: 0.12s ease-in;
  }
  position: relative;
  cursor: pointer;
  :hover {
    img {
      opacity: 0.3;
    }
  }

  img {
    object-fit: cover;
  }
`;
const Claim = styled(Button)`
  border-radius: 4px;
  width: 186px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.palette.primary.main};

  &.Mui-disabled {
    color: rgba(255, 255, 255, 0.3);
    box-shadow: none;
    background-color: rgba(255, 255, 255, 0.12);
  }
`;
const WrapBanner = styled(Box)`
  width: 100%;
  height: 181px;
  border-radius: 12px;
  background-image: url('/images/bannerNFT.png');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Header;
