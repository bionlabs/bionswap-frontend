import React from 'react'
import {
  Box,
  Stack,
  Typography,
  styled,
  Button
} from '@mui/material'
import useMediaQuery from 'hooks/useMediaQuery'

const FeaturedGames = () => {
  const {isTablet} = useMediaQuery();

  return (
    <Grid
      sx={{
        gridTemplateColumns: isTablet ? '100%' : '1fr 1fr'
      }}
    >
      <WrapBox
        sx={{
          height: isTablet ? '200px' : '300px',
          backgroundImage: `url('/images/gamecenter/featuredGames/SpinDrop.png')`
        }}
      >
        <Stack height='100%' width={isTablet ? '100%' : '50%'} alignItems='start' gap='24px'>
          <Stack alignItems='start'>
            <Typography fontSize={isTablet ? 32 : 40} fontFamily='SamsungSharpSans-Bold' textTransform='uppercase' color='#FFF'>
              Spin Drop
            </Typography>
            <Typography color='#A8B0B9'>
              Welcome to spin and win game. Play and enjoy
            </Typography>
          </Stack>
          <Button
            variant='contained'
            size='large'
            disabled
          >
            Coming soon
          </Button>
        </Stack>
      </WrapBox>

      <WrapBox
        sx={{
          height: isTablet ? '200px' : '300px',
          backgroundImage: `url('/images/gamecenter/featuredGames/PowerPool.png')`
        }}
      >
        <Stack height='100%' width='100%' alignItems='end'>
          <Stack height='100%' width={isTablet ? '100%' : '50%'} alignItems='end' gap='24px'>
            <Stack alignItems='end' textAlign='end'>
              <Typography fontSize={isTablet ? 32 : 40} fontFamily='SamsungSharpSans-Bold' textTransform='uppercase' color='#FFF'>
                Spin Drop
              </Typography>
              <Typography color='#FAFAFA'>
                Welcome to spin and win game. Play and enjoy
              </Typography>
            </Stack>
            <Button
              variant='contained'
              size='large'
            >
              Coming soon
            </Button>
          </Stack>
        </Stack>
      </WrapBox>
    </Grid>
  )
}

const Grid = styled(Box)`
  display: grid;
  gap: 24px;
  width: 100%;
`
const WrapBox = styled(Box)`
  border-radius: 12px;
  width: inherit;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  padding: 30px;
`

export default FeaturedGames