import React from 'react'
import Allocation from "views/Dashboard/views/Allocation/Allocation";
import { useRouter } from 'next/router';
import sidebarConfig from 'views/Dashboard/sidebarConfig';
import Sidebar from 'components/Sidebar';

const DashboardRef = () => {
  const router = useRouter();
  const { href } = router.query;

  const getComponent = () => {
    return sidebarConfig.find(item => item.href == '/dashboard/' + href)
  }

  return (
    <Sidebar menuItems={sidebarConfig} rootHref='dashboard'>
        {getComponent()?.component}
    </Sidebar>
  )
}

export default DashboardRef