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
}

const HeadDetail: React.FC<HeadDetailProps> = ({avarta, name, type, unit}) => {
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
    return (
        <Box display="flex" alignItems="center">
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
            <Box>
                <Coin component='span'>
                    <Box component='img' src='/images/coins/BNB.png' alt='BNB' /> {unit}
                </Coin>
                <Coin component='span'>
                    <Box component='img' src='/images/coins/BNB_coin.png' alt='BNB_coin' />{unit}
                </Coin>
            </Box>
        </Box>
    );
}

export default HeadDetail