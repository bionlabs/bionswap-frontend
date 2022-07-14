import React from "react";
import styled from '@emotion/styled'
import { Box, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from "@mui/material";
import IDOProcess from "../IDOProcess";

interface VestingScheduleProps {
    data: any,
    isMobile: boolean
}

const VestingSchedule: React.FC<VestingScheduleProps> = ({ data, isMobile = false }) => {
    const fetchData = [
        {
            date: {
                from: 'January 7th 2022',
                to: 'January 7th 2022',
            },
            tokenPercentage: '25',
            tokenAmount: '1000000'
        },
        {
            date: {
                from: 'January 7th 2022',
                to: 'January 7th 2022',
            },
            tokenPercentage: '25',
            tokenAmount: '1000000'
        },
        {
            date: {
                from: 'January 7th 2022',
                to: 'January 7th 2022',
            },
            tokenPercentage: '25',
            tokenAmount: '1000000'
        },
        {
            date: {
                from: 'January 7th 2022',
                to: 'January 7th 2022',
            },
            tokenPercentage: '25',
            tokenAmount: '1000000'
        },
    ]

    const TableCellCustome = styled(TableCell)`
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 160%;
        color: #25273D;
        padding: 20px;
    `
    const TableCellHead = styled(TableCell)`
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 16px;
        line-height: 160%;
        color: #787A9B;
        padding: 20px;
    `
    const TableRowCustome = styled(TableRow)`
        border: 1px solid #DEE0E2;
    `

    return (
        <Box display='flex' gap={3} sx={{ width: '100%' }} flexDirection={isMobile ? 'column' : 'row'}>
            <Box width={isMobile ? '100%' : '70%'}>
                <TableContainer component={Paper} sx= {{
                    boxShadow: 'none',
                }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRowCustome sx={{
                                backgroundColor: '#F7F7FB',
                                borderRadius: '8px 8px 0px 0px',
                            }}>
                                <TableCellHead>Date</TableCellHead>
                                <TableCellHead align="right">Token Percentage</TableCellHead>
                                <TableCellHead align="right">Token Amount</TableCellHead>
                            </TableRowCustome>
                        </TableHead>
                        <TableBody>
                            {fetchData.map((row) => (
                                <TableRowCustome>
                                    <TableCellCustome>
                                        {row?.date?.from}
                                        <br />
                                        {row?.date?.to}
                                    </TableCellCustome>
                                    <TableCellCustome align="right">
                                        {row?.tokenPercentage}%
                                    </TableCellCustome>
                                    <TableCellCustome align="right">
                                        {row?.tokenAmount}
                                    </TableCellCustome>
                                </TableRowCustome>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box width={isMobile ? '100%' : '30%'}>
                <IDOProcess data={data} isMobile={isMobile} />
            </Box>
        </Box >
    )
}

export default VestingSchedule;