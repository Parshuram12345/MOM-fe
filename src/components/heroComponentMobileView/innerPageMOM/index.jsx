import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./innerPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlineShare } from "react-icons/hi";
import { FiChevronRight } from "react-icons/fi";
import { momContext } from "./../../../MobileApp.jsx";
import { data } from "../../utils";
import { allImagesList } from "./../../utils/images/index";

function InnerPageMom() {
  const { projectId, id } = useParams();
  const navigate = useNavigate();
  const { BaseUrl, access_token } = data;
  const { fullDots, doubleVector, searchIcon, createmom, crossCloseIcon } =
    allImagesList;
  const [searchbarToggle, setSearchToggle] = useState(false);
  const [shareIconsent, setShareIconsent] = useState(true);
  const [sharedMomEmail,setSharedMomEmail]=useState([])
  const {
    pointsdetails,
    clientEmail,
    setClientEmail,
    setPointsdetails,
    getClientProject,
    navigateHome,
    getSingleMomApiData,
    setShareEmail,
    shareEmail,
    sharedMOMWithEmail,
    setOpenShareModal,
    openShareModal,
    emailValid,
    makeMonthFormat,
  } = useContext(momContext);
  ///----toggle searchbar -----////
  const toggleSearchbarEffect = (value) => {
    setSearchToggle(value);
  };

  ///-----highlight the match point text---///
  const highlightPoints = (event) => {
    let textToSearch = event.target.value;
    let allpointslist = document.getElementsByClassName("points-field");
    let special = /[\\[{().+*?|^$]/g;
    if (textToSearch !== "") {
      if (special.test(textToSearch)) {
        textToSearch = textToSearch.replace(special, "\\$&");
      }
      let regexp = new RegExp(textToSearch, "gi");
      for (let i = 0; i < allpointslist.length; i++) {
        allpointslist[i].innerHTML = allpointslist[i].textContent.replace(
          regexp,
          "<mark className='match-txt'>$&</mark>"
        );
      }
    } else {
      for (let i = 0; i < allpointslist.length; i++) {
        allpointslist[i].innerHTML = allpointslist[i].textContent;
      }
    }
  };

  ///---read the mom and edit it---///
  async function getReadMom() {
    return await axios({
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
    });
  }
  useEffect(() => {
    if (id) {
      getSingleMomApiData(id)
        .then((res) => {
          setPointsdetails(res?.data?.momData[0]);
          setShareIconsent(res?.data?.momData[0].isDraft);
          setSharedMomEmail(res.data.momData[0].sharedWith)
        })
        .catch((error) => {
          console.error(error);
        });
    }
    ///----get client project id -----///
    //---get client name from client data----///
    getClientProject(projectId)
      .then((res) => {
        setClientEmail(res.data.projects[0].clientId.email);
      })
      .catch((error) => {
        console.error(error);
      });

    ///----read mom ----///
    getReadMom()
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  ///----bullet points -----////
  const bullet = "\u2022";
  return (
    <>
      <div className="padding-5">
        {/* open share mom modal */}
        {openShareModal && (
          <div className="main-modal-container">
            <div className="modals-wrapper-share-mom-mobile position-relative">
              <div className="content">
                <p className="notice-text">Email</p>
                <img
                  className="position-absolute close-icon-share-mom"
                  onClick={() => setOpenShareModal(false)}
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
              {emailValid && (
                <div
                  style={{ color: "red", fontSize: "10px", paddingLeft: "7px" }}
                >
                  Email isn't valid
                </div>
              )}
              <div className="actions">
                <div
                  className="ui button submit-share-mom-btn"
                  onClick={() => sharedMOMWithEmail(projectId, id)}
                >
                  Submit
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={{flexWrap:"wrap",justifyContent:"start"}} className="d-flex font-weight-500 width-fit-content align-center margin-top-4 word-break">
          <div className="color-text-888888 small-font-10 cursor-pointer">
            Pr's saini
          </div>
          <div className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </div>
          <div
            className="small-font-10 color-text-888888 cursor-pointer"
            onClick={() => navigateHome(projectId, id)}
          >
            MOM
          </div>
          <div className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </div>
          <div className="color-text small-font-10 font-weight-500">
            {pointsdetails?.title}
          </div>
        </div>
        <div className="d-flex justify-between position-relative align-center divider-margin">
          <div className="doublevector-icon">
            <img src={doubleVector} alt="vector2" />
          </div>
          <div className="divider-bar">|</div>
          <div className="mom-head font-weight-500 margin-right-10">
            Minutes of Meetings
          </div>
          <div
            className={`search-box d-flex align-center position-absolute ${
              !searchbarToggle ? "right-22" : "right-0"
            }`}
          >
            <input
              type="text"
              className={!searchbarToggle ? "search-text" : "open-state"}
              id="searchBar"
              onChange={(e) => highlightPoints(e)}
              placeholder="search"
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
                </div>
              )}
            </button>
          </div>
          <div className="edit-icon">
            <Link to={`/newmom/${projectId}`}>
              <img src={createmom} alt="create-mom" />
            </Link>
          </div>
        </div>
        <div className="d-flex-col">
          <div className="d-flex align-center">
            <div style={{wordBreak: "break-word"}} className="font-size-14 font-weight-600 divider-margin width-fit-content">
              {pointsdetails?.title}
                </div>
              <div style={{ marginLeft: "5px" }}>
                {!shareIconsent && (
                  <HiOutlineShare
                    className="color-text-888888"
                    onClick={() => setOpenShareModal(true)}
                  />
                )}
              </div>
          </div>
          <div className="d-flex justify-between">
            <div className="color-text-888888 font-size-13">
              {pointsdetails?.date &&
                `${pointsdetails?.date?.substring(8, 10)} ${makeMonthFormat(
                  pointsdetails?.date?.substring(5, 7)
                )} ${pointsdetails?.date?.substring(0, 4)}`}
              <img
                style={{ margin: "0 5px" }}
                src={fullDots}
                alt="fullpoints"
              />
              <span className="word-break">{pointsdetails?.location}</span>
            </div>
            <div className="color-text-888888 font-size-13 text-align-center">
              {pointsdetails?.category}
            </div>
          </div>
        </div>
        <div className="ui divider"></div>
        <div>
        <div style={{margin:"5px 0"}} className="font-weight-500 color-text-000000">ShareWith</div>
        {shareIconsent && <div>{clientEmail}</div>}
                {!shareIconsent && sharedMomEmail?.map((email,i)=>{
                  return(
                    <div key={i}>{email}</div>
                  )
                })}
        </div>
        <div name="points" className="points-container border-none">
          {pointsdetails &&
            pointsdetails?.points
              ?.filter((elem) => elem !== " \n")
              .map((elem, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex font-weight-500 divider-margin"
                  >
                    <span className="points-counter">{bullet} </span>
                    <div className="points-field text-align-justify">
                      {elem.substring(1)}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
}
export default InnerPageMom;
