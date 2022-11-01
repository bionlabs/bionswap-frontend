import Page from 'components/Page'
import React from 'react'
import {
    Box,
    styled,
    Stack,
    IconButton,
    Button,
    useMediaQuery
} from '@mui/material'
import Banner from './components/Banner'
import Layout from './components/Layout'
import Card from './components/Card'
import Image from 'next/image'

const PowerPools = () => {
  const isMobile = useMediaQuery('(max-width:700px)');
  return (
    <Page>
        <Banner/>
        <Layout>
            <Stack direction='row' alignItems='center' spacing={2} justifyContent='start'>
              <StyledIconButton>
                  <Image src='/icons/message-question.svg' alt='' width='21px' height='21px' />
              </StyledIconButton>
              <StyledIconButton>
                  <Image src='/icons/cup.svg' alt='' width='21px' height='21px' />
              </StyledIconButton>
              <StyledButton
                variant='contained'
              >
                Your rewards
              </StyledButton>
            </Stack>
            <Grid
             sx={{
                gridTemplateColumns: isMobile ? 'auto' : 'auto auto auto'
             }}
            >
              <Card
                id={123456}
                status='Live'
                totalTickets={50}
                joined={24}
                maxJoined={50}
                poolPrize={135}
              />
              <Card
                id={123456}
                status='Live'
                totalTickets={200}
                joined={30}
                maxJoined={200}
                poolPrize={540}
              />
              <Card
                id={123456}
                status='Live'
                totalTickets={1000}
                joined={24}
                maxJoined={1000}
                poolPrize={2700}
              />
              
            </Grid>
            
        </Layout>
    </Page>
  )
}

const StyledIconButton = styled(IconButton)`
  background-color: ${props => props.theme.palette.gray[900]};
  border: 1px solid ${props => props.theme.palette.gray[700]};
  border-radius: 8px;
  padding: 14px;
`
const StyledButton = styled(Button)`
  background-color: ${props => props.theme.palette.gray[900]};
  color: ${props => props.theme.palette.text.primary};
  border: 1px solid ${props => props.theme.palette.gray[700]};
  border-radius: 8px;
  padding: 14px;
  transition: .12s ease-in;
  :hover {
    background-color: ${props => props.theme.palette.gray[900]};
    box-shadow: none;
    opacity: .8;
  }
`
const Grid = styled(Box)`
  display: grid;
  justify-content: center;
  margin-top: 35px;
  gap: 20px;
`


export default PowerPools