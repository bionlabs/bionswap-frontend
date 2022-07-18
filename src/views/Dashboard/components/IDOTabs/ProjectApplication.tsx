import React from "react";
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import styled from "@emotion/styled";
import PrimaryButton from "components/PrimaryButton";

interface ProjectApplicationProps {
    data: any,
    isMobile: boolean
}

const ProjectApplication: React.FC<ProjectApplicationProps> = ({ data, isMobile = false }) => {
    // const status = [
    //     {
    //         value: 1,
    //         name: 'Claimable',
    //     },
    //     {
    //         value: 2,
    //         name: 'Waiting',
    //     }
    // ]

    const dataFetch = [
        {
            projectName: 'Star Fox Gamefi',
            date: '07/05/2022, 05:00 PM',
            status: 'applied'
        },
        {
            projectName: 'Star Fox Gamefi',
            date: '07/05/2022, 05:00 PM',
            status: 'whitelisted'
        },
        {
            projectName: 'Star Fox Gamefi',
            date: '07/05/2022, 05:00 PM',
            status: 'claimed'
        },
    ]

    const WrapBox = styled(Box)`
        background: #FFFFFF;
        padding: 20px;
        border: 1px solid #EAECEE;
        border-radius: 8px;
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
            <Title>Project Application</Title>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Name</TableCell>
                            <TableCell>IDO Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dataFetch.map((item, index) => (
                                <TableRow>
                                    <TableCell>
                                        Star Fox Gamefi
                                    </TableCell>
                                    <TableCell>
                                        07/05/2022, 05:00 PM
                                    </TableCell>
                                    <TableCell>
                                        Applied
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        {/* <TableRow>
                            <TableCell>
                                Star Fox Gamefi
                            </TableCell>
                            <TableCell>
                                07/05/2022, 05:00 PM
                            </TableCell>
                            <TableCell>
                                Whitelisted
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Star Fox Gamefi
                            </TableCell>
                            <TableCell>
                                07/05/2022, 05:00 PM
                            </TableCell>
                            <TableCell>
                            Claimed
                            </TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </TableContainer>
        </WrapBox>
    )
}

export default ProjectApplication;