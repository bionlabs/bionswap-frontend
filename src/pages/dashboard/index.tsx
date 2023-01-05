import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import Dashboard from 'views/Dashboard';
import DashboardLayout from 'views/Dashboard/layout';

const DashboardPage: NextPageWithLayout = () => {
  return <Dashboard />;
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;
