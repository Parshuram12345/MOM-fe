import React,{useContext} from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineShare } from "react-icons/hi";
import {FiChevronRight} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./InnerPageMom.css";
import { MomContext } from "../../../App.jsx";

function InnerPageMom() {
  const navigate= useNavigate();
    const {pointsdetails,draftsflag}=useContext(MomContext)
    console.log(pointsdetails)
  // const pointOfMom = data.MomContent;

   ///-----highlight the match point text---///
  //  let matchedText =""
   const highlightPoints =(e)=>{
   let textToSearch = document.getElementById("search-bar").value 
   let allpointslist = document.getElementsByName("points-text")
   textToSearch= textToSearch.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
   let pattern = new RegExp(`${textToSearch}`,"gi")
    for(let i =0;i<allpointslist.length;i++)
    {
      allpointslist[i].innerHTML=allpointslist.textcontent.replace(pattern,match=>`<mark>${match}</mark>`)
    }
}
  ///---navigate to home page ----///
  const navigateHome=()=>{
    navigate("/")
  }
  ///----navigate to new MOM page---///
  const navigateNewMom=()=>{
    navigate("/newmom")
  }
  
  return (
    <>
      <div className="d-flex-col width-75 margin-left-3">
        <div className="d-flex font-weight-500 small-font-10 width-fit-content justify-between align-center divider-margin">
          <div className="small-font-10 color-text-888888">
            Ashok rathi residence
          </div>
          <span className="d-flex align-center small-font-12 color-text-888888">
            <FiChevronRight />
          </span>
          <div className="small-font-9 font-weight-500 color-text-888888 cursor-pointer" onClick={()=> navigateHome()}>MOM</div>
          <span className="d-flex align-center small-font-12 color-text-888888">
            <FiChevronRight />
          </span>
          <div className="color-text">{pointsdetails.title}</div>
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
                  placeholder="Search Text"
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
            <div classNaame="points-field font-size-18 font-weight-400">
              {pointsdetails.title}
            </div>
            <span className="d-flex share-icon align-center">
              <HiOutlineShare />
            </span>
          </div>
          <div className="d-flex justify-between width-86">
            <div className="color-text-888888">
            {`${pointsdetails?.date.substring(8, 10)}-${pointsdetails?.date.substring(5,7)}-${pointsdetails?.date.substring(0,4)}`} .
              {pointsdetails.location}
              </div>
            <div className="d-flex justify-between width-fit-content">
              <div className="color-text-888888">
                {pointsdetails.category}
                </div>
              <div style={{marginLeft:"3px"}}>Share With</div>
            </div>
          </div>
          <div style={{ width: "80%",marginTop:"0" }} className="ui divider"></div>
          <div className="d-flex justify-between width-89">
            <div
              name="points"
              className="points-container-field border-none width-84">
              {
                pointsdetails && pointsdetails?.points.map((elem, index)=>{
                  return (
                    <>
                    <div  key={index} className="d-flex divider-margin">
                      <span className="points-counter">{index + 1}.</span>
                      <div  name="points-text"  className="points-area text-align-justify">
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
