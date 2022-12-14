import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineDelete, AiOutlineCloseCircle } from "react-icons/ai";
// import { CiCircleRemove } from "react-icons/ci";
import { HiOutlineShare } from "react-icons/hi";
import { FiChevronRight, FiEdit2 } from "react-icons/fi";
import { data } from "../../utils";
import "./momSection.css";
import { momContext } from "./../../../MobileApp";
import { Dropdown } from "react-bootstrap";
import { allImagesList } from './../../utils/images/';

function MomSection() {
  const {
    naviagteInnerPage,
    momdraftsdata,
    setMomdraftsdata,
    momsentdata,
    setMomsentdata,
    handleSharedMOMdata,
    getClientProject,
    handleEditDraftdata,
    clientName,
    setClientName,
    openShareModal,
    sharedMOMWithEmail,
    emailValid,
    shareEmail,
    setShareEmail,
    openSharePopUp,
    makeMonthFormat,
    designerName,
    setDesignerName,
    designerLocation,
    setDesignerLocation,
    designerStatus,
  } = useContext(momContext);
  const navigate = useNavigate();
  const { projectId, id } = useParams()
  const [draftsflag, setDraftsflag] = useState(false);
  const [sentsflag, setSentflag] = useState(false);
  const [momdraftsclonedata, setmomdraftsclonedata] = useState([]);
  const [momsentclonedata, setmomsentclonedata] = useState([]);
  const [opendeleteModal, setOpendeleteModal] = useState(false);
  const [openMultipledeleteModal, setOpenMultipledeleteModal] = useState(false);
  const [singleDeleteMomid, setSingleDeleteMomid] = useState([]);
  const [checkboxAllSelected, setCheckboxAllSelected] = useState([]);
  const [allselectcheckbox, setAllselectcheckbox] = useState(false);
  const [searchbarToggle, setSearchToggle] = useState(false);

  const { access_token, BaseUrl, monthList } = data;
  const { createmom, threeDots, doubleVector, searchIcon, emptyIcon, crossCloseIcon, backArrow } = allImagesList
  ///----toggle searchbar -----////
  const toggleSearchbarEffect = (value) => {
    setSearchToggle(value);
  };
  ///=----draftsdocs----////
  const handleDraftsDocs = () => {
    setCheckboxAllSelected([]);
    setDraftsflag(false);
    setSentflag(true);
  };
  ///=----sentdocs----////
  const handleSentDocs = () => {
    setCheckboxAllSelected([]);
    setDraftsflag(true);
    setSentflag(false)
  };

  const check = document.getElementsByName("pointscheck");
  ///-----all checkbox ----///
  const SelectAll = (e) => {
    const { checked } = e.target;
    if (!draftsflag) {
      if (checked) {
        for (let i = 0; i < check.length; i++) {
          check[i].checked = true;
          const draftIds = momdraftsdata.map((draft) => draft._id);
          setCheckboxAllSelected(draftIds);
          setAllselectcheckbox(true);
        }
      } else {
        for (let i = 0; i < check.length; i++) {
          check[i].checked = false;
          setCheckboxAllSelected([]);
          setAllselectcheckbox(false);
        }
      }
    } else {
      if (checked) {
        for (let i = 0; i < check.length; i++) {
          check[i].checked = true;
          const sentIds = momsentdata.map((draft) => draft._id);
          setCheckboxAllSelected(sentIds);
          setAllselectcheckbox(true);
        }
      } else {
        for (let i = 0; i < check.length; i++) {
          check[i].checked = false;
          setCheckboxAllSelected([]);
          setAllselectcheckbox(false);
        }
      }
    }
  };

  ///----make short name of client -----////
  function shortName(nameString) {
    const fullName = nameString.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
  }
  // console.log(checkboxAllSelected)
  ///---navigate to new mom page -----///
  const navigateNewMom = (projectId) => {
    navigate(`/newmom/${projectId}`);
  };

  ///----open delete MOM modal -----///
  const handleMOMModal = (value, id) => {
    console.log(value, id);
    if (value) {
      setSingleDeleteMomid((prev) => [...prev, id]);
      setOpendeleteModal(value);
    } else {
      setOpendeleteModal(value);
      setSingleDeleteMomid([]);
    }
  };
  ///----open multiple delete MOM modal -----///
  const handleMultipleMOMModal = (value) => {
    if (value) {
      setOpenMultipledeleteModal(value);
    } else {
      setOpenMultipledeleteModal(value);
    }
  };
  ///---checkbox functionality and show delete and share icon---///
  ///---checkbox functionality---///
  const handleCheckDeleteShare = (id) => {
    if (checkboxAllSelected.includes(id)) {
      let checkbox = checkboxAllSelected.filter((itemid) => itemid !== id);
      setCheckboxAllSelected(checkbox);
    } else {
      setCheckboxAllSelected((previousitem) => [...previousitem, id]);
    }
  };
  // console.log(checkboxAllSelected)

  ///----delete the mom selected data----////
  const handleMultipleDeleteMOM = async () => {
    navigate(`/${projectId}`);
    setOpenMultipledeleteModal(false);
    await axios
      .put(`${BaseUrl}/api/mom/deleteMOMs?projectId=${projectId}`, {
        momIds: checkboxAllSelected,
      })
      .then((res) => {
        if ((res.status = 200)) {
          window.location.reload(false);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///----delete the single select mom----///
  ///----delete the single selected MOM data----////
  const handleSingleDeleteMOM = async (id) => {
    navigate(`/${projectId}`);
    setOpendeleteModal(false);
    await axios
      .put(`${BaseUrl}/api/mom/deleteMOMs?projectId=${projectId}`, {
        momIds: singleDeleteMomid,
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload(false);
          setSingleDeleteMomid([]);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///----remove bullet points form points-field----///
  const removeBulletsPoints = (points) => {
    let newstrpoints = "";
    let limit = 150;
    let dots = "...";
    for (let i = 0; i < points.length; i++) {
      newstrpoints += points[i].substring(1,);
      if (newstrpoints.length > limit) {
        return newstrpoints.substring(0, limit) + dots;
      }
    }
    return newstrpoints;
  };

  ///---add three dots for title after limit out----///
  function add3dotsTitle(title) {
    let dots = "...";
    let limit = 20;
    if (title.length > limit) {
      return title.substring(0, limit) + dots;
    } else {
      return title;
    }
  }
  ///---search by title without API ----///
  function handleSearch(e) {
    if (!draftsflag) {
      const newdata = momdraftsclonedata.filter((element) => {
        return element.title.toLowerCase().includes(e.toLowerCase());
      });
      setMomdraftsdata(newdata);
    } else {
      const newdata = momsentclonedata.filter((element) => {
        return element.title.toLowerCase().includes(e.toLowerCase());
      });
      setMomsentdata(newdata);
    }
  }
  ////-----get api data -----///
  async function getApiData() {
    return axios.get(`${BaseUrl}/api/mom/getMOM?projectId=${projectId}`, {
      headers: {
        Authorization: access_token,
      },
    });
  }

  ///---read the mom after 24 hours---///
  async function getReadMOM(id) {
    await axios({
      method: "post",
      url: `${BaseUrl}/api/mom/addEditMOM/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      data: {
        id: id,
        isRead: true,
        projectId: projectId,
      },
    })
      .then((res) => {
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getApiData()
      .then((res) => {
        setMomsentdata(
          res.data.momData.filter(({ isDraft }) => isDraft === false)
        );
        setmomsentclonedata(
          res.data.momData.filter(({ isDraft }) => isDraft === false)
        );
        setMomdraftsdata(
          res.data.momData.filter(({ isDraft }) => isDraft === true)
        );
        setmomdraftsclonedata(
          res.data.momData.filter(({ isDraft }) => isDraft === true)
        );

        ///read the mom auto after 24 hours ---- when users doesn't read the mom ----///
        let allunreadMOM = res.data.momData.filter((elem) => elem.isRead === false)
        const today = new Date();
        if (allunreadMOM) {
          for (let i = 0; i < allunreadMOM.length; i++) {
            const createdAtMOM = new Date(allunreadMOM[i].createdAt);
            let newmomId = allunreadMOM[i]._id;
            if (today - createdAtMOM > 86399452) {
              //  console.log("24 hour has gone")
              getReadMOM(newmomId)
            }
            else {
              // console.log("24 hour has not gone")
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });

    ///---get client id project----///
    //---get client name from client data----///
    getClientProject(projectId)
      .then((res) => {
        console.log(res.data.projects[0].clientId.name)
        setClientName(res.data.projects[0].clientId.name);
        setDesignerName(res.data.projects[0].name)
        setDesignerLocation(res.data.projects[0].location)
      })
      .catch((error) => {
        console.error(error);
      })
    console.log(clientName)
  }, []);

  useEffect(() => {
    ///---condition for all select checkbox----///
    if (!draftsflag) {
      if (checkboxAllSelected.length === momdraftsdata.length) {
        setAllselectcheckbox(true);
      } else {
        setAllselectcheckbox(false);
      }
    } else {
      if (checkboxAllSelected.length === momsentdata.length) {
        setAllselectcheckbox(true);
      } else {
        setAllselectcheckbox(false);
      }
    }
  }, [checkboxAllSelected]);
  return (
    <>
      <div
        className={`padding-3 d-flex-col justify-around 
      ${momdraftsdata.length < 1 && momsentdata.length
            ? "height-fit-content"
            : ""
          }
      `}
      >
        {/* ///------modal code for delete MOM */}
        {opendeleteModal && (
          <div className="main-modal-container">
            <div className="modals-wrapper-mobile">
              <div className="content">
                <p className="notice-text"> Are you sure you want to delete this?</p>
              </div>
              <div style={{ marginTop: "10%" }} className="d-flex width-50">
                <div
                  className="ui button yes-btn"
                  onClick={() => handleSingleDeleteMOM()}
                >
                  Yes
                </div>
                <div
                  className="ui button no-btn"
                  onClick={() => handleMOMModal(false)}
                >
                  No
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ///------modal code for multiple delete MOM */}
        {openMultipledeleteModal && (
          <div className="main-modal-container">
            <div className="modals-wrapper-mobile">
              <div className="content">
                <p className="notice-text">Are you sure you want to delete this?</p>
              </div>
              <div style={{ marginTop: "10%" }} className="d-flex width-50">
                <div
                  className="ui button yes-btn"
                  onClick={() => handleMultipleDeleteMOM()}
                >
                  Yes
                </div>
                <div
                  className="ui button no-btn"
                  onClick={() => handleMultipleMOMModal(false)}
                >
                  No
                </div>
              </div>
            </div>
          </div>
        )}
        {/* open share mom modal */}
        {openShareModal && (
          <div className="main-modal-container">
            <div className="modals-wrapper-share-mom-mobile position-relative">
              <div className="content">
                <p className="notice-text">Email</p>
                <img
                  className="position-absolute close-icon-share-mom"
                  onClick={() => openSharePopUp(false, projectId, id)}
                  src={crossCloseIcon}
                  alt="cross-icon"
                />
                <input
                  type="text"
                  className="border-df bg-color-fa padding-5 border-radius-4 width-100"
                  placeholder="Email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                />
              </div>
              {emailValid && <div style={{ color: "red", fontSize: "10px", paddingLeft: "7px" }}>Email isn't valid</div>}
              <div className="actions">
                <div className="ui button submit-share-mom-btn" onClick={() => sharedMOMWithEmail(projectId, id)}>
                  Submit
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ///-------//// */}
        <div className="d-flex justify-around width-fit-content align-center">
          <div className=" color-text-888888 small-font-10">
          {designerName}
          </div>
          <div className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </div>
          <div className="color-text small-font-10 font-weight-500">MOM</div>
        </div>
        <div className="d-flex justify-between align-center divider-margin position-relative">
          <div className="doublevector-icon">
            <img src={doubleVector} alt="vector" />
          </div>
          <div className="divider-bar">|</div>
          <div className="mom-head font-weight-500 margin-right-10">
            Minutes of Meetings
          </div>
          <div
            className={`search-box d-flex align-center position-absolute ${!searchbarToggle ? "right-22" : "right-0"
              }`}
          >
            <input
              type="text"
              className={!searchbarToggle ? "search-text" : "open-state"}
              placeholder="search"
              onChange={(e) =>
                handleSearch(e.target.value)
              }
            />
            <button className="search-btn">
              {!searchbarToggle ? (
                <img
                  onClick={() => toggleSearchbarEffect(true)}
                  src={searchIcon}
                  alt="searchIcon"
                />
              ) : (
                <div
                  className="circum-close-icon"
                  onClick={() => toggleSearchbarEffect(false)}
                >
                  <AiOutlineCloseCircle />
                  {/* <CiCircleRemove/> */}
                </div>
              )}
            </button>
          </div>
          <div className="edit-icon" onClick={() => navigateNewMom(projectId, id)}>
            <img src={createmom} alt="create-mom" />
          </div>
        </div>
        <div className="ui divider"></div>
        {!checkboxAllSelected?.length ? (
          <div className="d-flex width-35  justify-between">
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
          </div>
        ) : (
          <div className="d-flex align-center justify-between">
            <div className="d-flex justify-around width-35">
              <input
                type="checkbox"
                name="selectall"
                checked={allselectcheckbox}
                onChange={(e) => SelectAll(e)}
              />
              <div className="color-text font-size-15 font-weight-500">
                Select All
              </div>
            </div>
            <div className="d-flex justify-around width-35">
              <div className="color-text font-weight-500 font-size-15">
                {/* Share */}
              </div>
              <div
                className="color-text font-weight-500 font-size-15"
                onClick={() => handleMultipleMOMModal(true)}
              >
                Delete
              </div>
            </div>
          </div>
        )}
        <div style={{ marginTop: "0%" }} className="ui divider"></div>
        <div className="momdata-wrapper d-flex-col divider-margin">
          {!draftsflag && momdraftsdata.length < 1 ? (
            <div className="d-flex-col align-center justify-center font-weight-500 m-auto height-50">
              <div className="add-mom-Bg">
                <img
                  className="addMomImg"
                  src={emptyIcon}
                  alt="add-notes"
                />
              </div>
              <div className="color-text-888888 small-font-12">
                You haven't added any MOMs yet
              </div>
              <div
                className="color-text small-font-12"
                onClick={() => navigateNewMom(projectId)}
              >
                Add now
              </div>
            </div>
          ) : (
            !draftsflag &&
            momdraftsdata?.map(
              ({ _id, date, title, category, points, isRead }, index) => {
                return (
                  <div
                    key={index}
                    style={{ background: isRead ? "" : "#ECEFF5" }}
                    className="mom-field border-df border-radius-5 divider-margin"
                    name="draftMOM">
                    <div className="d-flex justify-around align-center padding-3">
                      <input
                        type="checkbox"
                        name="pointscheck"
                        onChange={() => handleCheckDeleteShare(_id)}
                      />
                      <div className="d-flex align-center justify-between width-100 margin-left-5">
                        <div
                          className="title-font-size font-weight-500"
                          onClick={() => naviagteInnerPage(projectId, _id)}
                        >
                          {add3dotsTitle(title)}
                        </div>
                        <div
                          className="mom-layout color-text border-radius-25"
                          onClick={() => naviagteInnerPage(projectId, _id)}
                        >
                          #{category}
                        </div>
                        {!draftsflag && (
                          <Dropdown>
                            <Dropdown.Toggle
                              as="button"
                              style={{
                                border: "none",
                                background: "none",
                              }}
                            >
                              <img
                                src={threeDots}
                                alt="threedots"
                              />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                className="d-flex align-center"
                                onClick={() => handleSharedMOMdata(projectId, true, _id)}
                              >
                                <HiOutlineShare className="share-icon margin-right-5" />
                                Share
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="d-flex align-center"
                                onClick={() => handleEditDraftdata(projectId, _id)}
                              >
                                <FiEdit2 className="share-icon margin-right-5" />
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="d-flex align-center"
                                onClick={() => handleMOMModal(true, _id)}
                              >
                                <AiOutlineDelete className="share-icon margin-right-5" />
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                      </div>
                    </div>
                    <div
                      className="mom-points text-align-justify"
                      onClick={() => naviagteInnerPage(projectId, _id)}
                    >
                      {points && removeBulletsPoints(points)}
                    </div>
                    <div className="d-flex justify-between align-center padding-3">
                      <div onClick={() => naviagteInnerPage(projectId, _id)}>
                        {date &&
                          `${date?.substring(8, 10)} ${makeMonthFormat(date?.substring(
                            5,
                            7
                          ))} ${date?.substring(0, 4)}`}
                      </div>
                      <div
                        className="as-on color-text border-radius-25"
                        onClick={() => naviagteInnerPage(projectId, _id)}
                      >
                        {clientName && shortName(clientName)}
                      </div>
                    </div>
                  </div>
                );
              }
            )
          )
          }
          {draftsflag && momsentdata.length < 1 ? (
            <div className="d-flex-col align-center justify-center font-weight-500 m-auto height-50">
              <div className="add-mom-Bg">
                <img
                  className="addMomImg"
                  src={emptyIcon}
                  alt="add-notes"
                />
              </div>
              <div className="color-text-888888 small-font-12">
                You haven't sent any MOMs yet
              </div>
              <div
                className="color-text small-font-12"
                onClick={() => navigateNewMom(projectId)}
              >
                Add now
              </div>
            </div>
          ) : (
            draftsflag && momsentdata?.map(
              ({ _id, date, title, category, points, isRead }, index) => {
                return (
                  <div
                    key={index}
                    style={{ background: isRead ? "" : "#ECEFF5" }}
                    name="sentMOM"
                    className="mom-field border-df border-radius-5 divider-margin"
                  >
                    <div className="d-flex justify-around align-center padding-3">
                      {/* <input
                        type="checkbox"
                        name="pointscheck"
                        onChange={() => handleCheckDeleteShare(_id)}
                      /> */}
                      <div className="d-flex align-center justify-between width-100 margin-left-5">
                        <div
                          className="title-font-size font-weight-500"
                          onClick={() => naviagteInnerPage(projectId, _id)}
                        >
                          {add3dotsTitle(title)}
                        </div>
                        <div
                          className="mom-layout color-text border-radius-25"
                          onClick={() => naviagteInnerPage(projectId, _id)}
                        >
                          #{category}
                        </div>
                        <Dropdown>
                          <Dropdown.Toggle
                            as="button"
                            style={{
                              border: "none",
                              background: "none",
                            }}
                          >
                            <img
                              src={threeDots}
                              alt="threedots"
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item className="d-flex align-center" onClick={() => openSharePopUp(true, projectId, _id)}>
                              <HiOutlineShare className="share-icon margin-right-5" />
                              Share
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div
                      className="mom-points text-align-justify"
                      onClick={() => naviagteInnerPage(projectId, _id)}>
                      {points && removeBulletsPoints(points)}
                    </div>
                    <div className="d-flex justify-between align-center padding-3">
                      <div
                        onClick={() => naviagteInnerPage(projectId, _id)}
                      >{date &&
                        `${date?.substring(8, 10)} ${makeMonthFormat(date?.substring(
                          5,
                          7
                        ))} ${date?.substring(0, 4)}`}</div>
                      <div
                        className="as-on color-text border-radius-25"
                        onClick={() => naviagteInnerPage(projectId, _id)}
                      >
                        {clientName && shortName(clientName)}
                      </div>
                    </div>
                  </div>
                );
              }
            )
          )}
        </div>
      </div>
    </>
  );
}
export default MomSection;
