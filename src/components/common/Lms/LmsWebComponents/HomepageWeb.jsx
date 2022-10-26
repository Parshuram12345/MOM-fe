import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BuyLeadsCard from "../BuyLeadsCard";
import WebBuyLeadsCard from "./WebBuyLeadsCard";
import ProfileIncomplete from "./ProfileIncomplete";
import WebActiveBucket from "./WebActiveBucket";
import WebFollowUpBucket from "./WebFollowUpBucket";
import WebMeetingBucket from "./WebMeetingBucket";
import WebEstimateSentBucket from "./WebEstimateSentBucket";
import WebSignedUpBucket from "./WebSignedUpBucket";
import WebSnoozedBucket from "./WebSnoozedBucket";
import WebArchivedBucket from "./WebArchivedBucket";
import ProfileCompleteCard from "../ProfileCompleteCard";
import { getToken } from "../getToken";
import { Link } from "react-router-dom";
import WebProfileCompleteCard from "./WebProfileCompleteCard";
import SideBarWeb from "./SideBarWeb";
import HeaderNav from "./HeaderNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomepageWeb = () => {
  const authTok = localStorage.getItem("token") ? getToken() : "";
  const leadsData = useSelector((state) => state.addToCartReducer.leads);
  const [leadBucket, setLeadBucket] = useState("newWeb");
  const allotedLeads = useSelector((state) => state.addToCartReducer.allotedLeadsWeb);
  const navigateTo = useNavigate();
  // console.log(allotedLeads);
  if (allotedLeads) {
    var numOfNewAllotedLeads = allotedLeads[0]?.data?.data?.new;
    var numOfActiveLeads = allotedLeads[0]?.data?.data?.active;
    var numOfFollowUpLeads = allotedLeads[0]?.data?.data?.followUp;
    var numOfMeetingLeads = allotedLeads[0]?.data?.data?.meetingSchedule;
    var numOfEstimateLeads = allotedLeads[0]?.data?.data?.estimateSent;
    var numOfSignedLeads = allotedLeads[0]?.data?.data?.signedUp;
    var numOfSnoozedLeads = allotedLeads[0]?.data?.data?.snooze;
    var numOfArchivedLeads = allotedLeads[0]?.data?.data?.archive;
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
  const projectData = useSelector((state) => state.addToCartReducer.projectList);
  const projectList = projectData[0]?.data?.data?.count;

  const profileData = useSelector((state) => state.addToCartReducer.profileData);
  if (profileData.length > 0) {
    var profileName = profileData[0].data.data.companyName;
    var userType = profileData[0].data.data.type === 1 ? "Interior Designer" : "Contractor";
    var planType = profileData[0].data.data.planId.name;
  } else {
    var profileName = "N/A";
  }

  useEffect(() => {
    document.getElementById("horizontal-scrollweb").addEventListener("mousewheel", scrollHorizontally, false);
  }, []);
  function scrollHorizontally(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    document.getElementById("horizontal-scrollweb").scrollLeft -= delta * 40;
    e.preventDefault();
  }
  useEffect(() => {
    localStorage.setItem("from", "null");
  }, [])

  useEffect(()=>{
    if (localStorage.getItem("token") === null || localStorage.getItem("token") == "null") {
      document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("sessionExpire", true)
        navigateTo('/')
    }
  },[])

  useEffect(async () => {
    const res = await axios.post("https://pro-api.idesign.market/user/updateLogin", {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authTok
      }
    })
  }, [])

  return (
    <React.Fragment>
      <div style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <HeaderNav/>

        <div className="d-flex" style={{ height: "90vh" }}>
          <SideBarWeb/>
          <div className="d-flex justify-content-between" style={{ padding: "0 0 0 24px", width: "78vw" }}>
            <div style={{ fontSize: "20px", fontWeight: "600", width: "65%" }}>
              <div style={{ marginBottom: "2.5rem", paddingTop: "24px" }}>Lead Management</div>
              <div style={{ overflowX: "scroll" }} className="allLeadAction-container">
                <div className="header-part2" style={{ width: "100%", marginBottom: "1rem" }}>
                  <div className={`leadss ${leadBucket === "newWeb" ? "active-bucket" : "inactive-bucket"}`} onClick={() => setLeadBucket("newWeb")}>
                    Lead
                  </div>
                  <div id="horizontal-scrollweb" className="lead-actions" style={{ width: "44vw" }}>
                    <div className={`leadTabs d-flex ${leadBucket === "activeWeb" ? "active-bucket" : "inactive-bucket"}`} onClick={() => setLeadBucket("activeWeb")}>
                      Active{numOfActiveLeads === 0 ? null : <div className="lead-controls-badge">{numOfActiveLeads}</div>}
                    </div>
                    <div className={`leadTabs d-flex ${leadBucket === "followupWeb" ? "active-bucket" :"inactive-bucket"}`} onClick={() => setLeadBucket("followupWeb")}>
                      Follow Up{numOfFollowUpLeads === 0 ? null : <div className="lead-controls-badge">{numOfFollowUpLeads}</div>}
                    </div>
                    <div className={`leadTabs d-flex ${leadBucket === "meetingWeb" ? "active-bucket" : "inactive-bucket"}`} onClick={() => setLeadBucket("meetingWeb")}>
                      Meeting Scheduled{numOfMeetingLeads === 0 ? null : <div className="lead-controls-badge">{numOfMeetingLeads}</div>}
                    </div>
                    <div className={`leadTabs d-flex ${leadBucket === "estimateWeb" ? "active-bucket" : "inactive-bucket"}`} onClick={() => setLeadBucket("estimateWeb")}>
                      Estimate Sent{numOfEstimateLeads === 0 ? null : <div className="lead-controls-badge">{numOfEstimateLeads}</div>}
                    </div>
                    <div className={`leadTabs d-flex ${leadBucket === "signedWeb" ? "active-bucket" : "inactive-bucket"}`} onClick={() => setLeadBucket("signedWeb")}>
                      Signed Up{numOfSignedLeads === 0 ? null : <div className="lead-controls-badge">{numOfSignedLeads}</div>}
                    </div>
                    <div className={`leadTabs d-flex ${leadBucket === "snoozedWeb" ? "active-bucket" : "inactive-bucket"}`} onClick={() => setLeadBucket("snoozedWeb")}>
                      Snoozed{numOfSnoozedLeads === 0 ? null : <div className="lead-controls-badge">{numOfSnoozedLeads}</div>}
                    </div>
                    <div className={`leadTabs d-flex ${leadBucket === "archivedWeb" ? "active-bucket" : "inactive-bucket"}`} onClick={() => setLeadBucket("archivedWeb")}>
                      Archived{numOfArchivedLeads === 0 ? null : <div className="lead-controls-badge">{numOfArchivedLeads}</div>}
                    </div>
                  </div>
                  <div className="d-none align-items-center" style={{borderBottom: "1px solid #888888"}}>
                    <div style={{ fontSize: "12px", borderLeft: "1px solid grey", paddingLeft: "8px" }}>Sort By:</div>
                    <div className="d-flex align-items-center">
                      <select style={{ fontSize: "16px" }}>
                        <option value="abc">abc</option>
                        <option value="abc">abc</option>
                        <option value="abc">abc</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="profileIncomplete-web-container">
                {leadBucket === "newWeb" ? (
                  <React.Fragment>
                    {/* <div className="numberOfNewQueries h">NEW QUERIES{`${numOfNewAllotedLeads > 0 ? `(${numOfNewAllotedLeads})` : ""}`}</div> */}
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
                    
                    <WebProfileCompleteCard authTok={authTok} />
                  </React.Fragment>
                ) : leadBucket === "activeWeb" ? (
                  <WebActiveBucket />
                ) : leadBucket === "followupWeb" ? (
                  <WebFollowUpBucket />
                ) : leadBucket === "meetingWeb" ? (
                  <WebMeetingBucket />
                ) : leadBucket === "estimateWeb" ? (
                  <WebEstimateSentBucket />
                ) : leadBucket === "signedWeb" ? (
                  <WebSignedUpBucket />
                ) : leadBucket === "snoozedWeb" ? (
                  <WebSnoozedBucket />
                ) : leadBucket === "archivedWeb" ? (
                  <WebArchivedBucket />
                ) : null}
              </div>

            </div>
            <div className="buyLeadsSidebar" style={{ width: "33%", paddingLeft: "1rem", borderLeft: "1px solid #DFDFDF" }}>
              <div className="d-flex flex-column" style={{ height: "100%" }}>
                <div style={{ fontSize: "20px", fontWeight: "600", paddingTop: "24px" }}>Buy More Leads</div>
                <div className="webBuyLeadContainer">
                  {leadsData[0]?.data?.data.map((ele, i) => {
                    const firstLetter = ele?.name.split(" ")[0].split("")[0].toUpperCase();
                    const secondLetter = ele?.name.trim().split(" ").length > 1 ? ele?.name.trim().split(" ")[ele.name.trim().split(" ").length - 1].split("")[0].toUpperCase() : "";
                    const initials = firstLetter + secondLetter;
                    return <WebBuyLeadsCard data={ele} initials={initials} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomepageWeb;
