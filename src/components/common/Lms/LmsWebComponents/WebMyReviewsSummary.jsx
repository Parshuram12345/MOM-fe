import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import SideBarWeb from './SideBarWeb';
import Left from '../Images/leftarrow.png';
import { Link } from "react-router-dom";
import ReviewsCard from "../ReviewsCard";


export default function WebMyReviewsSummary() {
    
    return (
        <>
            <HeaderNav />
            
            <div className='d-flex'>
                <div>
                    <SideBarWeb />
                </div>

                <div className='webProjectSummary_content_container' style={{ width: '100%', padding:'0px', height:'90vh', overflow:'scroll' }}>
                    <section className="webProjectSummary_content" style={{width: '90%'}}>
                        <div className=" d-flex justify-content-between mt-2 mb-3 ml-2" style={{ backgroundColor: "white" , height:'3rem'}}>
                            <div className=" align-items-center" to="/myprofile" style={{ textDecoration: "none", color: "black", marginLeft: '20px', marginTop: '20px' }}>
                                
                                <span className=" d-flex align-items-center" >
                                    <Link className="me-3  d-flex" to="/myprofile" style={{textDecoration: "none"}}>
                                        <img style={{ width: "5px", height: "10px" }} src={Left} />
                                        <div className="page-Heading mx-2" style={{ color: "black", marginTop:'-7px'}} role="button">View My Reviews</div>

                                    </Link>

                                </span>

                            </div>
                        </div>
                        
                        <div className='' style={{ background: 'white', height: 'fit-content'}}>
        
                            <div>
                                <ReviewsCard/>
                            </div>
                            
                        </div>

                    </section>    
                </div>   

                {/* <div className="reviews-container" style={{ height: "80vh", backgroundColor: 'grey', }}>

                </div>  */}
            </div>

        </>

    )
}