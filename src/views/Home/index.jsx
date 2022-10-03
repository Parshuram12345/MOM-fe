import React from 'react'
import SideNavWeb from '../../components/SideNavWeb/SideNavWeb';
import WebHeader from '../../components/WebHeader/WebHeader';
import MomSection from './../../components/Herocomponent/momSection/MomSection';

 function Home() {
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
        <MomSection/>
        </div>
      </div>
    </>
  )
}

export default Home