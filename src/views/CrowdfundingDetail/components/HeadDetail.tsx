import * as React from 'react';
import { Box, Link, Breadcrumbs } from "@mui/material";
import styled from '@emotion/styled';

function handleClick(event: any) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

interface HeadDetailProps {
    avarta: string,
    name: string,
    type: any,
    unit: string,
    isMobile: boolean,
}

const HeadDetail: React.FC<HeadDetailProps> = ({avarta, name, type, unit, isMobile = false}) => {
    const Coin = styled(Box)`
        font-weight: 600;
        font-size: 16px;
        line-height: 160%;
        color: #000000;
        font-family: 'Inter', sans-serif;
        margin-right: 16px;

        img {
            vertical-align: middle;
            width: 24px;
            height: 24px;
        }
    `
    const Status = styled(Box)`
        background: #2BB673;
        border-radius: 4px;
        padding: 4px 10px;
        font-weight: 600;
        font-size: 12px;
        line-height: 160%;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
    `
    const Right = styled(Box)`
        ${isMobile ? 'margin-left: auto; margin-top: 15px;' : ''}
    `

    return (
        <Box display="flex" alignItems="center" marginBottom='32px' flexWrap='wrap'>
            <Box marginRight='24px'>
                <Box component='img' src={avarta} alt={name} />
            </Box> 
            <Box flex="1">
                <Box component='h3'
                    sx={{
                        fontWeight: '700',
                        fontSize: '36px',
                        lineHeight: '150%',
                        color: '#000000',
                        margin: '0',
                        fontFamily: "'Inter',sans-serif",
                    }}> 
                    {name}
                </Box>
                <Box component='p'
                sx={{
                    fontWeight: '400',
                    fontSize: '18px',
                    lineHeight: '160%',
                    color: '#787A9B',
                    margin: '0',
                    fontFamily: "'Inter',sans-serif",
                }}>
                    {type}
                </Box>
            </Box>
            <Right display="flex" alignItems="center">
                <Coin component='span'>
                    <Box component='img' src='/images/coins/BNB.png' alt='BNB' /> {unit}
                </Coin>
                <Coin component='span'>
                    <Box component='img' src='/images/coins/BNB_coin.png' alt='BNB_coin' /> {unit}
                </Coin>
                <Status>
                    Open Now
                </Status>
            </Right>
        </Box>
    );
}

export default HeadDetail