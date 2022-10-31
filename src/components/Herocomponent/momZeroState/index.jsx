import React, { useEffect,useContext } from "react";
import "./momZeroState.css";
import { FiChevronRight } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";
import { MomContext } from "../../../App.jsx";

function MomZeroState() {
  const {
    momdate,
    setMomdate,
    category,
    bulletPoints,
    setCategory,
    location,
    setLocation,
    title,
    setTitle,
    emaillist,
    dateerror,
    categoryerror,
    pointserror,
    addEmail,
    removeEmail,
    emailValid,
    roomName,
    handlePointsField,
    handlePointsTextArea,
    handleSubmitData,
    handleSaveDraft,
    getClientProject,
    maxDateCurrent
  } = useContext(MomContext);
  useEffect(()=>{
    getClientProject()
   },[])
  return (
    <>
      <div className=" justify-around margin-left-3 width-75">
        <div className="d-flex align-center width-fit-content divider-margin">
          <div className="small-font-10 color-text-888888">
            Ashok rathi residence
          </div>
          <span className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </span>
          <span className="color-text small-font-10">New MOM</span>
        </div>
        <div className="d-flex align-center justify-between">
        <div className="font-size-18 font-w-500 divider-margin">
          Create a MOM
        </div>
        <div className="d-flex align-center justify-between width-22">
            <button
              className="savedata-button font-size-12 font-weight-400 border-radius-4"
              onClick={() => handleSaveDraft()}
            >
              Save as Draft
            </button>
            <button
              className="submitdata-button bg-color border-none border-radius-4"
              onClick={() => handleSubmitData()}>
              Submit
            </button>
          </div>
        </div>
        <div className="ui divider"></div>
        <div className="divider-margin">
          <div className="d-flex justify-between align-center">
            <div className="d-flex justify-between align-center width-25">
              <label className="label-text marign-top-5">Date:</label>
                <input type="text"
                  className="border-df bg-color-fa padding-5 border-radius-4 width-80"
                  placeholder="Select date"
                  max={maxDateCurrent()}
                  value={momdate}
                   onChange={(e)=>setMomdate(e.target.value)}
                   onFocus={(e)=>e.target.type="date"}
                />
            </div>
            <div className="d-flex justify-between align-center width-30">
              <label className="label-text marign-top-5">Category:</label>
              <div className="d-flex align-center position-relative width-75">
                <select
                  className={`border-df bg-color-fa padding-5 border-radius-4 width-100 ${category===""? "color-text-888888":""}`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Select your category</option>
                  {roomName &&
                    roomName?.map((room,index) => {
                      return (
                        <>
                          <option key={index} value={room}>{room}</option>
                        </>
                      );
                    })}
                </select>
                <AiFillCaretDown style={{background:"white"}} className="position-absolute right-3 color-text-888888" />
              </div>
            </div>
            <div className="d-flex justify-between align-center width-30">
              <label className="label-text marign-top-5">Location:</label>
              <input
                type="text"
                placeholder="Where did you the meet?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-df bg-color-fa padding-5 border-radius-4 width-75"
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
        <div style={{ marginTop: "22px" }}  className="d-flex-col">
          <label style={{marginBottom:"1px"}} className="label-text">
            Share with (add more email ID as required):
          </label>
          <div className="email-container d-flex align-center width-100 border-df bg-color-fa border-radius-4">
            <ul id="tags">
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
              onKeyUp={(event) =>
                event.key === "Enter" ? addEmail(event) : null}
              placeholder={emaillist.length===0 ? "Enter the Email ID": null }
            />
          </div>
          {emailValid &&  (
              <small className="" style={{ color: "red" }}>Email isn't valid </small>
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
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write your title here"
            />
          </div>
          <div className="d-flex-col margin-top-5">
            <label className="label-text" style={{marginBottom:"0"}}  htmlFor="points">
              Points
            </label>
            <textarea
              rows="6"
              cols="50"
              style={{resize:"none"}}
              value={bulletPoints}
              className="textarea-points-field border-df bg-color-fa padding-6 border-radius-4"
              onChange={handlePointsField}
              onKeyup={(e) => {
                handlePointsTextArea(e);
              }}
              placeholder="Type something here"
            ></textarea>
          </div>
          {pointserror && (
            <small style={{ color: "red" }}>write something here</small>
          )}
        </div>
      </div>
    </>
  );
}
export default MomZeroState;
