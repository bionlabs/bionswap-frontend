import React from "react";
import styled from '@emotion/styled'
import { Box, } from "@mui/material";

interface IntroductionProps {
    data: any,
}

const Introduction: React.FC<IntroductionProps> = ({ data }) => {
    const HeadTitle = styled(Box)`
        color: #E7A236;
        text-transform: uppercase;
        font-weight: 400;
        font-size: 16px;
        line-height: 100%;
        font-family: 'Inter', sans-serif;
        margin-bottom: 10px;
    `
    const Title = styled(Box)`
        color: #000000;
        font-weight: 600;
        font-size: 32px;
        line-height: 150%;
        font-family: 'Inter', sans-serif;
        margin-bottom: 16px;
    `
    const Content = styled(Box)`
        font-weight: 400;
        font-size: 14px;
        line-height: 160%;
        color: #31313B;
        font-family: 'Inter', sans-serif;
    `
    return (
        <Box>
            <HeadTitle>
                Introduction
            </HeadTitle>
            <Title>
                Wilder World is an immersive 5D Metaverse built on Ethereum, Unreal Engine 5 & ZERO.
            </Title>
            <Content>
                Star Fox is a multi-chain game running on BNB, Avalanche and Terra networks, inspired by Axie Infinity game's pet world and the gameplay of Clash of Clan and Boom Beach of Supercell.
                <br />
                <br />
                The game sets foot in a fictional world and revolves around farming, property building, and battling against other lands with the magical creatures named Mongen. The revolutionized design of Monsterra is a combination of free-to-play and free-to-earn models which allows gaming enthusiasts to enjoy and have a high-profit stream with no prior investment.
            </Content>
            <Box component='img'
                sx={{
                    marginTop: '24px',
                    marginBottom: '40px',
                }}
                src='/images/image36.png' alt='image36' />
            <HeadTitle>
                TEAM
            </HeadTitle>
            <Title>
                Wilder World is built on top of the $WILD token.
            </Title>
            <Content>
                Star Fox solves all existing problems in the P2E market by offering:
                <br />
                <br />
                ✔️ Free-to-play-to-earn game mechanics
                <br />
                <br />
                ✔️ Play for fun gameplay
                <br />
                <br />
                ✔️ Balanced in-game economy
                <br />
                <br />
                ✔️ No gas fee
                <br />
                <br />
                ✔️ Unprecedented Breeding Mechanism
                <br />
                <br />
                ✔️ Customizable Land Shaping Mechanism
                <br />
                <br />
                ✔️ Diverse Land Themes
                <br />
                <br />
                ✔️ Innovative Token and NFT Staking, Yielding Farming Mechanism
                <br />
                <br />
                ✔️ Earning while off-line
            </Content>
        </Box>
    )
}

export default Introduction;