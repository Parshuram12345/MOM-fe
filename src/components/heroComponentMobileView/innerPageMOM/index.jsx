import React,{useContext,useEffect,useState} from "react";
import axios from "axios";
import "./innerPage.css";
import { Link,useParams} from "react-router-dom";
import { AiOutlineCloseCircle} from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { FaRegEdit} from "react-icons/fa";
import { momContext } from './../../../MobileApp.jsx';
import {data} from "../../utils"

function InnerPageMom() {
  const {id}=useParams()
  const {BaseUrl,access_token,projectid}=data
  const [searchbarToggle,setSearchToggle]=useState(false)
  const {pointsdetails,client,setPointsdetails,getClientProject}=useContext(momContext);
   ///----toggle searchbar -----////
   const toggleSearchbarEffect=(value)=>{
    setSearchToggle(value)
  }

  ///-----highlight the match point text---///
  const highlightPoints =(event)=>{
    let textToSearch = event.target.value;
    let allpointslist = document.getElementsByClassName("points-field");
    let special = /[\\[{().+*?|^$]/g;
     if(textToSearch!=="")
     {
       if(special.test(textToSearch)){
         textToSearch = textToSearch.replace(special,"\\$&")
       }
       let regexp = new RegExp(textToSearch,"gi");
       for (let i=0;i<allpointslist.length;i++){
         allpointslist[i].innerHTML = (allpointslist[i].textContent).replace(regexp,"<mark className='match-txt'>$&</mark>")
       }
     }
     else{
       for (let i=0;i<allpointslist.length;i++){
         allpointslist[i].innerHTML = allpointslist[i].textContent
       }
 
     }
 }

  ////-----get api data -----///
  async function getApiData() {
    return axios.get(`${BaseUrl}/api/mom/getMOM?projectId=${projectid}`, {
      headers: {
        Authorization: access_token,
      },
    });
  }

  ///---read the mom and edit it---///
  async function getReadMom(){
  return  await axios({
    method:"post",
    url:`${BaseUrl}/api/mom/addEditMOM/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token,
    },
    data: {
      id:id,
      isRead:true,
      projectId: projectid,
    },
  })
}
 useEffect(()=>{
      getApiData()
      .then((res) => {
        setPointsdetails(res.data.momData.filter(({ _id}) => _id ===id)[0]);
      })
      .catch((error) => {
        console.error(error);
      });
      ///----get client project id -----///
      getClientProject()

       ///----read mom ----///
   getReadMom()
  .then((response)=>{
    if(response.status===200){
     console.log(response.data)
    }
  })
  .catch((err)=>{
    console.log(err)
  })
 },[id])
  ///----bullet points -----////
  const bullet = "\u2022";
  return (
    <>
      <div className="padding-5">
      <div className="d-flex justify-around font-weight-500 width-fit-content align-center">
          <div className="color-text-888888 small-font-10 cursor-pointer">Pr's saini</div>
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
            {pointsdetails?.title}
          </div>
        </div>
        <div className="d-flex justify-between position-relative align-center divider-margin">
          <div className="doublevector-icon">
            <img src={"/images/doublevector.svg"} alt="vector2" />
          </div>
          <div className="divider-bar">|</div>
          <div className="mom-head font-weight-500 margin-right-10">Minutes of Meetings</div>
          <div className={`search-box d-flex align-center position-absolute ${ !searchbarToggle ? "right-22" :"right-0"}`}>
            <input type="text" 
            className={ !searchbarToggle ? "search-text" : "open-state"} 
            id="searchBar" 
            onChange={(e)=>highlightPoints(e)} placeholder="search" />
            <button className="search-btn">
            { !searchbarToggle ?(<img onClick={()=>toggleSearchbarEffect(true)} src={"/images/searchicon.svg"} alt="vector" />)
              :(<div className="circum-close-icon" onClick={()=>toggleSearchbarEffect(false)}>
               <AiOutlineCloseCircle/>
                {/* <CiCircleRemove/> */}
                </div>
            )}
            </button>
          </div>
            <div className="edit-icon" 
            ><Link to="/newmom">
              <FaRegEdit />
            </Link>
            </div>
        </div>
        <div className="d-flex-col">
          <div className="font-size-14 font-weight-600 divider-margin">
            {pointsdetails?.title}
          </div>
          <div className="d-flex justify-between">
            <div className="color-text-888888 font-size-15">
            { pointsdetails?.date && `${pointsdetails?.date?.substring(8, 10)}-${pointsdetails?.date?.substring(5,7)}-${pointsdetails?.date?.substring(0,4)}`} . 
            {pointsdetails?.location}
            </div>
            <div className="color-text-888888 font-size-15">
            {pointsdetails?.category}
              </div>
          </div>
        </div>
        <div className="ui divider"></div>
        <div
          name="points"
          className="points-container border-none"
        >
           {pointsdetails && pointsdetails?.points?.map((elem,index)=>{
              return (
                <div
                  key={index}
                  className="d-flex font-weight-500 divider-margin"
                >
                 { elem !==bullet && <span className="points-counter">{bullet} </span>}
                  <div className="points-field text-align-justify">{elem?.substring(1,)}</div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default InnerPageMom;
