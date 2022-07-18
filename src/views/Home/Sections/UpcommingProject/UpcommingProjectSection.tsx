/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Button,
    Container
} from '@mui/material'
import styled from '@emotion/styled'
import { MobileProp } from 'configs/Type/Mobile/type'
import { crowdfundingConfig } from 'views/Crowdfunding/config'
import ProjectItem from 'views/Crowdfunding/components/ProjectItem'

const UpcommingProjectSection = ({ isMobile }: MobileProp) => {
    const Wrapper = styled(Box)`
        width: 100%;
        background: url('images/home/upcomming_project_bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        min-height: 100vh;
        padding-top: calc(78px + 8vh);
        padding-bottom: 8vh;
        display: flex;
        flex-direction: column;
        gap: 60px;
`
    const HeadTitle = styled(Box)`
        color: #0C1116;
        font-weight: 700;
        font-size: ${ isMobile ? '32px' : '42px' };
        line-height: 150%;
        font-family: 'Inter', sans-serif;
        text-align: center;
        margin-bottom: 36px;
`
    const WrapItems = styled(Box)`
        display: flex;
        gap: 32px;
        flex-wrap: wrap;
        ${isMobile ? 'justify-content: center;' : ''}
    `
    const Items = styled(Box)`
        min-width: 340px;
        max-width: calc(94% / 3);
        width: 100%;
    `
    const Button = styled(Box)`
        font-weight: 600;
        font-size: 16px;
        line-height: 27px;
        color: #25273D;
        font-family: 'Inter', sans-serif;
        padding: 12px;
        max-width: 343px;
        border: 1px solid #25273D;
        border-radius: 31px;
        text-align: center;
        margin: auto;
        cursor: pointer;
        transition: all .5s ease;
        margin-top: 37px;

        &:hover {
            background: #25273D;
            color: #fafaf9;
            transition: all .5s ease;
        }
    `

    return (
        <Wrapper>
            <Container maxWidth='lg'>
                <HeadTitle>🚀 Upcomming project</HeadTitle>
                <WrapItems>
                    {
                        crowdfundingConfig?.map((item, idex) => (
                            <Items>
                                <ProjectItem data={item} />
                            </Items>
                        ))
                    }
                </WrapItems>
                <Button>More projects</Button>
            </Container>
        </Wrapper>
    )
}

export default UpcommingProjectSection