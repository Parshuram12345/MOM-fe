import React from 'react'
import ReviewsCardMobile from './ReviewsCardMobile'
// import Left from '../Images/';
import {MdKeyboardArrowLeft}  from 'react-icons/md'

import { Link } from "react-router-dom";

const MobileMyReviewsSummary = () => {

    return (
        
        <div className='webProjectSummary_content_container' style={{ width: '100%', padding: '0px' }}>
            <section className="webProjectSummary_content">
                <div className=" d-flex justify-content-between mt-2 mb-3 ml-2" style={{ backgroundColor: "white", height: '3rem' }}>
                    <div className=" align-items-center" to="/myprofile" style={{ textDecoration: "none", color: "black", marginLeft: '20px', marginTop: '20px' }}>

                        <span className=" d-flex align-items-center" >
                            <Link className="me-3  d-flex" to="/myprofile" style={{ textDecoration: "none" }}>
                                <MdKeyboardArrowLeft style={{color:'black', marginTop: '-9px'}} size={30}/>
                                <div className="page-Heading mx-2" style={{ color: "black", marginTop: '-7px' }} role="button">View My Reviews</div>

                            </Link>

                        </span>

                    </div>
                </div>

                <div className='' style={{ background: 'white', height: 'fit-content' }}>

                    <div>
                        <ReviewsCardMobile />
                    </div>

                </div>

            </section>
        </div>

    )
}

export default MobileMyReviewsSummary