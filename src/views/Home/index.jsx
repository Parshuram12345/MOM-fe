import React from 'react'
import MomSection from '../../components/Herocomponent/momSection/MomSection';
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
        <MomSection />
      </div>
    </>
  )
}
