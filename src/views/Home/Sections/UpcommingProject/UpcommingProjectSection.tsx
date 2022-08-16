/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Button,
    Container,
    Typography
} from '@mui/material'
import styled from '@emotion/styled'
import { MobileProp } from 'configs/Type/Mobile/type'
import { crowdfundingConfig } from 'views/Crowdfunding/config'
import ProjectItem from 'views/Crowdfunding/components/ProjectItem'
import Image from "next/image";
import PrimaryButton from 'components/PrimaryButton'

const UpcommingProjectSection = () => {
    return (
        <Wrapper>
            <Container maxWidth='lg' sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <FlexBox mb='60px' alignItems='center' flexDirection='column'>
                    <FlexBox gap='20px'>
                        <Image src="/icons/home/launchpad_icon.svg" alt="launchpad_icon" width={37} height={25} />
                        <Typography variant='subtitle1' sx={{ color: 'extra.text.primary' }}>
                            launchpad
                        </Typography>
                    </FlexBox>
                    <Typography variant='h3Poppins' fontWeight='600'>
                        Upcoming launching projects
                    </Typography>
                </FlexBox>
                <WrapItems>
                    {
                        crowdfundingConfig?.map((item, idex) => (
                            <Items key=''>
                                <ProjectItem data={item} />
                            </Items>
                        ))
                    }
                </WrapItems>
                <Box mt='63px' maxWidth='218px' width='100%'>
                    <PrimaryButton label="Explore more ->" />
                </Box>
            </Container>
        </Wrapper>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const Wrapper = styled(Box)`
        width: 100%;
        padding: 8vh 0;
        display: flex;
        flex-direction: column;
        gap: 60px;
        background-color: ${(props) => props.theme.palette.extra.other.fifth};
`
const WrapItems = styled(Box)`
        display: flex;
        gap: 32px;
        flex-wrap: wrap;

        ${props => props.theme.breakpoints.down("sm")} {
            justify-content: center;
        }
    `
const Items = styled(Box)`
        min-width: 340px;
        max-width: calc(94% / 3);
        width: 100%;
    `
const ButtonStyle = styled(Button)`
        font-weight: 600;
        font-size: 16px;
        line-height: 27px;
        color: #0b0b0b;
        padding: 12px 50px;
        max-width: 343px;
        border: 1px solid #0b0b0b;
        border-radius: 999px;
        text-align: center;
        font-family: inherit;
        text-transform: inherit;
        margin-top: 37px;
        transition: .15s ease-in;
        &:hover {
            background-color: #0b0b0b;
            color: #fafaf9;
            
        }
    `

export default UpcommingProjectSection