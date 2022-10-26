import { faCheck, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLeadsToCart, deleteLeadFromCart } from "./Actions";
import { getToken } from "./getToken";
import cartIcon2 from "../Lms/Images/cartIcon2.png";
import addedToCart from "../Images/addedToCart.svg";
import addToCart from "../Images/addToCartIcon.svg";
import separator from "../Images/separatorDot.svg";
import { Link } from "react-router-dom";

const BuyLeadsCard = (props) => {
  // console.log(props.data);
  const dispatch = useDispatch();
  const authTok = localStorage.getItem("token") ? getToken() : "";
  const leadsInCartArray = useSelector((state) => state.addToCartReducer.leadsInCart);

  const profileData = useSelector((state) => state.addToCartReducer.profileData);

  if (leadsInCartArray.length > 0) {
    var cartActiveArray = leadsInCartArray[0].data.data.leads.map((curElem) => {
      return curElem._id;
    });
  } else {
    var cartActiveArray = [];
  }

  const addToCartHandler = (authTok, id) => {
    if (!cartActiveArray.includes(id)) {
      dispatch(addLeadsToCart(authTok, id));
    } else {
      dispatch(deleteLeadFromCart(authTok, id));
    }
  };

  const date = new Date(props.data.createdAt);
  const curDate = new Date();
  const gap = curDate.getTime() - date.getTime();
  const gapInDays = Math.round(gap / 1000 / 60 / 60 / 24);

  // console.log(Math.round((((gap/1000)/60)/60)/24));
  const budgetFrom = props.data.budget ? props.data.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").split("-")[0] / 100000 : "";
  const budgetTo = props.data.budget
    ? props.data.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").replaceAll("Over", "").replaceAll("over", "").split("-").length > 1
      ? props.data.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").replaceAll("Over", "").replaceAll("over", "").split("-")[1] / 100000 + " Lacs"
      : props.data.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").replaceAll("Over", "").replaceAll("over", "").split("-")[0] / 100000 + " Lacs"
    : "";

  return (
    <React.Fragment>
      <div className="leadCard-container">
        <div key={props.data._id} className="leadcard-wrapper p-2">
          <div className="leadcard pb-0">
            <div className="d-flex">
              <div className="leadNameIcon-Container">
                <div className="leadNameIcon">{props.initials}</div>
              </div>
              <div className="card-content">
                <div className="leadDetails">
                  <div className="name-req-address-time">
                    <div className="firstLineOfCard w-100 justify-content-between">
                      <div className="d-flex">
                        <div className="me-2">
                          <div className="nameOfLead d-flex align-items-center">
                            <div className="me-2">{props.data.name ? props.data.name : "N/A"}</div>
                            <div className="requirement">{props.data.renovationTimeline ? props.data.renovationTimeline : "N/A"}</div>
                          </div>
                          <div className="address-time">
                            <div>{props.data.location ? props.data.location.split(",")[0] : null}</div>
                            {props.data.location ? <div>,&nbsp;</div> : null}
                            <div>{props.data.city ? props.data.city : "N/A"}</div>
                            <div className="d-flex align-items-center" style={{ margin: "0 4px 0 4px" }}>
                              <img src={separator} />
                            </div>
                            <div>{gapInDays === 0 ? "Today" : `${gapInDays}d ago`}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="typeOfProperty">{props.data.config ? props.data.config : "N/A"}</div>
          </div>
          <div className="mid-content mt-0">
            <div className="budget a">
              <div className="buyCardDataHead">Budget</div>
              <div className="buyCardData">
                {props.data.budget
                  ? props.data.budget.replaceAll(" ", "").replaceAll(",", "").replaceAll("₹", "").replaceAll("Over", "").split("-").length > 1
                    ? `${budgetFrom}-${budgetTo}`
                    : `Over ${budgetTo}`
                  : "-"}
              </div>
            </div>
            <div className="work-type a">
              <div className="buyCardDataHead">Work Type</div>
              <div className="buyCardData">{props.data.requirements ? props.data.requirements : "N/A"}</div>
            </div>
            <div className="project-type a">
              <div className="buyCardDataHead">Project Type</div>
              <div className="buyCardData">{props.data.propertyType ? props.data.propertyType : "N/A"}</div>
            </div>
          </div>
        </div>
        <div className="cardFooter">
          <div className="amount">{profileData && profileData[0]?.data?.data?.planId?.name == "Free" ? <span>₹ {props.data.leadPrice ? props.data.leadPrice : "N/A"}/-</span> : <><span>₹ {props.data.leadPrice / 2}/-</span><span style={{ textDecoration: "line-through", fontSize: "12px", color: "#888888", marginLeft: "0.2rem", fontWeight: "400" }}>{props.data.leadPrice}</span></>}</div>
          <div className="d-flex">
            <img src={cartActiveArray.includes(props.data._id) ? addedToCart : addToCart} onClick={() => addToCartHandler(authTok, props.data._id)} style={{ width: "65px" }} />
            <button
              className="buybtn"
              onClick={() => {
                dispatch(addLeadsToCart(authTok, props.data._id));
              }}
            >
              <Link style={{ color: "white", textDecoration: "none" }} className="card-buy-button" to="/mycart">
                Buy
              </Link>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuyLeadsCard;
