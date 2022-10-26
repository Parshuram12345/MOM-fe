import React from 'react'
import HeaderWeb from '../../components/common/NewHeaderAndNavbar/HeaderWeb';
import SidebarWebNew from '../../components/common/NewHeaderAndNavbar/SidebarWebNew';
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