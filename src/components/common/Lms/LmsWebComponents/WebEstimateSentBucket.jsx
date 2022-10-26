import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchAllotedLeads, fetchAllotedLeadsWeb } from "../Actions";
import FreeLeadCard from "../FreeLeadCard";
import { getToken } from "../getToken";
import WebFreeLeadCard from "./WebFreeLeadCard";

const EstimateSentBucket = () => {
  const dispatch = useDispatch();
  const authTok = localStorage.getItem("token") ? getToken() : "";
  useEffect(() => {
    dispatch(fetchAllotedLeadsWeb(authTok, 4, 0));
  }, [authTok, dispatch]);
  const estimateSentLeads = useSelector((state) => state.addToCartReducer.allotedLeadsWeb);
  if (estimateSentLeads.length > 0) {
    var allotedLeadsArray = estimateSentLeads[0].data.data.data;
  } else {
    var allotedLeadsArray = [];
  }

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
              <WebFreeLeadCard key={curElem._id} data={curElem} leadStatus={estimateSentLeads[0].data.data.data[0].leadStatus} authTok={authTok} leadId={curElem._id} reLeadStatus={4} rePageNum={0} />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EstimateSentBucket;
