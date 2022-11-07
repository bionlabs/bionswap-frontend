import { styled, Button } from '@mui/material';

const ButtonCard = ({ shareOf, toggleInputTicketModal, status }: any) => {
  console.log("🚀 ~ file: index.tsx ~ line 4 ~ ButtonCard ~ status", status)
  return (
    <>
      {status == 0 ? (
        <JoinPoolButton disabled={shareOf > 0} variant="contained" fullWidth onClick={toggleInputTicketModal}>
          Deposit
        </JoinPoolButton>
      ) : (
        <DrawingButton disabled={true} variant="contained" fullWidth onClick={toggleInputTicketModal}>
          Drawing
        </DrawingButton>
      )}
    </>
  );
};

const JoinPoolButton = styled(Button)`
  font-weight: 600;
  transition: 0.12s ease-in;
  padding: 10px 20px;
  :hover {
    background-color: ${(props) => props.theme.palette.primary.main};
    box-shadow: none;
    opacity: 0.8;
  }
`;
const DrawingButton = styled(Button)`
  font-weight: 600;
  transition: 0.12s ease-in;
  padding: 10px 20px;
  background: ${(props) => props.theme.palette.gray[400]};
`;

export default ButtonCard;
