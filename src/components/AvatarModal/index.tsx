import { Box, IconButton, styled, Typography } from '@mui/material';
import { BaseModal } from 'components';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { useState, useEffect } from 'react';

const AvatarModal = ({ open, onDismiss, avatars, handleChooseAvatar }: any) => {
  const [avatar, setAvatar] = useState<any>(null)

  useEffect(() => {
    setAvatar(null)
  }, [open])

  const onChooseAvatar = (item: any) => {
    console.log('item===>', item);
    setAvatar(item)
  }
  
  return (
    <BaseModal
      open={open}
      sx={{
        padding: '24px',
        maxWidth: '588px',
        width: '100%',
        overflowY: 'auto',
        minHeight: '453px',
        display: 'flex  '
      }}
    >
      <IconButton onClick={onDismiss} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon />
      </IconButton>
      <FlexBox flexDirection="column" gap="20px" width='100%' minHeight='100%'>
        <Typography variant="h5Samsung" fontWeight="700" color="text.primary">
          Change avatar
        </Typography>
        <FlexBox gap="20px" flexWrap="wrap">
          <Avarta className={avatar === '' ? 'active' : ''} onClick={() => onChooseAvatar('')}>
            <img src={`/images/bitendoGameboy/Default.svg`} alt="Default" />
          </Avarta>
          {avatars?.map((item: any, index: number) => (
            <Avarta className={avatar?._id === item?._id ? 'active' : ''} key={item.tokenId} onClick={() => onChooseAvatar(item)}>
              <img src={`/images/bitendoGameboy/${item.typeId}.svg`} alt={item.tokenId} />
            </Avarta>
          ))}
        </FlexBox>
        <ConfirmButton onClick={() => handleChooseAvatar(avatar?._id)}>
          <Typography variant="body3Poppins" color="#000000" fontWeight="600">
            Comfirm
          </Typography>
        </ConfirmButton>
      </FlexBox>
    </BaseModal>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const Avarta = styled(Box)`
  width: 120px;
  height: 120px;
  border: 2px solid rgb(12, 22, 32);
  overflow: hidden;
  cursor: pointer;

  &.active {
    border: 2px solid #07E0E0;
    border-radius: 8px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ConfirmButton = styled(LoadingButton)`
  width: 100%;
  height: 52px;
  background-color: #07e0e0;
  margin-top: auto;
`;

export default AvatarModal;
