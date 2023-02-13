import * as React from 'react';
import {
  styled,
  Typography,
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
} from '@mui/material';
import { useState } from 'react';
import { Data, Order, TableProps } from './type';
import LaunchpadTableHead from './LaunchpadTableHead';
import LaunchpadTableBody from './LaunchpadTableBody';
import { StyledTableWrapper } from 'components/Table';

export default function LaunchpadTable({ launchData, loading , page, handleChangePagigation}: TableProps) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('name');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function StyledLabelDisplayedRows({ from, to, count }: any) {
    return (
      <Typography fontSize="14px" color="text.secondary" fontWeight="500">
        Showing {from} to {to} of {count !== -1 ? count : `more than ${to}`}
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <StyledTableWrapper>
        <TableContainer>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              {launchData && (
                <LaunchpadTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={launchData?.data.length}
                />
              )}
            </TableHead>
            <TableBody>
              <LaunchpadTableBody
                launchpads={launchData?.data}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={launchData?.limit}
                loading={loading}
              />
            </TableBody>
          </Table>
        </TableContainer>
        {launchData && (
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={launchData?.totalDocs}
            rowsPerPage={launchData?.limit}
            page={page}
            onPageChange={handleChangePagigation}
            // onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={StyledLabelDisplayedRows}
            showFirstButton
            showLastButton
          />
        )}
      </StyledTableWrapper>
    </Box>
  );
}
