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
  import { useCallback, useState } from 'react';
  import CloseIcon from '@mui/icons-material/Close';
  import { useStandardTokenContractFactory } from 'hooks/useContract';
  import { parseEther } from 'ethers/lib/utils';
  
  const tokenTypes = [
    {
      value: 0,
      title: 'Standard Token',
    },
  ];
  
  const AvatarModal = ({ open, onDismiss, avatars }: any) => {
    return (
      <BaseModal
        open={open}
        sx={{
          padding: '24px',
          maxWidth: '556px',
          width: '100%',
          height: '90vh',
          overflowY: 'auto',
        }}
      >
        <IconButton onClick={onDismiss} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <FlexBox gap='30px' flexWrap='wrap'>
            {
                avatars?.map((item: any) => (
                    <Avarta key={item.title}>
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

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
  `;
  const InputCustom = styled(OutlinedInput)`
    fieldset {
      display: none;
    }
  
    input {
      font-family: 'Poppins', sans-serif;
      padding: 12px 16px;
      border: 1px solid;
      border-color: ${(props) => props.theme.palette.gray[700]};
      border-radius: 4px;
      font-weight: 400;
      font-size: 14px;
      line-height: 180%;
      color: ${(props) => props.theme.palette.text.primary};
  
      &::placeholder {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 180%;
        color: ${(props) => props.theme.palette.gray[700]};
        opacity: 1;
      }
    }
  
    &.Mui-focused {
      input {
        border-color: #9a6aff;
        box-shadow: rgba(175, 137, 255, 0.4) 0px 0px 0px 2px, rgba(175, 137, 255, 0.65) 0px 4px 6px -1px,
          rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
      }
    }
  
    &.onError {
      input {
        border-color: ${(props) => props.theme.palette.red[500]};
        box-shadow: none;
      }
    }
  `;
  const CheckboxCustom = styled(Checkbox)`
    color: ${(props) => props.theme.palette.gray[400]};
  `;
  const CreateToken = styled(Button)`
    width: 100%;
    height: 52px;
    align-item: center;
    justify-content: center;
    display: flex;
    background-color: ${(props) => props.theme.palette.primary.main};
    border-radius: 4px;
  
    &.Mui-disabled {
      color: rgba(255, 255, 255, 0.3);
      box-shadow: none;
      background-color: rgba(255, 255, 255, 0.12);
    }
  `;
  
  export default AvatarModal;
  