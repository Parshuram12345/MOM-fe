import React, { useEffect } from "react";
import { fetchAllotedLeads } from "./Actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FreeLeadCard from "./FreeLeadCard";
import { getToken } from "./getToken";

const ArchivedBucket = () => {
  const dispatch = useDispatch();
  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem('token')}` : "";
  useEffect(() => {
    dispatch(fetchAllotedLeads(authTok, 7, 0));
  }, [authTok, dispatch]);
  const archivedLeads = useSelector((state) => state.addToCartReducer.allotedLeads);
  if (archivedLeads.length > 0) {
    var allotedLeadsArray = archivedLeads[0].data.data.data;
  } else {
    var allotedLeadsArray = [];
  }

  return (
    <React.Fragment>
      <div className="bucket-container">
        <div className="bucketContent">
          {allotedLeadsArray.map((curElem) => {
            return <FreeLeadCard key={curElem._id} data={curElem} leadStatus={archivedLeads[0].data.data.data[0].leadStatus} authTok={authTok} leadId={curElem._id} reLeadStatus={7} rePageNum={0} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ArchivedBucket;
