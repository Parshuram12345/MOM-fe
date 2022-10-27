import React from 'react'
import NewMom from '../../components/heroComponentMobileView/newMOM';
import MobHeader from '../../components/common/NewHeaderAndNavbar/MobHeader'
function NewMomMobilePage() {
  return (
    <>
        <div className='mobile-top-navbar d-flex align-center justify-center width-100'>
        <MobHeader/>
        </div>
        <NewMom/>
    </>
  )
}

export default NewMomMobilePage