import React from "react";
import { useDispatch } from "react-redux";
import { deleteLeadFromCart } from "./Actions";
import { getToken } from "./getToken";
import separator from "../Images/separatorDot.svg";
import deleteTheCard from "../Images/closeButton.svg";

const CartAddedLeadCard = (props) => {
  const dispatch = useDispatch();
  const authTok = localStorage.getItem("token") ? getToken() : "";

  const budgetFrom = props.data.budget ? (props?.data?.budget?.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").split("-")[0]/100000) : "";
  const budgetTo = props.data.budget ? (props?.data?.budget?.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").replaceAll("Over", "").split("-").length > 1 ? props.data.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").replaceAll("Over", "").split("-")[1]/100000+"L" : props.data.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").replaceAll("Over", "").split("-")[0]/100000+"L") : "";

  return (
    <div className="orders-container">
      <div className="order-card" style={{padding: "0.5rem", backgroundColor: "#FFFFFF"}}>
        <div className="w-100 d-flex justify-content-end">
          <span
            className="pe-2"
            onClick={() => {
              dispatch(deleteLeadFromCart(authTok, props.data._id));
            }}
            style={{ lineHeight: "1rem" }}
          >
            <img src={deleteTheCard}/>
          </span>
        </div>
        <div className="leadcard">
          <div className="d-flex align-items-center w-100">
            <div className="card-content w-100">
              <div className="leadDetails">
                <div className="name-req-address-time">
                  <div className="firstLineOfCard">
                    <div className="d-flex">
                      <div className="d-flex">
                        <div className="leadNameIcon-Container">
                          <div className="leadNameIcon">{props.initials}</div>
                        </div>
                        <div className="d-flex flex-column">
                          <div className="d-flex">
                            <div className="nameOfLead">{props.data.name ? props.data.name : "-"}</div>
                            <div className="requirement ms-2">Immediately</div>
                          </div>
                          <div className="address-time">{props.data.city ? props.data.city : "-"}</div>
                        </div>
                      </div>
                    </div>
                    <div className="typeOfProperty">₹ {props.data.leadPrice ? props.data.leadPrice : "-"}/-</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fw-bold mt-1 d-flex justify-content-between cartAddedLeadFooter">
            <div>{props.data.budget ? (props.data.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").replaceAll("Over", "").split("-").length > 1 ? `₹ ${budgetFrom}-${budgetTo}` : `₹ Over ${budgetTo}`) : "-"}</div>
            <span className="mx-2"><img style={{height: "3px", width: "3px"}} src={separator}/></span>
            <div>{props.data.config ? props.data.config : "-"}</div>
            <span className="mx-2"><img style={{height: "3px", width: "3px"}} src={separator}/></span>
            <div>{props.data.propertyType ? props.data.propertyType : "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartAddedLeadCard;
