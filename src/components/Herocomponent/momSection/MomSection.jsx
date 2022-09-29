import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineDelete} from "react-icons/ai";
import {HiOutlineShare} from "react-icons/hi"
import { FiChevronRight } from "react-icons/fi";
import { data } from "../../utils";
import "./MomSection.css";
import { MomContext } from "../../../App.jsx";

function MomSection() {
  const {MOMdata,setMOMdata, gotoInnerMom, draftsflag, setDraftsflag, setSentflag,selectedMOM,setSelectedMOM } =
    useContext(MomContext);
    const Momdata = data.MomContent;
  const [opendraftsbox, setOpendraftbox] = useState(false);
  const [checkAllflag, setCheckAllflag] = useState(true);
  const [momdata, setMomdata] = useState([]);
  // const [MOMdata, setMOMdata] = useState([]);
  // const [selectedMOM, setSelectMOM] = useState([]);
  const { access_token,BaseUrl,projectid} = data;
  const navigate = useNavigate()
  ///----draftsdocs -----
  const handleSharedDocs = () => {
    setDraftsflag(false);
    setSentflag(true);
  };
  ///=----sentdocs----////
  const handleSentDocs = () => {
    setDraftsflag(true);
    setSentflag(false);
  };
  
  ///---navigate to new mom page -----///
  const navigateNewMOM=()=>{
    navigate("/newmom")
  }
  ///----opensharebox-----///
  const openShareDelete = () => {
    setOpendraftbox(!opendraftsbox);
  };
  ///----add three dots after limit out ----///
  function add3Dots(pointslist) {
    // console.log(pointslist)
    let dots = "...";
    let limit = 30;
    if (pointslist[0].length > limit) {
      return pointslist[0].substring(0, limit) + dots;
    } else {
      return pointslist[0];
    }
  }
  ///-----all checkbox ----///
  const check = document.getElementsByName("datacheck");
  
  // useEffect(()=>{setSelectedMOM(checkboxSelected)},[checkboxSelected])
  ///--- AllSelect checkbox functionlality---///
  const handleSelectAll = (e) => {
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
   ///---checkbox functionality and show delete and share icon---///
   const checkboxSelected = [];
   const handleCheckDeleteShare=(id)=>{
     checkboxSelected.push(id);
     console.log(checkboxSelected)
    }
    ///----delete the mom selected data----////
    const handleDeleteMOM= async()=>{
      console.log("dsff")
      try {
      const response = await axios.put(`${BaseUrl}/api/mom/getMOM?projectId=${projectid}`,{
      headers: {
        Authorization: access_token,
      },
      body:{
        isDeleted:checkboxSelected
      }
    });
    if(response.ok){
      console.log(response.data.momData)
      setMOMdata(response.data.momData)
    }
  } catch (error) {
    console.log(error)
  }
   }
  
  ///----search by title -----///
  async function handleSearchByTitle(searchtitle){
    if(!searchtitle.target.value)
    {
      try {
        const response = await axios.get(`${BaseUrl}/api/mom/getMOM?projectId=${projectid}`,{
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
  else{
        getApiData()
  }
  }

  ///---get api data ----///
  async function getApiData() {
    axios
      .get(`${BaseUrl}/api/mom/getMOM?projectId=${projectid}`, {
        headers: {
          Authorization: access_token,
        },
      })
      .then((res) => {
        console.log(res.data.momData);
        setMOMdata(res.data.momData);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  ///----api fetch data-----
  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <div className="d-flex-col width-75 margin-left-3">
        <div className="d-flex align-center justify-between width-fit-content divider-margin">
          <div className="small-font-10 color-text-888888">
            Ashok rathi residence
          </div>
          <span className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </span>
          <div className="color-text font-weight-500 small-font-10">MOM</div>
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
                  onChange={(e)=>handleSearchByTitle(e)}
                />
                <i className="search icon"></i>
              </div>
              <div className="results"></div>
            </div>
          </div>
            <button className="mom-button border-radius-4" onClick={()=>navigateNewMOM()}>Create a MOM</button>
        </div>
        <div className="d-flex width-15 justify-between">
          <div
            className={`font-weight-500 ${
              !draftsflag ? "drafts-tab" : "sents-tab"
            }`}
            onClick={() => handleSharedDocs()}
          >
            Drafts
          </div>
          <div
            className={`font-weight-500 ${
              draftsflag ? "drafts-tab" : "sents-tab"
            }`}
            onClick={() => handleSentDocs()}
          >
            Sent
          </div>
        </div>
        <div style={{ marginTop: "0%" }} className="ui divider"></div>
     { MOMdata.length<1 ? (
        <div className="d-flex-col align-center justify-center font-weight-500 m-auto">
           <div className="add-mom-bg"><img className="add-mom-img" src={"/images/add_mom.svg"} alt="add-notes"/></div>
          <div className="color-text-888888 small-font-12">
            you haven't added any MOMs yet
          </div>
          <div className="color-text small-font-12"  onClick={()=>navigateNewMOM()}>Add now</div>
        </div>
      ):
       ( 
        <>
         <table className="content-table">
           { checkboxSelected.length>=0 ? (
             <tr className="d-flex align-center justify-between">
          <div className="d-flex justify-around width-35">
          <input type="checkbox"  name="selectall"  onClick={(e)=>handleSelectAll(e)}/>
          <div className="color-text font-size-15 font-weight-500">Select All</div>
          </div>
          <div className="d-flex justify-around width-35">
          <div className="color-text font-weight-500 font-size-15 cursor-pointer" onClick={()=>handleDeleteMOM()}>Delete</div>
          <div className="color-text font-weight-500 font-size-15">Share</div>
          </div>
            </tr>
           ): (<thead>
             <tr>
              <th>
                <input
                  type="checkbox"
                  name="allselect"
                  onClick={(e) => handleSelectAll(e)}
                />
              </th>
              <th className="table-heading text-align-left">Date</th>
              <th className="table-heading text-align-left">Title</th>
              <th className="table-heading text-align-left">Worktag</th>
              {draftsflag && (
                <th className="table-heading text-align-left">Attendes</th>
              )}
              <th className="table-heading text-align-left">Points</th>
            </tr>
          </thead>)
            }
          <tbody className="table-body position-relative">
            {MOMdata &&
              MOMdata.map(
                ({ date, title, category, attendes, points,_id }, index) => {
                  return (
                    <tr
                      key={index}
                      className="table-row height-7 border-radius-4 font-weight-400 color-text-000000"
                    >
                      <td className="checkbox-cell width-4 border-cells border-radius-left-cells">
                        <input
                          className="checkbox-field"
                          type="checkbox"
                          name="datacheck"
                          value={`name${index}`}
                          onClick={()=>handleCheckDeleteShare(_id)}
                        />
                      </td>
                      <td
                        className="border-cells"
                        onClick={() => gotoInnerMom(index)}
                      >
                        {date.substring(0,10)}
                        {/* {date} */}
                      </td>
                      <td
                        className="border-cells"
                        onClick={() => gotoInnerMom(index)}
                      >
                        {title}
                      </td>
                      <td
                        className="border-cells"
                        onClick={() => gotoInnerMom(index)}
                      >
                        {category}
                      </td>
                      {draftsflag && (
                        <td className="border-cells" onClick={() => gotoInnerMom(index)}>{attendes}</td>
                      )}
                      <td
                        className={`width-23 ${ draftsflag ? "points-cell border-cells border-radius-right-cells":"border-cells"}`}
                        onClick={() => gotoInnerMom(index)}
                      >
                        {add3Dots(points)}
                      </td>
                      { !draftsflag && 
                      <td
                        className="threedots points-cell border-cells border-radius-right-cells"
                        // onClick={() => openShareDelete()}
                      >
                        {/* <div class="ui selection dropdown">
                        <input type="hidden" name="gender"/>
                        <i class="dropdown icon"></i>
                         <div class="default text"><BsThreeDotsVertical /></div>
                        <div class="menu">
                        <div class="item" data-value="1"><HiOutlineShare /> Share</div>
                          <div class="item" data-value="0"><AiOutlineDelete />Delete</div>
                           </div>
                          </div> */}
                          <BsThreeDotsVertical />
                      </td>}
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
        </>
        )
        }
      </div>
      {opendraftsbox && (
        <div className="d-flex-col share-del-wrapper width-6 position-absolute">
          <div className="d-flex justify-evenly cursor-pointer">
          <span className="d-flex share-icon align-center">
              <HiOutlineShare />
            </span> Share
          </div>
          {!draftsflag && (
            <div className="d-flex justify-evenly cursor-pointer" onClick={()=>handleDeleteMOM()}>
              <span className="d-flex share-icon align-center">
              <AiOutlineDelete />
              </span> 
               Delete
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default MomSection;
