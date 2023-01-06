import Allocation from 'views/Dashboard/views/Allocation/Allocation';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import DashboardLayout from 'views/Dashboard/layout';

const AllocationPage: NextPageWithLayout = () => {
  return <Allocation />;
};

AllocationPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AllocationPage;
