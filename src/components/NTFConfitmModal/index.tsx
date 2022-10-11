import { Box, Button, IconButton, styled, Typography } from '@mui/material';
import { BaseModal } from 'components';
import CloseIcon from '@mui/icons-material/Close';
import { getMetaData } from 'api/avatar';
import { useEffect, useState } from 'react';

// const avatars = [

// ]

const NTFConfitmModal = ({ open, onDismiss, tokenId }: any) => {
  const [dataClaim, setDataClaim] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMetaData(tokenId);
        setDataClaim(data);
      } catch (error) {
        console.log('error===>', error);
      }
    };

    getData();
  }, [tokenId]);

  return (
    <BaseModal
      open={open}
      sx={{
        padding: '24px',
        maxWidth: '556px',
        width: '100%',
        overflowY: 'auto',
      }}
    >
      <IconButton onClick={onDismiss} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon />
      </IconButton>
      <Avarta flexDirection="column" gap="20px">
        <Typography variant='h5Samsung' color='text.primary' fontWeight='700'>
          You have got
          <Typography variant='h5Samsung' color='primary.main' fontWeight='700'> {dataClaim?.name}</Typography>
          </Typography>
        <img src={`/images/bitendoGameboy/${dataClaim?.typeId}.svg`} alt="" />
        <Confirm onClick={onDismiss}>
          <Typography variant="body3Poppins" fontWeight="600" color="#000000">
            Confirm
          </Typography>
        </Confirm>
      </Avarta>
    </BaseModal>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const Avarta = styled(Box)`
  display: flex;

  img {
    width: 290px;
    height: auto;
    display: block;
    margin: auto;
  }
`;
const Confirm = styled(Button)`
  border-radius: 4px;
  width: 100%;
  height: 52px;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

export default NTFConfitmModal;
