import React, { useContext, useEffect } from "react";
import axios from "axios";
import "./newMOM.css";
import { FiChevronRight } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { momContext } from "../../../MobileApp.jsx";
import { data } from "../../utils";

function NewMom() {
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
    sharemom,
    emailValid,
    roomName,
    pointsdata,
    setPointsdata,
    getClientProject,
    addEmail,
    removeEmail,
    handlePointsTextArea,
    handleSubmitData,
    handleSaveDraftData,
    navigateHome,
  } = useContext(momContext);
  const { access_token, BaseUrl } = data;
  const { projectId, id } = useParams();

  ///---get api data ----///
  async function getApiData() {
    return await axios.get(`${BaseUrl}/api/mom/getMOM?projectId=${projectId}`, {
      headers: {
        Authorization: access_token,
      },
    });
  }
  let bullet = "\u2022";
  useEffect(() => {
    if (id) {
      getApiData()
        .then((res) => {
          if (res.status === 200) {
            let responseWithId = res?.data?.momData?.filter(
              ({ _id }) => _id === id
            )[0];
            setCategory(responseWithId?.category);
            setSelectdate(
              `${responseWithId?.date?.substring(
                0,
                4
              )}-${responseWithId?.date?.substring(
                5,
                7
              )}-${responseWithId?.date?.substring(8, 10)}`
            );
            setLocation(responseWithId?.location);
            setTitle(responseWithId?.title);
            setPointsdata(
              responseWithId?.points
                ?.filter((elem) => elem !== " \n")
                .map((item) => {
                  return `${bullet} ${item.trim()}`;
                })
                .join("\n")
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getClientProject();
  }, [id]);

  return (
    <>
      <div className="d-flex-col justify-around padding-3 height-90">
        <div className="d-flex justify-around width-fit-content align-center">
          <div
            className="color-text-888888 small-font-12 cursor-pointer"
            onClick={() => navigateHome()}
          >
            MOM
          </div>
          <div className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </div>
          <div className="color-text small-font-12">New MOM</div>
        </div>
        <div className="font-size-16 font-weight-500 divider-margin">
          Create a MOMs
        </div>
        <div style={{ margin: "0 0%" }} className="ui divider"></div>
        <div className="d-flex-col justify-around height-14 divider-margin">
          <div className="d-flex justify-between align-center">
            <label className="label-text">Date:</label>
            <input
              type="text"
              className="border-df bg-color-fa padding-5 border-radius-4 width-60"
              value={selectdate}
              placeholder="Select date"
              onChange={(selectdate) => setSelectdate(selectdate.target.value)}
              onFocus={(e) => (e.target.type = "date")}
            />
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
              className="position-absolute right-5 color-text-888888"
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
            placeholder="Where did you do the meet?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-df bg-color-fa padding-5 border-radius-4"
          />
        </div>
        <div className="d-flex-col divider-margin">
          <label className="label-text">Share with </label>
          <div className="email-container align-center width-100 border-df bg-color-fa border-radius-4">
            <ul className="tags-mobile">
              {emaillist?.map((email, index) => (
                <li
                  key={index}
                  className="email-wrapper border-df width-fit-content padding-5"
                >
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
              className="email-input-mobile bg-color-fa"
              onKeyUp={(event) => event.key === "Enter" && addEmail(event)}
              placeholder={emaillist.length === 0 ? "Enter the Email ID" : null}
              autoFocus={sharemom}
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
            onChange={(e) => setTitle(e.target.value.replace(/\s+/gi, " "))}
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
            onChange={(e) => {
              handlePointsTextArea(e);
            }}
            style={{ resize: "none" }}
            className="padding-5 border-df bg-color-fa text-align-justify border-radius-4"
            placeholder="Write something here"
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
            className="save-draft-btn border-radius-4"
            onClick={() => handleSaveDraftData()}
          >
            Save as Draft
          </button>
          <button
            className="submitbtn bg-color border-radius-4"
            onClick={() => handleSubmitData()}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
export default NewMom;
