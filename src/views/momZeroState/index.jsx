import React from 'react'
import SideNavWeb from '../../components/SideNavWeb/SideNavWeb';
import WebHeader from '../../components/WebHeader/WebHeader';
import MomZeroState from '../../components/Herocomponent/momZeroState/index';

 function MomZeroStatePage() {
  return (
    <>
        <div className="top-navbar">
        <WebHeader/>
      </div>
      <div className='d-flex'>
        <div className="side-navbar">
          <SideNavWeb/>
        </div>
        <MomZeroState/>
      </div>
    </>
  )
}

export default MomZeroStatePage;