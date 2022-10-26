import React, { useEffect } from "react";
import { fetchAllotedLeads } from "./Actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FreeLeadCard from "./FreeLeadCard";
import { getToken } from "./getToken";

const FollowUpBucket = () => {
  const dispatch = useDispatch();
  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem('token')}` : "";
  useEffect(() => {
    dispatch(fetchAllotedLeads(authTok, 2, 0));
  }, [authTok, dispatch]);
  const followUpLeads = useSelector((state) => state.addToCartReducer.allotedLeads);
  if (followUpLeads.length > 0) {
    var allotedLeadsArray = followUpLeads[0].data.data.data;
  } else {
    var allotedLeadsArray = [];
  }

  return (
    <React.Fragment>
      <div className="bucket-container">
        <div className="bucketContent">
          {allotedLeadsArray.map((curElem) => {
            return <FreeLeadCard key={curElem._id} data={curElem} leadStatus={followUpLeads[0].data.data.data[0].leadStatus} authTok={authTok} leadId={curElem._id} reLeadStatus={2} rePageNum={0} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default FollowUpBucket;
