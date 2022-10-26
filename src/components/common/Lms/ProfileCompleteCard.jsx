import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllotedLeads } from "./Actions";
import FreeLeadCard from "./FreeLeadCard";
import waitingPic from "./Images/waiting.png";

const ProfileCompleteCard = (props) => {
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state.addToCartReducer.projectList);
  const allotedLeads = useSelector((state) => state.addToCartReducer.allotedLeads);
  const profileData = useSelector((state) => state.addToCartReducer.profileData);

  if (allotedLeads.length > 0) {
    var allotedLeadsArray = allotedLeads[0].data.data.data;
  } else {
    var allotedLeadsArray = [];
  }
  useEffect(() => {
    dispatch(fetchAllotedLeads(props.authTok, 1, 0));
  }, []);
  return (
    <React.Fragment>
      {/* {allotedLeads[0]?.data?.data?.data.length > 0 ? (
        allotedLeadsArray.map((currEle, index) => {
          return <FreeLeadCard key={currEle._id} data={currEle} leadStatus={allotedLeads[0].data.data.data[0].leadStatus} authTok={props.authTok} leadId={currEle._id} reLeadStatus={1} rePageNum={0} />;
        })
      ) : (
        <div className="profileCompleteBanner">
          <h4>Congratulations, your profile is complete! </h4>
          <p>
            You will soon receive 2 Client <br /> Queries through your Free Plan.
          </p>
          <img src={waitingPic} alt="" />
        </div>
      )} */}

      {projectData[0]?.data?.data?.count > 0 ? (
        allotedLeads[0]?.data?.data?.data?.length > 0 ? (
          allotedLeads[0].data.data.data.map((currEle, index) => {
            return (
              <FreeLeadCard
                key={currEle._id}
                data={currEle}
                leadSource={currEle?.data?.data?.data?.leadSource}
                leadStatus={allotedLeads[0].data.data.data[0].leadStatus}
                authTok={props.authTok}
                leadId={currEle._id}
                reLeadStatus={1}
                rePageNum={0}
              />
            );
          })
        ) : (
          <div className="profileCompleteBanner">
            <h4>Congratulations, your profile is complete! </h4>
            <p>Buy as many leads as you want, or upgrade to premium for leads</p>
            <img src={waitingPic} alt="" />
          </div>
        )
      ) : allotedLeads[0]?.data?.data?.data?.length > 0 ? (
        <React.Fragment>
          <div className="banner mb-2">
            <h2 style={{ fontWeight: "600", color: "#176091" }}>Hi {profileData[0]?.data?.data?.companyName}! Your Profile is incomplete.</h2>
            <p style={{ color: "#176091" }}>Complete your profile and make a powerful listing.</p>
            <button>
              <Link style={{ paddingLeft: "0.7rem", paddingRight: "0.7rem", display: "flex", color: "white", textDecoration: "none" }} to="/myprofile">
                Complete Now
              </Link>
            </button>
          </div>
          {allotedLeads[0].data.data.data.map((currEle, index) => {
            return (
              <FreeLeadCard
                key={currEle._id}
                data={currEle}
                leadSource={currEle?.leadSource}
                leadStatus={allotedLeads[0].data.data.data[0].leadStatus}
                authTok={props.authTok}
                leadId={currEle._id}
                reLeadStatus={1}
                rePageNum={0}
              />
            );
          })}
        </React.Fragment>
      ) : (
        <div className="banner mb-2">
          <h2 style={{ fontWeight: "600", color: "#176091" }}>Hi {profileData[0]?.data?.data?.companyName}! Your Profile is incomplete.</h2>
          <p style={{ color: "#176091" }}>
            Complete your profile to unlock <br />
            <span style={{ fontWeight: "600" }}>Free Access to Client Queries</span>
          </p>
          <button>
            <Link style={{ paddingLeft: "0.7rem", paddingRight: "0.7rem", display: "flex", color: "white", textDecoration: "none" }} to="/myprofile">
              Complete Now
            </Link>
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProfileCompleteCard;
