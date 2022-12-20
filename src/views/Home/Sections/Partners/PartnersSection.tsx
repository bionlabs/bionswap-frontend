import React from 'react';
import { Box, styled, Typography, Stack, Container, Button } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';

const Partners = () => {
  const { isMobile, isTablet } = useMediaQuery();
  return (
    <Wrapper>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}  
      >
        <Stack>
            <Typography fontSize={isMobile ? '28px' : '54px'} fontFamily={'SamsungSharpSans-Bold'} textAlign="center">
                Our partners
            </Typography>
        </Stack>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  padding: 4rem 0;
  background-color: ${(props) => (props.theme.palette as any).extra.background.secondary};
`;


export default Partners;
