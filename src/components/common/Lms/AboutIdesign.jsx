import React, { useState } from "react";
import left from "./Images/leftarrow.png";
import press1 from "../Images/idesignPress1.svg";
import press2 from "../Images/idesignPress2.svg";
import press3 from "../Images/idesignPress3.svg";
import { useNavigate } from "react-router-dom";
import WebAboutUs from "./LmsWebComponents/WebAboutUs";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import { handleLogout } from "../Redux/Actions/auth";
import SidebarNav from "./SidebarNav";
import sidebarOpen from "../Images/sidebarOpen.svg";

const AboutIdesign = () => {
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
          <div>About iDesign Market</div>
        </div>
        <div className="aboutIdesign-content">
          <div className="aboutIdesign-content-main">
            iDesign is a tech platform providing SaaS, Design Tools and an online marketplace dedicated to Interior Design community. The marketplace assists homeowners connect with Interior Designers<br /><br />
            and Architects. With simple design tools, such as Quotation tool, Timeline feature or Schedule meeting we try and assist a better collaboration between Homeowners and Design Professionals.<br /><br />
            Creating a listing at iDesign will help you create a healthy and steady sales pipeline. We not only generate targeted leads, but also do an initial introduction to the homeowners on your
            behalf.<br /><br /> This way you and/or your sales team take it up from the point of meeting, thereby saving time and effort spent on presales activities. There are several other features at iDesign
            which assist Design Professionals in better managing their projects. Stay Tuned!<br /><br />
            iDesign.Market is founded by Ashish and Sunil. We look forward to any feedback from you at ashish@idesign.market or sunil@idesign.market
          </div>
          <div className="aboutIdesign-content-dots">
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
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
      <div className="d-none d-md-flex">
        <WebAboutUs />
      </div>
    </React.Fragment>
  );
};

export default AboutIdesign;
