import { Stack, styled, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { createData, Data, Order } from './types';
import { useToken } from 'hooks';
import { formatUnits } from 'ethers/lib/utils';
import EarnTableRow from './EarnTableRow';
import TableSkeleton from './TableSkeleton';

interface RowProps {
  pools: any;
  order: Order;
  orderBy: keyof Data;
  page: number;
  rowsPerPage: number;
  loading: boolean
}

const EarnTableBody = ({ pools, order, orderBy, page, rowsPerPage , loading }: RowProps) => {
  return (
    <>
      {
        pools.map((item: any) => {
          return <EarnTableRow key={item.pid} pool={item} loading={loading} />;
        })
      }
    </>
  );
};

export default EarnTableBody;
