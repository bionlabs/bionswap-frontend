import React from 'react';
import { TableHead, TableSortLabel, Typography } from '@mui/material';
import { Data, HeadCell, LaunchpadTableProps } from './types';
import { StyledTableCell, StyledTableRow } from './components/components';

const headCells: readonly HeadCell[] = [
  {
    id: 'network',
    numeric: false,
    disablePadding: true,
    label: 'Network',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'TVL',
    numeric: true,
    disablePadding: false,
    label: 'TVL',
  },
  {
    id: 'staked',
    numeric: true,
    disablePadding: false,
    label: 'Your staked',
  },
  {
    id: 'earned',
    numeric: true,
    disablePadding: false,
    label: 'Earned',
  },
  {
    id: 'APR',
    numeric: true,
    disablePadding: false,
    label: 'APR',
  },
];

const EarnTableHead = (props: LaunchpadTableProps) => {
  const { order, orderBy, rowCount } = props;

  return (
    <StyledTableRow>
      {headCells.map((headCell) => (
        <StyledTableCell
          key={headCell.id}
          align={headCell.numeric ? 'right' : 'left'}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <Typography color="text.secondary" fontWeight="500" fontSize="14px">
            {headCell.label}
          </Typography>
        </StyledTableCell>
      ))}
    </StyledTableRow>
  );
};

export default EarnTableHead;
