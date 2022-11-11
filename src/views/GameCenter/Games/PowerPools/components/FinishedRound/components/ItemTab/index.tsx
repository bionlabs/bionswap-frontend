import { styled, Button, Typography } from '@mui/material';
import { useSingleCallResult } from 'hooks';

const ItemTab = ({ contract }: any) => {
  const totalSlots = Number(useSingleCallResult(contract, 'totalSlots')?.result?.[0] || 0);

  return (
    <Item>
      <Typography variant="body3Poppins" fontWeight="600" color="gray.500">
        x{totalSlots}
      </Typography>
    </Item>
  );
};

const Item = styled(Button)`
  background-color: #0c1620;
  border-radius: 8px;
  padding: 6px 25px;
`;

export default ItemTab;
