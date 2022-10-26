import React from 'react'
import HeaderWeb from '../../components/common/NewHeaderAndNavbar/HeaderWeb';
import SidebarWebNew from '../../components/common/NewHeaderAndNavbar/SidebarWebNew';
import InnerPageMom from './../../components/Herocomponent/InnerPageMOM/index';

 function InnerPage() {
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
        <InnerPageMom/>
          </div>
      </div>
    </>
  )
}

export default InnerPage;