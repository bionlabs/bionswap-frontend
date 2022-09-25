import React from 'react'
import Allocation from "views/Dashboard/views/Allocation/Allocation";
import { useRouter } from 'next/router';
import sidebarConfig from "views/Asset/sidebarConfig"
import Sidebar from 'components/Sidebar';

const AssetRef = () => {
  const router = useRouter();
  const { href } = router.query;

  const getComponent = () => {
    return sidebarConfig.find(item => item.href == '/' + href)
  }

  return (
    <Sidebar menuItems={sidebarConfig} rootHref='asset'>
        {getComponent()?.component}
    </Sidebar>
  )
}

export default AssetRef