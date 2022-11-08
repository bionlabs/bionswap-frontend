import { styled, Button } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

const ButtonCard = ({ shareOf, toggleInputTicketModal, status, toggleYourRewardModal }: any) => {
  return (
    <>
      {status == 0 ? (
        <JoinPoolButton disabled={shareOf > 0} variant="contained" fullWidth onClick={toggleInputTicketModal}>
          Deposit
        </JoinPoolButton>
      ) : status == 1 ?
      (
        <DrawingButton disabled={true} variant="contained" fullWidth>
          <CachedIcon color='inherit' />
          Drawing
        </DrawingButton>
      ): (
        <JoinPoolButton variant="contained" fullWidth onClick={toggleYourRewardModal}>
          Check if you are the winner
        </JoinPoolButton>
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
  display: flex;
  gap: 11px;
`;

export default ButtonCard;
