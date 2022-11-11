import React, { useState, useEffect } from 'react';
import { Box, styled, Stack, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { useChain, useSingleCallResult } from 'hooks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HeadCard from './components/HeadCard';
import InputTicketModal from 'components/Modals/InputTicketModal';
import ButtonCard from './components/ButtonCard';
import YourRewardModal from 'components/Modals/YourRewardModal';
import CountDownComponent from './components/CountDownComponent';
import Link from 'next/link';
import { ChainId } from '@bionswap/core-sdk';

interface Props {
  contract: any;
}

const linkAddress = {
  [ChainId.BSC_TESTNET]: {
    address: 'https://testnet.bscscan.com/address/',
  },
};

const Card = ({ contract }: Props) => {
  const { account, chainId } = useChain();
  const [openInputTicketModal, setOpenInputTicketModal] = useState(false);
  const [openYourRewardModal, setOpenYourRewardModal] = useState(false);
  const [status, setStatus] = useState(0);
  const [poolPrize, setPoolPrize] = useState(0);
  const currentTime = +new Date();

  const totalSlots = Number(useSingleCallResult(contract, 'totalSlots')?.result?.[0] || 0);
  const currentRoundId = Number(useSingleCallResult(contract, 'currentRoundId')?.result?.[0] || 0);
  const participantsAtRound = useSingleCallResult(contract, 'getParticipantsAtRound', [currentRoundId])?.result?.[0];
  const shareOf = Number(useSingleCallResult(contract, 'shareOf', [account, currentRoundId])?.result?.[0] || 0);
  const filledSlots = Number(useSingleCallResult(contract, 'filledSlots')?.result?.[0] || 0);
  const isRoundStart = useSingleCallResult(contract, 'isRoundStart')?.result?.[0];
  const getPrizeDistributions = useSingleCallResult(contract, 'getPrizeDistributions')?.result?.[0] || [];
  const lastDrawnTime = Number(useSingleCallResult(contract, 'lastDrawnTime')?.result?.[0] || 0) * 1000 + 90000;

  const toggleInputTicketModal = () => {
    setOpenInputTicketModal(!openInputTicketModal);
  };

  const toggleYourRewardModal = () => {
    setOpenYourRewardModal(!openYourRewardModal);
  };

  const configs = [
    // {
    //   label: 'Participaters',
    //   value: `${participantsAtRound?.length}`,
    // },
    {
      label: 'Your deposited',
      value: `${shareOf} ${shareOf > 1 ? 'tickets' : 'ticket'}`,
    },
    {
      label: 'Pool prize',
      value: `${poolPrize * 3}$`,
    },
    {
      label: 'Filled Slots',
      value: `${filledSlots}/${totalSlots}`,
    },
  ];

  //   Check status - 0:live - 1:drawing - 2:ended -
  useEffect(() => {
    if (isRoundStart) {
      setStatus(0);
    } else if (totalSlots === filledSlots) {
      setStatus(1);
    } else {
      setStatus(2);
    }
  }, [isRoundStart, totalSlots, filledSlots]);

  useEffect(() => {
    let poolsP = 0;
    getPrizeDistributions?.map((item: any) => {
      poolsP += Number(item || 0);
    });
    setPoolPrize(poolsP);
  }, [getPrizeDistributions]);

  return (
    <>
      <Wrapper>
        <HeadCard
          totalSlots={totalSlots}
          filledSlots={filledSlots}
          currentRoundId={currentRoundId}
          isRoundStart={isRoundStart}
          status={status}
        />
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
            {currentTime <= lastDrawnTime && (
              <Stack flexDirection="row" width="100%" justifyContent="space-between">
                <Typography variant="body4Poppins" fontWeight="400" color="gray.400">
                  Next round starts
                </Typography>
                <CountDownComponent time={lastDrawnTime} />
              </Stack>
            )}
            {currentTime >= lastDrawnTime && (
              <Stack flexDirection="row" width="100%" justifyContent="space-between">
                <Typography variant="body4Poppins" fontWeight="400" color="gray.400">
                  Participate
                </Typography>
                <Typography variant="body4Poppins" fontWeight="500" color="gray.200">
                  {participantsAtRound?.length || 0}
                </Typography>
              </Stack>
            )}
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
            <ButtonCard
              toggleInputTicketModal={toggleInputTicketModal}
              status={status}
              toggleYourRewardModal={toggleYourRewardModal}
            />
            <Typography variant="body4Poppins" fontWeight="400" color="primary.main">
              View on BscScan
            </Typography>
          </Stack>
        </Stack>
      </Wrapper>
      <InputTicketModal
        open={openInputTicketModal}
        onDismiss={toggleInputTicketModal}
        account={account}
        totalSlots={totalSlots}
        filledSlots={filledSlots}
        parentContract={contract}
        currentRoundId={currentRoundId}
        shareOf={shareOf}
      />
      <YourRewardModal
        open={openYourRewardModal}
        onDismiss={toggleYourRewardModal}
        parentContract={contract}
        currentRoundId={currentRoundId === 0 ? currentRoundId : currentRoundId - 1}
        getPrizeDistributions={getPrizeDistributions}
        account={account}
      />
    </>
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
