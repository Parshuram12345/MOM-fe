import React, { useEffect, useState } from "react";
import NotificationsIcon from "../Images/notificationIcon.svg";
import ProfilePic from "../Images/sidebarOpen.svg";
import GreenTick from "../Lms/Images/GreenTick.png";
import "../Lms/lms.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addLeadsToCart, addToCart, buyLead, deleteLeadFromCart, fetchAllotedLeads, fetchLeads, fetchLeadsInCart, fetchProfileData, fetchUserProjects } from "./Actions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ProfileCompleteCard from "./ProfileCompleteCard";
import ActiveBucket from "./ActiveBucket";
import FollowUpBucket from "./FollowUpBucket";
import MeetingBucket from "./MeetingBucket";
import { handleLogout } from "../Redux/Actions/auth";
import BottomNav from "./BottomNav";
import EstimateSentBucket from "./EstimateSentBucket";
import SignedUpBucket from "./SignedUpBucket";
import SnoozedBucket from "./SnoozedBucket";
import ArchivedBucket from "./ArchivedBucket";
import BuyLeadsCard from "./BuyLeadsCard";
import SidebarNav from "./SidebarNav";
import { confirmAlert } from "react-confirm-alert";
import HomepageWeb from "./LmsWebComponents/HomepageWeb";
import axios from "axios";

