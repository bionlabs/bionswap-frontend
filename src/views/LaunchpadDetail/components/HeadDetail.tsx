import * as React from 'react';
import { Box, Link, Breadcrumbs, Typography } from '@mui/material';
import styled from '@emotion/styled';

interface HeadDetailProps {
  avatar: string;
  name: string;
  type: any;
  endTime: number;
  startTime: number;
  unit?: string;
}

const HeadDetail: React.FC<HeadDetailProps> = ({ avatar, name, type, endTime, startTime, unit }) => {
  const currentTime = +new Date();

  return (
    <FlexBox alignItems="center" marginBottom="32px" flexWrap="wrap">
      <Box marginRight="24px">
        <Logo>
          <Box component="img" src={avatar} alt={name} />
        </Logo>
      </Box>
      <FlexBox flex="1" flexDirection="column">
        <FlexBox
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'start', md: 'center' },
            gap: { xs: '5px', md: '20px' },
          }}
        >
          <Typography variant="h1Poppins" color="#F6F6F6" fontWeight="700">
            {name}
          </Typography>
          <FlexBox gap="15px">
            <FlexBox gap="8px" alignItems="center">
              <Box
                component="img"
                src={`/icons/coins/${unit}.svg`}
                alt={unit}
                width="24px"
              />
              <Typography variant="body3Poppins" fontWeight="600" color="gray.200">
                {unit}
              </Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
        <Typography variant="body2Poppins" color="#9B9B9B" fontWeight="400">
          {type}
        </Typography>
      </FlexBox>
      <Box display="flex" alignItems="center">
        <Status
          sx={{
            backgroundColor: 'gray.800',
            ...(currentTime > startTime && {
              backgroundColor: '#08878E',
            }),
            ...(currentTime > endTime && {
              backgroundColor: 'gray.500',
            }),
          }}
        >
          <Typography variant="captionPoppins" color="text.primary" fontWeight="500">
            {currentTime < startTime ? 'Coming Soon' : currentTime < endTime ? 'Sale Open' : 'Sale Closed'}
          </Typography>
        </Status>
      </Box>
    </FlexBox>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const Status = styled(Box)`
  border-radius: 4px;
  padding: 3px 10px 5px;
`;
const Logo = styled(Box)`
  width: 82px;
  height: 82px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #0c1620;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
  }
`;

export default HeadDetail;
