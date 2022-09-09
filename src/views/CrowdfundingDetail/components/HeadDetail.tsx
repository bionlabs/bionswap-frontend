import * as React from 'react';
import { Box, Link, Breadcrumbs, Typography } from "@mui/material";
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

const HeadDetail: React.FC<HeadDetailProps> = ({ avarta, name, type, unit, isMobile = false }) => {
    const Right = styled(Box)`
        // ${isMobile ? 'margin-left: auto; margin-top: 15px;' : ''}
    `

    return (
        <Box display="flex" alignItems="center" marginBottom='32px' flexWrap='wrap'>
            <Box marginRight='24px'>
                <Box component='img' src={avarta} alt={name} />
            </Box>
            <FlexBox flex="1" flexDirection='column'>
                <FlexBox alignItems='center' gap='20px'>
                    <Typography variant='h1Poppins' color='#F6F6F6' fontWeight='700'>
                        {name}
                    </Typography>
                    <FlexBox gap='8px' alignItems='center'>
                        <Box component='img' src='/images/coins/BNB.png' alt='BNB' width='24px' />
                        <Typography variant='body3Poppins' fontWeight='600' color='gray.200'>
                            {unit}
                        </Typography>
                    </FlexBox>
                    <FlexBox gap='8px' alignItems='center'>
                        <Box component='img' src='/images/coins/BNB_coin.png' alt='BNB_coin' width='24px' />
                        <Typography variant='body3Poppins' fontWeight='600' color='gray.200'>
                            {unit}
                        </Typography>
                    </FlexBox>
                </FlexBox>
                <Typography variant='body2Poppins' color='#9B9B9B' fontWeight='400'>
                    {type}
                </Typography>
            </FlexBox>
            <Right display="flex" alignItems="center">
                <Status>
                    <Typography variant='captionPoppins' color='text.primary' fontWeight='500'>
                        Open Now
                    </Typography>
                </Status>
            </Right>
        </Box>
    );
}

const FlexBox = styled(Box)`
    display: flex;
`
const Status = styled(Box)`
    background: #2BB673;
    border-radius: 4px;
    padding: 3px 10px 5px;
`

export default HeadDetail