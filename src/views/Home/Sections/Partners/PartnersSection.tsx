import React from 'react';
import { Box, styled, Typography, Stack, Container, Button } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';
import partners from 'configs/partners';
import Image from 'next/image';
import { useDarkMode } from 'hooks';
 

const Partners = () => {
  const { isMobile, isTablet } = useMediaQuery();
  const {darkMode} = useDarkMode()

  return (
    <Wrapper>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}  
      >
        <Stack gap='60px'>
            <Typography fontSize={isMobile ? '28px' : '54px'} fontFamily={'SamsungSharpSans'} textAlign="center" fontWeight={700}>
                Our partners
            </Typography>
            <Stack direction='row' gap='60px' flexWrap='wrap'>
              {
                partners.map(item =>
                  <Stack
                    key=''
                  >
                    <img src={`/images/partners/${darkMode ? item.logoLight : item.logo}`} alt='' width='130px' />
                  </Stack>  
                )
              }
            </Stack>
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
