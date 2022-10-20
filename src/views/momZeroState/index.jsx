import React from 'react'
import SidebarWebNew from '../../components/common/SideNavWeb/SidebarWebNew.jsx';
import HeaderWeb from '../../components/common/WebHeaderWeb/HeaderWeb.jsx';
import MomZeroState from '../../components/Herocomponent/momZeroState/index';

 function MomZeroStatePage() {
  return (
    <>
        <div className="top-navbar">
        <HeaderWeb/>
      </div>
      <div className='d-flex'>
        <div className="side-navbar">
          <SidebarWebNew/>
        </div>
        <div className='rightside-navbar'>
        <MomZeroState/>
          </div>
      </div>
    </>
  )
}

export default MomZeroStatePage;