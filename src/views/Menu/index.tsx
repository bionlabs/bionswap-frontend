/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Container
} from '@mui/material'
import styled from '@emotion/styled'
import { menuConfig } from 'configs/menu/config'
import { useRouter } from 'next/router'


const Menu = ({ children }: any) => {
    const router = useRouter()
    return (
        <>
            <MenuContainer>
                <StyledContained maxWidth='xl'>
                    <FlexBox alignItems='center' gap='60px'>
                        <Box>
                            <Box component="a" href='/'>
                                <img src='logo.svg' alt='BionDex' width='200px' />
                            </Box>
                        </Box>
                        <Box alignItems="center" display="flex" gap={4}>
                            {
                                menuConfig.map(item =>
                                    <Box 
                                        key=''
                                        component="a"
                                        href={item.href}
                                        sx={{
                                            color: "#787A9B",
                                            fontWeight: '500',
                                            fontSize: '16px',
                                            transition: '.15s ease-in',
                                            ':hover': {
                                                color: '#0C1116',
                                            }
                                        }}
                                        onClick={(e:any) => {
                                            e.preventDefault();
                                            router.push(item.href);
                                        }}
                                    >
                                        {item.label}
                                    </Box>
                                )
                            }
                        </Box>
                    </FlexBox>
                </StyledContained>
            </MenuContainer>
            <Box>
                {children}
            </Box>
        </>
    )
}

const MenuContainer = styled(Box)`
    position: fixed;
    z-index: 1100;
    width: 100%;
    background-color: rgba(255,255,255);
    top: 0;
    left: 0;
`
const StyledContained = styled(Container)`
    display: flex;
    min-height: 78px;
    align-items: center;
    justify-content: space-between;
`
const FlexBox = styled(Box)`
    display: flex;
`
export default Menu