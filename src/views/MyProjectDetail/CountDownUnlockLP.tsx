import React, { useEffect, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';

const CountDownUnlockLP = ({ endTime }: any) => {
  const currentTime = +new Date();

  const calculateTimeLeft = () => {
    let difference;
    difference = +new Date(Number(endTime)) - +new Date();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / 1000 / 60 / 60 / 24),
        hours: Math.floor((difference / 1000 / 60 / 60) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return (
    <UnlockBox>
      <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
        Unlock in
      </Typography>
      <FlexBox gap="8px">
        <FlexBox gap="2px">
          <Typography variant="captionPoppins" color="primary.main" fontWeight="500">
            {timeLeft?.days || 0}
          </Typography>
          <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
            Days
          </Typography>
        </FlexBox>
        <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
          :
        </Typography>
        <FlexBox gap="2px">
          <Typography variant="captionPoppins" color="primary.main" fontWeight="500">
            {timeLeft?.hours || 0}
          </Typography>
          <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
            Hours
          </Typography>
        </FlexBox>
        <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
          :
        </Typography>
        <FlexBox gap="2px">
          <Typography variant="captionPoppins" color="primary.main" fontWeight="500">
            {timeLeft?.minutes || 0}
          </Typography>
          <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
            Minutes
          </Typography>
        </FlexBox>
        <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
          :
        </Typography>
        <FlexBox gap="2px">
          <Typography variant="captionPoppins" color="primary.main" fontWeight="500">
            {timeLeft?.seconds || 0}
          </Typography>
          <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
            Seconds
          </Typography>
        </FlexBox>
      </FlexBox>
    </UnlockBox>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const UnlockBox = styled(Box)`
  background: rgba(7, 224, 224, 0.15);
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

export default CountDownUnlockLP;
