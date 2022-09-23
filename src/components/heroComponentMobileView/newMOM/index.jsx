import React, { useState } from "react";
import "./newMOM.css";
import { FaGreaterThan } from "react-icons/fa";
import { AiOutlineClose,AiOutlinePlusCircle } from "react-icons/ai";
import { data } from "../../utils";
import { useEffect } from "react";

function NewMom() {
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [location, setLocation] = useState();
  const [errormsg, setErrormsg] = useState(false);
  const [emailsharewith, setEmailsharewith] = useState(["diskhant@gmail.com"]);
  const [title, setTitle] = useState();
  const { MomContent, access_token, pointsData } = data;

  ///------delete the email field ------///
  const deleteEmailField = (index) => {
    const deleteemail = [...emailsharewith];
    if (emailsharewith.length > 1) {
      deleteemail.splice(index, 1);
      setEmailsharewith(deleteemail);
    }
  };
  ///-----edit the email field -------///
  const editEmailField = (e, index) => {
    // setEmailsharewith([emailsharewith[index] = e])
    const inputdata = [...emailsharewith];
    inputdata[index] = e.target.value;
    setEmailsharewith(inputdata);
  };
  ///-----add the email field -----///
  const addEmailField = () => {
    const addemail = [...emailsharewith, []];
    setEmailsharewith(addemail);
  };

  const handlePostData = (e) => {
    console.log(e);
    // e.preventDefault();
    console.log(emailsharewith, typeof emailsharewith);
    const bodyData = JSON.stringify({
      date: date,
      category: category,
      location: location,
      title: title,
      sharedWith: emailsharewith,
      points: pointsData,
    });
    fetch("https://pmt.idesign.market/api/mom/addEditMOM", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: bodyData,
    })
      .then((response) => {
        console.log(response.status);
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmitData = () => {
    if (!date && !category && !pointsData) {
      handlePostData();
    } else {
      setErrormsg(true);
    }
  };
  return (
    <>
      <div className="d-flex-col justify-around padding-3 height-90">
        <div className="d-flex justify-around width-40 align-center">
          <div className="font-size-14 color-text-888888">MOM</div>
          <div className="font-size-14 color-text-888888">
            <FaGreaterThan />
          </div>
          <div className="color-text">New MOM</div>
        </div>
        <div className="font-size-16 font-weight-500 divider-margin">
          Create a MOMs
        </div>
        <hr />
        <div className="d-flex-col justify-around height-14">
          <div className="d-flex justify-between align-center">
            <label>Date:</label>
            <input
              type="date"
              required
              placeholder="select Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-df bg-color-fa padding-5 width-60"
            />
          </div>
          <div className="d-flex justify-between align-center">
            <label>Category:</label>
            <select
              className="border-df bg-color-fa padding-5 width-60"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option name="select">Select your category</option>
              <option>Layout</option>
              <option>Measurements</option>
            </select>
          </div>
        </div>
        <div className="d-flex-col justify-between divider-margin">
          <label>Location:</label>
          <input
            type="text"
            placeholder="where did you do the meet?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-df bg-color-fa padding-5"
          />
        </div>
        <div className="d-flex-col divider-margin">
          <label>Share with </label>
          <div className=' d-flex border-df align-center min-height-5 bg-color-fa'>
                    {
                            emailsharewith && emailsharewith.map((emaiID, index) => {
                                return (
                                    <div key={index} className='d-flex-col email-wrapper align-center border-df border-radius-25 width-65'>
                                        <input type="email" className='border-none border-radius-25 padding-5' value={emaiID}
                                            onChange={(e) => editEmailField(e.target.value, index)}
                                            placeholder='enter share email' />
                                        <AiOutlineClose onClick={() => deleteEmailField(index)} />
                                    </div>
                                )
                            })
                        }
                        <AiOutlinePlusCircle onClick={()=> addEmailField()} className='position-absolute plus-icon'/>
                    </div>
        </div>
        <div className="d-flex-col divider-margin">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="border-df bg-color-fa padding-5"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of the MOM"
          />
        </div>
        <div className="d-flex-col justify-around divider-margin">
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
          <textarea
            rows="8"
            cols="50"
            className="padding-5 border-df"
            placeholder="write something here"
          ></textarea>
        </div>
        {errormsg && (
          <p className="error-msg" style={{ color: "red" }}>
            Write something here
          </p>
        )}
        <button
          type="submit"
          className="submit-btn bg-color border-none padding-5"
          onClick={() => handleSubmitData()}
        >
          Submit
        </button>
      </div>
    </>
  );
}
export default NewMom;
