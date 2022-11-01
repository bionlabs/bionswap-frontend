import React from 'react'
import {
    Box,
    styled,
    Stack,
    Typography,
    LinearProgress,
    Button
} from '@mui/material'
import {ImPlay2} from 'react-icons/im'
import {BsLightningChargeFill} from 'react-icons/bs'
import Image from 'next/image'

interface Props {
    id: number,
    status: string,
    totalTickets: number,
    joined: number,
    maxJoined: number
    poolPrize: number
}

const Card = ({
    id,
    status,
    totalTickets,
    joined,
    maxJoined,
    poolPrize
}:Props) => {
  return (
    <Wrapper>
        <Header>
            <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%'>
                <Stack direction='row' alignItems='center' spacing={1} sx={{
                    'svg':{
                        fill: theme => theme.palette.success.main
                    }
                }}>
                    <ImPlay2/>
                    <Typography sx={{
                        color: 'success.main',
                        textTransform: 'uppercase',
                        fontWeight: '600'
                    }}>
                        {status}
                    </Typography>
                </Stack>
                <Typography sx={{color: 'success.main'}}>
                    #{id}
                </Typography>
            </Stack>
        </Header>
        <LinearProgress color='success' variant="determinate" value={50}  />
        <Stack alignItems='start' spacing={2} p='20px'>
            <Stack width='100%' alignItems='start' spacing={2}>
                <Typography sx={{
                    fontSize: '14px', textTransform: 'uppercase',
                    color: 'secondary.light'
                }}>
                    Explode poolsie
                </Typography>
                <Stack direction='row' alignItems='center' spacing={1}>
                    <Image src='/images/gamecenter/powerpools/ticketicon.png' alt='' width='47.8px' height='47.8px' />
                    <Typography variant='h3Samsung'>
                        x{totalTickets} pool
                    </Typography>
                </Stack>
                <Divider />
            </Stack>
            <Stack direction='row' justifyContent='space-between' width='100%' mt='23px'>
                <Stack spacing={1} alignItems='start'>
                    <Typography sx={{fontSize: '14px', color: 'text.disabled'}}>
                        Joined:
                    </Typography>
                    <Typography sx={{fontSize: '20px'}}>
                        <Typography sx={{color: 'success.main', fontSize: 'inherit'}}>{joined}</Typography>/{maxJoined}
                    </Typography>
                </Stack>
                <Stack spacing={1} alignItems='start'>
                    <Typography sx={{fontSize: '14px', color: 'text.disabled'}}>
                        Pool Prize:
                    </Typography>
                    <Typography sx={{fontSize: '20px'}}>
                        {poolPrize} USDT
                    </Typography>
                </Stack>
            </Stack>
            <JoinPoolButton
                variant='contained'
                fullWidth
            >
                Join pool
            </JoinPoolButton>
            <Stack direction='row' alignItems='center' spacing={1} pt='10px' width='100%' sx={{
                color: 'text.disabled'
            }}>
                <BsLightningChargeFill />
                <Typography sx={{color: 'inherit', fontSize: '14px'}}>
                    Power by BionSwap
                </Typography>
            </Stack>
        </Stack>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
    border-radius: 12px;
    background-color: ${props => props.theme.palette.gray[900]};
    width: 339px;
`
const Header = styled(Box)`
    background-color: #003023;
    padding: 8px 10px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`
const Divider = styled(Box)`
    border-bottom: 1px solid ${props => props.theme.palette.gray[700]};
    width: 100%;
`
const JoinPoolButton = styled(Button)`
    font-weight: 600;
    transition: .12s ease-in;
    padding: 10px 20px;
    :hover {
        background-color: ${props => props.theme.palette.primary.main};
        box-shadow: none;
        opacity: .8;
    }
`


export default Card