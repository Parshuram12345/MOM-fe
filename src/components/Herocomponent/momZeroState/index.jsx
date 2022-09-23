import React, { useState } from "react";
import "./momZeroState.css";
import { FaGreaterThan } from "react-icons/fa";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
// import {data} from ""
import { data } from "./../../utils/";

function MomZeroState() {
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [location, setLocation] = useState();
  const [errormsg, setErrormsg] = useState(false);
  const [emailsharewith, setEmailsharewith] = useState([
    "dikshant@gmail.com",
    "prsaini@gmail.com",
  ]);
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
  console.log(emailsharewith);
  const handlePostData = () => {
    const bodyData = JSON.stringify({
      date: date,
      category: category,
      location: location,
      title: title,
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
    if (!date || !category || !pointsData) {
        setErrormsg(true);
    } else {
        handlePostData();
        setErrormsg(false);

    }
  };
  return (
    <>
      <div className="d-flex-col justify-around margin-left-3 width-75">
        <div className="d-flex">
          <small className="opacity-5">
            Ashok rathi residence <FaGreaterThan />
          </small>
          <span className="color-text">New MOM</span>
        </div>
        <div className="font-size-24">Create a MOM</div>
        <hr />
        <div className="d-flex justify-between align-center">
          <div className="d-flex justify-between align-center width-18">
            <label>Date:</label>
            <input
              type="date"
              placeholder="select Date"
              onChange={(e) => setDate(e.target.value)}
              className="border-df bg-color-fa padding-5"
            />
          </div>
          <div className="d-flex justify-around align-center width-27">
            <label>Category:</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="border-df bg-color-fa padding-5"
            >
              <option value="" name="select">
                Select your category
              </option>
              <option value="0">Layout</option>
              <option value="1">Measurements</option>
            </select>
          </div>
          <div className="d-flex justify-between align-center width-27">
            <label>Location:</label>
            <input
              type="text"
              placeholder="where did you the meet?"
              onChange={(e) => setLocation(e.target.value)}
              className="border-df bg-color-fa padding-5"
            />
          </div>
        </div>

        <div className="d-flex-col position-relative">
          <label>Share with (add more email ID as required):</label>
          <div className="d-flex align-center min-height-5 border-df bg-color-fa">
            {emailsharewith &&
              emailsharewith.map((emaiID, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex email-wrapper align-center border-df border-radius-25 width-65"
                  >
                    <input
                      type="email"
                      className="border-none border-radius-25 padding-5"
                      value={emaiID}
                      onChange={(e) => editEmailField(e, index)}
                      placeholder="enter share email"
                    />
                    <AiOutlineClose onClick={() => deleteEmailField(index)} />
                  </div>
                );
              })}
            <AiOutlinePlusCircle
              onClick={() => addEmailField()}
              className="position-absolute plus-icon"
            />
          </div>
        </div>
        <div className="d-flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="border-df bg-color-fa padding-5"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write your title here"
          />
        </div>
        <div className="d-flex-col">
          <label htmlFor="points">Points</label>
          <textarea
            name="points"
            rows="10"
            cols="50"
            className="border-df bg-color-fa padding-5"
            placeholder="Type something here"
          />
          {/* ////-----error message -----/ */}
          {errormsg && (
            <p className="error-msg" style={{ color: "red" }}>
              Write something here
            </p>
          )}
        </div>
        <button
          onClick={() => handleSubmitData()}
          className="submit-btn bg-color border-none padding-5"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default MomZeroState;
