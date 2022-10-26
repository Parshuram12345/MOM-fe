import React from "react";
import { useNavigate } from "react-router-dom";
import congratsImage from "../../Images/congratsImage.svg";
import HeaderNav from "../LmsWebComponents/HeaderNav";
import SideBarWeb from "../LmsWebComponents/SideBarWeb";

const OrderCompleteWeb = () => {
  const navigateTo = useNavigate();
  const handleNav = () => {
    navigateTo("/lead");
  };
  return (
    <React.Fragment>
      <div style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <HeaderNav />
        <div style={{height: "90vh", display: "flex"}}>
          <SideBarWeb />
          <div className="d-flex justify-content-center align-items-center" style={{ width: "100%", padding: "2rem", textAlign: "center" }}>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{backgroundColor: "#FFFFFF", width: "100%", height: "100%", borderRadius: "8px"}}>
              <div>
                <img src={congratsImage} alt="" />
              </div>
              <div style={{fontSize: "32px", fontWeight: "500"}}>Congratulations</div>
              <div style={{ fontSize: "24px", fontWeight: "300", opacity: "0.5", marginBottom: "24px" }}>
                You have successfully purchased the leads
              </div>
              <div className="my-4 congrats-button">
                <button onClick={handleNav}>Go to LMS</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderCompleteWeb;
