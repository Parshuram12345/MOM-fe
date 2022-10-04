import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineShare } from "react-icons/hi";
import { FiChevronRight,FiEdit2 } from "react-icons/fi";
import { data } from "../../utils";
import "./MomSection.css";
import { MomContext } from "../../../App.jsx";
import { Dropdown } from "react-bootstrap";

function MomSection() {
  const {
    MOMdata,
    setMOMdata,
    gotoInnerMom,
    draftsflag,
    setDraftsflag,
    setSentflag,
    setEmaillist,
    emaillist,
  } = useContext(MomContext);
  const [MOMdataClone, setMOMdataClone] = useState([]);
  const [checkboxSelected,setCheckboxSelected]=useState([])
  const { access_token, BaseUrl, projectid } = data;
  const navigate = useNavigate();
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
  const navigateNewMOM = () => {
    navigate("/newmom");
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
  ///---add three dots for title after limit out----///
  function add3dotsTitle(title) {
    let dots = "...";
    let limit = 28;
    if (title.length > limit) {
      return title.substring(0, limit) + dots;
    } else {
      return title;
    }
  }
  ///-----all checkbox ----///
  const check = document.getElementsByName("datacheck");

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
  const handleCheckDeleteShare = (id,e) => {
    const {checked ,value}=e.target;
    // console.log("dadsgdghdfhj");
    if (checkboxSelected.includes(id)) {
      console.log("inside if")
      let checkbox = checkboxSelected.filter((itemid) => itemid != id);
      setCheckboxSelected(checkbox)
    } else {
      console.log("else")
      setCheckboxSelected((previousitem)=> [...previousitem,id])
    }
  };
  console.log(checkboxSelected)
  
  ///----delete the mom selected data----////
  const handleDeleteMOM = async () => {
     await axios.put(`${BaseUrl}/api/mom/deleteMOMs?projectId=${projectid}`, {
      momIds:checkboxSelected
    }).then((res)=>{
      if(res.ok)
      {
        getApiData()
      }
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
  ///----delete the single selected MOM data----////
  let deleteMOM =[];
  const handleSingleDeleteMOM = async (id) => {
    console.log(id)
    deleteMOM.push(id)
     await axios.put(`${BaseUrl}/api/mom/deleteMOMs?projectId=${projectid}`, {
      momIds:deleteMOM
    }).then((res)=>{
      if(res.ok)
      {
        getApiData()
      }
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }

  ///----search by title -----///
//   async function handleSearchByTitle(searchtitle) {
//     if (searchtitle !== "") {
//         await axios.get(
//           `${BaseUrl}/api/mom/getMOM?projectId=${projectid}`,
//           {
//             headers: {
//               Authorization: access_token,
//             },
//             body: {
//               search: searchtitle,
//             },
//           }
//         ).then((res)=>{
//           if (res.ok) {
//             setMOMdata(res.data.momData);
//           }
//         }).catch((err)=>{
//             console.log(err)
//         })
//   }
// }
  // /---search by title without API ----///
  function handleSearch(e) {
    const newdata = MOMdataClone.filter((element, index) => {
      return (element.title.toLowerCase().includes(e.toLowerCase()));
    });
    setMOMdata(newdata);
  }

  ///---get api data ----///
  async function getApiData() {
    return await axios.get(`${BaseUrl}/api/mom/getMOM?projectId=${projectid}`, {
      headers: {
        Authorization: access_token,
      },
    });
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
  ///----api fetch data-----
  let emailconvertArr = [];
  useEffect(() => {
    getApiData()
      .then((res) => {
        // console.log(res.data.momData);
        setMOMdata(res.data.momData);
        setMOMdataClone(res.data.momData);
      })
      .catch((error) => {
        console.error(error);
      });
    getClientProject()
      .then((res) => {
        emailconvertArr.push(res.data.projects[0].clientId.email);
        setEmaillist(emailconvertArr);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <div className="d-flex-col width- margin-left-3">
        <div className="d-flex align-center justify-between width-fit-content divider-margin">
          <div className="small-font-10 color-text-888888">
            Ashok rathi residence
          </div>
          <span className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </span>
          <div className="color-text font-weight-500 small-font-10 cursor-pointer">MOM</div>
        </div>
        <div className="momHead-wrapper d-flex justify-between align-center">
          <div className="d-flex width-60 align-center justify-between">
            <div className="mom-head font-w-500">Minutes of Meetings</div>
            <div className="ui fluid category search">
              <div style={{width:"16rem"}} className="ui icon input">
                <input
                  style={{ borderRadius: "4px" }}
                  className="prompt"
                  id="search-bar"
                  type="text"
                  placeholder="Search"
                  onChange={(e) =>
                    //  handleSearchByTitle(e.target.value)
                     handleSearch(e.target.value)
                    }
                />
                <i
                  style={{ fontWeight: "300", fontSize: "14px",opacity:"0.5" }}
                  className="search icon"
                ></i>
              </div>
              <div className="results"></div>
            </div>
          </div>
          <button
            className="mom-button border-radius-4"
            onClick={() => navigateNewMOM()}
          >
            Create a MOM
          </button>
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
        {MOMdata.length < 1 ? (
          <div className="margin-top-7">
          <div className="d-flex-col align-center justify-center font-weight-500 m-auto">
            <div className="add-mom-bg">
              <img
                className="add-mom-img"
                src={"/images/add_mom.svg"}
                alt="add-notes"
              />
            </div>
            <div className="color-text-888888 small-font-12">
              you haven't added any MOMs yet
            </div>
            <div className="color-text small-font-12"
              onClick={() => navigateNewMOM()}
              >
              Add now
            </div>
          </div>
            </div>
        ) : (
          <>
            <div className="content-table">
              {checkboxSelected.length > 0 ? (
                <div className="d-flex align-center justify-between">
                  <div className="d-flex justify-around width-16">
                    <input
                      type="checkbox"
                      name="selectall"
                      onClick={(e) => handleSelectAll(e)}
                    />
                    <div className="color-text font-size-13 font-weight-500">
                      Select All
                    </div>
                  </div>
                  <div className="d-flex justify-around width-17">
                    <div
                      className="d-flex align-center color-text font-weight-500 font-size-13 cursor-pointer"
                      onClick={() => handleDeleteMOM()}
                    >
                       <AiOutlineDelete className="share-icon" />
                      Delete
                    </div>
                    <div className="d-flex align-center color-text font-weight-500 font-size-13 cursor-pointer">
                    <HiOutlineShare className="share-icon" />
                      Share
                    </div>
                  </div>
                </div>
              ) : (
                <div className="d-flex align-center justify-flex-start table-header">
                  <div className={`${draftsflag ? "width-10" : "width-11"}`}>
                    {/* <input
                      className="width-50"
                      type="checkbox"
                      name="allselect"
                      onClick={(e) => handleSelectAll(e)}
                    /> */}
                  </div>
                  <div
                    className={`table-heading ${
                      draftsflag ? "width-15" : "width-16"
                    }`}
                  >
                    Date
                  </div>
                  <div
                    className={`table-heading ${
                      draftsflag ? "width-19" : "width-24"
                    }`}
                  >
                    Title
                  </div>
                  <div
                    className={`table-heading ${
                      draftsflag ? "width-15" : "width-17"
                    }`}
                  >
                    Worktag
                  </div>
                  {draftsflag && (
                    <div
                      className={`table-heading ${
                        draftsflag ? "width-17" : "width-19"
                      }`}
                    >
                      Attendes
                    </div>
                  )}
                  <div className="table-heading text-align-left width-25">
                    Points
                  </div>
                </div>
              )}
              <div className="table-body position-relative">
                {MOMdata &&
                  MOMdata.map(
                    ({ date, title, category, points, _id }, index) => {
                      return (
                        <div
                          key={index}
                          style={{background:index===0? "#ECEFF5" :""}}
                          className="d-flex align-center justify-flex-start table-row  height-7 
                      border-radius-4 font-weight-400 color-text-000000 margin-bottom-4"
                        >
                          <input
                            className="checkbox-field width-5"
                            type="checkbox"
                            name="datacheck"
                            value={`name${index}`}
                            onChange={(e) => handleCheckDeleteShare(_id,e)}
                          />
                          <div
                            className="width-18"
                            onClick={() => gotoInnerMom(index)}
                          >
                            {`${date.substring(8, 10)}-${date.substring(5,7)}-${date.substring(0,4)}`}
                          </div>
                          <div
                            className="width-24"
                            onClick={() => gotoInnerMom(index)}
                          >
                            {add3dotsTitle(title)}
                            {/* {title} */}
                          </div>
                          <div
                            className="width-17"
                            onClick={() => gotoInnerMom(index)}
                          >
                            {category}
                          </div>
                          {draftsflag && (
                            <div
                              className="table-data"
                              onClick={() => gotoInnerMom(index)}
                            >
                              {emaillist[0]}
                            </div>
                          )}
                          <div
                            className="width-30"
                            onClick={() => gotoInnerMom(index)}
                          >
                            {add3Dots(points)}
                          </div>
                          {!draftsflag && (
                            <Dropdown>
                              <Dropdown.Toggle
                                as="button" className="threedots-btn bg-color-fa"
                                style={{
                                  border: "none",

                                }}
                              >
                                <img
                                  src={"/images/threedots.svg"}
                                  alt="threedots"
                                />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item className="d-flex align-center">
                                  <HiOutlineShare className="share-icon" />
                                  Share
                                </Dropdown.Item >
                                <Dropdown.Item className="d-flex align-center">
                                  <FiEdit2 className="share-icon" />
                                  Edit
                                </Dropdown.Item >
                                <Dropdown.Item className="d-flex align-center" onClick={()=>handleSingleDeleteMOM(_id)}>
                                  <AiOutlineDelete className="share-icon" />
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          )}
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default MomSection;
