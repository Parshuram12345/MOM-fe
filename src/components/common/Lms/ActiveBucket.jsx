import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../Redux/store";
import { fetchAllotedLeads } from "./Actions";
import FreeLeadCard from "./FreeLeadCard";
import { getToken } from "./getToken";

const ActiveBucket = () => {
  const dispatch = useDispatch();
  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem('token')}` : "";
  useEffect(() => {
    dispatch(fetchAllotedLeads(authTok, 8, 0));
  }, []);
  const activeLeads = useSelector((state) => state.addToCartReducer.allotedLeads);
  if (activeLeads.length > 0) {
    var allotedLeadsArray = activeLeads[0].data.data.data;
  } else {
    var allotedLeadsArray = [];
  }
  return (
    <React.Fragment>
      <div className="bucket-container">
        <div className="bucketContent">
          {allotedLeadsArray.map((curElem) => {
            return <FreeLeadCard key={curElem._id} data={curElem} leadStatus={activeLeads[0].data.data.data[0].leadStatus} authTok={authTok} leadId={curElem._id} reLeadStatus={8} rePageNum={0} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ActiveBucket;
