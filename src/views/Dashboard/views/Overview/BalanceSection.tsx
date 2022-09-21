import React from 'react'
import {
    Box,
    styled,
    Typography,
    SvgIcon
} from '@mui/material'
import { MobileProp } from 'configs/Type/Mobile/type'
import Card from './components/Card'
import BioncTokenIcon from 'assets/icons/BioncTokenIcon'

const BalanceSection = ({isMobile}:MobileProp) => {
  return (
    <Flex alignItems='center' gap='24px'>
        <Card sx={{
            height: 'fit-content' , width: isMobile ? '100%' : '280px'
        }}>
            <Flex alignItems='center' gap='16px' flexWrap='wrap'>
                <SvgIcon sx={{
                    width: '50px', height: '50px'
                }}>
                    <BioncTokenIcon/>
                </SvgIcon>
                <Box>
                    <Box>
                        <Typography variant='caption6Poppins' sx={{color: 'primary.main'}}>
                            Your Balance
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant={isMobile ? 'body4Poppins' : 'h6Poppins'}>
                            100.000 BIONC
                        </Typography>
                    </Box>
                </Box>
            </Flex>
        </Card>
        <Card sx={{
            height: 'fit-content', width: isMobile ? '100%' : '280px'
        }}>
            <Flex alignItems='center' gap='16px' flexWrap='wrap'>
                <SvgIcon sx={{
                    width: '50px', height: '50px'
                }}>
                    <BioncTokenIcon/>
                </SvgIcon>
                <Box>
                    <Box>
                        <Typography variant='caption6Poppins' sx={{color: 'primary.main'}}>
                            BIONC Price
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant={isMobile ? 'body4Poppins' : 'h6Poppins'}>
                            $100.00
                        </Typography>
                    </Box>
                </Box>
            </Flex>
        </Card>
    </Flex>
  )
}

const Flex = styled(Box)`
    display: flex;
`

export default BalanceSection