import { MobileProp } from 'configs/Type/Mobile/type'
import React from 'react'
import {
    Box,
    Button,
    styled,
    Typography
} from '@mui/material'
import Card from './components/Card'

const FundSection = ({isMobile}:MobileProp) => {
  return (
    <Box>
        <Card sx={{
            display: 'flex', flexDirection: 'column', gap: '42px',
            width: '100%'
        }}>
            <Flex>
                <Box>
                    <Box>
                        <Typography variant='h5Samsung' >
                            Fund Your Account
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='caption6Poppins' sx={{color: 'extra.text.secondary'}}>
                            Get BIONC for multiple profits. Find a method that suits you the most.
                        </Typography>
                    </Box>
                </Box>
            </Flex>
            <Flex alignItems='center' justifyContent='space-between'>
                <Box>
                    <Box>
                        <Typography variant='body3Poppins' sx={{color: 'primary.main'}}>
                            Buy BIONC
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='captionPoppins' sx={{color: 'extra.text.primary'}}>
                            Get BIONC with the best price.
                        </Typography>
                    </Box>
                </Box>
                <BuyButton
                    variant='contained'
                >
                    Buy
                </BuyButton>
            </Flex>
            <Flex alignItems='center' justifyContent='space-between'>
                <Box>
                    <Box>
                        <Typography variant='body3Poppins' sx={{color: 'primary.main'}} >
                            Get sBION
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='captionPoppins' sx={{color: 'extra.text.primary'}}>
                            Audit DAO Governance Credit provide you more power.
                        </Typography>
                    </Box>
                </Box>
                <StyledButton
                    variant='contained'
                >
                    Stake
                </StyledButton>
            </Flex>
            <Flex alignItems='center' justifyContent='space-between'>
                <Box>
                    <Box>
                        <Typography variant='body3Poppins' sx={{color: 'primary.main'}}>
                            Buy BIONC
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='captionPoppins' sx={{color: 'extra.text.primary'}}>
                            Get BIONC with the best price.
                        </Typography>
                    </Box>
                </Box>
                <StyledButton
                    variant='contained'
                >
                    Buy
                </StyledButton>
            </Flex>
        </Card>
    </Box>
  )
}

const Flex = styled(Box)`
    display: flex;
`

const BuyButton = styled(Button)`
    height: fit-content;
    transition: .12s ease-in;
    width: 100px;
    :hover {
        background-color: ${prop => prop.theme.palette.primary.main};
        opacity: .8;
    }
`
const StyledButton = styled(Button)`
    height: fit-content;
    transition: .12s ease-in;
    font-weight: 400;
    width: 100px;
    color: ${prop => prop.theme.palette.text.primary};
    background-color: ${prop => (prop.theme.palette as any).extra.text.subtitle};
    :hover {
        background-color: ${prop => (prop.theme.palette as any).extra.text.subtitle};
        opacity: .8;
    }
`

export default FundSection