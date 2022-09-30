import React,{useContext} from "react";
import "./innerPage.css";
import { Link} from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { FaRegEdit} from "react-icons/fa";
import { data } from "../../utils";
import { momContext } from './../../../MobileApp.jsx';

function InnerPageMom() {
  const {pointsdetails}=useContext(momContext);
  console.log(pointsdetails)
  return (
    <>
      <div className="padding-5">
      <div className="d-flex justify-around font-weight-500 width-fit-content align-center">
          <div className="font-size-14 color-text-888888 small-font-10 cursor-pointer">Praveer's villa</div>
          <div className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </div>
          <Link to="/">
          <div className="small-font-10 color-text-888888 cursor-pointer" 
          >MOM</div>
          </Link>
          <div className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </div>
          <div className="color-text small-font-10 font-weight-500">
            {pointsdetails.title}
          </div>
        </div>
        <div className="d-flex justify-between position-relative align-center divider-margin">
          <div className="doublevector-icon">
            <img src={"/images/doublevector.svg"} alt="vector2" />
          </div>
          <div className="divider-bar">|</div>
          <div className="mom-head font-weight-500 margin-right-10">Minutes of Meetings</div>
          <div className="search-box d-flex align-center position-absolute right-22">
            <input type="text" className="search-text" placeholder="search" />
            <button className="search-btn">
            <img src={"/images/searchicon.svg"} alt="vector2" />
            </button>
          </div>
            <div className="edit-icon" 
            // onClick={navigateNewMom()}
            ><Link to="newmom">
              <FaRegEdit />
            </Link>
            </div>
        </div>
        <div className="d-flex-col">
          <div className="font-size-14 font-weight-600 divider-margin">
            {/* {pointsdetails.title} */}
          </div>
          <div className="d-flex justify-between">
            <div className="color-text-888888 font-size-15">
            {pointsdetails.date?.substring(0,10)}.
            {pointsdetails.location}
            </div>
            <div className="color-text-888888 font-size-15">
            {pointsdetails.category}
              </div>
          </div>
        </div>
        <div className="ui divider"></div>
        <div
          name="points"
          className="points-container-field border-none bg-color-fa width-100"
        >
           {pointsdetails && pointsdetails?.points.map((elem,index)=>{
              return (
                <div
                  key={index}
                  className="d-flex font-weight-500 divider-margin"
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
