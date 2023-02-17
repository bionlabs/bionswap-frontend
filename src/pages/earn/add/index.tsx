import { Box, Button, Container, FormControlLabel, Select, styled, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Page from 'components/Page';
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AddPool = ({ chainId }: any) => {
  const [view, setView] = useState<string | null>('card');
  const router = useRouter();
  const [iconColor, setIconColor] = useState('#475569');
  const handleChangeView = (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const settings = {
    arrows: false,
    speed: 500,
    swipeToSlide: true,
    infinite: false,
    variableWidth: true,
  };

  return (
    <Page>
      <Container>
        <Wrapper>
          <Stack width="100%" alignItems="start" spacing={6}>
            <Box display="flex" justifyContent="center">
              <HomeIcon
                sx={{
                  color: iconColor,
                  cursor: 'pointer',
                  marginRight: '8px',
                }}
                onMouseOver={() => setIconColor('white')}
                onMouseOut={() => setIconColor('#475569')}
                onClick={() => router.replace('/earn')}
                fontSize="small"
              />
              <ArrowForwardIosIcon
                sx={{
                  color: '#475569',
                  marginRight: '8px',
                }}
                fontSize="small"
              />
              <Typography fontSize="14px" fontWeight="500">
                Add
              </Typography>
            </Box>
          </Stack>
        </Wrapper>
      </Container>
    </Page>
  );
};

const Wrapper = styled(Box)`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 62px;
`;

export default AddPool;
