import React from 'react';
import "./momZeroState.css"
import { FaGreaterThan } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai"

function MomZeroState() {
    return (
        <>
            <div className='d-flex-col justify-around margin-left-3 width-75'>
                <div className='d-flex'>
                    <small className='opacity-5'>
                        Ashok rathi residence <FaGreaterThan />
                    </small>
                    <span className='color-text'>New MOM</span>
                </div>
                <div className='font-size-24'>
                    Create a MOM
                </div>
                <hr />
                <div className='d-flex justify-between align-center'>
                    <div className='d-flex justify-between align-center width-18'>
                        <label>Date:</label>
                        <input type="date" placeholder='select Date' className='border-df bg-color-fa padding-5' />
                    </div>
                    <div className='d-flex justify-around align-center width-27'>
                        <label>Category:</label>
                        <select className='border-df bg-color-fa padding-5'> 
                        <option  name="select" className='opacity-5'  selected="true" disabled="disabled">
                            Select your category
                        </option>
                            <option>
                                Layout
                            </option>
                        </select>
                    </div>
                    <div className='d-flex justify-between align-center width-27'>
                        <label>Location:</label>
                        <input type="text" placeholder='where did you the meet?' className='border-df bg-color-fa padding-5' />
                    </div>
                </div>

                <div className='d-flex-col'>
                    <label>Share with (add more email ID as required):</label>
                    {/* <input type="email" className='border-df bg-color-fa padding-5' placeholder='enter your email' multiple /> */}
                    <div className='d-flex align-center border-df bg-color-fa padding-1'>
                        <span className=' email-field border-df border-radius-25 padding-5'>Amritsunari@1997gmail.com <AiOutlineClose/></span>
                        <span className='email-field border-df border-radius-25 padding-5'>dikshant@1996gmail.com <AiOutlineClose/></span>
                        </div>
                </div>
                <div className='d-flex-col'>
                    <label htmlFor="title">Title</label>
                    <input type="text" className='border-df bg-color-fa padding-5' name="title" placeholder="Write your title here" />
                </div>
                <div className='d-flex-col'>
                    <label htmlFor="points">Points</label>
                    <textarea name="points" rows="10" cols="50" className='border-df bg-color-fa padding-5' placeholder="Type something here" />
                    {/* ////-----error message -----/ */}
                    <p  classNam="error-msg" style={{color:"red"}}>Write something here</p>
                </div>
                    <button className='submit-btn bg-color border-none padding-5'>Submit</button>
            </div>

        </>
    )
}

export default MomZeroState;