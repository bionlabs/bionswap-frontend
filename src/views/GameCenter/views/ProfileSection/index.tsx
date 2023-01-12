import React from 'react';
import { Box, styled, Stack, Typography, LinearProgress } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';
import Image from 'next/image';
import { useChain } from 'hooks';
import { shortenAddress } from 'utils/format';

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
      <StyledBox>
        <Stack width="100%" gap="20px" direction="row" justifyContent="start">
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
            <Typography fontSize={20} fontWeight={600}>
              {shortenAddress(account ?? '')}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={0}
              color="success"
              sx={{ width: '100%', height: '8px', borderRadius: '999px' }}
            />
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Box>
                <Typography color="text.secondary">Current: </Typography>
                <Typography color="extra.ranks.oval" fontWeight={600}>
                  Oval
                </Typography>
              </Box>
              <Box>
                <Typography color="text.secondary">Next: </Typography>
                <Typography color="extra.ranks.axeton" fontWeight={600}>
                  Axeton
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </StyledBox>
      <Grid
      sx={{
        gridTemplateColumns: isTablet ? '100%' : '1fr 1fr',
        gap: '24px',
      }}
      >
        <StyledBox>
            <Stack direction='row' width='100%' gap='20px'>

            </Stack>
        </StyledBox>
        <StyledBox>
            <Stack direction='row' width='100%' gap='20px'>

            </Stack>
        </StyledBox>
      </Grid>
    </Grid>
  );
};

const StyledBox = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  border: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
  padding: 24px;
  border-radius: 12px;
`;
const Grid = styled(Box)`
  display: grid;
  width: 100%;
`;

export default ProfileSection;
