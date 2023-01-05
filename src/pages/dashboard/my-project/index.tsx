import MyProject from 'views/MyProject';

import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import DashboardLayout from 'views/Dashboard/layout';

const MyProjectPage: NextPageWithLayout = () => {
  return <MyProject />;
};

MyProjectPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MyProjectPage;
