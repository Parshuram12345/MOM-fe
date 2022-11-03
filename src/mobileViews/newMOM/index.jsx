import React from 'react'
import NewMom from '../../components/heroComponentMobileView/newMOM';
// import MobHeader from '../../components/common/NewHeaderAndNavbar/MobHeader';
import MobileHeader from "../../components/heroComponentMobileView/headerMob/MobileHeader";

function NewMomMobilePage() {
  return (
    <>
        <div className='mobile-top-navbar d-flex align-center width-100'>
        {/* <MobHeader/> */}
        <MobileHeader/>
        </div>
        <NewMom/>
    </>
  )
}

export default NewMomMobilePage