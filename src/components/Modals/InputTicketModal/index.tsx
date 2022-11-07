import { Stack, Typography } from '@mui/material';
import BaseModal from 'components/BaseModal';

const InputTicketModal = ({ open, onDismiss }: any) => {
  return (
    <>
      <BaseModal
        open={open}
        sx={{
          padding: '15px',
          maxWidth: '550px',
          width: '100%',
          height: 'auto',
          maxHeight: '749px',
          overflowY: 'auto',
        }}
      >
        <Stack width="100%" gap="20px">
          <Typography>Input tickets</Typography>
        </Stack>
      </BaseModal>
    </>
  );
};

export default InputTicketModal;
