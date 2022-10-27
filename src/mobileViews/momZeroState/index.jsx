import React from 'react'
import MomZeroState from '../../components/heroComponentMobileView/momZeroState';
import MobHeader from '../../components/common/NewHeaderAndNavbar/MobHeader'

function MomZeroStateMobilePage() {
  return (
    <>
         <div className='mobile-top-navbar d-flex align-center justify-center width-100'>
         <MobHeader/>
        </div>
        <MomZeroState/>
    </>
  )
}

export default MomZeroStateMobilePage