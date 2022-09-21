import React, { useState } from 'react';
import "./newMOM.css";
import { FaGreaterThan } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai";
import { data } from "../../utils";
import { useEffect } from 'react';

function NewMom() {
    const [date, setDate] = useState()
    const [category, setCategory] = useState()
    const [location, setLocation] = useState()
    const [errormsg,setErrormsg]= useState(false)
    const [emailsharewith, setEmailsharewith] = useState(["dikshant@1996gmail.com"])
    const [title, setTitle] = useState()
    const { MomContent, access_token, pointsData } = data

    const handleSubmitData = (e) => {
        console.log(emailsharewith,typeof emailsharewith)
        // e.preventDefault();
        const bodyData = JSON.stringify({
            date: date,
            category: category,
            location: location,
            title: title,
            sharedWith: emailsharewith,
            points: pointsData
        });
        fetch("https://pmt.idesign.market/api/mom/addEditMOM", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                'Authorization': access_token
            },
            body: bodyData,
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
    useEffect(()=>{
        if( date !=="" &&  category !=="" && pointsData!==""){
            handleSubmitData()
        }
        else{
            setErrormsg(true)
        }
    },[])
    return (
        <>
            <div className='d-flex-col justify-around padding-3 height-90'>
                <div className='d-flex justify-around width-40 align-center'>
                    <div className='font-size-14 color-text-888888'>MOM</div>
                    <div className='font-size-14 color-text-888888'><FaGreaterThan /></div>
                    <div className='color-text'>New MOM</div>
                </div>
                <div className='font-size-16 font-weight-500 divider-margin'>
                    Create a MOMs
                </div>
                <hr />
                <form>
                    <div className='d-flex-col justify-around height-14'>
                        <div className='d-flex justify-between align-center'>
                            <label>Date:</label>
                            <input type="date" required placeholder='select Date' value={date} onChange={(e) => setDate(e.target.value)} className='border-df bg-color-fa padding-5 width-60' />
                        </div>
                        <div className='d-flex justify-between align-center'>
                            <label>Category:</label>
                            <select className='border-df bg-color-fa padding-5 width-60' required value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option name="select">
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
                    </div>
                    <div className='d-flex-col justify-between divider-margin'>
                        <label >Location:</label>
                        <input type="text" placeholder='where did you do the meet?'
                            value={location} onChange={(e) => setLocation(e.target.value)} className='border-df bg-color-fa padding-5' />
                    </div>
                    <div className='d-flex-col divider-margin'>
                        <label>Share with </label>
                        {
                            emailsharewith && emailsharewith.map((emaiID,index) => {
                                return <div key={index} className='d-flex align-center border-df bg-color-fa padding-1'>
                                    <input type="email" className='email-field border-df border-radius-25 padding-5' value={emaiID} onChange={(e) => setEmailsharewith(e.target.value)} placeholder='dikshant@1996gmail.com' /><i className='x icon'></i>
                                </div>
                            })
                        }
                    </div>
                    <div className='d-flex-col divider-margin'>
                        <label htmlFor="title">Title</label>
                        <input type="text" className='border-df bg-color-fa padding-5' name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title of the MOM" />
                    </div>
                    <div className='d-flex-col justify-around divider-margin'>
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
                        <textarea rows="8" cols="50" className='padding-5' placeholder="write something here">
                        </textarea>
                    </div>
                    { errormsg && <p  className="error-msg" style={{color:"red"}}>Write something here</p>}
                    <button className='submit-btn bg-color border-none padding-5' 
                    onClick={()=>handleSubmitData()}
                    >Submit</button>
                </form>
            </div>
        </>
    )
}
export default NewMom