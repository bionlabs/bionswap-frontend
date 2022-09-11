import * as React from 'react';
import { Box, Link, Breadcrumbs, Typography } from "@mui/material";
import styled from '@emotion/styled';

interface HeadDetailProps {
    avarta: string,
    name: string,
    type: any,
    unit: string
}

const HeadDetail: React.FC<HeadDetailProps> = ({ avarta, name, type, unit }) => {
    return (
        <FlexBox alignItems="center" marginBottom='32px' flexWrap='wrap'>
            <Box marginRight='24px'>
                <Box component='img' src={avarta} alt={name} />
            </Box>
            <FlexBox flex="1" flexDirection='column'>
                <FlexBox sx={{
                    flexDirection: {xs: 'column', md: 'row'},
                    alignItems: {xs: 'start', md: 'center'},
                    gap: {xs: '5px', md: '20px'},
                }}>
                    <Typography variant='h1Poppins' color='#F6F6F6' fontWeight='700'>
                        {name}
                    </Typography>
                    <FlexBox gap='15px'>
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
                </FlexBox>
                <Typography variant='body2Poppins' color='#9B9B9B' fontWeight='400'>
                    {type}
                </Typography>
            </FlexBox>
            <Box display="flex" alignItems="center">
                <Status>
                    <Typography variant='captionPoppins' color='text.primary' fontWeight='500'>
                        Open Now
                    </Typography>
                </Status>
            </Box>
        </FlexBox>
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