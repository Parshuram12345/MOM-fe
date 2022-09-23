import React from 'react';
import { AiOutlineShareAlt, AiFillPlusCircle } from "react-icons/ai";
import { data } from "../../utils";
import "./InnerPageMom.css"
import { Link } from 'react-router-dom';

function InnerPageMom() {
    const pointOfMom = data.MomContent;
    return (
        <>
            <div className="d-flex-col width-75 margin-left-3">
                <div className="momHead-wrapper d-flex justify-between align-center">
                    <div className="d-flex width-50 align-center justify-between">
                        <div className="mom-head font-w-500">Minutes of Meetings</div>
                        <div className="ui fluid category search">
                            <div className="ui icon input">
                                <input className="prompt" id="search-bar" type="text" placeholder="Search" />
                                <i className="search icon"></i>
                            </div>
                            <div className="results"></div>
                        </div>
                    </div>
                    <Link to="/newmom">
                    <button className="mom-btn">Create a MOM</button>
                    </Link>
                </div>
                <div className='d-flex-col'>
                    <div className='d-flex align-center'>Discussed layouts for the living and the dining area <AiOutlineShareAlt /></div> <span className='share-icon'></span>
                    <div className='d-flex justify-between width-86'>
                        <div className='color-text-888888'>28 may 2022 . Google meet</div>
                        <div className='d-flex justify-between width-18'>
                            <div className='color-text-888888'>Layout</div>
                            <div>Share With</div>
                        </div>
                    </div>
                    <hr style={{ width: "75%" }} />
                    <div className='d-flex justify-between width-89'>
                        <div name="points" className='points-container-field border-none bg-color-fa width-84'>
                            {
                                pointOfMom && pointOfMom.map((elem, index) => {
                                    return (
                                        <div className='d-flex divider-margin'>
                                            <span className='points-counter'>{index + 1}.</span><div className='text-align-justify'>{elem.points}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='share-with-wraper'>
                            <hr style={{ width: "75px" }} />
                            <div className='d-flex-col justify-evenly height-20'>
                                <div>Amit Sunari</div>
                                <div>Anmol Tuli</div>
                                <div className='color-text d-flex align-center'><AiFillPlusCircle /> Add Members</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default InnerPageMom