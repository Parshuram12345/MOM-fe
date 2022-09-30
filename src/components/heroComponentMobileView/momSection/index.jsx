import React, { useState, useEffect,useContext} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { data } from "../../utils";
import "./momSection.css";
import { momContext } from './../../../MobileApp';

function MomSection() {
  const {naviagteInnerPage}=useContext(momContext)
  const navigate = useNavigate()
  const [draftsflag, setDraftsflag] = useState(false);
  const [sentsflag, setSentflag] = useState(false);
  const [checkflag, setCheckflag] = useState(false);
  // const [ selectpoint,setSelectpoint]= useState([])
  const { access_token,BaseUrl,projectid } = data;
  const [momdata, setMomdata] = useState([]);
  const [MOMdata, setMOMdata] = useState([0,8]);
  const Momdata = data.MomContent;
   ///=----draftsdocs----////
  const handleDraftsDocs = () => {
    setDraftsflag(false);
    setSentflag(true)
  };
   ///=----sentdocs----////
   const handleSentDocs = () => {
    setDraftsflag(true);
    setSentflag(false);
  };
  const check = document.getElementsByName("pointscheck");
  ///---checkbox functionality---///
  const handlecheckbox=(index)=>{
    for (let i = 0; i < check.length; i++) {
      if(check[i].checked === true){
        setCheckflag(true)
        break;
      }
      setCheckflag(false)
    }
  }
  ///-----all checkbox ----///
  const SelectAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      for (let i = 0; i < check.length; i++) {
        check[i].checked = true;
      }
    } else {
      for (let i = 0; i < check.length; i++) {
        check[i].checked = false;
      }
    }
  };
  ///---navigate to new mom page -----///
  const navigateNewMom=()=>{
    navigate("/newmom")
  }
  
  ///----search by title -----///
  async function handleSearchByTitle(searchtitle){
    if(searchtitle.target.value)
    {
      try {
        const response = await axios.put(`${BaseUrl}/api/mom/getMOM?projectId=${projectid}`,{
        headers: {
          Authorization: access_token,
        },
        body:{
          search:searchtitle.target.value
        }
      });
      if(response.ok){
        setMOMdata(response.data.momData)
      }
      console.log(response.data.momData);
    } catch (error) {
      console.log(error)
    }
  }
  else
        getApiData()
  }

 ////-----get api data -----///
  async function getApiData() {
    axios
      .get(`${BaseUrl}/api/mom/getMOM`, {
        headers: {
          Authorization: access_token,
        },
      })
      .then((res) => {
        console.log(res.data.momData);
        setMomdata(res.data.momData);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    getApiData();
  }, []);
  console.log(momdata);
  return (
    <>
      <div className={`padding-3 d-flex-col justify-around ${MOMdata.length <1 ? "height-fit-content":"height-80"}`}>
      <div className="d-flex justify-around width-fit-content align-center">
          <div className="font-size-14 color-text-888888 small-font-10">Praveer's villa</div>
          <div className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </div>
          <div className="color-text small-font-10 font-weight-500">MOM</div>
        </div>
        <div className="d-flex justify-between align-center divider-margin position-relative">
          <div className="doublevector-icon">
            <img src={"/images/doublevector.svg"} alt="vector" />
          </div>
          <div className="divider-bar">|</div>
          <div className="mom-head font-weight-500 margin-right-10">Minutes of Meetings</div>
          <div className="search-box d-flex align-center position-absolute right-22">
            <input type="text" className="search-text" placeholder="search" onChange={(e)=>
              handleSearchByTitle(e)} />
            <button className="search-btn">
            <img src={"/images/searchicon.svg"} className="" alt="vector" />
                    </button>
          </div>
         
            <div className="edit-icon" onClick={()=>navigateNewMom()}>
              <FaRegEdit />
            </div>
        </div>
        <div  className="ui divider"></div>
        { !checkflag ? (
        <div className="d-flex width-40 justify-between">
          <div
            className={!draftsflag ? "drafts-tab" : "sents-tab"}
            onClick={() => handleDraftsDocs()}
          >
            Drafts
          </div>
          <div
            className={draftsflag ? "drafts-tab" : "sents-tab"}
            onClick={() => handleSentDocs()}
          >
            Sent
          </div>
        </div>):
          (<div className="d-flex align-center justify-between">
          <div className="d-flex justify-around width-35">
          <input type="checkbox"  name="selectall"  onClick={(e)=>SelectAll(e)}/>
          <div className="color-text font-size-15 font-weight-500">Select All</div>
          </div>
          <div className="d-flex justify-around width-35">
          <div className="color-text font-weight-500 font-size-15">Delete</div>
          <div className="color-text font-weight-500 font-size-15">Share</div>
          </div>
        </div>)}
        <div style={{ marginTop: "0%" }} className="ui divider"></div>
        <div className="momdata-wrapper d-flex-col divider-margin">
        { MOMdata.length<1 ? (
        <div className="d-flex-col align-center justify-center font-weight-500 m-auto height-50">
           <div className="add-mom-bg"><img className="addMomImg" src={"/images/add_mom.svg"} alt="add-notes"/></div>
          <div className="color-text-888888 small-font-12">
            you haven't added any MOMs yet
          </div>
          <div className="color-text small-font-12" onClick={()=>navigateNewMom()}>Add now</div>
        </div>
      ):(
          Momdata &&
            Momdata.map(({ date, title, worktag, attendes, points }, index) => {
              return (
                <div
                  key={index}
                  className="mom-field border-df border-radius-5 divider-margin"
                >
                  <div className="d-flex justify-around align-center padding-3">
                    <input type="checkbox" name="pointscheck" onClick={()=>handlecheckbox(index)} />
                    <div className="font-size-16 font-weight-500" onClick={()=>naviagteInnerPage()} >{title}</div>
                    <div className="mom-layout color-text border-radius-25" onClick={()=>naviagteInnerPage()} >
                      #{worktag}
                    </div>
                    { !draftsflag && <BsThreeDotsVertical />}
                  </div>
                  <div className="mom-points text-align-justify"  
                  onClick={() =>
                    naviagteInnerPage(index)}
                      >{points}</div>
                  <div className="d-flex justify-between align-center padding-3">
                    <div>{date}</div>
                    <div className="d-flex justify-between align-center width-20">
                      <div className="as-on color-text border-radius-25">
                        AS
                      </div>
                      <div className="as-on color-text border-radius-25">
                        ON
                      </div>
                    </div>
                  </div>
                </div>
              );
            }))
            }
        </div>
      </div>
    </>
  );
}
export default MomSection;
