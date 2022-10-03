import React from 'react'
import SideNavWeb from '../../components/SideNavWeb/SideNavWeb'
import WebHeader from '../../components/WebHeader/WebHeader'
import NewMom from './../../components/Herocomponent/NewMOM/index';

function NewMomPage() {
  return (
    <>
        <div className="top-navbar">
        <WebHeader/>
      </div>
      <div className='d-flex'>
        <div className="side-navbar">
          <SideNavWeb/>
        </div>
        {/* <div className='righside-navbar'> */}
        <NewMom/>
        {/* </div> */}
      </div>
    </>
  )
}

export default NewMomPage