/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, styled, Typography , Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';
import { useSingleCallResult, useToken } from 'hooks';
import { usePresaleContract } from 'hooks/useContract';
import { withCatch } from 'utils/error';
import Image from 'next/image';
import useMediaQuery from 'hooks/useMediaQuery';
import Link from 'next/link';

interface ProjectItemProps {
  data: any;
  account: string;
}

const AllocationCard: React.FC<ProjectItemProps> = ({ data, account }) => {
  const {isDesktop} = useMediaQuery()
  const [claimLoading, setClaimLoading] = useState(false);
  const [vestingNextTime, setVestingNextTime] = useState<any>([]);
  const currentTime = +new Date();
  const presaleContract = usePresaleContract(data?.sale?.saleAddress || '');
  const quoteToken = useToken(data?.quoteToken);
  const [decimals, setDecimals] = useState(18);

  useEffect(() => {
    const handleCheckDecimal = () => {
      if (data?.isQuoteETH) {
        setDecimals(18);
      } else {
        setDecimals(quoteToken?.decimals || 9);
      }
    };

    handleCheckDecimal();
  }, [quoteToken, data]);

  const tokenAmountClaimed = formatUnits(
    useSingleCallResult(presaleContract, 'purchaseDetails', [account])?.result?.[2] || 0,
    decimals,
  );
  const calcClaimableTokenAmount = formatUnits(
    useSingleCallResult(presaleContract, 'calcClaimableTokenAmount', [account])?.result?.[0] || 0,
    decimals,
  );
  // const calcClaimableTokenAmount =
  //   useSingleCallResult(presaleContract, 'calcClaimableTokenAmount', [account])?.result;
  const calcPurchasedTokenAmount = formatUnits(
    useSingleCallResult(presaleContract, 'calcPurchasedTokenAmount ', [account])?.result?.[0] || 0,
    decimals,
  );

  const vestingTime = data?.sale?.tgeDate * 1000;
  const nCycles = Math.ceil(
    data?.sale?.cycleReleasePercent
      ? (10000 - Number(data?.sale?.tgeReleasePercent || 0)) / Number(data?.sale?.cycleReleasePercent)
      : 0,
  );
  const currentCycle = Math.ceil((currentTime - vestingTime) / (data?.sale?.cycleDuration * 1000));

  const token = useToken(data?.sale?.token, true);

  const configData = [
    {
      label: 'Available to claim',
      value: `${calcClaimableTokenAmount} ${token?.symbol}`,
    },
    {
      label: 'Claimed',
      value: `${tokenAmountClaimed} ${token?.symbol}`,
    },
    {
      label: 'Your allocation',
      value: `${calcPurchasedTokenAmount} ${token?.symbol}`,
    }
  ];

  useEffect(() => {
    const CalculateCycle = () => {
      let indents = [];
      for (var i = 0; i < nCycles; i++) {
        indents.push(+new Date(Number(data?.sale?.tgeDate || 0) + Number(data?.sale?.cycleDuration || 0) * i));
      }
      setVestingNextTime(indents);
    };

    CalculateCycle();
  }, [data?.sale?.cycleDuration, data?.sale?.tgeDate, nCycles, vestingTime]);

  const handleClaim = async () => {
    try {
      setClaimLoading(true);
      const { error, result: tx } = await withCatch<any>(presaleContract?.claim());
      const receipt = await tx.wait();
      setClaimLoading(false);
    } catch (error: any) {
      setClaimLoading(false);
    }
  };

  return (
    <Link href={`/launchpad/${data.saleAddress}`} legacyBehavior>
    <WrapBox flexDirection={isDesktop ? 'column' : 'row'}>
      <Box position='relative'>
        <Avatar>
          <img src={data?.sale?.banner} alt={data?.sale?.title} width={isDesktop ? '100%' : 380} height='222px' />
        </Avatar>
        <Status
          sx={{
            backgroundColor: theme => (theme.palette as any).extra.card.disable,
            ...(currentTime >= vestingTime && {
              backgroundColor: 'success.main',
            }),
            ...(currentTime >= vestingNextTime[nCycles - 1] && {
              backgroundColor: theme => (theme.palette as any).extra.card.disable,
            }),
          }}
        >
          {currentTime > vestingNextTime[nCycles - 1] ? 'Closed' : currentTime >= vestingTime ? 'Open' : 'Waiting'}
        </Status>
      </Box>
      <WrapText>
        <FlexBox justifyContent="space-between" width="100%" alignItems="center">
          <FlexBox gap="10px" alignItems="center">
            <Logo>
              <img src={data?.sale?.logo} alt={data?.sale?.title} />
            </Logo>
            <FlexBox flexDirection="column">
              <Typography fontSize='24px' fontWeight="500">
                {data?.sale?.title}
              </Typography>
              <Typography fontSize='14px' color="primary.main">
                ${token?.symbol}
              </Typography>
            </FlexBox>
          </FlexBox>
          <Stack alignItems='end'>
            <Typography fontWeight={500}>
              {currentTime < +new Date(vestingTime) || Number(data?.sale?.tgeReleasePercent || 0) / 100 == 100
          ? 'Claim in'
          : 'Next Claim in'}
            </Typography>
            <Typography color='text.secondary' fontSize={14}>
              {currentTime < +new Date(vestingTime) || Number(data?.sale?.tgeReleasePercent || 0) / 100 == 100
          ? new Date(vestingTime).toLocaleString()
          : new Date(vestingNextTime[currentCycle]).toLocaleString()}
            </Typography>
          </Stack>
        </FlexBox>
        <Stack justifyContent='start' alignItems='start' gap='15px' width='100%'>
          {configData.map((item) => (
              (item.label !== 'Claim in' && item.label !== 'Next Claim in' || tokenAmountClaimed !== calcPurchasedTokenAmount)
            &&
            <FlexBox width='100%' key={item.label} justifyContent="space-between" alignItems="center">
              <Typography fontSize='14px' color="text.secondary" lineHeight='1'>
                {item.label}
              </Typography>
              <Typography color="text.primary" lineHeight='1'>
                {item.value}
              </Typography>
            </FlexBox>
          ))}
        </Stack>
        {tokenAmountClaimed !== calcPurchasedTokenAmount && (
          <>
            {currentTime < vestingTime ? (
              <CTA variant='contained' disabled>
                Not Available
              </CTA>
            ) : currentTime > vestingTime && Number(calcClaimableTokenAmount || 0) !== 0 ? (
              <CTA variant='contained' color='success' onClick={handleClaim} disabled={claimLoading}>
                {claimLoading ? 'Loading.....' : 'Claim'}
              </CTA>
            ) : (
              <CTA variant='contained' disabled>
                Waiting for next claim
              </CTA>
            )}
          </>
        )}
      </WrapText>
    </WrapBox>
    </Link>
    
  );
};
const FlexBox = styled(Box)`
  display: flex;
`;
const WrapBox = styled(Box)`
  border-radius: 8px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  border: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  width: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.15s ease-in;
  width: 100%;
  display: flex;
  padding: 16px;
  gap: 16px;
  :hover {
    transform: scale3d(1.01, 1.01, 1);
    transform-style: preserve-3d;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;
const Avatar = styled(Box)`
  position: relative;
  img {
    object-fit: cover;
    border-radius: 8px;
  }
`;
const WrapText = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`;
const Logo = styled(Stack)`
  background: ${(props) => (props.theme.palette as any).extra.card.background};
  max-width: 88px;
  width: 100%;
  height: 100%;
  img {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Status = styled(Box)`
  border-radius: 4px;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  top: 8px;
  left: 8px;
`;
const CTA = styled(Button)`
  border-radius: 4px;
  padding: 8px 20px;
`;

export default AllocationCard;
