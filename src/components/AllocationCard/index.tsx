/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';
import { useSingleCallResult, useToken } from 'hooks';
import { usePresaleContract } from 'hooks/useContract';
import { withCatch } from 'utils/error';

interface ProjectItemProps {
  data: any;
  account: string;
}

const AllocationCard: React.FC<ProjectItemProps> = ({ data, account }) => {
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

  const token = useToken(data?.sale?.token);

  const configData = [
    {
      label: 'Available Now',
      value: `${calcClaimableTokenAmount} ${token?.symbol}`,
    },
    {
      label: 'Claimed',
      value: `${tokenAmountClaimed} ${token?.symbol}`,
    },
    {
      label: 'Total',
      value: `${calcPurchasedTokenAmount} ${token?.symbol}`,
    },
    {
      label:
        currentTime < +new Date(vestingTime) || Number(data?.sale?.tgeReleasePercent || 0) / 100 == 100
          ? 'Claim in'
          : 'Next Claim in',
      value:
        currentTime < +new Date(vestingTime) || Number(data?.sale?.tgeReleasePercent || 0) / 100 == 100
          ? new Date(vestingTime).toUTCString()
          : new Date(vestingNextTime[currentCycle]).toUTCString(),
    },
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
  }, [nCycles, vestingTime]);

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
    <WrapBox>
      <Avatar>
        <img src={data?.sale?.banner} alt={data?.sale?.title} />
      </Avatar>
      <WrapText>
        <FlexBox justifyContent="space-between" width="100%" alignItems="center">
          <FlexBox gap="10px" alignItems="center">
            <Logo>
              <img src={data?.sale?.logo} alt={data?.sale?.title} />
            </Logo>
            <FlexBox flexDirection="column">
              <Typography variant="body3Poppins" color="text.primary" fontWeight="500">
                {data?.sale?.title}
              </Typography>
              <Typography variant="body4Poppins" color="#FBB03B" fontWeight="400">
                {token?.symbol}
              </Typography>
            </FlexBox>
          </FlexBox>
          <Status
            sx={{
              backgroundColor: '#FBB03B',
              ...(currentTime >= vestingTime && {
                backgroundColor: '#08878E',
              }),
              ...(currentTime >= vestingNextTime[nCycles - 1] && {
                backgroundColor: '#717D8A',
              }),
            }}
          >
            <Typography variant="captionPoppins" color="text.primary" fontWeight="500">
              {currentTime > vestingNextTime[nCycles - 1] ? 'Closed' : currentTime >= vestingTime ? 'Open' : 'Waiting'}
            </Typography>
          </Status>
        </FlexBox>
        <Line />
        {configData.map((item) => (
            (item.label !== 'Claim in' && item.label !== 'Next Claim in' || tokenAmountClaimed !== calcPurchasedTokenAmount)
          &&
          <FlexBox key={item.label} justifyContent="space-between" alignItems="center">
            <Typography variant="body4Poppins" color="primary.main" fontWeight="400">
              {item.label}
            </Typography>
            <Typography variant="body3Poppins" color="text.primary" fontWeight="500">
              {item.value}
            </Typography>
          </FlexBox>
        ))}
        {tokenAmountClaimed !== calcPurchasedTokenAmount && (
          <>
            {currentTime < vestingTime ? (
              <CTA disabled sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}>
                <Typography variant="body3Poppins" color="gray.400" fontWeight="600">
                  Not Available
                </Typography>
              </CTA>
            ) : currentTime > vestingTime && Number(calcClaimableTokenAmount || 0) !== 0 ? (
              <CTA onClick={handleClaim} sx={{ backgroundColor: 'primary.main' }} disabled={claimLoading}>
                <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                  {claimLoading ? 'Loading.....' : 'Claim'}
                </Typography>
              </CTA>
            ) : (
              <CTA disabled sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}>
                <Typography variant="body3Poppins" color="gray.400" fontWeight="600">
                  Waiting for next claim
                </Typography>
              </CTA>
            )}
          </>
        )}
      </WrapText>
    </WrapBox>
  );
};
const FlexBox = styled(Box)`
  display: flex;
`;
const WrapBox = styled(Box)`
  border-radius: 8px;
  background-color: ${(props) => props.theme.palette.gray[900]};
  width: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.15s ease-in;
  border: 1px solid ${(props) => (props.theme.palette as any).extra.other.tenth};
  width: 100%;

  :hover {
    transform: scale3d(0.99, 0.99, 1);
    transform-style: preserve-3d;
  }
`;
const Avatar = styled(Box)`
  width: 100%;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const WrapText = styled(Box)`
  display: flex;
  padding: 16px 16px 32px;
  flex-direction: column;
  gap: 16px;
`;
const Logo = styled(Box)`
  border: 2px solid ${(props) => (props.theme.palette as any).extra.other.nineth};
  background: #0b0b0c;
  border-radius: 8px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  max-width: 88px;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;

  img {
    width: 100%;
  }
`;
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  margin: auto;
  background-color: ${(props) => (props.theme.palette as any).extra.other.thirteenth}; ;
`;
const Status = styled(Box)`
  border-radius: 4px;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CTA = styled(Button)`
  width: 100%;
  border-radius: 4px;
  width: 100%;
  height: 52px;
`;

export default AllocationCard;
