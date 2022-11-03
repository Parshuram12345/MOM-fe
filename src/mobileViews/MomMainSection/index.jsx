import React from 'react'
// import FootNavigation from '../../components/common/FootNavigation/FootNavigation'
import MomSection from '../../components/heroComponentMobileView/momSection';
import MobileHeader from "../../components/heroComponentMobileView/headerMob/MobileHeader"

function MomMainSectionMobilePage() {
  return (
    <>
        <div className='mobile-top-navbar d-flex align-center justify-between'>
              <MobileHeader/>
        </div>
        <MomSection/>
        {/* <FootNavigation/> */}
    </>
  )
}

export default MomMainSectionMobilePage