import { Typography, styled, Box, Stack, IconButton, Divider } from '@mui/material';
import BaseModal from 'components/BaseModal';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import { useSingleCallResult } from 'hooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { shortenAddress } from 'utils/format';
import CloseIcon from '@mui/icons-material/Close';
import { toastError } from 'hooks/useToast';

const rewards = ['1st', '2nd', '2nd'];

const YourRewardModal = ({
  open,
  onDismiss,
  account,
  totalSlots,
  getPrizeDistributions,
  parentContract,
  currentRoundId,
  shareOf,
}: any) => {
  const [isWinner, setIsWinner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prize, setPrize] = useState(0);
  const getWinnersAtRound =
    useSingleCallResult(parentContract, 'getWinnersAtRound', [currentRoundId])?.result?.[0] || [];
  const isUserClaimedPrizes = useSingleCallResult(parentContract, 'isUserClaimedPrizes', [currentRoundId, account])
    ?.result?.[0];

  useEffect(() => {
    getWinnersAtRound?.map((item: any) => {
      if (account == item) {
        setIsWinner(true);
      }
    });
  }, [getWinnersAtRound]);

  useEffect(() => {
    let poolsP = 0;
    getPrizeDistributions?.map((item: any, index: number) => {
      if (account === getWinnersAtRound[index]) {
        poolsP += Number(item || 0);
      }
    });
    setPrize(poolsP);
  }, [getPrizeDistributions, open]);

  const claimReward = async () => {
    try {
      if (!parentContract || !account || !prize) return;
      setIsLoading(true);
      const tx = await parentContract.claim(currentRoundId);
      await tx.wait();
      setIsLoading(false);
    } catch (error) {
      console.log('error===>', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <BaseModal
        open={open}
        sx={{
          maxWidth: '600px',
          width: '100%',
          height: 'auto',
        }}
      >
        <IconButton onClick={onDismiss} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <WrapHeader>
          <Typography variant="h6Poppins" fontWeight="500" color="text.primary">
            Round {currentRoundId}#
          </Typography>
        </WrapHeader>
        <WrapBody>
          <Typography variant="h6Poppins" fontWeight="500" color="text.primary">
            Winners
          </Typography>
          <Stack gap="15px" width="100%" divider={<Divider flexItem />}>
            {rewards?.map((item: any, index: number) => (
              <>
                <Stack
                  key={item}
                  flexDirection="row"
                  gap="12px"
                  width="100%"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography variant="body4Poppins" fontWeight="400" color="text.secondary">
                    {item}
                  </Typography>
                  <Image src="/images/AvatarReward.png" alt="AvatarReward" width={38} height={38} />
                  <Stack alignItems="flex-start">
                    <Typography fontWeight={500}>{shortenAddress(getWinnersAtRound[index])}</Typography>
                    <Typography fontSize={12}>@Anonymous</Typography>
                  </Stack>
                  <Stack marginLeft="auto" alignItems="flex-start">
                    <Typography variant="body4Poppins" fontWeight="400" color="success.main">
                      +{Number(getPrizeDistributions[index] || 0)}{' '}
                      {Number(getPrizeDistributions[index] || 0) > 1 ? 'TICKETS' : 'TICKET'}
                    </Typography>
                    <Typography variant="body4Poppins" fontWeight="400" color="text.secondary">
                      ~{Number(getPrizeDistributions[index] || 0) * 3}$
                    </Typography>
                  </Stack>
                </Stack>
              </>
            ))}
          </Stack>
          <WrapBox>
            {!isWinner ? (
              <Typography variant="body3Poppins" fontWeight="500" color="text.secondary">
                No prizes to claim...
                <br />
                Better luck next time!
              </Typography>
            ) : (
              <Stack width="100%" flexDirection="row" justifyContent="space-between">
                <Stack gap="11px" alignItems="flex-start">
                  <Typography variant="h5Samsung" color="warning.main">
                    🎁 Winner chicken dinner!
                  </Typography>
                  <Typography variant="body3Poppins" color="text.primary" fontWeight="500">
                    Congratulations, you have won
                  </Typography>
                </Stack>
                <Image src="/images/1ticket.png" alt="1ticket.png" width={80} height={80} />
              </Stack>
            )}
          </WrapBox>
          {isWinner && (
            <PrimaryLoadingButton
              disabled={isUserClaimedPrizes}
              onClick={claimReward}
              isLoading={isLoading}
              sx={{ height: '50px' }}
            >
              <Typography variant="body3Poppins" fontWeight="500" color="inherit">
                {!isUserClaimedPrizes ? 'Claim reward' : 'Claimed'}
              </Typography>
            </PrimaryLoadingButton>
          )}
          <Stack width="100%">
            <Typography variant="body4Poppins" fontWeight="400" color="text.secondary">
              View on BscScan
            </Typography>
          </Stack>
        </WrapBody>
      </BaseModal>
    </>
  );
};

const WrapHeader = styled(Box)`
  padding: 16px 24px;
  border-bottom: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
`;
const WrapBody = styled(Stack)`
  padding: 25px;
  width: 100%;
  align-items: flex-start;
  gap: 20px;
`;
const WrapFooter = styled(Box)`
  padding: 28px 25px 20px;
  border-top: 1px solid;
  border-color: ${(props) => (props.theme.palette as any).extra.card.divider};
  text-align: center;
`;
const WrapBox = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 16px;
  border: 1px solid;
  border-color: ${(props) => (props.theme.palette as any).extra.card.divider};
  background-color: ${(props) => (props.theme.palette as any).extra.card.light};
`;

export default YourRewardModal;
