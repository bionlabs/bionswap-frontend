import React from 'react';
import { Box, styled, Stack, Typography, Button, Divider } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';
import Image from 'next/image';
import Link from 'next/link';

const games = [
  {
    title: 'Power pool',
    status: 'Opening',
    href: '/powerpools',
    image: 'powerpool.svg',
    dailyRewards: 200,
    totalRewards: 50000,
  },
  {
    title: 'Spin drop',
    status: 'Coming soon',
    href: '#',
    image: 'spinslot.svg',
    dailyRewards: 0,
    totalRewards: 0,
  },
  {
    title: 'Lucky wheel',
    status: 'Coming soon',
    href: '#',
    image: 'winkywheel.svg',
    dailyRewards: 0,
    totalRewards: 0,
  },
];

const AllGame = () => {
  const { isTablet , isDesktop } = useMediaQuery();

  return (
    <Stack alignItems="start" width="100%" justifyContent="start" gap="24px">
      <Stack direction="row" gap="10px" justifyContent="start">
        <Stack>
          <Image src="/images/gamecenter/cube.svg" alt="" width={32} height={32} />
        </Stack>
        <Typography fontSize={18} fontWeight={600}>
          All Games
        </Typography>
      </Stack>
      <Grid
        sx={{
          gridTemplateColumns: isTablet ? '100%' : isDesktop ? '1fr 1fr' : '1fr 1fr 1fr',
          gap: '24px',
        }}
      >
        {games.map((item) => (
          <StyledBox key={item.title}>
            <Stack direction="row" width="100%" gap="20px" height="100%">
              <Stack>
                <Image src={`/images/gamecenter/${item.image}`} alt="" width={80} height={80} />
              </Stack>
              <Stack gap="20px" alignItems="start" width="100%">
                <Stack direction="row" width="100%" justifyContent="space-between" gap="20px">
                  <Stack alignItems="start">
                    <Typography fontSize={18} fontWeight={600}>
                      {item.title}
                    </Typography>
                    <Typography fontWeight={500} fontSize={12} color={item.status == 'Opening' ? "success.main" : 'text.secondary'}>
                      {item.status}
                    </Typography>
                  </Stack>
                  <Box>
                    <Link href={`/play${item.href}`}>
                        <Button
                        variant="contained"
                        size='small'
                        sx={{
                            whiteSpace: 'nowrap',
                        }}
                        disabled={item.status == 'Coming soon'}
                        >
                        {item.status == 'Coming soon' ? 'Incoming' : 'Play now'}
                        </Button>
                    </Link>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                  gap="20px"
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <Stack alignItems="start">
                    <Typography fontSize={12} color="text.secondary">
                      Daily drop
                    </Typography>
                    <Typography fontWeight={500}>{item.dailyRewards.toLocaleString()} BION</Typography>
                  </Stack>
                  <Stack alignItems="start">
                    <Typography fontSize={12} color="text.secondary">
                      Total rewards
                    </Typography>
                    <Typography fontWeight={500}>${item.totalRewards.toLocaleString()}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </StyledBox>
        ))}
      </Grid>
    </Stack>
  );
};

const StyledBox = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  border: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  padding: 16px 24px;
  border-radius: 12px;
  transition: 0.12s ease-in;
  cursor: pointer;
  :hover {
    box-shadow: ${(props) => (props.theme.palette as any).extra.card.boxShadow};
  }
`;
const Grid = styled(Box)`
  display: grid;
  width: 100%;
`;

export default AllGame;
