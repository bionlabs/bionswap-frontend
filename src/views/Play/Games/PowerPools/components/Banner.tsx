import React, { useState } from 'react';
import { Box, styled, Stack, Typography, Container, Button } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';
import { useBionTicket } from 'hooks/useContract';
import { useChain, useSingleCallResult } from 'hooks';
import Image from 'next/image';

const Banner = () => {
  const { isMobile, isTablet } = useMediaQuery();
  const bionTicketContract = useBionTicket();
  const { account, chainId } = useChain();

  const balanceOfAirdropTicket = Number(
    useSingleCallResult(bionTicketContract, 'balanceOf', [account, 1])?.result?.[0] || 0,
  );
  const balanceOfNormalTicket = Number(
    useSingleCallResult(bionTicketContract, 'balanceOf', [account, 0])?.result?.[0] || 0,
  );

  const [open, setOpen] = useState(false);

  const configs = [
    {
      value: 5000,
      label: 'Round Rewards',
      icon: '/images/Tickets.png',
      unit: 'USDT',
    },
    {
      value: balanceOfNormalTicket,
      label: 'Bion Tickets',
      icon: '/images/Tickets.png',
      unit: 'Tickets',
    },
    {
      value: balanceOfAirdropTicket,
      label: 'Free tickets',
      icon: '/images/TicketsAirdrop.png',
      unit: 'Tickets',
    },
  ];

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Wrapper>
      <Container>
        <Stack direction={isTablet ? 'column' : 'row'} width="100%" gap="25px" justifyContent="space-between">
          <Stack alignItems="start" gap="15px">
            <Stack alignItems="start">
              <Typography fontSize={28} fontWeight={700} fontFamily="SamsungSharpSans">
                Power Pools
              </Typography>
              <Typography fontSize={19} sx={{ color: 'text.secondary' }}>
                Get tickets, join pool and hope for the win. It&apos;s easy!
              </Typography>
            </Stack>

            <Stack direction="row" gap='20px'>
              <Button variant="contained">Buy ticket</Button>
              <Button variant='outlined'>Learn more</Button>
            </Stack>
          </Stack>
          <Grid
            sx={{
              gridAutoColumns: 'minmax(0px, 1fr)',
              gridAutoFlow: isMobile ? 'row' : 'column',
              width: isMobile ? '100%' : 'auto',
            }}
          >
            {configs.map((item) => (
              <Card key={`key:${item.label}`}>
                <Stack direction="row" gap="10px" justifyContent="space-between" width="100%">
                  <Stack
                    sx={{
                      backgroundColor: (theme) => (theme.palette as any).extra.card.light,
                      borderRadius: '4px',
                    }}
                  >
                    <Image src={item.icon} alt="" width={50} height={50} />
                  </Stack>
                  <Stack alignItems="end">
                    <Typography fontSize={14} color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography fontSize={18} fontWeight={600}>
                      {item.value}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  // background: url('/images/gamecenter/powerpools/powerpoolbanner.png');
  // background-size: cover;
  // background-repeat: no-reapeat;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background-color: ${(props) => props.theme.palette.background.default};
  padding: 5rem 0;
`;
const Grid = styled(Box)`
  display: grid;
  gap: 12px;
`;
const Card = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  border: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  border-radius: 4px;
  padding: 16px;
`;

export default Banner;
