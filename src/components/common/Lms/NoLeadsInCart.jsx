import React from "react";
import { Link, useNavigate } from "react-router-dom";
import left from "./Images/leftarrow.png";
import emptyCart from "../Images/noItemsCartBackpng.png";
import BottomNav from "./BottomNav";
import { useLocation } from "react-router-dom";

const NoLeadsInCart = () => {
  const path = useLocation();
  const navigateTo = useNavigate();

  const goToLeads = () => {
    navigateTo("/lead");
  };
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center w-100">
        <div className="noLeadsInCartContent w-100 h-100">
          <div className="noLeadInCartHeading">
            <Link style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "black" }} to="/lead">
              <div className="d-flex align-items-center">
                <img style={{ width: "5px", height: "10px" }} className="me-2" src={left} />
              </div>
              <div style={{fontSize: "18px", fontWeight: "600"}}>My Cart</div>
            </Link>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div>
              <img style={{ width: "10rem", height: "10rem" }} src={emptyCart} />
            </div>
            <div style={{ fontSize: "24px", fontWeight: "600", color: "#A7A7A7" }}>Your cart is empty</div>
            <div style={{ fontSize: "16px", fontWeight: "400", color: "#A7A7A7" }}>Looks like you haven't added any leads</div>
            <div style={{ color: "#176091" }} onClick={goToLeads}>
              Go to leads to add
            </div>
          </div>
          <div></div>

          <BottomNav path={path} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default NoLeadsInCart;
