import React from 'react'
import SidebarWebNew from '../../components/common/SideNavWeb/SidebarWebNew.jsx';
import HeaderWeb from '../../components/common/WebHeaderWeb/HeaderWeb.jsx';
import MomSection from './../../components/Herocomponent/momSection/MomSection';


 function Home() {
  return (
    <>
      <div className="top-navbar">
        {/* <WebHeader/> */}
        <HeaderWeb/>
      </div>
      <div className='d-flex'>
        <div className="side-navbar">
          {/* <SideNavWeb/> */}
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