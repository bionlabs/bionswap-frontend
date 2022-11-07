import React from 'react';
import { Box, styled, Stack, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { useChain, useSingleCallResult } from 'hooks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HeadCard from './components/HeadCard';

interface Props {
  contract: any;
}

const Card = ({ contract }: Props) => {
  const { account } = useChain();

  const totalSlots = Number(useSingleCallResult(contract, 'totalSlots')?.result?.[0] || 0);
  const currentRoundId = Number(useSingleCallResult(contract, 'currentRoundId')?.result?.[0] || 0);
  const nPrizes = Number(useSingleCallResult(contract, 'nPrizes')?.result?.[0] || 0);
  const participantsAtRound = useSingleCallResult(contract, 'getParticipantsAtRound', [currentRoundId])?.result?.[0];
  const shareOf = Number(useSingleCallResult(contract, 'shareOf', [account, currentRoundId])?.result?.[0] || 0);
  const filledSlots = Number(useSingleCallResult(contract, 'filledSlots')?.result?.[0] || 0,);
  const isRoundStart = useSingleCallResult(contract, 'isRoundStart')?.result?.[0] || true;

  const configs = [
    {
      label: 'Participaters',
      value: `${participantsAtRound?.length}`,
    },
    {
      label: 'Your deposited',
      value: `${shareOf} ${shareOf > 1 ? 'tickets' : 'ticket'}`,
    },
    {
      label: 'Pool prize',
      value: `${nPrizes}$`,
    },
  ];

  return (
    <Wrapper>
      <HeadCard totalSlots={totalSlots} filledSlots={filledSlots} currentRoundId={currentRoundId} isRoundStart={isRoundStart} />
      <Stack alignItems="start">
        <Box p="20px 12px" width="100%">
          <Stack width="100%" alignItems="start" gap="20px">
            <Stack width="100%" flexDirection="row" justifyContent="space-between">
              <Typography variant="body3Poppins" fontWeight="400" color="secondary.light" textTransform="uppercase">
                Explode poolsie
              </Typography>
              {shareOf > 0 && (
                <EnteredTag>
                  <Typography fontSize="12px" lineHeight="100%">
                    <CheckCircleIcon color="success" fontSize="inherit" />
                  </Typography>
                  <Typography variant="body6Poppins" fontWeight="600" color="success.main">
                    Entered
                  </Typography>
                </EnteredTag>
              )}
            </Stack>
            <Stack direction="row" alignItems="center" gap="12px">
              <Image src="/images/gamecenter/powerpools/ticketicon.png" alt="" width="47.8px" height="47.8px" />
              <Typography variant="h3Samsung">x{totalSlots} pool</Typography>
            </Stack>
          </Stack>
        </Box>
        <Divider />
        <Stack p="20px 12px" gap="11px" width="100%">
          {configs?.map((item: any) => (
            <Stack key={item.label} flexDirection="row" width="100%" justifyContent="space-between">
              <Typography variant="body4Poppins" fontWeight="400" color="gray.400">
                {item.label}
              </Typography>
              <Typography variant="body4Poppins" fontWeight="500" color="gray.200">
                {item.value}
              </Typography>
            </Stack>
          ))}
          <JoinPoolButton variant="contained" fullWidth>
            Deposit
          </JoinPoolButton>
          <Typography variant="body4Poppins" fontWeight="400" color="primary.main">
            View on BSC
          </Typography>
        </Stack>
      </Stack>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  border-radius: 12px;
  background-color: ${(props) => props.theme.palette.gray[900]};
  width: 339px;
`;
const Divider = styled(Box)`
  border-bottom: 1px solid ${(props) => props.theme.palette.gray[700]};
  width: 100%;
`;
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
const EnteredTag = styled(Box)`
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.gray[800]};
  width: 98px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export default Card;