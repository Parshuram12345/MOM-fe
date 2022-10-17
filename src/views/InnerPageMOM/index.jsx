import React from 'react'
import SideNavWeb from '../../components/SideNavWeb/SideNavWeb';
import WebHeader from '../../components/WebHeader/WebHeader';
import InnerPageMom from './../../components/Herocomponent/InnerPageMOM/index';

 function InnerPage() {
  return (
    <>
        <div className="top-navbar">
        <WebHeader/>
      </div>
      <div className='d-flex'>
        <div className="side-navbar">
          <SideNavWeb/>
        </div>
        <div className='rightside-navbar'>
        <InnerPageMom/>
          </div>
      </div>
    </>
  )
}

export default InnerPage;