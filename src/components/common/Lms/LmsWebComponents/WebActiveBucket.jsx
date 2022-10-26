import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllotedLeads, fetchAllotedLeadsWeb } from "../Actions";
import { getToken } from "../getToken";
import WebFreeLeadCard from "./WebFreeLeadCard";

const WebActiveBucket = () => {
  const dispatch = useDispatch();
  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem('token')}` : "";
  const activeLeads = useSelector((state) => state.addToCartReducer.allotedLeadsWeb);
  if (activeLeads.length > 0) {
    var allotedLeadsArray = activeLeads[0].data.data.data;
  } else {
    var allotedLeadsArray = [];
  }
  useEffect(() => {
    dispatch(fetchAllotedLeadsWeb(authTok, 8, 0));
  }, []);
  return (
    <React.Fragment>
      <div className="d-flex flex-column">
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
        <div>
          {allotedLeadsArray.map((curElem) => {
            return (
              <WebFreeLeadCard key={curElem._id} data={curElem} leadStatus={activeLeads[0]?.data?.data?.data[0]?.leadStatus} authTok={authTok} leadId={curElem._id} reLeadStatus={8} rePageNum={0} />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default WebActiveBucket;
