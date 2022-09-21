import React from 'react'
import Allocation from "views/Dashboard/views/Allocation/Allocation";
import { useRouter } from 'next/router';
import Sidebar from 'views/Dashboard/components/Sidebar/Sidebar';
import sidebarConfig from 'views/Dashboard/components/Sidebar/sidebarConfig';

const DashboardRef = () => {
  const router = useRouter();
  const { href } = router.query;

  const getComponent = () => {
    return sidebarConfig.find(item => item.href == '/' + href)
  }

  return (
    <Sidebar>
        {getComponent()?.component}
    </Sidebar>
  )
}

export default DashboardRef