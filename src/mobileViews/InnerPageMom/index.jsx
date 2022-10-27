import React from 'react'
import InnerPageMom from '../../components/heroComponentMobileView/innerPageMOM';
import MobHeader from '../../components/common/NewHeaderAndNavbar/MobHeader'

function InnerMomPage() {
  return (
    <>
        <div className='mobile-top-navbar d-flex align-center justify-center width-100'>
        <MobHeader/>
        </div>
        <InnerPageMom/>
    </>
  )
}

export default InnerMomPage