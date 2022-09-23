import React, { useState } from "react";
import "./NewMom.css";
import { FaGreaterThan } from "react-icons/fa";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import { data } from "../../utils";

function NewMom() {
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
  console.log(emailsharewith);

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
    console.log(inputdata[index]);
    inputdata[index] = e.target.value;
    setEmailsharewith(inputdata);
  };
  ///-----add the email field -----///
  const addEmailField = () => {
    const addemail = [...emailsharewith, []];
    setEmailsharewith(addemail);
  };
  console.log(emailsharewith);

  ///------add the points in field -----///
  const arr = [];
  const handlePointsField = (e) => {
    console.log(typeof e.target.value);
    if (e.enterKey) {
    }
    arr.push(e.target.value);
  };
  console.log(arr);
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
        <div className="d-flex align-center">
          <div className="small-font-9">MOM</div>
          <span className="d-flex align-center color-text-888888 small-font-9">
            <FaGreaterThan />
          </span>
          <span className="color-text">New MOM</span>
        </div>
        <div className="font-size-24">Create a MOM</div>
        <hr />
        <form>
          <div className="d-flex justify-between align-center">
            <div className="d-flex justify-between align-center width-18">
              <label>Date:</label>
              <input
                type="date"
                placeholder="select Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-df bg-color-fa padding-5 border-radius-4"
              />
            </div>
            <div className="d-flex justify-around align-center width-27">
              <label>Category:</label>
              <select
                className="border-df bg-color-fa padding-5 border-radius-4"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option name="select">Select your category</option>
                <option>Layout</option>
                <option>Measurements</option>
              </select>
            </div>
            <div className="d-flex justify-between align-center width-27">
              <label>Location:</label>
              <input
                type="text"
                placeholder="where did you the meet?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-df bg-color-fa padding-5 border-radius-4"
              />
            </div>
          </div>
        </form>
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
            className="border-df bg-color-fa padding-6 border-radius-5"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write your title here"
          />
        </div>
        <div className="d-flex-col">
          <label htmlFor="points">Points</label>
          {/* <div name="points" className='points-container border-df bg-color-fa padding-5'> */}
          {/* {
                            MomContent && MomContent.map((elem, index) => {
                                return (
                                    <div className='d-flex'>
                                        <span className='points-counter'>{index + 1}.</span>
                                        <div className="text-align-justify">{elem.points}</div>
                                    </div>
                                )
                            })
                        } */}
          <textarea
            rows="10"
            cols="50"
            className="points-container border-df bg-color-fa padding-6"
            onKeyDown={(e) => handlePointsField(e)}
            placeholder="Type something here"
          ></textarea>
          {/* </div> */}
          {errormsg && (
            <p className="error-msg" style={{ color: "red" }}>
              Write something here
            </p>
          )}
        </div>
        <button
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
