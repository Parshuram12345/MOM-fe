import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineShare } from "react-icons/hi";
import { FiChevronRight } from "react-icons/fi";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./InnerPageMom.css";
import { data } from "../../utils/index";
import { allImagesList } from "../../utils/images";
import { MomContext } from "../../../App.jsx";

function InnerPageMom() {
  const { projectId, id } = useParams();
  const [shareIconsent, setShareIconsent] = useState(true)
  const [sharedMomEmail, setSharedMomEmail] = useState([])
  const navigate = useNavigate()
  // console.log(id);
  const { BaseUrl, access_token } = data;
  const { fullDots, crossCloseIcon } = allImagesList;
  const {
    pointsdetails,
    setPointsdetails,
    navigateHome,
    clientEmail,
    setClientEmail,
    shareEmail,
    openShareModal,
    setOpenShareModal,
    emailCheck,
    shareEmailFormat,
    sharedMOMWithEmail,
    getSingleMOMApiData,
    getClientProject,
    makeMonthFormat,
    designerName,
    setDesignerName,
    designerLocation,
    setDesignerLocation,
    designerStatus,
    setDesignerStatus,
    // navigateNewMOM
  } = useContext(MomContext);
  ///-----highlight the match point text---///
  const highlightPoints = () => {
    let textToSearch = document.getElementById("search-bar").value;
    let allpointslist = document.getElementsByClassName("points-area");
    let special = /[\\[{().+*?|^$]/g;
    if (textToSearch !== "") {
      if (special.test(textToSearch)) {
        textToSearch = textToSearch.replace(special, "\\$&");
      }
      let regexp = new RegExp(textToSearch, "gi");
      for (let i = 0; i < allpointslist.length; i++) {
        allpointslist[i].innerHTML = allpointslist[i].textContent.replace(
          regexp,
          "<mark classname='match-text'>$&</mark>"
        );
      }
    } else {
      for (let i = 0; i < allpointslist.length; i++) {
        allpointslist[i].innerHTML = allpointslist[i].textContent;
      }
    }
  };

  ///---read the mom and edit it---///
  async function getReadMOM() {
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
      getSingleMOMApiData(id)
        .then((res) => {
          setPointsdetails(
            res?.data?.momData[0]
          );
          setShareIconsent(res.data.momData[0].isDraft)
          setSharedMomEmail(res.data.momData[0].sharedWith)
        })
        .catch((error) => {
          console.error(error);
        });
      ///----read mom ----///
      getReadMOM()
        .then((response) => {
          if (response.status === 200) {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //---get client name from client data----///
    getClientProject(projectId)
      .then((res) => {
        setClientEmail(res.data.projects[0].clientId.email);
        setDesignerName(res.data.projects[0].name)
        setDesignerLocation(res.data.projects[0].location)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  ///----bullet points -----////
  const bullet = "\u2022";
  return (
    <>
      <div className="d-flex-col width-95 margin-left-3">
        {/* share mom modal */}
        {openShareModal && (
          <div className="main-modal-wrapper">
            <div className="modal-wrapper position-relative">
              <div className="content">
                <p className="notice-text">Email</p>
                <img
                  className="position-absolute close-icon"
                  onClick={() => setOpenShareModal(false)}
                  src={crossCloseIcon}
                  alt="cross-icon"
                />
                <input
                  type="text"
                  className="border-df bg-color-fa padding-5 border-radius-4 width-100"
                  placeholder="Email"
                  value={shareEmail}
                  onChange={(e) => shareEmailFormat(e)}
                />
              </div>
              {emailCheck && (
                <div
                  style={{ color: "red", fontSize: "10px", paddingLeft: "7px" }}
                >
                  Email isn't valid
                </div>
              )}
              <div className="actions">
                <div
                  className="ui button submit-btn"
                  onClick={() => sharedMOMWithEmail(projectId, id)}
                >
                  Submit
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="d-flex font-weight-500 small-font-10 width-fit-content justify-between align-center margin-top-10">
          <div id="ids" className="small-font-10 color-text-888888">
            {designerName}
          </div>
          <span className="d-flex align-center small-font-12 color-text-888888">
            <FiChevronRight />
          </span>
          <div
            className="small-font-9 font-weight-500 color-text-888888 cursor-pointer"
            onClick={() => navigateHome(projectId)}
          >
            MOM
          </div>
          <span className="d-flex align-center small-font-12 color-text-888888">
            <FiChevronRight />
          </span>
          <div className="color-text">{pointsdetails?.title}</div>
        </div>
        <div className="momHead-wrapper d-flex justify-between align-center">
          <div className="d-flex width-42 align-center justify-between">
            <div className="mom-head font-w-500">Minutes of Meetings</div>
            <div className="ui fluid category search">
              <div style={{ width: "16rem" }} className="ui icon input">
                <input
                  style={{ borderRadius: "4px" }}
                  className="prompt"
                  id="search-bar"
                  type="text"
                  placeholder="Search Text"
                  onChange={(e) => highlightPoints(e)}
                />
                <i
                  style={{
                    fontWeight: "300",
                    fontSize: "14px",
                    opacity: "0.5",
                  }}
                  className="search icon"
                ></i>
              </div>
              <div className="results"></div>
            </div>
          </div>
          <Link to={`/newmom/${projectId}`}>
            <button className="mom-btn"
            // onClick={navigateNewMOM(projectId)}
            >Create a MOM</button>
          </Link>
        </div>
        <div className="d-flex-col">
          <div className="d-flex align-center">
            <div className="points-field font-size-18 font-weight-400">
              {pointsdetails?.title}
            </div>
            <div style={{ marginLeft: "5px" }}>
              {!shareIconsent && <HiOutlineShare
                className="color-text-888888"
                onClick={() => setOpenShareModal(true)}
              />}
            </div>
          </div>
          <div className="d-flex justify-between width-91">
            <div style={{ margin: "5px 0" }} className="color-text-888888">
              {pointsdetails?.date &&
                `${pointsdetails?.date?.substring(8, 10)} ${makeMonthFormat(pointsdetails?.date?.substring(5, 7))
                } ${pointsdetails?.date?.substring(0, 4)}`}
              <img
                style={{ margin: "0 5px" }}
                src={fullDots}
                alt="fullpoints"
              />
              {pointsdetails?.location}
            </div>
            <div className="d-flex justify-between width-fit-content">
              <div className="color-text-888888">{pointsdetails?.category}</div>
              <div style={{ marginLeft: "40px" }}>Share With</div>
            </div>
          </div>
          <div
            style={{ width: "80.1%", marginTop: "0" }}
            className="ui divider"
          ></div>
          <div className="d-flex justify-between width-95">
            <div
              name="points"
              className="points-container-field border-none width-84"
            >
              {pointsdetails &&
                pointsdetails?.points
                  ?.filter((elem) => elem !== " \n")
                  .map((elem, index) => {
                    return (
                      <div key={index} className="d-flex divider-margin-5">
                        <span className="points-counter">{bullet}</span>
                        <div
                          name="points-text"
                          className="points-area text-align-justify"
                        >
                          {elem?.substring(1)}
                        </div>
                      </div>
                    );
                  })}
            </div>
            <div className="share-with-wrapper padding-left-10">
              <div style={{ width: "104px" }} className="ui divider"></div>
              <div className="d-flex-col align-left justify-between word-break">
                {shareIconsent && <div style={{ width: "160%" }}>{clientEmail}</div>}
                {!shareIconsent && sharedMomEmail?.map((email, i) => {
                  return (
                    <div style={{ width: "160%" }} key={i}>{email}</div>
                  )
                })}
                {/* {shareEmail && <div>{shareEmail}</div>} */}
                {!shareIconsent && <div
                  className="color-text d-flex align-center width-fit-content cursor-pointer"
                  onClick={() => setOpenShareModal(true)}
                >
                  <AiFillPlusCircle /> Add Members
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InnerPageMom;
