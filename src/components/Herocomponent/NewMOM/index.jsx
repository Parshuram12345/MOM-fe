import React, { useContext, useEffect } from "react";
import "./NewMom.css";
import { FiChevronRight } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";
import { MomContext } from "../../../App.jsx";

function NewMom() {
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
    handlePointsField,
    handlePointsTextArea,
    handleSubmitData,
  } = useContext(MomContext);
  useEffect(() => {
    getClientProject();
  }, []);
  // console.log(bulletPoints)
  return (
    <>
      <div className="newMOM-container justify-around margin-left-3 width-75">
        <div className="d-flex align-center justify-between width-fit-content divider-margin">
          <div className="small-font-10 color-text-888888">
            Ashok rathi residence
          </div>
          <span className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </span>
          <div className="color-text small-font-10 font-weight-500">
            New MOM
          </div>
        </div>
        <div className="d-flex align-center justify-between">
          <div className="font-size-18 font-w-500 color-text divider-margin">
            Create a MOM
          </div>
          <div className="d-flex align-center justify-between width-30">
            <button
              className="savedata-button font-size-12 font-weight-400 border-radius-4"
              onClick={() => handleSaveDraft()}
            >
              Save as Draft
            </button>
            <button
              className="submitdata-button bg-color border-none border-radius-4"
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
              <label className="label-text">Date:</label>
              <input
                type="text"
                className="border-df bg-color-fa padding-5 border-radius-4 width-75"
                value={momdate}
                onChange={(newdate) => setMomdate(newdate.target.value)}
                placeholder="Select date"
                onFocus={(e) => (e.target.type = "date")}
              />
            </div>
            <div className="d-flex justify-between align-center width-30">
              <label className="label-text">Category:</label>
              <div className="d-flex align-center position-relative width-66">
                <select
                  className={`border-df bg-color-fa padding-5 border-radius-4 width-100 ${
                    category === "" ? "color-text-888888" : null
                  }`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select your category</option>
                  {/* <option value="Layout">Layout</option>
                  <option value="Measurements">Measurements</option> */}
                  {roomName &&
                    roomName?.map((room) => {
                      return (
                        <>
                          <option value={room}>{room}</option>
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
              <label className="label-text">Location:</label>
              <input
                type="text"
                placeholder="Where did you the meet?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className=" width-70 border-df bg-color-fa padding-5 border-radius-4"
              />
            </div>
          </div>
          <div className="position-relative">
            {dateerror && (
              <small
                className="position-absolute"
                style={{ color: "red",marginLeft:"6.5%" }}
              >
                date is required
              </small>
            )}
            {categoryerror && (
              <small
                className="position-absolute"
                style={{ color: "red",marginLeft:"43%" }}
              >
                category is required
              </small>
            )}
          </div>
        </div>
        <div style={{ marginTop: "2%" }} className="d-flex-col">
          <label className="label-text">
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
              placeholder="Enter the email ID"
              autoFocus={shareMom}
            />
          </div>
        </div>
        {emailValid && (
          <small className="" style={{ color: "red" }}>
            Email isn't valid{" "}
          </small>
        )}
        <div className="d-flex-col divider-margin">
          <label className="label-text" htmlFor="title">
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
        <div className="d-flex-col divider-margin">
          <label className="label-text" htmlFor="points">
            Points
          </label>
          <textarea
            rows="8"
            cols="50"
            value={bulletPoints}
            className="points-container border-df bg-color-fa padding-6 border-radius-4"
            onChange={handlePointsField}
            onKeyDown={(e) => {
              handlePointsTextArea(e);
            }}
            placeholder="Type something here"
            style={{ resize: "none" }}
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
