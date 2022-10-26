import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllotedLeads, fetchAllotedLeadsWeb } from "../Actions";
import waitingPic from "../Images/waiting.png";
import ProfileIncomplete from "./ProfileIncomplete";
import WebFreeLeadCard from "./WebFreeLeadCard";
import greenTick from "../../Images/greenTickIcon.svg";

const WebProfileCompleteCard = (props) => {
  const dispatch = useDispatch();
  const allotedLeads = useSelector((state) => state.addToCartReducer.allotedLeadsWeb);
  if (allotedLeads?.length > 0) {
    var allotedLeadsArray = allotedLeads[0]?.data?.data?.data;
  } else {
    var allotedLeadsArray = [];
  }
  const projectData = useSelector((state) => state.addToCartReducer.projectList);
  const projectList = projectData[0]?.data?.data?.count;

  const profileData = useSelector((state) => state.addToCartReducer.profileData);
  useEffect(() => {
    dispatch(fetchAllotedLeadsWeb(props.authTok, 1, 0));
  }, []);
  return (
    <React.Fragment>
      {projectList > 0 ? (
        allotedLeadsArray?.length > 0 ? (
          <React.Fragment>
            <div>
              <div className="d-flex" style={{ padding: "1rem 0", width: "100%", justifyContent: "space-evenly" }}>
                <div className="leadCardData-heading">Client</div>
                <div className="leadCardData-heading">City</div>
                <div className="leadCardData-heading">Date</div>
                <div className="leadCardData-heading">Budget</div>
                <div className="leadCardData-heading">Work Type</div>
                <div className="leadCardData-heading">Action</div>
                <div className="leadCardData-heading">Status</div>
              </div>
            </div>
            <div style={{ height: "42vh", overflow: "scroll" }}>
              {allotedLeadsArray.map((currEle, index) => {
                return (
                  <WebFreeLeadCard
                    key={currEle._id}
                    data={currEle}
                    leadStatus={allotedLeads[0].data.data.data[0].leadStatus}
                    authTok={props.authTok}
                    leadId={currEle._id}
                    reLeadStatus={1}
                    rePageNum={0}
                  />
                );
              })}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3" style={{ backgroundColor: "#E1F0FB", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "12px", fontWeight: "500" }}>You will continue to receive unlimited direct queries from customer visiting your profile</div>
              <div><img style={{ height: "26px" }} src={greenTick} /></div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "16px", backgroundColor: "#FFFFFF", padding: "16px" }}>
              <div>
                <div style={{ fontSize: "18px", fontWeight: "700" }}>Congratulations, your profile is complete! </div>
                <div style={{ fontSize: "14px", fontWeight: "400", color: "rgba(136, 136, 136, 1)" }}>
                  You will soon receive 2 Client Queries through your Plan.
                </div>
              </div>
              <div>
                <img src={waitingPic} alt="" />
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3" style={{ backgroundColor: "#E1F0FB", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "12px", fontWeight: "500" }}>You will continue to receive unlimited direct queries from customer visiting your profile</div>
              <div><img style={{ height: "26px" }} src={greenTick} /></div>
            </div>
          </React.Fragment>
        )
      ) : allotedLeadsArray?.length > 0 ? (
        <React.Fragment>
          <div>
            <div className="d-flex justify-content-around" style={{ marginLeft: "16px", padding: "1rem 0" }}>
              <div className="leadCardData-heading">Client Name</div>
              <div className="leadCardData-heading">City</div>
              <div className="leadCardData-heading">Date</div>
              <div className="leadCardData-heading">Budget</div>
              <div className="leadCardData-heading">Work Type</div>
              <div className="leadCardData-heading">Action</div>
              <div className="leadCardData-heading">Status</div>
            </div>
          </div>
          <div>
            <div className="banner mb-2 mt-0">
              <h2 style={{ fontWeight: "600", color: "#176091" }}>Hi {profileData[0]?.data?.data?.companyName}! Your Profile is incomplete.</h2>
              <div className="d-flex">
                <div style={{ color: "#176091", fontSize: "12px" }}>
                  Complete your profile to unlock <br />
                  <span style={{ fontWeight: "600" }}>Free Access to Client Queries</span>
                </div>
                <div className="ms-3">
                  <button style={{ fontSize: "12px", height: "25px", padding: "0 16px" }}>
                    <Link style={{ display: "flex", color: "white", textDecoration: "none" }} to="/myprofile">
                      Complete Now
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div style={{height: "33vh", overflow: "scroll"}}>
            {allotedLeadsArray.map((currEle, index) => {
              return (
                <WebFreeLeadCard key={currEle._id} data={currEle} leadStatus={allotedLeads[0].data.data.data[0].leadStatus} authTok={props.authTok} leadId={currEle._id} reLeadStatus={1} rePageNum={0} />
              );
            })}
          </div>
        </React.Fragment>
      ) : (
        <ProfileIncomplete />
      )}
    </React.Fragment>
  );
};

export default WebProfileCompleteCard;
