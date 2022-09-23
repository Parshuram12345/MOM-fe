import React from 'react'
import NewMomMobilePage from './mobileViews/newMOM';
import MomZeroStateMobilePage from './mobileViews/momZeroState';
import MomMainSectionMobilePage from './mobileViews/MomMainSection';
import InnerMomPage from './mobileViews/InnerPageMom';
import "./Styles/mobile/mobile.css"
import { Route, Routes } from 'react-router-dom';
function MobileApp() {
  return (
    <>
       <Routes>
       <Route path='/' element={  <MomZeroStateMobilePage/> } />
       <Route path='/mom' element={ <MomMainSectionMobilePage/> } />
       <Route path='/newmom' element={ <NewMomMobilePage/> } />
       <Route path='/mominner' element={ <InnerMomPage/> } />
       </Routes>
    </>
  )
}

export default MobileApp;