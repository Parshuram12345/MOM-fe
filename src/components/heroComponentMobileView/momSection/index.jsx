import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { AiOutlineDelete,AiOutlineCloseCircle} from "react-icons/ai";
// import { CiCircleRemove } from "react-icons/ci";
import { HiOutlineShare } from "react-icons/hi";
import { FiChevronRight, FiEdit2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { data } from "../../utils";
import "./momSection.css";
import { momContext } from "./../../../MobileApp";
import { Dropdown } from "react-bootstrap";

function MomSection() {
  const {
    naviagteInnerPage,
    momdraftsdata,
    setMomdraftsdata,
    momsentdata,
    setMomsentdata,
    handleSharedMOMdata,
    getClientProject,
    handleEditDraftdata
  } = useContext(momContext);
  const navigate = useNavigate();
  const [draftsflag, setDraftsflag] = useState(false);
  const [sentsflag, setSentflag] = useState(false);
  const [momdraftsclonedata, setmomdraftsclonedata] = useState([]);
  const [momsentclonedata, setmomsentclonedata] = useState([]);
  const [opendeleteModal, setOpendeleteModal] = useState(false);
  const [openMultipledeleteModal, setOpenMultipledeleteModal] = useState(false);
  const [singleDeleteMomid, setSingleDeleteMomid] = useState([]);
  const [checkboxAllSelected, setCheckboxAllSelected] = useState([]);
  const [allselectcheckbox, setAllselectcheckbox] = useState(false);
  const [searchbarToggle,setSearchToggle]=useState(false)
  const { access_token, BaseUrl, projectid } = data;
  ///----toggle searchbar -----////
  const toggleSearchbarEffect=(value)=>{
    setSearchToggle(value)
  }
  ///=----draftsdocs----////
  const handleDraftsDocs = () => {
    setDraftsflag(false);
    setSentflag(true);
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
    if(!draftsflag){
      if (checked) {
        for (let i = 0; i < check.length; i++) {
          check[i].checked = true;
          const draftIds = momdraftsdata.map((draft)=> draft._id)
          setCheckboxAllSelected(draftIds)
          setAllselectcheckbox(true)
        }
      } else {
        for (let i = 0; i < check.length; i++) {
          check[i].checked = false;
          setCheckboxAllSelected([])
          setAllselectcheckbox(false)
        }
      }
    }
    else{
      if (checked) {
        for (let i = 0; i < check.length; i++) {
          check[i].checked = true;
          const sentIds = momsentdata.map((draft)=> draft._id)
          setCheckboxAllSelected(sentIds)
          setAllselectcheckbox(true)
        }
      } else {
        for (let i = 0; i < check.length; i++) {
          check[i].checked = false;
          setCheckboxAllSelected([])
          setAllselectcheckbox(false)
        }
      }
    }
  }

  ///----sent checkbox functionality----///
  // const SelectAllSent=(e)=>{
       
  // }
  // console.log(checkboxAllSelected)
  ///---navigate to new mom page -----///
  const navigateNewMom = () => {
    navigate("/newmom");
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
    navigate("/");
    setOpenMultipledeleteModal(false);
    await axios
    .put(`${BaseUrl}/api/mom/deleteMOMs?projectId=${projectid}`, {
        momIds: checkboxAllSelected,
      })
      .then((res) => {
        if (res.status=200) {
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
    navigate("/");
    setOpendeleteModal(false);
    await axios
      .put(`${BaseUrl}/api/mom/deleteMOMs?projectId=${projectid}`, {
        momIds: singleDeleteMomid,
      })
      .then((res) => {
        if (res.status===200) {
          window.location.reload(false);
          setSingleDeleteMomid([]);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  ///----remove bullet points form points-field----///
  const removeBulletsPoints = (points) => {
    let newstrpoints = "";
    let limit = 150;
    let dots = "...";
    for (let i = 0; i < points.length; i++) {
      newstrpoints += points[i].substring(1,);
      if(newstrpoints.length>limit){
        return newstrpoints.substring(0,limit) + dots;
      }
    }
    return newstrpoints;
  };
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
    return axios.get(`${BaseUrl}/api/mom/getMOM?projectId=${projectid}`, {
      headers: {
        Authorization: access_token,
      },
    });
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
      })
      .catch((error) => {
        console.error(error);
      });

    ///---get client id project----///
    getClientProject();
    
    ///-----read the draft mom after 24 hours------///
    const draftsmom = document.getElementsByName("draftMOM");
    console.log(draftsmom[0]?.textContent);

  }, []);

  useEffect(() => {
    ///---condition for all select checkbox----///
    if(!draftsflag){
      if (checkboxAllSelected.length === momdraftsdata.length) {
        setAllselectcheckbox(true);
      } else {
        setAllselectcheckbox(false);
      }
    }
    else{
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
      ${
        momdraftsdata.length < 1 && momsentdata.length
          ? "height-fit-content"
          : ""
      }
      `}
      >
        {/* ///------modal code for delete MOM */}
        {opendeleteModal && (
          <div className="main-modal-container">
            <div className="modals-wrapper">
              <div className="content">
                <p className="notice-text"> Are you sure want to delete ?</p>
              </div>
              <div className="ui divider"></div>
              <div className="actions">
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
            <div className="modals-wrapper">
              <div className="content">
                <p className="notice-text"> Are you sure want to delete ?</p>
              </div>
              <div className="ui divider"></div>
              <div className="actions">
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
        {/* ///-------//// */}
        <div className="d-flex justify-around width-fit-content align-center">
          <div className=" color-text-888888 small-font-10">
            Praveer's villa
          </div>
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
          <div className="mom-head font-weight-500 margin-right-10">
            Minutes of Meetings
          </div>
          <div className={`search-box d-flex align-center position-absolute ${ !searchbarToggle ? "right-22" :"right-0"}`}>
            <input
              type="text"
              className={ !searchbarToggle ? "search-text" : "open-state"}
              placeholder="search"
              onChange={(e) =>
                // handleSearchByTitle(e)}
                handleSearch(e.target.value)
              }
            />
            <button className="search-btn">
              { !searchbarToggle ?(<img onClick={()=>toggleSearchbarEffect(true)} src={"/images/searchicon.svg"} alt="vector" />)
              :(<div className="circum-close-icon" onClick={()=>toggleSearchbarEffect(false)}>
               <AiOutlineCloseCircle/>
                {/* <CiCircleRemove/> */}
                </div>
            )}
            </button>

          </div>

          <div className="edit-icon" onClick={() => navigateNewMom()}>
            <FaRegEdit />
          </div>
        </div>
        <div className="ui divider"></div>
        {!checkboxAllSelected?.length ? (
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
                onClick={() => handleMultipleMOMModal(true)}>
                Delete
              </div>
            </div>
          </div>
        )}
        <div style={{ marginTop: "0%" }} className="ui divider"></div>
        <div className="momdata-wrapper d-flex-col divider-margin">
          {momdraftsdata.length < 1 && momsentdata.length < 1 ? (
            <div className="d-flex-col align-center justify-center font-weight-500 m-auto height-50">
              <div className="add-mom-Bg">
                <img
                  className="addMomImg"
                  src={"/images/add_mom.svg"}
                  alt="add-notes"
                />
              </div>
              <div className="color-text-888888 small-font-12">
                you haven't added any MOMs yet
              </div>
              <div
                className="color-text small-font-12"
                onClick={() => navigateNewMom()}
              >
                Add now
              </div>
            </div>
          ) : !draftsflag ? (
            momdraftsdata.length < 1 ? (
              <div className="d-flex-col align-center justify-center font-weight-500 m-auto height-50">
              <div className="add-mom-Bg">
                <img
                  className="addMomImg"
                  src={"/images/add_mom.svg"}
                  alt="add-notes"
                />
              </div>
              <div className="color-text-888888 small-font-12">
                you haven't added any MOMs yet
              </div>
              <div
                className="color-text small-font-12"
                onClick={() => navigateNewMom()}
              >
                Add now
              </div>
            </div>
            ):(
            momdraftsdata?.map(
              ({ _id, date, title, category, points,isRead }, index) => {
                return (
                  <div
                    key={index}
                    style={{ background: isRead? "" :  "#ECEFF5" }}
                    className="mom-field border-df border-radius-5 divider-margin"
                    name="draftMOM"
                  >
                    <div className="d-flex justify-around align-center padding-3">
                      <input
                        type="checkbox"
                        name="pointscheck"
                        onChange={() => handleCheckDeleteShare(_id)}
                      />
                      <div
                        className="title-font-size font-weight-500"
                        onClick={() => naviagteInnerPage(_id)}
                      >
                        {title}
                      </div>
                      <div
                        className="mom-layout color-text border-radius-25"
                        onClick={() => naviagteInnerPage(_id)}
                      >
                        #{category}
                      </div>
                      {!draftsflag && (
                        <Dropdown>
                          <Dropdown.Toggle
                            as="button"
                            style={{
                              border: "none",
                              backgroundColor: "#ECEFF5",
                            }}
                          >
                            <img
                              src={"/images/threedots.svg"}
                              alt="threedots"
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => handleSharedMOMdata(true)}
                            >
                              <HiOutlineShare className="share-icon" />
                              Share
                            </Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleEditDraftdata(_id)}>
                              <FiEdit2 className="share-icon" />
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleMOMModal(true, _id)}
                            >
                              <AiOutlineDelete className="share-icon" />
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </div>
                    <div
                      className="mom-points text-align-justify"
                      onClick={() => naviagteInnerPage(_id)}
                    >
                      {points && removeBulletsPoints(points)}
                    </div>
                    <div className="d-flex justify-between align-center padding-3">
                      <div onClick={() => naviagteInnerPage(_id)}>
                        { date && `${date?.substring(8, 10)}-${date?.substring(5,7)}-${date?.substring(0, 4)}`}
                      </div>
                      <div className="d-flex justify-between align-center width-20">
                        <div
                          className="as-on color-text border-radius-25"
                          onClick={() => naviagteInnerPage(_id)}
                        >
                          AS
                        </div>
                        <div
                          className="as-on color-text border-radius-25"
                          onClick={() => naviagteInnerPage(_id)}
                        >
                          DN
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          )) :(
            draftsflag ? (
              <div className="d-flex-col align-center justify-center font-weight-500 m-auto height-50">
              <div className="add-mom-Bg">
                <img
                  className="addMomImg"
                  src={"/images/add_mom.svg"}
                  alt="add-notes"
                />
              </div>
              <div className="color-text-888888 small-font-12">
                you haven't Sent any MOMs yet
              </div>
              <div
                className="color-text small-font-12"
                onClick={() => navigateNewMom()}
              >
                Add now
              </div>
            </div>
            ):(
            momsentdata?.map(
              ({ _id, date, title, category, points,isRead }, index) => {
                return (
                  <div
                    key={index}
                    style={{ background: isRead ? "" :  "#ECEFF5" }}
                    name="sentMOM"
                    className="mom-field border-df border-radius-5 divider-margin"
                  >
                    <div className="d-flex justify-around align-center padding-3">
                      <input
                        type="checkbox"
                        name="pointscheck"
                        onChange={() => handleCheckDeleteShare(_id)}
                      />
                      <div
                        className="title-font-size font-weight-500"
                        onClick={() => naviagteInnerPage(_id)}
                      >
                        {title}
                      </div>
                      <div
                        className="mom-layout color-text border-radius-25"
                        onClick={() => naviagteInnerPage(_id)}
                      >
                        #{category}
                      </div>
                      {/* {!draftsflag && (
                        <Dropdown>
                          <Dropdown.Toggle
                            as="button"
                            style={{
                              border: "none",
                              backgroundColor: "#ECEFF5",
                            }}
                          >
                            <img
                              src={"/images/threedots.svg"}
                              alt="threedots"
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <HiOutlineShare className="share-icon" />
                              Share
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <FiEdit2 className="share-icon" />
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleSingleDeleteMOM(_id)}
                            >
                              <AiOutlineDelete className="share-icon" />
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )} */}
                    </div>
                    <div
                      className="mom-points text-align-justify"
                      onClick={() => naviagteInnerPage(_id)}
                    >
                      {points && removeBulletsPoints(points)}
                    </div>
                    <div className="d-flex justify-between align-center padding-3">
                      <div
                        onClick={() => naviagteInnerPage(_id)}
                      >{`${date.substring(8, 10)}-${date.substring(
                        5,
                        7
                      )}-${date.substring(0, 4)}`}</div>
                      <div className="d-flex justify-between align-center width-20">
                        <div
                          className="as-on color-text border-radius-25"
                          onClick={() => naviagteInnerPage(_id)}
                        >
                          AS
                        </div>
                        <div
                          className="as-on color-text border-radius-25"
                          onClick={() => naviagteInnerPage(_id)}
                        >
                          DN
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          )
          )}
        </div>
      </div>
    </>
  );
}
export default MomSection;
