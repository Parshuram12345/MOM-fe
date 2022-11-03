import React from 'react'
import InnerPageMom from '../../components/heroComponentMobileView/innerPageMOM';
// import MobHeader from '../../components/common/NewHeaderAndNavbar/MobHeader'
import MobileHeader from "../../components/heroComponentMobileView/headerMob/MobileHeader"

function InnerMomPage() {
  return (
    <>
        <div className='mobile-top-navbar d-flex align-center width-100'>
        {/* <MobHeader/> */}
        <MobileHeader/>
        </div>
        <InnerPageMom/>
    </>
  )
}

export default InnerMomPage