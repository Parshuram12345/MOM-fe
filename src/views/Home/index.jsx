import React from 'react'
import InnerPageMom from '../../components/Herocomponent/InnerPageMOM';
// import MomSection from '../../components/Herocomponent/momSection/MomSection';
// import MomZeroState from '../../components/Herocomponent/momZeroState';
// import NewMOM from '../../components/Herocomponent/NewMOM';
import SideNavWeb from '../../components/SideNavWeb/SideNavWeb';
import WebHeader from '../../components/WebHeader/WebHeader';

export function Home() {
  return (
    <>
      <div className="top-navbar">
        <WebHeader />
      </div>
      <div className='d-flex'>
        <div className="side-navbar">
          <SideNavWeb />
        </div>
        {/* <MomSection /> */}
        {/* <MomZeroState/> */}
        {/* <NewMOM/> */}
        <InnerPageMom/>
      </div>
    </>
  )
}
