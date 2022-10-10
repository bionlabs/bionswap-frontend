import React from 'react'
import Sidebar from 'components/Sidebar';
import MyProjectDetail from 'views/MyProjectDetail';
import sidebarConfig from 'views/Dashboard/sidebarConfig';

const AssetRef = () => {
  
  return (
    <Sidebar menuItems={sidebarConfig}>
        <MyProjectDetail />
    </Sidebar>
  )
}

export default AssetRef