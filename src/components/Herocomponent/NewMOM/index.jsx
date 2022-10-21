import React, { useContext, useEffect } from "react";
import "./NewMom.css";
import axios from "axios"
import { useParams} from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";
import { MomContext } from "../../../App.jsx";
import {data} from "../../utils"
function NewMom() {
  const {projectId,id}=useParams();
  const {
    momdate,
    setMomdate,
    category,
    setCategory,
    bulletPoints,
    location,
    setLocation,
    title,
    setTitle,
    emaillist,
    dateerror,
    categoryerror,
    pointserror,
    emailValid,
    shareMom,
    roomName,
    handleSaveDraft,
    getClientProject,
    addEmail,
    removeEmail,
    setBulletPoints,
    handlePointsTextArea,
    handleSubmitData,
    setDateerror,
    setCategoryerror,
    setPointserror,
    navigateHome,
  } = useContext(MomContext);
   const {access_token,BaseUrl}=data;

  ///---get api data ----///
 async function getApiData() {
  return await axios.get(`${BaseUrl}/api/mom/getMOM?projectId=${projectId}`, {
    headers: {
      Authorization: access_token,
    },
  });
}

  ///---play with error ----///
  if (momdate && dateerror) {
    setDateerror(false);
  }
  if (category && categoryerror) {
    setCategoryerror(false);
  }
  if (bulletPoints && pointserror) {
    setPointserror(false);
  }
  let bullet = "\u2022"
  useEffect(() => {
    if(id){
      getApiData()
      .then((res) => {
        let respoonseWithId = res?.data?.momData?.filter(({_id})=> _id===id)[0];
        setCategory(respoonseWithId.category)
        setMomdate(
      `${respoonseWithId?.date?.substring(0, 4)}-${respoonseWithId?.date.substring(5, 7)}-${respoonseWithId?.date?.substring(8, 10)}`
      );
       setLocation(respoonseWithId?.location);
       setTitle(respoonseWithId?.title)
       setBulletPoints(respoonseWithId?.points?.filter((elem)=> elem !==" \n").map((item)=> { return (`${bullet} ${item.trim()}`)}).join("\n"));}
      )
      .catch((error) => {
        console.error(error); 
      });
    }
    getClientProject();
  }, [id]);
  return (
    <>
      <div className="newMOM-container justify-around margin-left-3 width-95">
        <div className="d-flex align-center justify-between width-fit-content margin-top-10">
          <div className="small-font-10 color-text-888888" onClick={()=>navigateHome()}>
            MOM
          </div>
          <span className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </span>
          <div className="color-text small-font-10 font-weight-500">
            New MOM
          </div>
        </div>
        <div className="d-flex align-center justify-between margin-top-10">
          <div className="font-size-18 font-w-500 color-text divider-margin">
            Create a MOM
          </div>
          <div className="d-flex align-center justify-between width-25">
            <button
              className="savedata-button small-font-12 font-weight-400 border-radius-4"
              onClick={() => handleSaveDraft()}
            >
              Save as Draft
            </button>
            <button
              className="submitdata-button small-font-12 bg-color border-none border-radius-4"
              onClick={() => handleSubmitData()}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="ui divider"></div>
        <div className="divider-margin">
          <div className="d-flex justify-between align-center">
            <div className="d-flex justify-between align-center width-25">
              <label className="label-text margin-top-5">Date:</label>
              <input
                type="text"
                className="border-df bg-color-fa padding-5 border-radius-4 width-80"
                value={momdate}
                onChange={(newdate) => 
                  setMomdate(newdate.target.value)
                }
                placeholder="Select date"
                onFocus={(e) => (e.target.type = "date")}
              />
            </div>
            <div className="d-flex justify-between align-center width-30">
              <label className="label-text margin-top-5">Category:</label>
              <div className="d-flex align-center position-relative width-75">
                <select
                  className={`border-df bg-color-fa padding-5 border-radius-4 width-100 ${
                    category === "" && "color-text-888888"
                  }`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select your category</option>
                  {roomName &&
                    roomName?.map((room,index) => {
                      return (
                        <>
                          <option key={index} value={room}>{room}</option>
                        </>
                      );
                    })}
                </select>
                <AiFillCaretDown
                  style={{ background: "#FAFAFA" }}
                  className="position-absolute right-3  color-text-888888"
                />
              </div>
            </div>
            <div className="d-flex justify-between align-center width-30">
              <label className="label-text margin-top-5">Location:</label>
              <input
                type="text"
                placeholder="Where did you the meet?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="width-75 border-df bg-color-fa padding-5 border-radius-4"
              />
            </div>
          </div>
          <div className="position-relative">
            {dateerror && (
              <small
                className="position-absolute"
                style={{ color: "red",marginLeft:"4.5%" }}
              >
                date is required
              </small>
            )}
            {categoryerror && (
              <small
                className="position-absolute"
                style={{ color: "red",marginLeft:"40%" }}
              >
                category is required
              </small>
            )}
          </div>
        </div>
        <div style={{ marginTop: "22px" }} className="d-flex-col">
          <label style={{marginBottom:"1px"}} className="label-text">
            Share with (add more email ID as required):
          </label>
          <div className="email-container d-flex align-center width-100 border-df bg-color-fa border-radius-4">
            <ul className="tags d-flex align-center">
              {emaillist?.map((email, index) => (
                <li key={index} className="email-wrapper border-df">
                  <span>{email}</span>
                  <span
                    className="tag-close-icon"
                    onClick={() => removeEmail(index)}
                  >
                    x
                  </span>
                </li>
              ))}
            </ul>
            <input
              type="email"
              className="email-input bg-color-fa"
              onKeyUp={(event) => event.key === "Enter" && addEmail(event)}
              placeholder={emaillist.length===0 ? "Enter the Email ID": null }
              autoFocus={shareMom}
            />
          </div>
        </div>
        {emailValid && (
          <small className="" style={{ color: "red" }}>
            Email isn't valid
          </small>
        )}
        <div className="d-flex-col divider-margin-15">
          <label className="label-text" style={{marginBottom:"0"}} htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className="border-df bg-color-fa padding-6 border-radius-5 border-radius-4"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value.replace(/\s+/gi," "))}
            placeholder="Write your title here"
          />
        </div>
        <div className="d-flex-col margin-top-5">
          <label className="label-text" style={{marginBottom:"0"}} htmlFor="points">
            Points
          </label>
          <textarea
            rows="6"
            cols="50"
            style={{resize:"none"}}
            value={bulletPoints}
            className="textarea-points-field border-df bg-color-fa padding-6 border-radius-4 text-align-justify"
            onChange={(e) => { handlePointsTextArea(e)}}
            placeholder="Type something here"
          />
        </div>
        {pointserror && (
          <small style={{ color: "red" }}>write something here</small>
        )}
      </div>
    </>
  );
}
export default NewMom;
