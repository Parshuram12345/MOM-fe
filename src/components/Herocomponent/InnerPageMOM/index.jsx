import React,{useContext,useEffect} from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineShare } from "react-icons/hi";
import {FiChevronRight} from "react-icons/fi";
import { data } from "../../utils";
import { useNavigate } from "react-router-dom";
import "./InnerPageMom.css";
import { MomContext } from "../../../App.jsx";

function InnerPageMom() {
  const navigate= useNavigate();
    const {MOMdata,pointsdetails,draftsflag}=useContext(MomContext)
    console.log(pointsdetails)
  const pointOfMom = data.MomContent;

   ///-----highlight the match point text---///
   let matchedText =""
   const highlightPoints =(e)=>{
    for(let i =0;i<pointOfMom.length;i++)
    {
         if ((pointOfMom[i]).includes(e.target.value))
         {
              
         }
    }
}
  ///---navigate to home page ----///
  const navigateHome=()=>{
    // navigate("/")
  }
  ///----navigate to new MOM page---///
  const navigateNewMom=()=>{
    // navigate("/newmom")
  }
  // useEffect(()=>{
  //   navigateHome()
  //   navigateNewMom()
  // })
  return (
    <>
      <div className="d-flex-col width-75 margin-left-3">
        <div className="d-flex font-weight-500 small-font-10 width-40 justify-between align-center divider-margin">
          <div className="small-font-10 color-text-888888">
            Ashok rathi residence
          </div>
          <span className="d-flex align-center small-font-12 color-text-888888">
            <FiChevronRight />
          </span>
          <div className="small-font-9 font-weight-500 color-text-888888" onClick={()=> navigateHome()}>MOM</div>
          <span className="d-flex align-center small-font-12 color-text-888888">
            <FiChevronRight />
          </span>
          <div className="color-text">Discussed layouts for the living and the dining area</div>
        </div>
        <div className="momHead-wrapper d-flex justify-between align-center">
          <div className="d-flex width-60 align-center justify-between">
            <div className="mom-head font-w-500">Minutes of Meetings</div>
            <div className="ui fluid category search">
              <div className="ui icon input">
                <input
                  style={{ borderRadius: "4px" }}
                  className="prompt"
                  id="search-bar"
                  type="text"
                  placeholder="Search"
                  onChange={(e)=>highlightPoints(e)}
                />
                <i className="search icon"></i>
              </div>
              <div className="results"></div>
            </div>
          </div>
            <button className="mom-btn" onClick={navigateNewMom()}>Create a MOM</button>
        </div>
        <div className="d-flex-col">
          <div className="d-flex align-center">
            <div classNaame="points-field font-weight-400">
              {/* Discussed layouts for the living and the dining area */}
              {pointsdetails.title}
            </div>
            <span className="d-flex share-icon align-center">
              <HiOutlineShare />
            </span>
          </div>
          <div className="d-flex justify-between width-86">
            <div className="color-text-888888">
              {/* 28 may 2022 . Google meet */}
              {pointsdetails.date} .
              {pointsdetails.lcoation}
              </div>
            <div className="d-flex justify-between width-18">
              <div className="color-text-888888">
                {/* {pointsdetails.worktag} */}
                Layout
                </div>
              <div>Share With</div>
            </div>
          </div>
          <div style={{ width: "75%" }} className="ui divider"></div>
          <div className="d-flex justify-between width-89">
            <div
              name="points"
              className="points-container-field border-none width-84">
              {
                pointsdetails && pointsdetails.points.map((elem, index)=>{
                // pointOfMom && pointOfMom.map((elem, index) => {
                  return (
                    <>
                    <div className="d-flex divider-margin">
                      <span className="points-counter">{index + 1}.</span>
                      <div className="points-area text-align-justify">
                        {elem}
                      </div>
                    </div>
                    </>
                  );
                })}
            </div>
            <div className="share-with-wraper">
              <div style={{ marginTop:"-15%", width: "75px" }} className="ui divider"></div>
              <div className="d-flex-col align-left justify-between">
                { draftsflag && (
                  <>
                <div>Amit Sunari</div>
                <div>Ashok rathi</div>
                  </>
                )}
                <div className="color-text d-flex align-center width-fit-content">
                  <AiFillPlusCircle /> Add Members
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InnerPageMom;
