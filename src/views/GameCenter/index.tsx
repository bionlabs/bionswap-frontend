import React from 'react'
import Page from 'components/Page'
import {Box , Container, Stack} from '@mui/material'
import FeaturedGames from './views/FeaturedGames'
import ProfileSection from './views/ProfileSection'

const GameCenter = () => {
  return (
    <Page>
      <Box p='4rem 0'>
        <Container>
          <Stack width='100%' alignItems='start' gap='60px' justifyContent='start'>
            <FeaturedGames/>
            <ProfileSection/>
          </Stack>
            
        </Container>
      </Box>
    </Page>
  )
}

export default GameCenter