import { Stack, Typography, Button, styled, Box } from '@mui/material';
import Image from 'next/image';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';

interface TicketBoxProps {
  balanceAirdropTicket: number;
  balanceTicket: number;
}

const TicketBox = ({ balanceAirdropTicket, balanceTicket }: TicketBoxProps) => {
  const configs = [
    {
      type: 0,
      balance: balanceTicket,
      label: `${balanceTicket > 1 ? 'Tickets' : 'Ticket'}`,
      icon: '/images/Tickets.png'
    },
    {
      type: 1,
      balance: balanceAirdropTicket,
      label: `${balanceTicket > 1 ? 'Airdrop tickets' : 'Airdrop ticket'}`,
      icon: '/images/TicketsAirdrop.png'
    },
  ];

  return (
    <Stack width="100%" gap="20px">
      {configs?.map((item: any, index: number) => (
        <>
        <TicketItem key={item.label}>
          <Image src={item.icon} alt={item.label} width="80px" height="80px" />
          <Stack alignItems="start">
            <Typography variant="body3Poppins" fontWeight="400" color="background.paper">
              You have:
            </Typography>
            <Stack direction="row" alignItems="baseline" gap="8px">
              <Typography variant="h4Poppins" fontWeight="600" color="background.paper">
                {item.balance}
              </Typography>
              <Typography variant="body2Poppins" fontWeight="600" color="yellow.500">
                {item.label}
              </Typography>
            </Stack>
          </Stack>
        </TicketItem>
        {
            index !== configs?.length - 1 && <Divider />
        }
        </>
      ))}
      <PurchaseTicketButton variant="contained" fullWidth>
        <Typography lineHeight='100%' color="primary.main">
          <SwapHorizontalCircleIcon fontSize="inherit" color="inherit" />
        </Typography>
        <Typography variant="body3Poppins" fontWeight="500" color="primary.main">
          Purchase Tickets
        </Typography>
      </PurchaseTicketButton>
    </Stack>
  );
};

const TicketItem = styled(Stack)`
  width: 100%;
  flex-direction: row;
  gap: 16px;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.palette.gray[800]};
  border-radius: 6px;
  overflow: hidden;
  padding: 6px;
`;
const PurchaseTicketButton = styled(Button)`
  background-color: #002828;
  box-shadow: none;
  color: ${(props) => props.theme.palette.primary.main};
  padding: 10px 20px;
  gap: 10px;
  align-items: center;
  :hover {
    background-color: #002828;
    box-shadow: none;
    opacity: 0.8;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;
const Divider = styled(Box)`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.palette.gray[800]};
`;

export default TicketBox;
