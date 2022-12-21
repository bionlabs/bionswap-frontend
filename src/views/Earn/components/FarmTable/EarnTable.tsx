import * as React from 'react';
import { alpha } from '@mui/material/styles';
import {
  Stack,
  styled,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Pagination,
  Paper,
} from '@mui/material';
import Image from 'next/image';
import { formatUnits } from 'ethers/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useChain, useRefetchIncreasedInterval, useToken } from 'hooks';
import { NATIVE } from '@bionswap/core-sdk';
import { Data, Order, TableProps } from './types';
import EarnTableHead from './EarnTableHead';
import EarnTableBody from './EarnTableBody';
import { getSaleList } from 'api/launchpad';
import pools from 'configs/constants/mining/pools';

export default function EarnTable({ chainId, view}: TableProps) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('name');
  const [loading, setLoading] = useState(false);


  const [page, setPage] = useState(0);
  const [params, setParams] = useState<null | {}>({
    page: 1,
    limit: 12,
    owner: '',
    keyword: '',
    sortBy: '-createdAt',
  });
  // const [poolsData, setPoolsData]: any = useState(null);

  // const getLaunchData = useCallback(
  //   async (params: any) => {
  //     try {
  //       const launchData = await getSaleList(
  //         params.page,
  //         params.limit,
  //         chainId,
  //         params.owner,
  //         params.keyword,
  //         params.sortBy,
  //       );
  //       setPoolsData(launchData);
  //     } catch (error) {
  //       setLoading(false);
  //       console.log('error====>', error);
  //     }
  //     setLoading(false);
  //   },
  //   [chainId, setLoading],
  // );

  // useRefetchIncreasedInterval(
  //   async () => {
  //     await getLaunchData(params);
  //   },
  //   0,
  //   1500,
  //   [chainId, params, view],
  // );

  // useEffect(() => {
  //   getLaunchData(params);
  // }, [params, chainId, getLaunchData, view]);

  const handleChangePagigation = (event: any, value: number) => {
    setLoading(true);
    // setParams({ ...params, page: value + 1 });
    setPage(value);
  };

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
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <EarnTableHead
                order={order}
                orderBy={orderBy}
                rowCount={pools.length}
              />
            </TableHead>
            <TableBody>
              <EarnTableBody
                pools={pools}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={10}
                loading={loading}
              />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={pools.length}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePagigation}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={StyledLabelDisplayedRows}
          showFirstButton
          showLastButton
        />
      </StyledTableWrapper>
    </Box>
  );
}

const StyledTableWrapper = styled(Paper)`
  width: 100%;
  background-color: ${(props) => (props.theme.palette as any).extra.table.background};
  background-image: none;
  // border-radius: 4px;
  border: 1px solid ${(props) => (props.theme.palette as any).extra.table.divider};
  box-shadow: none;
  .MuiTablePagination-root {
    background-color: ${(props) => (props.theme.palette as any).extra.table.light};
    :last-child {
      // border-bottom-left-radius: 4px;
      // border-bottom-right-radius: 4px;
    }
  }
  .MuiTableBody-root .MuiTableRow-root {
    :hover {
      background-color: ${(props) => (props.theme.palette as any).extra.button.lighter};
      opacity: 0.8;
    }
  }
`;
