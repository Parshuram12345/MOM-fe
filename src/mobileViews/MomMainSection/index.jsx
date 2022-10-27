import React from 'react'
// import FootNavigation from '../../components/common/FootNavigation/FootNavigation'
import MobHeader from '../../components/common/NewHeaderAndNavbar/MobHeader'
import MomSection from '../../components/heroComponentMobileView/momSection'

function MomMainSectionMobilePage() {
  return (
    <>
        <div className='mobile-top-navbar d-flex align-center justify-between'>
              {/* top navbar */}
              <MobHeader/>
        </div>
        <MomSection/>
        {/* <FootNavigation/> */}
    </>
  )
}

export default MomMainSectionMobilePage