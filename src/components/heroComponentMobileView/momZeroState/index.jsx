import React, { useContext } from "react";
import "../newMOM/newMOM.css";
import { FiChevronRight } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";
import { momContext } from "../../../MobileApp.jsx";
// import {}
function MomZeroState() {
  const {
    selectdate,
    setSelectdate,
    category,
    setCategory,
    location,
    setLocation,
    title,
    setTitle,
    emaillist,
    dateerror,
    categoryerror,
    pointserror,
    emailValid,
    roomName,
    pointsdata,
    addEmail,
    removeEmail,
    handlePointsField,
    handlePointsTextArea,
    handleSaveDraftData,
    handleSubmitData,
    navigateHome,
    maxDateCurrent
  } = useContext(momContext);
  return (
    <>
      <div className="d-flex-col justify-around padding-3 height-90">
        <div className="d-flex justify-around width-fit-content align-center">
          <div className="font-size-14 color-text-888888 small-font-9">
            Praveer's villa
          </div>
          <div className="d-flex align-center color-text-888888 small-font-10">
            <FiChevronRight />
          </div>
          <div className="color-text">New MOM</div>
        </div>
        <div className="font-size-16 font-weight-500 divider-margin">
          Create a MOMs
        </div>
        <div style={{ margin: "0" }} className="ui divider"></div>
        <div className="d-flex-col justify-around height-14 divider-margin">
          <div className="d-flex justify-between align-center">
            <label className="label-text">Date:</label>
            <div className="d-flex align-center position-relative width-60">
              <input
                type="text"
                max={maxDateCurrent()}
                className="border-df bg-color-fa padding-5 border-radius-4 width-100"
                value={selectdate}
                placeholder="Select date"
                onChange={(e) => setSelectdate(e.target.value)}
                onFocus={(e) => (e.target.type = "date")}
              />
            </div>
          </div>
          {dateerror && (
            <small
              className="text-align-center margin-left-10"
              style={{ color: "red" }}
            >
              date is required
            </small>
          )}
          <div className="d-flex justify-between align-center position-relative">
            <label className="label-text">Category:</label>
            <select
              className={`border-df bg-color-fa padding-5 border-radius-4 width-60 ${
                category === "" ? "color-text-888888" : null
              }`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option name="select" value="">
                Select your category
              </option>
              {roomName &&
                roomName.map((roomlist, index) => {
                  return (
                    <option key={index} value={roomlist}>
                      {roomlist}
                    </option>
                  );
                })}
            </select>
            <AiFillCaretDown
              style={{ background: "white" }}
              className="position-absolute right-3 color-text-888888"
            />
          </div>
          {categoryerror && (
            <small
              className="text-align-center margin-left-15"
              style={{ color: "red" }}
            >
              category is required
            </small>
          )}
        </div>
        <div className="d-flex-col justify-between">
          <label className="label-text">Location:</label>
          <input
            type="text"
            placeholder="wWere did you do the meet?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-df bg-color-fa padding-5 border-radius-4"
          />
        </div>
        <div className="d-flex-col divider-margin">
          <label className="label-text">Share with </label>
          <div className="email-container d-flex align-center width-100 border-df bg-color-fa border-radius-4">
            <ul id="tags">
              {emaillist.map((email, index) => (
                <li key={index} className="email-wrapper border-df">
                  <span className="padding-5">{email}</span>
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
              className="email-input bg-color-fa width-100"
              onKeyUp={(event) => event.key === "Enter" && addEmail(event)}
              placeholder={emaillist.length === 0 ? "Enter the Email ID" : null}
            />
          </div>
          {emailValid && (
            <small className="" style={{ color: "red" }}>
              Email isn't valid
            </small>
          )}
        </div>
        <div className="d-flex-col divider-margin">
          <label className="label-text" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className="border-df bg-color-fa padding-5 border-radius-4"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of the MOM"
          />
        </div>
        <div className="d-flex-col justify-around divider-margin">
          <label className="label-text" htmlFor="points">
            Points
          </label>
          <textarea
            rows="6"
            cols="50"
            value={pointsdata}
            style={{ resize: "none" }}
            onChange={(e) => handlePointsField(e)}
            onKeyUp={(e) => {
              handlePointsTextArea(e);
            }}
            className="padding-5 border-df border-radius-4"
            placeholder="write something here"
          ></textarea>
        </div>
        {pointserror && (
          <small className="error-msg" style={{ color: "red" }}>
            Write something here
          </small>
        )}
        <div
          style={{ marginTop: "15%" }}
          className="d-flex align-center justify-between"
        >
          <button
            className="save-draft-btn border-radius-4 width-48"
            onClick={() => handleSaveDraftData()}
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="submitbtn bg-color border-radius-4 width-48"
            onClick={() => handleSubmitData()}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
export default MomZeroState;
