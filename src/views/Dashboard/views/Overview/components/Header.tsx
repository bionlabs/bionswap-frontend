import React from 'react'
import {
    styled,
    Box,
    Typography,
} from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAccount } from 'wagmi'
import { shortenAddress } from "utils/format";
import Image from 'next/image';
import { MobileProp } from 'configs/Type/Mobile/type';

const Header = ({isMobile}:MobileProp) => {
  const { address } = useAccount();


  return (
    <Box>
        <Box display='flex' alignItems='center' gap='15px'>
            <Box>
                <Image src='/icons/dashboard/user.svg' alt='' width='100px' height='100px' />
            </Box>
            <Box>
                <Box display='flex' alignItems='center' gap='10px'>
                    <Typography variant='h6Samsung'>
                        Anonymous-User
                    </Typography>
                    <Box>
                        <Tag sx={{backgroundColor: 'gray.700'}}>
                            Personal
                        </Tag>
                    </Box>
                </Box>
                <Flex mt='10px' gap={isMobile ? '15px' : '40px'}>
                    <Box>
                        <Box>
                            <Typography variant='captionPoppins' sx={{color: 'gray.400'}}>
                                Wallet Address
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{fontSize: '15px'}}>
                                {shortenAddress(address ?? '')}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography variant='captionPoppins' sx={{color: 'gray.400'}}>
                            User Type
                            </Typography>
                        </Box>
                        <Box display='flex' alignItems='center' gap='10px'>
                            <Typography sx={{fontSize: '15px' , color: 'primary.main'}}>
                                Verified
                            </Typography>
                            <Box>
                                <VerifiedIcon sx={{width: '18px',height:'18px', color: 'primary.main'}} />
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography variant='captionPoppins' sx={{color: 'gray.400'}}>
                            Twitter
                            </Typography>
                        </Box>
                        <Box display='flex' alignItems='center' gap='10px'>
                            <Typography sx={{fontSize: '15px'}}>
                                linked
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography variant='captionPoppins' sx={{color: 'gray.400'}}>
                            Last Connect
                            </Typography>
                        </Box>
                        <Box display='flex' alignItems='center' gap='10px'>
                            <Typography sx={{fontSize: '15px'}}>
                                2022-09-21 12:12:56(113.161.65.184)
                            </Typography>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </Box>
    </Box>
  )
}

const Flex = styled(Box)`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`
const Tag = styled(Box)`
    border-radius: 4px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 8px;
    font-size: 12px;
`

export default Header