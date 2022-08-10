import React from "react";
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import styled from "@emotion/styled";
import PrimaryButton from "components/PrimaryButton";

interface ProjectApplicationProps {
  data: any;
  isMobile: boolean;
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
      projectName: "Star Fox Gamefi",
      date: "07/05/2022, 05:00 PM",
      status: "applied",
    },
    {
      projectName: "Star Fox Gamefi",
      date: "07/05/2022, 05:00 PM",
      status: "whitelisted",
    },
    {
      projectName: "Star Fox Gamefi",
      date: "07/05/2022, 05:00 PM",
      status: "claimed",
    },
  ];

  const WrapBox = styled(Box)`
    background: #ffffff;
    padding: 20px;
    border: 1px solid #eaecee;
    border-radius: 8px;
  `;
  const Title = styled(Box)`
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 160%;
    color: #000000;
  `;
  const Tag = styled(Box)`
    font-family: "Inter", sans-serif;
    color: #ffffff;
    font-weight: 600;
    font-size: 12px;
    line-height: 160%;
    padding: 4px 10px;
    border-radius: 4px;
    text-align: center;

    &.Claimable {
      background: #0fbd0b;
    }

    &.Waiting {
      background: #dbad0a;
    }
  `;
  const Coin = styled(Box)`
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 160%;
    color: #e7a236;
  `;
  const Label = styled(Box)`
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    color: #787a9b;
  `;
  const Values = styled(Box)`
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 160%;
    color: #0b0b0b;
  `;
  const WrapItem = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
  `;

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
            {dataFetch.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.projectName}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </WrapBox>
  );
};

export default ProjectApplication;
