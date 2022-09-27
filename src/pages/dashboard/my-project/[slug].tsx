import React from 'react'
import Allocation from "views/Dashboard/views/Allocation/Allocation";
import { useRouter } from 'next/router';
import Sidebar from 'components/Sidebar';
import MyProjectDetail from 'views/MyProjectDetail';
import sidebarConfig from 'views/Dashboard/sidebarConfig';

const AssetRef = () => {
  
  return (
    <Sidebar menuItems={sidebarConfig} rootHref='dashboard'>
        <MyProjectDetail />
    </Sidebar>
  )
}

export default AssetRef