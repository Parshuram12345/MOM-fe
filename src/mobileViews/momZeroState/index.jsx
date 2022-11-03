import React from 'react'
import MomZeroState from '../../components/heroComponentMobileView/momZeroState';
// import MobHeader from '../../components/common/NewHeaderAndNavbar/MobHeader'
import MobileHeader from "../../components/heroComponentMobileView/headerMob/MobileHeader";

function MomZeroStateMobilePage() {
  return (
    <>
         <div className='mobile-top-navbar d-flex align-center width-100'>
         {/* <MobHeader/> */}
         <MobileHeader/>
        </div>
        <MomZeroState/>
    </>
  )
}

export default MomZeroStateMobilePage