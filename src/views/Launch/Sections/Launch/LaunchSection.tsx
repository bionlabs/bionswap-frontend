/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Button,
    Container,
    Typography,
    styled
} from '@mui/material'
import Image from "next/image";
import { MobileProp } from 'configs/Type/Mobile/type'
import { useRouter } from "next/router";
import PrimaryButton from 'components/PrimaryButton';

const LaunchSection = ({ isMobile , isTablet }: MobileProp) => {
    const router = useRouter();

    return (
        <Box sx={{
            backgroundColor: '#fff', color: '#0b0b0b'
        }}>
            <Wrapper padding='8rem 16px'>
                <FlexBox flexDirection='column' gap='21px' maxWidth='658px' textAlign='center' alignItems='center'>
                    <Typography variant='h2' sx={{
                        color: 'extra.text.dark'
                    }}>
                        Why launch <span style={{color: '#6803B8', fontSize:'inherit', fontWeight:'inherit'}}>with us!</span>
                    </Typography>
                </FlexBox>
                <FlexBox flexDirection={isTablet ? 'column' : 'row'} alignItems='center' justifyContent='center' gap='42px'>
                    <InfoCard>
                        <Typography variant='h3' sx={{color: 'primary.main'}}>
                            Raise fund publicly
                        </Typography>
                        <Box>
                            Access a global reach of dedicated backers in a transparent and decentralized setting.
                        </Box>
                    </InfoCard>
                    <Box display={isTablet ? 'none' : 'block'}>
                        <img src="/images/home/rocket.png" alt="" width={isMobile ? '100%' : '350px'} />
                    </Box>
                    <FlexBox flexDirection='column' gap={isTablet ? '42px' :'160px'}>
                        <InfoCard>
                            <Typography variant='h3' sx={{color: 'primary.main'}}>
                                Raise fund publicly
                            </Typography>
                            <Box>
                                Access a global reach of dedicated backers in a transparent and decentralized setting.
                            </Box>
                        </InfoCard>
                        <InfoCard>
                        <Typography variant='h3' sx={{color: 'primary.main'}}>
                            Raise fund publicly
                        </Typography>
                        <Box>
                            Access a global reach of dedicated backers in a transparent and decentralized setting.
                        </Box>
                    </InfoCard>
                    </FlexBox>
                </FlexBox>
                
            </Wrapper>
        </Box>
    )
}

const Wrapper = styled(Box)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 60px;
  background: url("/images/home/grid2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  align-items: center;
  }
`
const FlexBox = styled(Box)`
  display: flex;
`
const InfoCard = styled(Box)`
  background: ${(props) => props.theme.palette.gray[800]};
  color: #fff;
  border-radius: 12px;
  padding: 28px 36px;
  max-width: 423px;
`

export default LaunchSection