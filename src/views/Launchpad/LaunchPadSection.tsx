import {
  Box,
  styled,
  Typography
} from '@mui/material'
import { MobileProp } from 'configs/Type/Mobile/type'
import React from 'react'
import { crowdfundingConfig } from 'views/Crowdfunding/config'
import Card from './components/Card/Card'
import Title from './components/Title/Title'

const LaunchPadSection = ({isMobile , isTablet , isDesktop}:MobileProp) => {
  return (
    <Wrapper p={isMobile ? '5rem 16px' : '4rem 8rem'}>
      <Section>
        <Title
          title='Feature Project'
        />
        <CardLayout sx={{
          gridTemplateColumns: isMobile ? 'auto' : isTablet ? 'auto auto' : isDesktop ? 'auto auto auto' : 'auto auto auto auto'
        }}>
            {
                crowdfundingConfig?.map((item, idex) => (
                    <Items key=''>
                        <Card data={item} />
                    </Items>
                ))
            }
        </CardLayout>
      </Section>
      <Section>
        <Title
          title='Current Projects'
          isCurrent
          currentMessage='Many ideas waiting for you to reach'
        />
        
        <CardLayout sx={{
          gridTemplateColumns: isMobile ? 'auto' : isTablet ? 'auto auto' : isDesktop ? 'auto auto auto' : 'auto auto auto auto'
        }}>
            {
                crowdfundingConfig?.map((item, idex) => (
                    <Items key=''>
                        <Card data={item} />
                    </Items>
                ))
            }
        </CardLayout>
      </Section>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 62px;
`
const Section = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
const CardLayout = styled(Box)`
  display: grid;
  gap: 32px;
  justify-content: flex-start;
`
const Items = styled(Box)`
  width: 337px
`


export default LaunchPadSection