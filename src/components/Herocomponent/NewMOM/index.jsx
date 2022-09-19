import React from 'react';
import "./NewMom.css"
import { FaGreaterThan } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai";
import {data} from "../../utils";

function NewMOM() {
    const pointOfMom = data.MomContent;
  return (
    <>
       <div className='d-flex-col justify-around margin-left-3 width-75'>
                <div className='d-flex'>
                    <small className='opacity-5'>
                        MOM<span className='align-center'><FaGreaterThan/></span>
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
                        <option  name="select" className='opacity-5'>
                            Select your category
                        </option>
                            <option>
                                Layout
                            </option>
                        </select>
                    </div>
                    <div className='d-flex justify-between align-center width-27'>
                        <label>Location:</label>
                        <input type="text" placeholder='where did you the meet?' value="Google meet" className='border-df bg-color-fa padding-5' />
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
                    <input type="text" className='border-df bg-color-fa padding-5' name="title" value="Discussed the furniture Layout" placeholder="Write your title here" />
                </div>
                <div className='d-flex-col'>
                    <label htmlFor="points">Points</label>
                    <div name="points" rows="10" cols="50" className='points-container border-df bg-color-fa padding-5'>
                        <ul>
                     {
                         pointOfMom && pointOfMom.map((elem,index)=>{
                             return  <div> <span className='points-counter'>{index+1}.</span>{elem.points}</div>
                    
                            })
                        }
                    </ul>
                    </div>
                </div>
                    <button className='submit-btn bg-color border-none padding-5'>Submit</button>
            </div>
    </>
  )
}

export default NewMOM