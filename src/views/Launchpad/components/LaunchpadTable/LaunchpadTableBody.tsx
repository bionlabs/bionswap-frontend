import React from 'react';
import { Data, Order } from './type';
import LaunchpadTableRow from './LaunchpadTableRow';
import TableSkeleton from './TableSkeleton';

interface RowProps {
  launchpads: any;
  order: Order;
  orderBy: keyof Data;
  page: number;
  rowsPerPage: number;
  loading: boolean
}

const LaunchpadTableBody = ({ launchpads, order, orderBy, page, rowsPerPage , loading }: RowProps) => {
  return (
    <>
      {(launchpads && !loading) ? (
        // stableSort(launchpads, getComparator(order, orderBy))
        launchpads.map((item: any) => {
          return <LaunchpadTableRow key={item.title} item={item} />;
        })
      ) : (
        <TableSkeleton />
      )}
    </>
  );
};

export default LaunchpadTableBody;
