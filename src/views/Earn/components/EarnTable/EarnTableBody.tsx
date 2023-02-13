import React, {  } from 'react';
import { Data, Order } from './types';
import EarnTableRow from './EarnTableRow';

interface RowProps {
  pools: any;
  order: Order;
  orderBy: keyof Data;
  page: number;
  rowsPerPage: number;
  loading: boolean;
}

const EarnTableBody = ({ pools, order, orderBy, page, rowsPerPage, loading }: RowProps) => {
  return (
    <>
      {pools.map((item: any) => {
        return <EarnTableRow key={item.pid} pool={item} loading={loading} />;
      })}
    </>
  );
};

export default EarnTableBody;
