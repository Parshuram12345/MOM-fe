import React from 'react'
import SidebarWebNew from '../../components/common/SideNavWeb/SidebarWebNew.jsx';
import HeaderWeb from '../../components/common/WebHeaderWeb/HeaderWeb.jsx';
// import SideNavWeb from '../../components/SideNavWeb/SideNavWeb'
// import WebHeader from '../../components/WebHeader/WebHeader'
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