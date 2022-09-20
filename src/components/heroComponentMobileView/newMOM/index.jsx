import React,{useState} from 'react';
import "./newMOM.css";
import { FaGreaterThan } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai";
import {data} from "../../utils";

function NewMom() {
    const [date,setDate] = useState()
    const [category,setCategory] = useState()
    const [location,setLocation] = useState()
    const [title,setTitle] = useState()
    const {MomContent,access_token,pointsData}=data

    const handleSubmitData=(e)=>{
        e.preventDefault()
        const bodyData = JSON.stringify({
            date: date,
            category: category,
            location: location,
            title: title,
            points:pointsData
          });
        fetch("https://pmt.idesign.market/api/mom/addEditMOM", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
             'Authorization': access_token 
            },
            body:bodyData,
          })
            .then((response) => {
              console.log(response.status);
              console.log(response)
              return response.json();
            })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
    }
  return (
      <>
       <div className='d-flex-col justify-around padding-3 height-90'>
                <div className='d-flex'>
                    <small className='opacity-5'>
                        MOM<span className='align-center'><FaGreaterThan/></span>
                    </small>
                    <span className='color-text'>New MOM</span>
                </div>
                <div className='font-size-16 font-weight-500'>
                    Create a MOMs
                </div>
                <hr />
                <form>
                <div className='d-flex-col justify-around height-20'>
                    <div className='d-flex justify-between align-center'>
                        <label>Date:</label>
                        <input type="date" required  placeholder='select Date' value={date} onChange={(e)=> setDate(e.target.value)} className='border-df bg-color-fa padding-5 width-60' />
                    </div>
                    <div className='d-flex justify-between align-center'>
                        <label>Category:</label>
                        <select className='border-df bg-color-fa padding-5 width-60' required value={category} onChange={(e)=> setCategory(e.target.value)}> 
                        <option  name="select">
                            Select your category
                        </option>
                            <option>
                                Layout
                            </option>
                            <option>
                                Measurements
                            </option>
                        </select>
                    </div>
                    <div className='d-flex-col justify-between height-7'>
                        <label >Location:</label>
                        <input type="text" placeholder='where did you 
                        the meet?' value={location} onChange={(e)=> setLocation(e.target.value)} className='border-df bg-color-fa padding-5' />
                    </div>
                </div>
                 </form>
                <div className='d-flex-col height-7'>
                    <label>Share with </label>
                    <div className='d-flex-col border-df bg-color-fa padding-1'>
                        <span className='email-field border-df border-radius-25 padding-5'>dikshant@1996gmail.com <AiOutlineClose/></span>
                        </div>
                </div>
                <div className='d-flex-col height-7'>
                    <label htmlFor="title">Title</label>
                    <input type="text" className='border-df bg-color-fa padding-5' name="title" value={title} onChange={(e)=> setTitle(e.target.value)}  placeholder="Title of the MOM" />
                </div>
                <div className='d-flex-col justify-around height-7'>
                    <label htmlFor="points">Points</label>
                    {/* <div name="points" className='points-container border-df bg-color-fa padding-5'>
                     {
                         MomContent && MomContent.map((elem,index)=>{
                             return  (
                             <>
                             <span className='points-counter'>{index + 1}.</span>
                             <div className="text-align-justify">{elem.points}</div>
                             </>
                             )
                            })
                        }
                    </div> */}
                    <textarea rows="8" cols="50" placeholder="write something here"></textarea>
                </div>
                    <button className='submit-btn bg-color border-none padding-5' onClick={()=> handleSubmitData ()}>Submit</button>
            </div>
    </>
  )
}
export default NewMom