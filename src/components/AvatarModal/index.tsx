import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    MenuItem,
    OutlinedInput,
    Select,
    styled,
    Typography,
  } from '@mui/material';
  import { BaseModal } from 'components';
  import CloseIcon from '@mui/icons-material/Close';
  
  const AvatarModal = ({ open, onDismiss, avatars, handleChooseAvatar }: any) => {
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
        <FlexBox gap='30px' flexWrap='wrap'>
            {
                avatars?.map((item: any) => (
                    <Avarta key={item.title} onClick={() => handleChooseAvatar(item.avatar)}>
                        <img src={item.avatar} alt={item.title} />
                    </Avarta>
                ))
            }
        </FlexBox>
      </BaseModal>
    );
  };
  
  const FlexBox = styled(Box)`
    display: flex;
  `;
  const Avarta = styled(Box)`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid rgb(12, 22, 32);
    overflow: hidden;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
  `;
  
  export default AvatarModal;
  