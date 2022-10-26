import React from "react";
import left from "./Images/leftarrow.png";
import press1 from "../Images/idesignPress1.svg";
import press2 from "../Images/idesignPress2.svg";
import press3 from "../Images/idesignPress3.svg";
import { useNavigate } from "react-router-dom";
import WebHowIdesignWorks from "./LmsWebComponents/WebHowIdesignWorks";
import SidebarNav from "./SidebarNav";
import sidebarOpen from "../Images/sidebarOpen.svg";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import { handleLogout } from "../Redux/Actions/auth";

const HowIdesignWorks = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  }

  const logoutHandler = () => {
    setShowSidebar(false);
    confirmAlert({
      message: `Are you sure you want to logout?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(handleLogout()),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <React.Fragment>
    <SidebarNav sidebarShow={showSidebar} sidebarClose={closeSidebar} sidebarLogout={logoutHandler} />
      <div className="aboutIdesign-container d-block d-md-none">
        <div className="aboutIdesign-header">
          <div onClick={() => {setShowSidebar(true)}} style={{ marginRight: "12.59px" }}>
            <img src={sidebarOpen} />
          </div>
          <div>How iDesign Works</div>
        </div>
        <div className="aboutIdesign-content">
          <div className="aboutIdesign-content-main">
            It’s actually very simple and since you are reading this, then it means you have created your Listing Profile. Thank you! Once you create a profile, iDesign makes your listing visible to
            the homeowners who come on our website seeking Design Professionals. If you are a premium user we try and make your profile more visible to ensure more client queries for you. Pro Tip 1:
            Add your best projects to your profile to make the Listing more attractive. Visit your profile to add projects. iDesign, help you create a steady and stable sales pipeline. We not only
            generate targeted and verified leads, but also do an initial introduction to the homeowners on your behalf! This way you and/or your team take it up from the point of meeting, thereby
            saving time and effort spent on presales activities.. We celebrate Design at iDesign. Use our free tools and community features to connect with more designers and make your work more
            efficient!
          </div>
          <div className="aboutIdesign-press">
            <div className="aboutIdesign-press-header">iDesign Press</div>
            <div className="aboutIdesign-press-images">
              <img style={{ width: "328px", height: "149px" }} src={press1} />
            </div>
            <div className="aboutIdesign-press-images">
              <img style={{ width: "328px", height: "149px" }} src={press2} />
            </div>
            <div className="aboutIdesign-press-images">
              <img style={{ width: "328px", height: "149px", marginBottom: "57px" }} src={press3} />
            </div>
          </div>
        </div>
      </div>
      <div className="d-none d-md-block">
        <WebHowIdesignWorks/>
      </div>
    </React.Fragment>
  );
};

export default HowIdesignWorks;