export default function HomePage() {
  const path = useLocation();
  // console.log(path)
  const [showSidebar, setShowSidebar] = useState(false);
  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const [limit, setLimit] = useState(100);
  const [showWarning, setShowWarning] = useState(true);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  // const authTok = store.getState().auth.accessToken ? `Bearer ${store.getState().auth.accessToken}` : "";
  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";

  const leadsData = useSelector((state) => state.addToCartReducer.leads);

  const profileData = useSelector((state) => state.addToCartReducer.profileData);
  console.log(profileData);
  if (profileData.length > 0) {
    var profileName = profileData[0]?.data?.data?.companyName;
    var userType = profileData[0].data.data.type === 1 ? "Interior Designer" : "Contractor";
    var planType = profileData[0]?.data?.data?.planId.name;
  } else {
    var profileName = "N/A";
  }

  // var cartItemNumber = leadsInCartArray[0].data.data.leadCount;

  //all lead bucket controls here
  const [leadBucket, setLeadBucket] = useState("new");

  //alloted leads and related things under here
  useEffect(() => {
    dispatch(fetchAllotedLeads(authTok, 1, 0));
  }, [authTok, dispatch]);

  useEffect(() => {
    if (localStorage.getItem("token") === null || localStorage.getItem("token") == "null") {
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("sessionExpire", true);
      navigateTo("/");
    }
  }, []);

  const allotedLeads = useSelector((state) => state.addToCartReducer.allotedLeads);
  // console.log(allotedLeads);
  if (allotedLeads.length > 0) {
    var numOfNewAllotedLeads = allotedLeads[0].data.data.new;
    var numOfActiveLeads = allotedLeads[0].data.data.active;
    var numOfFollowUpLeads = allotedLeads[0].data.data.followUp;
    var numOfMeetingLeads = allotedLeads[0].data.data.meetingSchedule;
    var numOfEstimateLeads = allotedLeads[0].data.data.estimateSent;
    var numOfSignedLeads = allotedLeads[0].data.data.signedUp;
    var numOfSnoozedLeads = allotedLeads[0].data.data.snooze;
    var numOfArchivedLeads = allotedLeads[0].data.data.archive;
  } else {
    var numOfNewAllotedLeads = 0;
    var numOfActiveLeads = 0;
    var numOfFollowUpLeads = 0;
    var numOfMeetingLeads = 0;
    var numOfEstimateLeads = 0;
    var numOfSignedLeads = 0;
    var numOfSnoozedLeads = 0;
    var numOfArchivedLeads = 0;
  }

  if (leadsData.length > 0) {
    var buyableLeads = leadsData[0].data.data;
  } else {
    var buyableLeads = [];
  }

  const projectData = useSelector((state) => state.addToCartReducer.projectList);
  const projectList = projectData[0]?.data?.data?.count;

  useEffect(() => {
    dispatch(fetchLeads(authTok, limit));
  }, [limit, authTok, dispatch]);
  useEffect(() => {
    dispatch(fetchUserProjects(authTok));
    dispatch(fetchProfileData(authTok));
  }, [authTok, dispatch]);

  useEffect(() => {
    document.getElementById("horizontal-scroll").addEventListener("mousewheel", scrollHorizontally, false);
  }, []);
  function scrollHorizontally(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    document.getElementById("horizontal-scroll").scrollLeft -= delta * 40;
    e.preventDefault();
  }

  const logoutHandler = () => {
    setShowSidebar(false);
    confirmAlert({
      message: `Are you sure you want to logout?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(handleLogout()),
        },
        {
          label: "No",
        },
      ],
    });
  };

  useEffect(async () => {
    const res = await axios.post(
      "https://pro-api.idesign.market/user/updateLogin",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authTok,
        },
      }
    );
  }, []);

  return (
    <React.Fragment>
      <div className="d-flex d-md-none">
        <div className="homepageFull">
          <SidebarNav sidebarShow={showSidebar} sidebarClose={closeSidebar} sidebarLogout={logoutHandler} />

          <div className="main-homeContainer">
            <div className="home-header">
              <div className="header-part1">
                <div
                  className="headerProfilePic"
                  onClick={() => {
                    setShowSidebar(true);
                  }}
                >
                  <img src={ProfilePic} alt="" />
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "600" }} className="d-flex align-items-center">
                      {profileName}
                    </div>
                    <div style={{ fontSize: "10px", fontWeight: "500" }} className="homepage-header-plantype d-flex align-items-center">
                      {planType === "Free" ? planType : "Premium"} Plan
                    </div>
                  </div>
                </div>
                <div className="serach-notification-cart d-flex justify-content-end">
                  {/* <button className="b">
              <img src={SearchIcon} alt="" />
            </button> */}
                  <button className="b">
                    <img src={NotificationsIcon} alt="" />
                  </button>
                  {/* <Link to="/mycart">
              {" "}
              <button className="b">
                <img src={CartIcon} alt="" />
              </button>{" "}
            </Link> */}
                </div>
              </div>
              <div className="header-part2">
                <div className={`leadss ${leadBucket === "new" ? "active-bucket" : null}`} onClick={() => setLeadBucket("new")}>
                  Lead
                </div>
                <div id="horizontal-scroll" className="lead-actions">
                  <div className={`leadTabs d-flex ${leadBucket === "active" ? "active-bucket" : null}`} onClick={() => setLeadBucket("active")}>
                    Active{numOfActiveLeads === 0 ? null : <div className="lead-controls-badge">{numOfActiveLeads}</div>}
                  </div>
                  <div className={`leadTabs d-flex ${leadBucket === "followup" ? "active-bucket" : null}`} onClick={() => setLeadBucket("followup")}>
                    Follow Up{numOfFollowUpLeads === 0 ? null : <div className="lead-controls-badge">{numOfFollowUpLeads}</div>}
                  </div>
                  <div className={`leadTabs d-flex ${leadBucket === "meeting" ? "active-bucket" : null}`} onClick={() => setLeadBucket("meeting")}>
                    Meeting Scheduled{numOfMeetingLeads === 0 ? null : <div className="lead-controls-badge">{numOfMeetingLeads}</div>}
                  </div>
                  <div className={`leadTabs d-flex ${leadBucket === "estimate" ? "active-bucket" : null}`} onClick={() => setLeadBucket("estimate")}>
                    Estimate Sent{numOfEstimateLeads === 0 ? null : <div className="lead-controls-badge">{numOfEstimateLeads}</div>}
                  </div>
                  <div className={`leadTabs d-flex ${leadBucket === "signed" ? "active-bucket" : null}`} onClick={() => setLeadBucket("signed")}>
                    Signed Up{numOfSignedLeads === 0 ? null : <div className="lead-controls-badge">{numOfSignedLeads}</div>}
                  </div>
                  <div className={`leadTabs d-flex ${leadBucket === "snoozed" ? "active-bucket" : null}`} onClick={() => setLeadBucket("snoozed")}>
                    Snoozed{numOfSnoozedLeads === 0 ? null : <div className="lead-controls-badge">{numOfSnoozedLeads}</div>}
                  </div>
                  <div className={`leadTabs d-flex ${leadBucket === "archived" ? "active-bucket" : null}`} onClick={() => setLeadBucket("archived")}>
                    Archived{numOfArchivedLeads === 0 ? null : <div className="lead-controls-badge">{numOfArchivedLeads}</div>}
                  </div>
                </div>
              </div>
            </div>

            {leadBucket === "new" ? (
              <React.Fragment>
                <div className="numberOfNewQueries h">NEW QUERIES{`${numOfNewAllotedLeads > 0 ? `(${numOfNewAllotedLeads})` : ""}`}</div>

                {/* {numOfNewAllotedLeads === 1 && (
                  <div className={`queriesLeftReminder ${showWarning ? null : "d-none"}`}>
                    <div style={{ fontSize: "12px", fontWeight: "600", paddingLeft: "24px" }}>
                      1 free query left, buy our premium plan to <br /> increase visibity and get more queries
                    </div>
                    <button
                      className="cancel"
                      onClick={() => {
                        setShowWarning(false);
                      }}
                    >
                      <img style={{ opacity: "0.5" }} src={closeIt} />
                    </button>
                    <button className="buyNow" style={{ padding: "4px 12px 4px 12px" }} onClick={() => navigateTo("/plans")}>
                      Buy Now
                    </button>
                  </div>
                )} */}

                <ProfileCompleteCard authTok={authTok} />

                {/* {projectList > 0 ? null : (
                  <div className="banner mb-2">
                    <h2 style={{ fontWeight: "600", color: "#176091" }}>Hi {profileName}! Your Profile is incomplete.</h2>
                    <p style={{ color: "#176091" }}>
                      Complete your profile to unlock <br />
                      <span style={{ fontWeight: "600" }}>Free Access to Client Queries</span>
                    </p>
                    <button>
                      <Link style={{ paddingLeft: "0.7rem", paddingRight: "0.7rem", display: "flex", color: "white", textDecoration: "none" }} to="/myprofile">
                        Complete Now
                      </Link>
                    </button>
                  </div>)} */}
              </React.Fragment>
            ) : leadBucket === "active" ? (
              <ActiveBucket />
            ) : leadBucket === "followup" ? (
              <FollowUpBucket />
            ) : leadBucket === "meeting" ? (
              <MeetingBucket />
            ) : leadBucket === "estimate" ? (
              <EstimateSentBucket />
            ) : leadBucket === "signed" ? (
              <SignedUpBucket />
            ) : leadBucket === "snoozed" ? (
              <SnoozedBucket />
            ) : leadBucket === "archived" ? (
              <ArchivedBucket />
            ) : null}

            {projectList > 0 && (
              <div className="unlimitedQueryNotification">
                <div style={{ fontSize: "12px" }}>You will continue to receive unlimited direct queries from customer visiting your profile</div>
                <div className="greenTick">
                  <img src={GreenTick} alt="" />
                </div>
              </div>
            )}

            {leadBucket === "new" && (
              <React.Fragment>
                <div style={buyableLeads.length < 1 ? { marginBottom: "5rem" } : { marginTop: "30px" }} className="numberOfNewQueries h">
                  BUY MORE LEADS
                </div>
                {buyableLeads.map((ele, i) => {
                  const firstLetter = ele?.name.split(" ")[0].split("")[0].toUpperCase();
                  {
                    /* { */
                  }
                  /* const secondLetter = ele?.name.split(" ") === undefined ? "" : ele?.name.split(" ")[1].split("")[0].toUpperCase(); */
                  {
                    /* } */
                  }
                  const secondLetter = ele?.name.trim().split(" ").length > 1 ? ele?.name.trim().split(" ")[ele.name.trim().split(" ").length - 1].split("")[0].toUpperCase() : "";
                  const initials = firstLetter + secondLetter;
                  return <BuyLeadsCard data={ele} initials={initials} />;
                })}
                {buyableLeads.length < 100 ? (
                  <div style={{ marginBottom: "9rem" }}></div>
                ) : (
                  <div className="w-100 d-flex justify-content-center p-3 view-more-button">
                    <button
                      style={{ marginBottom: "7rem" }}
                      onClick={() => {
                        setLimit(limit + 100);
                      }}
                    >
                      View More
                    </button>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
          <BottomNav path={path} />
        </div>
      </div>
      <div className="d-none d-md-block">
        <HomepageWeb />
      </div>
    </React.Fragment>
  );
}
