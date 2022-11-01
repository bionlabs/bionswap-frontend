import React from 'react'
import {
    Box,
    styled,
    Stack,
    Typography,
    Button
} from '@mui/material'
import Avatar from './Avatar'
import { useAccount } from 'hooks';
import { shortenAddress } from 'utils/format';
import Image from 'next/image';
import {IoTicket} from 'react-icons/io5'



const ProfileBox = () => {
  const { address } = useAccount();


  return (
    <Stack spacing={3} width='100%'>
        <Stack direction='row' justifyContent='space-between' width='100%' alignItems='center'>
            <Typography>
                Personal
            </Typography>
            <Typography sx={{
                color: 'success.main',
                textTransform: 'uppercase'
            }}>
                Rank Detail
            </Typography>
        </Stack>
        <Stack direction='row' spacing={2} width='100%' justifyContent='start' alignItems='center'>
            <Avatar />
            <Stack alignItems='start'>
                <Typography sx={{fontWeight: '600'}}>
                    {shortenAddress(address ?? '')}
                </Typography>
                <Typography sx={{
                    color: 'gray.500',
                    fontSize: '14px'
                }}>
                    500 XP
                </Typography>
            </Stack>
        </Stack>
        <TicketBox>
            <Image src='/images/gamecenter/powerpools/tickets.png' alt='' width='80px' height='80px' />
            <Stack alignItems='start'>
                <Typography>
                    You have:
                </Typography>
                <Stack direction='row' alignItems='end' spacing={1}>
                    <Typography sx={{fontSize: '28px', fontWeight: '600', lineHeight: '1.1'}}>0</Typography>
                    <Typography sx={{fontWeight: '600', color: 'warning.main'}}>
                        tickets
                    </Typography>
                </Stack>
            </Stack>
        </TicketBox>
        <PurchaseTicketButton
         variant='contained'
         fullWidth
        >
            <IoTicket/>
            Purchase Tickets
        </PurchaseTicketButton>
        <Divider/>
    </Stack>
  )
}

const TicketBox = styled(Box)`
    background-color: ${props => props.theme.palette.gray[800]};
    border-radius: 6px;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
`
const PurchaseTicketButton = styled(Button)`
    background-color: #002828;
    box-shadow: none;
    color: ${props => props.theme.palette.primary.main};
    padding: 10px 20px;
    gap: 10px;
    align-items: center;
    :hover {
        background-color: #002828;
        box-shadow: none;
        opacity: .8;
    }
    svg {
        width: 20px;
        height: 20px;
    }
`
const Divider = styled(Box)`
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.palette.gray[800]};
`


export default ProfileBox