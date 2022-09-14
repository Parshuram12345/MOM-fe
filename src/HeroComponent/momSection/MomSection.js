import React from "react";
import "./MomSection.css";

function MomSection() {
  return (
    <>
    <div className="d-flex justify-between align-center h-fit-content w-100 m-auto-2">
      <div className="d-flex width-60 align-center">
        <div className="mom-head font-w-500">Minutes of Meetings</div>
        <div className="ui fluid category search">
          <div className="ui icon input">
            <input className="prompt" type="text" placeholder="Search" />
            <i className="search icon"></i>
          </div>
          <div className="results"></div>
        </div>
      </div>
      <button className="mom-btn">Create a MOM</button>
    </div>
    </>
  );
}
export default MomSection;
