/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import {
    Box,
} from '@mui/material'
import styled from "@emotion/styled";
import { minimizeAddressSmartContract } from 'utils/helper';
import { useAccount, useNetwork } from 'hooks';

interface BionStackProps {
    // data: any,
}

const BionStack: React.FC<BionStackProps> = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const {address , connector: activeConnector} = useAccount()
    const { chain: connectedChain } = useNetwork();


    const WrapCard = styled(Box)`
        background: linear-gradient(159.48deg, rgba(231, 162, 54, 0.2) 8.56%, rgba(231, 162, 54, 2e-05) 91.52%), #787A9B;
        border-radius: 10px;
        padding: 20px;
        position: relative;
    `
    const Title = styled(Box)`
        font-weight: 700;
        font-size: 20px;
        line-height: 160%;
        font-family: 'Inter', sans-serif;
        color: #FFFFFF;
    `
    const Content = styled(Box)`
        font-weight: 400;
        font-size: 14px;
        line-height: 160%;
        font-family: 'Inter', sans-serif;
        color: #FFFFFF;
    `
    const Tier = styled(Box)`
        font-weight: 700;
        font-size: 14px;
        line-height: 160%;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;

        img {
            vertical-align: middle;
        }
    `
    const BgImage = styled(Box)`
        position: absolute;
        top: 0;
        right: 0;
    `

    return (
        <WrapCard>
            <Box display='flex' alignItems='center'>
                <Box component='img' src='/images/BionStack.png' alt='BionStack' marginRight='8px' />
                <Title>BION STACK</Title>
            </Box>
            <Box display='flex' gap={6}>
                <Box display='flex' alignItems='center'>
                    <Content>
                        {minimizeAddressSmartContract(address ?? '')}
                    </Content>
                    <img src='/images/document-copy.png' alt='document-copy' style={{marginLeft:'10px'}} />
                </Box>
                <Box>
                    <Tier>
                        <img src='/images/Tier4.png' alt='Tier4' /> Tier 1
                    </Tier>
                </Box>
            </Box>
            <Box marginTop='18px'>
                <Content>Your Balance</Content>
                <Title>5.938200193</Title>
            </Box>
            <Box marginTop='10px'>
                <Content>Network</Content>
                <Title>BNB Chain</Title>
            </Box>
            <BgImage>
                <img src='/images/Fox_bg.png' alt='Fox_bg' />
            </BgImage>
        </WrapCard>
    );
};

export default BionStack;