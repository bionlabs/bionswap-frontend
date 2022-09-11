import React from "react";
import { Box, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Typography, styled } from "@mui/material";
import IDOProcess from "../IDOProcess";

interface VestingScheduleProps {
  data: any;
  isMobile: boolean;
}

const VestingSchedule: React.FC<VestingScheduleProps> = ({ data, isMobile = false }) => {
  const fetchData = [
    {
      date: {
        from: "January 7th 2022",
        to: "January 7th 2022",
      },
      tokenPercentage: "25",
      tokenAmount: "1000000",
    },
    {
      date: {
        from: "January 7th 2022",
        to: "January 7th 2022",
      },
      tokenPercentage: "25",
      tokenAmount: "1000000",
    },
    {
      date: {
        from: "January 7th 2022",
        to: "January 7th 2022",
      },
      tokenPercentage: "25",
      tokenAmount: "1000000",
    },
    {
      date: {
        from: "January 7th 2022",
        to: "January 7th 2022",
      },
      tokenPercentage: "25",
      tokenAmount: "1000000",
    },
  ];


  return (
    <Box display="flex" gap={3} sx={{ width: "100%" }} flexDirection={isMobile ? "column" : "row"}>
      <Box width={isMobile ? "100%" : "70%"}>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRowCustome
                sx={{
                  backgroundColor: "#001015",
                  borderRadius: "8px 8px 0px 0px",
                }}
              >
                <TableCellHead>
                  <Typography variant="body4Poppins" fontWeight='500' color='primary.main' >
                    Date
                  </Typography>
                </TableCellHead>
                <TableCellHead align="right">
                  <Typography variant="body4Poppins" fontWeight='500' color='primary.main' >
                    Token Percentage
                  </Typography>
                </TableCellHead>
                <TableCellHead align="right">
                  <Typography variant="body4Poppins" fontWeight='500' color='primary.main' >
                    Token Amount
                  </Typography>
                </TableCellHead>
              </TableRowCustome>
            </TableHead>
            <TableBody>
              {fetchData.map((row, index) => (
                <TableRowCustome key={index}>
                  <TableCellCustome>
                    <Typography variant="body3Poppins" fontWeight='400' color='gray.400' >
                      {row?.date?.from}
                      <br />
                      {row?.date?.to}
                    </Typography>
                  </TableCellCustome>
                  <TableCellCustome align="right">
                    <Typography variant="body3Poppins" fontWeight='400' color='gray.400' >
                      {row?.tokenPercentage}%
                    </Typography>
                  </TableCellCustome>
                  <TableCellCustome align="right">
                    <Typography variant="body3Poppins" fontWeight='400' color='gray.400' >
                      {row?.tokenAmount}%
                    </Typography>
                  </TableCellCustome>
                </TableRowCustome>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* <Box width={isMobile ? "100%" : "30%"}>
        <IDOProcess data={data} isMobile={isMobile} />
      </Box> */}
    </Box>
  );
};

const TableCellCustome = styled(TableCell)`
padding: 20px;
background-color: ${(props) => props.theme.palette.gray[900]};
`;
const TableCellHead = styled(TableCell)`
padding: 9px 20px;
`;
const TableRowCustome = styled(TableRow)`
border: 1px solid;
border-color: ${(props) => props.theme.palette.gray[700]};
`;

export default VestingSchedule;
