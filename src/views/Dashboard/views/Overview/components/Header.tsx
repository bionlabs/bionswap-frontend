import React, { useState } from 'react';
import { styled, Box, Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAccount } from 'wagmi';
import { shortenAddress } from 'utils/format';
import Image from 'next/image';
import { MobileProp } from 'configs/Type/Mobile/type';
import AvatarModal from 'components/AvatarModal';
import { avatarConfig } from '../config';

const Header = ({ isMobile }: MobileProp) => {
  const { address } = useAccount();
  const [openModal, setOpenModal] = useState(false);
  const [hoverAvatar, setHoverAvatar] = useState(false);
  const [avatar, setAvatar] = useState('');

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleChooseAvatar = (param: string) => {
    setAvatar(param);
    setOpenModal(false);
  };

  return (
    <Box>
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
          <Image src={avatar ? avatar : '/icons/dashboard/user.svg'} alt="" width="120px" height="120px" />
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
        avatars={avatarConfig}
        handleChooseAvatar={handleChooseAvatar}
      />
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
    border-radius: 50%;
  }
`;

export default Header;
