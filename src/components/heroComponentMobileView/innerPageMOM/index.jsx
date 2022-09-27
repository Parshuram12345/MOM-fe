import React,{useContext} from "react";
import "./innerPage.css";
import { Link } from "react-router-dom";
// import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegEdit,FaGreaterThan } from "react-icons/fa";
import { CgChevronDoubleRightO } from "react-icons/cg";
import { data } from "../../utils";
import { momContext } from './../../../MobileApp.jsx';

function InnerPageMom() {
  const {pointsdetails}=useContext(momContext);
  console.log(pointsdetails)
  const { pointsData, MomContent } = data;
  return (
    <>
      <div className="padding-5">
      <div className="d-flex justify-around width-40 align-center">
          <div className="font-size-14 color-text-888888 small-font-9">Praveer's villa</div>
          <div className="d-flex align-center color-text-888888 small-font-9">
            <FaGreaterThan />
          </div>
          <div className="color-text">New MOM</div>
        </div>
        <div className="d-flex justify-between align-center divider-margin">
          <div className="doublevector-icon">
            <CgChevronDoubleRightO />
          </div>
          <div className="divider-bar">|</div>
          <div className="mom-head font-weight-500">Minutes of Meetings</div>
          <div className="search-box d-flex align-center">
            <input type="text" className="search-text" placeholder="search" />
            <button className="search-btn">
              <i className="search icon"></i>
            </button>
          </div>
          <Link to="/newmom">
            <div className="edit-icon">
              <FaRegEdit />
            </div>
          </Link>
        </div>
        <div className="d-flex-col">
          <div className="font-size-18 font-weight-600 divider-margin">
            Discussed layouts for the furniture
            {/* {pointsdetails.title} */}
          </div>
          <div className="d-flex justify-between">
            <div className="color-text-888888 font-size-18">
              28 may 2022 . Google meet
            {/* {pointsdetails.date} */}
            {/* {pointsdetails.location} */}
            </div>
            <div className="color-text-888888 font-size-18">
              Layout
            {/* {pointsdetails.worktag} */}
              </div>
          </div>
        </div>
        <hr className="divider-margin" />
        <div
          name="points"
          className="points-container-field border-none bg-color-fa width-84"
        >
          {pointsData &&
          // pointsdetails && pointsdetails.points.map(()=>{})
            pointsData.map((elem, index) => {
              return (
                <div
                  key={index}
                  className="d-flex font-weight-600 divider-margin"
                >
                  <span className="points-counter">{index + 1}.</span>
                  <div className="text-align-justify">{elem}</div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default InnerPageMom;
