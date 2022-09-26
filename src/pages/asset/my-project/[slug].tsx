import React from 'react'
import Allocation from "views/Dashboard/views/Allocation/Allocation";
import { useRouter } from 'next/router';
import sidebarConfig from "views/Asset/sidebarConfig"
import Sidebar from 'components/Sidebar';
import MyProjectDetail from 'views/MyProjectDetail';

const AssetRef = () => {
  const router = useRouter();
  const { href } = router.query;
  
  return (
    <Sidebar menuItems={sidebarConfig} rootHref='asset'>
        <MyProjectDetail />
    </Sidebar>
  )
}

export default AssetRef