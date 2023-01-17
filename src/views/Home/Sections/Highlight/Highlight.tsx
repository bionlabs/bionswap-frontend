import React from 'react';
import { Box, styled, Typography, Stack, Container, Button } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';
import { RxCheckCircled } from 'react-icons/rx';

const Highlight = () => {
  const { isMobile, isTablet } = useMediaQuery();
  return (
    <Wrapper>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={4}>
          <Typography fontSize={isMobile ? '28px' : '54px'} fontFamily={'SamsungSharpSans'} textAlign="center" fontWeight={700}>
            Use our products to enjoy
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={isMobile ? 2 : 4} width="100%" justifyContent="start">
              <Stack
                sx={{
                  svg: {
                    width: isMobile ? '40px' : '80px',
                    height: isMobile ? '40px' : '80px',
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <RxCheckCircled />
              </Stack>
              <Typography fontSize={isMobile ? '18px' : '40px'}>Launch projects with a few click</Typography>
            </Stack>
            <Stack direction="row" spacing={isMobile ? 2 : 4} width="100%" justifyContent="start">
              <Stack
                sx={{
                  svg: {
                    width: isMobile ? '40px' : '80px',
                    height: isMobile ? '40px' : '80px',
                    color: (theme) => theme.palette.secondary.main,
                  },
                }}
              >
                <RxCheckCircled />
              </Stack>
              <Typography fontSize={isMobile ? '18px' : '40px'}>Low swap fee and fast transaction</Typography>
            </Stack>
            <Stack direction="row" spacing={isMobile ? 2 : 4} width="100%" justifyContent="start">
              <Stack
                sx={{
                  svg: {
                    width: isMobile ? '40px' : '80px',
                    height: isMobile ? '40px' : '80px',
                    color: (theme) => theme.palette.warning.main,
                  },
                }}
              >
                <RxCheckCircled />
              </Stack>
              <Typography fontSize={isMobile ? '18px' : '40px'}>Helping early-bird fly to the moon</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  padding: 4rem 0;
`;

export default Highlight;
