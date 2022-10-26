import React from "react";
import { useDispatch } from "react-redux";
import { deleteLeadFromCart } from "../Actions";
import { getToken } from "../getToken";

const WebCartAddedLeadCard = (props) => {
  const dispatch = useDispatch();
  const authTok = localStorage.getItem("token") ? getToken() : "";

  const budgetFrom = props.data.budget ? props?.data?.budget?.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").split("-")[0] / 100000 : "";
  const budgetTo = props.data.budget
    ? props?.data?.budget?.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").replaceAll("Over", "").split("-").length > 1
      ? props.data.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").replaceAll("Over", "").split("-")[1] / 100000 + " Lacs"
      : props.data.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").replaceAll("Over", "").split("-")[0] / 100000 + " Lacs"
    : "";

  return (
    <div className="webCartCard-container mb-2">
      <div className="webCartCard-line1">
        <div className="d-flex sections">
          <div className="webCartCard-initials" style={{fontWeight: "300"}}>{props.initials ? props.initials : "-"}</div>
          <div style={{marginLeft: "12px"}}>{props.data.name ? props.data.name : "-"}</div>
        </div>
        <div className="sections justify-content-center">{props.data.city ? props.data.city : "-"}</div>
        {/* <div></div> */}
        <div className="sections justify-content-center">
          <div>
            {props.data.budget
              ? props.data.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").replaceAll("Over", "").split("-").length > 1
                ? `₹ ${budgetFrom}-${budgetTo}`
                : `₹ Over ${budgetTo}`
              : "-"}
          </div>
        </div>
        <div className="sections justify-content-center">{props.data.requirements ? props.data.requirements : "-"}</div>
        <div className="sections justify-content-center">{props.data.propertyType ? props.data.propertyType : "-"}</div>
        <div className="sections justify-content-center">{props.data.renovationTimeline ? props.data.renovationTimeline : "-"}</div>
      </div>
      <div className="webCartCard-line2">
        <div style={{margin: "0 24px 0 48px", fontSize: "16px", fontWeight: "400"}}>₹ {props.data.leadPrice ? props.data.leadPrice : "-"}</div>
        <div style={{fontSize: "14px", fontWeight: "700", color: "#888888"}} role="button" onClick={() => {dispatch(deleteLeadFromCart(authTok, props.data._id))}}>Remove</div>
      </div>
    </div>
  );
};

export default WebCartAddedLeadCard;
