import React from 'react';
import HeaderNav from './HeaderNav';
import SideBarWeb from './SideBarWeb';
import Left from "../Images/leftarrow.png";
import group from "../../Assets/profile/group.png"
import Star from "../../Assets/profile/star.png"
import dot from "../../Assets/profile/dot.png";
import popup_menu from "../../Assets/profile/popup_menu.png";
import MobileViewYourReview from './MobileViewYourReview';

export default function ViewYourReview() {
    return (
        <>
            {/* <HeaderNav /> */}
            <div className='d-none d-md-block'>
                <MobileViewYourReview />
            </div>
            <div className='d-block d-md-none '>
                {/* <div><SideBarWeb /></div> */}
                <div className='d-flex flex-column'>
                    <div className='d-flex justify-content-between mt-3' style={{ width: '100vw', marginLeft: '20px' }}>
                        <div className="d-flex justify-content-between">
                            <img className='mt-2' style={{ width: "10px", height: "10px" }} src={Left} />
                            <div className="" style={{ paddingLeft: '20px' }}>View Your Reviews</div>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginLeft: '30px', marginTop: '20px', display: 'flex' }}>
                            <img className='mt-2' style={{ width: "35px", height: "35px", marginTop: '10px' }} src={group} />
                            <p style={{
                                marginTop: '10px', marginLeft: '10px', color: '#232323', fontFamily: 'Public Sans',
                                color: '#232323',
                                fontWeight: '600',
                                fontSize: '24px',
                                lineHeight: '28px'
                            }}>Reliable And Dependable Firm</p>
                            <div style={{ marginLeft: '12px', marginTop: '6px' }}>   <img className='mt-2' style={{ width: "10px", height: "10px" }} src={Star} /></div>
                            <span style={{
                                marginTop: '16px', marginLeft: '5px',
                                fontFamily: 'Public Sans',
                                color: ' #49B7CF',
                                fontWeight: '500',
                                fontSize: "11px",
                                lineHeight: '14px'
                            }}> 4.3</span>
                            <div style={{position:'absolute',right:'20px'}}> 
                                <img className='mt-2' style={{width: "15px", height: "15px", objectFit: 'contain' }} src={popup_menu} />
                            </div>
                        </div>

                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{
                            fontFamily: 'Public Sans',
                            color: '#888888', marginTop: '-10px',
                            fontWeight: '400',
                            fontSize: '20px',
                            lineHeight: '24px', marginLeft: '5rem'
                        }}>Designer</div>
                        <div style={{ marginTop: '-8px', marginLeft: '5px' }}> <img className='' style={{ width: "5px", height: "5px" }} src={dot} /></div>
                        <div style={{ marginTop: '-8px', marginLeft: '5px' }}><p style={{
                            fontFamily: 'Public Sans', color: '#888888',
                            fontWeight: '400',
                            fontSize: '20px',
                            lineHeight: '24px'
                        }}>01-02-2022</p></div>
                    </div>
                    <div style={{ marginLeft: '30px', alignItems: 'center' }}>
                        <p style={{
                            fontFamily: 'Public Sans',
                            color: '#8B8A8A',
                            fontWeight: '400',
                            fontSize: '18px',
                            lineHeight: '28px',
                        }}>We engaged Forefront after interviewing quite a few interior designers as we were not sure at the time how the renovation for our new 5 room BTO flat should be We engaged Forefront after interviewing quite a few interior designers as we were not sure at the time how the renovation for our new 5 room BTO flat should be </p>

                    </div>
                </div>

            </div>
        </>
    )
}