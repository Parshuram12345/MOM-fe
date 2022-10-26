import React from 'react'
import HeaderWeb from '../../components/common/NewHeaderAndNavbar/HeaderWeb';
import SidebarWebNew from '../../components/common/NewHeaderAndNavbar/SidebarWebNew';
import MomSection from './../../components/Herocomponent/momSection/MomSection';


 function Home() {
  return (
    <>
      <div className="top-navbar">
       <HeaderWeb/>
      </div>
      <div className='d-flex'>
        <div className="side-navbar">
          {/* <SideNavWeb/> */}
          {/* <SidebarWebNew/> */}
          <SidebarWebNew/>

        </div>
        <div className='rightside-navbar'>
        <MomSection/>
        </div>
      </div>
    </>
  )
}

export default Home