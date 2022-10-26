import React, { useEffect, useState } from "react";
import FreeBadge from "../Images/FreeBadge.png";
import cartIcon2 from "../Images/cartIcon2.png";
import { useDispatch, useSelector } from "react-redux";
// import { changeQueryState } from "./Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPhone } from "@fortawesome/free-solid-svg-icons";
import { setLeadStatusAction, setLeadStatusActionWeb } from "../Actions";
import { Modal } from "react-bootstrap";
import chatIcon from "../../Images/WhatsappIcon.svg";
import callIcon from "../../Images/leadCardCallIcon.svg";
import separator from "../../Images/separatorDot.svg";

const WebFreeLeadCard = (props) => {
  const dispatch = useDispatch();
  const [leadStatus, setLeadStatus] = useState(props.leadStatus);

  const [phNumModal, setPhNumModal] = useState(false);

  const leadStatusHandler = (event) => {
    setLeadStatus(event.target.value);
    // console.log(props.leadId);
  };
  useEffect(() => {
    dispatch(setLeadStatusActionWeb(props.authTok, props.leadId, leadStatus, props.reLeadStatus, props.rePageNum));
  }, [leadStatus]);

  const name = props.data.name ? props.data.name : "N/A";
  const renovationTimeline = props?.data?.renovationTimeline ? props?.data?.renovationTimeline : "N/A";
  const city = props?.data?.city ? props?.data?.city : "N/A";
  const configuration = props?.data?.config ? props?.data?.config : "N/A";

  const budget =
    props?.data?.budget == "₹ 1,00,000 - ₹ 3,00,000"
      ? "1-3 Lacs"
      : props?.data?.budget == "₹ 3,00,000 - ₹ 7,00,000"
      ? "3-7 Lacs"
      : props?.data?.budget == "over ₹ 7,00,000"
      ? "Over 7 Lacs"
      : props?.data?.budget == "Over ₹ 7,00,000"
      ? "Over 7 Lacs"
      : "-";

  // const budgetFrom = props?.data?.budget ? (props?.data?.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").split("-")[0] / 100000) : "-";
  // const budgetTo = props?.data?.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").split("-")[1] / 100000 + " Lacs";

  // console.log(props.data);
  // const budget = props?.data?.budget ? props?.data?.budget : "N/A";
  const workType = props?.data?.requirements ? props?.data?.requirements : "N/A";
  const projectType = props?.data?.propertyType ? props?.data?.propertyType : "N/A";
  const firstLetter = name.split(" ")[0].split("")[0].toUpperCase();
  const secondLetter = name.split(" ").length > 1 ? name.trim().split(" ")[name.trim().split(" ").length - 1].split("")[0].toUpperCase() : "";
  const initials = firstLetter + secondLetter;
  const phoneNumber = props?.data?.phoneNumber;

  const copyNumber = () => {
    const number = document.getElementById("phone-number").innerText;
    navigator.clipboard.writeText(number);
    alert("Number Copied");
  };

  const date = new Date(props.data.createdAt);
  const curDate = new Date();
  const gap = curDate.getTime() - date.getTime();
  const gapInDays = Math.round(gap / 1000 / 60 / 60 / 24);
  //   console.log(props.data.createdAt);
  return (
    <React.Fragment>
      <Modal show={phNumModal} centered onHide={() => setPhNumModal(false)}>
        <Modal.Header style={{ borderBottom: "1px solid grey", marginLeft: "1rem", marginRight: "1rem" }} closeButton></Modal.Header>
        <Modal.Body className="d-flex justify-content-between">
          <div className="d-flex">
            <div className="me-2">Phone Number:</div>
            <div id="phone-number">{phoneNumber}</div>
          </div>
          <div>
            <button style={{ border: "none", color: "#176091", fontWeight: "500" }} onClick={() => copyNumber()}>
              Copy
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="d-flex webFreeLeadCard align-items-center mb-2">
        <div
          className="d-flex"
          style={{ backgroundColor: "#FFFFFF", padding: "8px", borderRadius: "8px", border: "1px solid #dfdfdf", borderLeft: "7px solid #33B6D3", width: "100%", justifyContent: "space-evenly" }}
        >
          <div className="webLeadCard-data">
            {/* <div className="leadNameIcon-Container">
              <div className="leadNameIcon">{initials}</div>
            </div> */}
            <div className="nameOfLead" style={{ fontSize: "12px" }}>
              {name}
            </div>
          </div>
          <div className="webLeadCard-data flex-wrap">
            <div style={{ fontSize: "12px" }}>{props.data.location ? props.data.location + "," : props.data.address ? props.data.address + "," : null}</div>
            {/* {props.data.location || props.data.address ? <div>,&nbsp;</div> : null} */}
            <div style={{ fontSize: "12px" }}>{city}</div>
          </div>
          <div className="webLeadCard-data">
            <div style={{ fontSize: "12px" }}>{gapInDays === 0 ? "Today" : `${gapInDays}d ago`}</div>
          </div>
          <div className="webLeadCard-data">
            <div className="assignedLeadData" style={{ fontSize: "12px" }}>
              {budget}
            </div>
          </div>
          <div className="webLeadCard-data">
            <div className="assignedLeadData" style={{ fontSize: "12px" }}>
              {workType}
            </div>
          </div>
          <div className="webLeadCard-data">
            <a className="assignedLeadChatIcon" style={{ padding: "0.3rem" }} href={`https://wa.me/+91${phoneNumber}`}>
              <img style={{ width: "12px", height: "12px" }} src={chatIcon} alt="" />
            </a>
            <a
              className="assignedLeadCallIcon"
              onClick={() => {
                setPhNumModal(true);
              }}
              style={{ padding: "0.3rem" }}
            >
              <img style={{ width: "12px", height: "12px" }} src={callIcon} />
            </a>
          </div>
          <div className="webLeadCard-data">
            <select name="cardState" value={leadStatus} onChange={leadStatusHandler}>
              <option value={1}>New</option>
              <option value={8}>Active</option>
              <option value={2}>Follow Up</option>
              <option value={3}>Meeting Scheduled</option>
              <option value={4}>Estimate Sent</option>
              <option value={5}>Signed Up</option>
              <option value={6}>Snoozed</option>
              <option value={7}>Archived</option>
            </select>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WebFreeLeadCard;
