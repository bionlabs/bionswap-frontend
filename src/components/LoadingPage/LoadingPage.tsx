import React, { useCallback, useEffect } from 'react'
import {
    styled,
    Box,
    Stack,
    keyframes
} from '@mui/material'
import Image from 'next/image'
import useMediaQuery from 'hooks/useMediaQuery'


const LoadingPage = () => {
  const {isMobile} = useMediaQuery()
  return (
    <Wrapper>
        <LogoBox sx={{
            left: isMobile ? '40%' : '47%'
        }}>
            <Image src='/bionicon.svg' alt='' width={100} height={100} />
        </LogoBox>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    z-index: ${props => props.theme.zIndex.drawer + 1};
    overflow: hidden;
`
const spinningAnimation = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`
const LogoBox = styled(Stack)`
    position: absolute;
    top: 45%;
    z-index: ${props => props.theme.zIndex.drawer + 2};
    animation: ${spinningAnimation} 1s ease infinite;
`

export default LoadingPage