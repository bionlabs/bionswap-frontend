import * as React from 'react';
import { Box, StepLabel } from "@mui/material";
import styled from '@emotion/styled'

interface IDOProcessProps {
    data: any,
}

const steps = [
    {
        label: 'Apply for IDO',
        from: 'TBA',
        to: 'TBA',
        status: 'done',
    },
    {
        label: 'Join IDO',
        from: 'TBA',
        to: 'TBA',
        status: 'doing',
    },
    {
        label: 'FSFC Sale',
        from: 'TBA',
        to: 'TBA',
        status: 'doing',
    },
    {
        label: 'End',
    },
];

const IDOProcess = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const Description = styled.p`
        color: #000000;
        font-weight: 400;
        font-size: 12px;
        line-height: 160%;
    `

    const StepLabelCustome = styled(StepLabel)`
        span {
            color: #A8B0B9;
            font-weight: 600;
            font-size: 14px;
            line-height: 160%;
            font-family: 'Inter', sans-serif;
        }
    `

    return (
        <Box sx={{
            border: '1px solid #DEE0E2',
            borderRadius: '8px',
            overflow: 'hidden'
        }}>
            <Box component='p' sx={{
                color: '#000000',
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '150%',
                padding: '20px',
                borderBottom: '1px solid #DEE0E2',
            }}>
                IDO process
            </Box>

            <Box sx={{
                padding: '24px 24px 0 24px',
            }}>
                <Box>
                    {steps.map((step, index) => (
                        <Box display='flex' gap={2} mb={3}>
                            <Box>
                                <Box display='flex' alignItems='center' justifyContent='center'
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        lineHeight: '160%',
                                        color: step.status === 'done' ? '#FFFFFF' : '#A8B0B9',
                                        background: step.status === 'done' ? '#2BB673' : '#EAECEE',
                                        borderRadius: '100px',
                                        width: '30px',
                                        aspectRatio: '1',
                                    }}>
                                    {index + 1}
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={{
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    lineHeight: '160%',
                                    color: step.status === 'done' ? '#2BB673' : '#A8B0B9',
                                    marginBottom: '8px',
                                }}>
                                    {step.label}
                                </Box>
                                {step?.from ? <Description>From: {step.from}</Description> : null}
                                {step?.to ? <Description>To: {step.to}</Description> : null}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default IDOProcess