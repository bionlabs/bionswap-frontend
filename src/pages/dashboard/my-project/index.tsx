import React from 'react'
import Allocation from "views/Dashboard/views/Allocation/Allocation";
import { useRouter } from 'next/router';
import Sidebar from 'components/Sidebar';
import MyProject from 'views/Asset/views/MyProject';
import sidebarConfig from 'views/Dashboard/sidebarConfig';

const AssetRef = () => {

  return (
    <Sidebar menuItems={sidebarConfig} rootHref='asset'>
        <MyProject />
    </Sidebar>
  )
}

export default AssetRef