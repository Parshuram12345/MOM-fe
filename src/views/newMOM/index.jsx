import React from 'react'
import HeaderWeb from '../../components/common/NewHeaderAndNavbar/HeaderWeb';
import SidebarWebNew from '../../components/common/NewHeaderAndNavbar/SidebarWebNew';
import NewMom from './../../components/Herocomponent/NewMOM/index';

function NewMomPage() {
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
        <NewMom/>
        </div>
      </div>
    </>
  )
}

export default NewMomPage