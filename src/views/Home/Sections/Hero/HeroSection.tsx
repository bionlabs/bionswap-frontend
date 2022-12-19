/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, styled, Typography, Stack } from '@mui/material';
import { MobileProp } from 'configs/Type/Mobile/type';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getLaunchpadStats } from 'api/launchpad';
import { MENU_HEIGHT } from 'configs/menu/config';

interface HeroSectionProps extends MobileProp {}

const HeroSection = ({ isMobile, isTablet }: HeroSectionProps) => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSwapTransactions: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getLaunchpadStats();

      setStats(res);
    };

    fetchStats();
  }, []);

  return (
    <Wrapper>
      <Container maxWidth="xl" sx={{zIndex: '1', position: 'relative'}}>
        <Stack spacing={4} textAlign="center">
          <Stack spacing={6}>
            <Stack spacing={1} maxWidth='1162px'>
              <HeroText fontSize={isMobile ? '32px' : '72px'}>Automated Launching Protocols on Multichain AMM Exchange</HeroText>
              {/* <HeroText fontSize={isMobile ? '32px' : '72px'}>
                Protocols on{' '}
                <HeroText
                  fontSize={isMobile ? '32px' : '72px'}
                  sx={{
                    background: (theme) => (theme.palette as any).extra.text.linear,
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color': 'transparent',
                  }}
                >
                  BionNetwork
                </HeroText>
              </HeroText> */}
            </Stack>
            <Line />
            <Typography color="text.secondary" fontSize={isMobile ? '16px' : '34px'} maxWidth="md" lineHeight="150%">
              There are total{' '}
              <Typography fontSize={isMobile ? '16px' : '34px'} fontWeight="700">
                {stats.totalUsers}
              </Typography>{' '}
              users created on our launchpad
            </Typography>
          </Stack>
          <Link href="/launchpad">
            <StyledButton variant="outlined" color="success">
              <Typography fontSize={isMobile ? '14px' : '18px'} color="inherit" fontWeight="inherit">
                Explore projects
              </Typography>
            </StyledButton>
          </Link>
        </Stack>
      </Container>
      <ImageBox mt={isMobile ? 0 : '-90px'}>
        {
          isMobile ?
          <img src="/images/hero_line_mobile.svg" alt="" width='100%' />
          :
          <img src="/images/hero_line.svg" alt="" width='1162px' />
        }
      </ImageBox>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  width: 100%;
  padding-top: 8rem;
`;
const HeroText = styled(Typography)`
  font-weight: 700;
  line-height: 1.2;
  font-family: 'SamsungSharpSans-Bold';
`;
const Line = styled(Box)`
  width: 151px;
  border-top: 3px solid ${(props) => props.theme.palette.text.primary};
`;
const StyledButton = styled(Button)`
  padding: 15px 30px;
  border-radius: 0;
  border-width: 3px;
  :hover {
    border-width: 3px;
  }
`;
const ImageBox = styled(Box)`
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: stretch;
  text-align: right;
`

export default HeroSection;
