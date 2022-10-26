import React from "react";
import { useNavigate } from "react-router-dom";
import congratsImage from "../Images/congratsImage.svg";
import OrderCompleteWeb from "./LmsWebComponents/OrderCompleteWeb";

const OrderComplete = () => {
  const navigateTo = useNavigate();
  const handleNav = () => {
    navigateTo("/lead");
  };
  return (
    <React.Fragment>
      <div className="d-flex d-md-none justify-content-center align-items-center" style={{ width: "100%", textAlign: "center", height: "100vh" }}>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: "#FFFFFF", width: "100%", height: "100%", borderRadius: "8px" }}>
          <div>
            <img src={congratsImage} alt="" />
          </div>
          <div style={{ fontSize: "32px", fontWeight: "500" }}>Congratulations</div>
          <div style={{ fontSize: "24px", fontWeight: "300", opacity: "0.5", marginBottom: "24px" }}>You have successfully purchased the leads</div>
          <div className="my-4 congrats-button">
            <button onClick={handleNav}>Go to LMS</button>
          </div>
        </div>
      </div>
      <div className="d-none d-md-block">
        <OrderCompleteWeb/>
      </div>
    </React.Fragment>
  );
};

export default OrderComplete;
