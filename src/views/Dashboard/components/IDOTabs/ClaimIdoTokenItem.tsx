import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import PrimaryButton from "components/PrimaryButton";

interface ClaimIdoTokenItemProps {
    data: any,
    isMobile: boolean
}

const ClaimIdoTokenItem: React.FC<ClaimIdoTokenItemProps> = ({ data, isMobile = false }) => {
    const status = [
        {
            value: 1,
            name: 'Claimable',
        },
        {
            value: 2,
            name: 'Waiting',
        }
    ]

    const WrapBox = styled(Box)`
        border: 1px solid #EAECEE;
        border-radius: 8px;
        background: #FFFFFF;
        padding: 24px;
        min-width: 351px;
    `
    const Title = styled(Box)`
        font-family: 'Inter',sans-serif;
        font-weight: 600;
        font-size: 20px;
        line-height: 160%;
        color: #000000;
    `
    const Tag = styled(Box)`
        font-family: 'Inter',sans-serif;
        color: #FFFFFF;
        font-weight: 600;
        font-size: 12px;
        line-height: 160%;
        padding: 4px 10px;
        border-radius: 4px;
        text-align: center;

        &.Claimable {
            background: #0FBD0B;
        }

        &.Waiting {
            background: #DBAD0A;
        }
    `
    const Coin = styled(Box)`
        font-family: 'Inter',sans-serif;
        font-weight: 400;
        font-size: 12px;
        line-height: 160%;
        color: #E7A236;
    `
    const Label = styled(Box)`
        font-family: 'Inter',sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 160%;
        color: #787A9B;
    `
    const Values = styled(Box)`
        font-family: 'Inter',sans-serif;
        font-weight: 600;
        font-size: 14px;
        line-height: 160%;
        color: #25273D;
    `
    const WrapItem = styled(Box)`
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
    `

    return (
        <WrapBox>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="30px">
                <Box>
                    <Box display="flex" alignItems='center' marginBottom="5px">
                        <Title marginRight="8px">
                            {data?.name}
                        </Title>
                        {
                            status.map((item) => (
                                item.value === data.status
                                    ?
                                    <Tag className={item.name}>
                                        {item.name}
                                    </Tag>
                                    :
                                    null
                            ))
                        }
                    </Box>
                    <Coin>
                        {data?.coin?.name}
                    </Coin>
                </Box>
                <Box>
                    <Box component='img' src={data?.coin?.image} alt={data?.coin?.name} />
                </Box>
            </Box>
            <Box>
                <WrapItem>
                    <Label>Available Now</Label>
                    <Values>{data?.availableNow} FOX</Values>
                </WrapItem>
                <WrapItem>
                    <Label>Claimed</Label>
                    <Values>{data?.claimed} FOX</Values>
                </WrapItem>
                <WrapItem>
                    <Label>Total</Label>
                    <Values>{data?.total} FOX</Values>
                </WrapItem>
                <WrapItem>
                    <Label>Fund</Label>
                    <Values>{data?.fund}</Values>
                </WrapItem>
                <WrapItem>
                    <Label>Amount</Label>
                    <Values>{data?.amount}</Values>
                </WrapItem>
                <WrapItem>
                    <Label>Date</Label>
                    <Values>{data?.date}</Values>
                </WrapItem>
                <WrapItem>
                    <Label>Next Claim in</Label>
                    <Values>{data?.nextClaim}</Values>
                </WrapItem>
            </Box>
            <Box marginTop="30px">
                <PrimaryButton isMobile={isMobile} label="Claim tokens" />
            </Box>
        </WrapBox>
    )
}

export default ClaimIdoTokenItem;