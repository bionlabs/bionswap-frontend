import React from 'react';
import { Box, styled, Stack, Typography, LinearProgress } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';
import Image from 'next/image';
import { useChain } from 'hooks';
import { shortenAddress } from 'utils/format';
import Link from 'next/link';

const ProfileSection = () => {
  const { isTablet } = useMediaQuery();
  const { account } = useChain();
  return (
    <Grid
      sx={{
        gridTemplateColumns: isTablet ? '100%' : '1fr 1fr',
        gap: '24px',
      }}
    >
      <Link href="/dashboard" legacyBehavior>
        <StyledBox>
          <Stack width="100%" gap="20px" direction={isTablet ? 'column' : 'row'} justifyContent="start">
            <Stack
              sx={{
                backgroundColor: (theme) => (theme.palette as any).extra.card.light,
                padding: '10px',
                borderRadius: '50%',
                border: (theme) => `6px solid ${(theme.palette as any).extra.card.hover}`,
              }}
            >
              <Image src="/ranks/icons/oval.svg" alt="" width={40} height={40} />
            </Stack>
            <Stack alignItems="start" width="100%" gap="10px">
              <Stack direction="row" spacing={2} alignItems="baseline" justifyContent="space-between" width="100%">
                <Typography fontSize={20} fontWeight={600}>
                  Anonymous
                </Typography>
                <Typography color="text.secondary">@{shortenAddress(account ?? '')}</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={0}
                color="success"
                sx={{ width: '100%', height: '8px', borderRadius: '999px' }}
              />
              <Stack direction="row" justifyContent="space-between" width="100%">
                <Box>
                  <Typography color="text.secondary">Current: </Typography>
                  <Typography color="extra.ranks.oval" fontWeight={500}>
                    Oval
                  </Typography>
                </Box>
                <Box>
                  <Typography color="text.secondary">Next: </Typography>
                  <Typography color="extra.ranks.axeton" fontWeight={500}>
                    Axeton
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </StyledBox>
      </Link>

      <Grid
        sx={{
          gridTemplateColumns: isTablet ? '100%' : '1fr 1fr',
          gap: '24px',
        }}
      >
        <StyledBox>
          <Stack direction="row" width="100%" gap="20px" height="100%">
            <Stack>
              <Image src="/images/gamecenter/eventSection/WeeklyBonus.svg" alt="" width={60} height={60} />
            </Stack>
            <Stack alignItems="start">
              <Typography fontSize={18} fontWeight={600}>
                Weekly bonus
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                Come to us more often and get bonuses
              </Typography>
            </Stack>
          </Stack>
        </StyledBox>
        <StyledBox>
          <Stack direction="row" width="100%" gap="20px" height="100%">
            <Stack>
              <Image src="/images/gamecenter/eventSection/Giveaways.svg" alt="" width={60} height={60} />
            </Stack>
            <Stack alignItems="start">
              <Typography fontSize={18} fontWeight={600}>
                Give away
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                The higher rank you are, more suprise
              </Typography>
            </Stack>
          </Stack>
        </StyledBox>
      </Grid>
    </Grid>
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
    background-color: ${(props) => (props.theme.palette as any).extra.card.light};
  }
`;
const Grid = styled(Box)`
  display: grid;
  width: 100%;
`;

export default ProfileSection;
