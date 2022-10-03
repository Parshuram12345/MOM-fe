import React, { useState, useEffect,useContext} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineShare } from "react-icons/hi";
import { FiChevronRight } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { data } from "../../utils";
import "./momSection.css";
import { momContext } from './../../../MobileApp';
import { Dropdown } from "react-bootstrap";

function MomSection() {
  const {naviagteInnerPage,setEmaillist,MOMdata,setMOMdata}=useContext(momContext)
  const navigate = useNavigate()
  const [draftsflag, setDraftsflag] = useState(false);
  const [sentsflag, setSentflag] = useState(false);
  const [checkboxSelected,setCheckboxSelected]=useState([])
  const { access_token,BaseUrl,projectid } = data;
 const [MOMClonedata,setMOMCloneData]=useState()
  // const Momdata = data.MomContent;
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

   ///---checkbox functionality and show delete and share icon---///
  ///---checkbox functionality---///
  const handleCheckDeleteShare=(id)=>{
    if (checkboxSelected.includes(id)) {
      let checkbox = checkboxSelected.filter((itemid) => itemid != id);
      setCheckboxSelected(checkbox)
    } else {
      setCheckboxSelected((previousitem)=> [...previousitem,id])
    }
    // for (let i = 0; i < check.length; i++) {
    //   if(check[i].checked === true){
    //     setCheckflag(true)
    //     break;
    //   }
    //   setCheckflag(false)
    // }
  }
  ///-----deleted the selectd checkbox multiple mom----////
  const handleDeleteSelectedMOM= async()=>{
    try {
      const response = await axios.put(
        `${BaseUrl}/api/mom/deleteMOMs?projectId=${projectid}`,
        {
          headers: {
            Authorization: access_token,
          },
          body: {
            momIds: checkboxSelected,
          },
        }
      );
      if (response.ok) {
        console.log(response.data.momData);
        setMOMdata(response.data.momData);
      }
    } catch (error) {
      console.log(error);
    }
  } 
  ///----delete the single select mom----///
  const singleDeleteMOM=[];
  const handlesingleDeleteMOM=async(_id)=>{
    singleDeleteMOM.push()
    try {
      const response = await axios.put(
        `${BaseUrl}/api/mom/deleteMOMs?projectId=${projectid}`,
        {
          headers: {
            Authorization: access_token,
          },
          body: {
            momIds: singleDeleteMOM
          },
        }
      );
      if (response.ok) {
        console.log(response.data.momData);
        setMOMdata(response.data.momData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  ///----search by title -----///
  // async function handleSearchByTitle(searchtitle){
  //   if(searchtitle.target.value)
  //   {
  //     try {
  //       const response = await axios.get(`${BaseUrl}/api/mom/getMOM?projectId=${projectid}`,{
  //       headers: {
  //         Authorization: access_token,
  //       },
  //       body:{
  //         search:searchtitle.target.value
  //       }
  //     });
  //     if(response.ok){
  //       setMOMdata(response.data.momData)
  //     }
  //     console.log(response.data.momData);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // else
  //       setMOMdata(MOMClonedata)
  // }

   ///---search by title without API ----///
   function handleSearch(e) {
    console.log("searching text");
    const newdata = MOMClonedata.filter((element, index) => {
      return (element.title.toLowerCase().includes(e.toLowerCase()));
    });
    setMOMdata(newdata);
  }
 ////-----get api data -----///
  async function getApiData() {
   return axios
      .get(`${BaseUrl}/api/mom/getMOM?projectId=${projectid}`, {
        headers: {
          Authorization: access_token,
        },
      })
      
  }

  ///---get client project ---////
  async function getClientProject() {
    return await axios.get(
      `https://pmt.idesign.market/api/projects/getProjects?projectId=${projectid}`,
      {
        headers: {
          Authorization: access_token,
        },
      }
    );
  }
  const emailconvertArr=[];
  useEffect(() => {
    getApiData().then((res) => {
      console.log(res.data.momData);
      setMOMdata(res.data.momData);
      setMOMCloneData(res.data.momData)
    })
    .catch((error) => {
      console.error(error);
    });

    ///---get client id project----///
    getClientProject().then((res) => {
      emailconvertArr.push(res.data.projects[0].clientId.email);
        setEmaillist(emailconvertArr);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
  return (
    <>
      <div className={`padding-3 d-flex-col justify-around ${MOMdata.length <1 ? "height-fit-content":""}`}>
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
              // handleSearchByTitle(e)} 
              handleSearch(e.target.value)}
              />
            <button className="search-btn">
            <img src={"/images/searchicon.svg"} alt="vector" />
                    </button>
          </div>
         
            <div className="edit-icon" onClick={()=>navigateNewMom()}>
              <FaRegEdit />
            </div>
        </div>
        <div  className="ui divider"></div>
        { !checkboxSelected.length ? (
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
          <div className="color-text font-weight-500 font-size-15"onClick={()=>handleDeleteSelectedMOM()} >Delete</div>
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
          MOMdata &&
            MOMdata.map(({ _id,date, title,category, points }, index) => {
              return (
                <div
                  key={index}
                  className="mom-field border-df border-radius-5 divider-margin"
                >
                  <div className="d-flex justify-around align-center padding-3">
                    <input type="checkbox" name="pointscheck" onChange={()=>handleCheckDeleteShare(_id)} />
                    <div className="font-size-16 font-weight-500" onClick={()=>naviagteInnerPage()} >{title}</div>
                    <div className="mom-layout color-text border-radius-25" onClick={()=>naviagteInnerPage()} >
                      #{category}
                    </div>
                    { !draftsflag && 
                    <Dropdown>
                    <Dropdown.Toggle as="button" style={{border: "none", backgroundColor: "#ECEFF5", padding: "0 0.5rem"}}>
                      <img
                        src={"/images/threedots.svg"}
                        alt="threedots"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item><HiOutlineShare className="share-icon"/>Share</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handlesingleDeleteMOM()}><AiOutlineDelete className="share-icon"/>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                    }
                  </div>
                  <div className="mom-points text-align-justify"  
                  onClick={() =>
                    naviagteInnerPage(index)}
                      >{points}</div>
                  <div className="d-flex justify-between align-center padding-3">
                    <div>{`${date.substring(8, 10)}-${date.substring(5,7)}-${date.substring(0,4)}`}</div>
                    <div className="d-flex justify-between align-center width-20">
                      <div className="as-on color-text border-radius-25">
                        AS
                      </div>
                      <div className="as-on color-text border-radius-25">
                        DN
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
