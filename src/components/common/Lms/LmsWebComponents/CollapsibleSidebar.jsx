import React from "react";
import upgrade from "../../Images/upgrade.png";
import chat from "../../Images/chat.png";
import communtiy from "../../Images/community.png";
import terms from "../../Images/newabout.png";
import signout from "../../Images/signout.png";
import comingSoon from "../../Images/comingSoon.svg";
import leadsImageOutlined from "../../Images/OutlinedVector2.svg";
import leadsImageSelected from "../../Images/SelectedVector2.svg";
import questionCircle from "../../Images/questionCircleVector.svg";
import questionCircleSelected from "../../Images/questionCircleVectorSelected.svg";
import infoVectorSelected from "../../Images/infoCircleVectorSelected.svg";
import callIcon from "../../Images/RelationshipCallIcon.svg";
import block1 from "../../3dComponents/3dImages/block1.svg";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../Redux/Actions/auth";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const CollapsibleSidebar = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.addToCartReducer.profileData);
  const path = useLocation();
  const goToNav = (location) => {
    navigateTo(`/${location}`);
  };

  const goLogOut = () => {
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
      <div className="sidenav" style={{ padding: "16px 16px 16px 0" }}>
        <div className="d-flex flex-column">
          {profileData && profileData[0]?.data?.data?.planId?.name === "Free" ? (
            <>
              {/* <div role="button" id="sidePremiumIcon" className="unique d-none justify-content-center align-items-center ms-3" onClick={() => goToNav("plans")}>
                <img className="sideNavImage" src={upgrade} /> <span>Upgrade to Premium</span>
              </div> */}
              <div role="button" id="sidePremiumIconCollapsed" style={{marginLeft: "0.5rem", width: "2rem", height: "2rem", backgroundColor: "#f9be26", borderRadius: "10px", display: "flex", flexWrap: "nowrap", fontSize: "14px", color: "#FFFFFF", whiteSpace: "nowrap", justifyContent: "flex-start", alignItems: "center", padding: "0.5rem 0.6rem", overflow: "hidden"}} onClick={() => goToNav("plans")}>
                <img style={{height: "1rem", marginRight: "1rem"}} src={upgrade} /> Upgrade to Premium
              </div>
              <hr style={{ width: "90%" }} />
            </>
          ) : null}
          <div className="sidebarLinks ps-3" style={{whiteSpace: "nowrap"}} onClick={() => goToNav("lead")}>
            <img className="sideNavImage" src={path.pathname === "/lead" ? leadsImageSelected : leadsImageOutlined} />
            <span className="mx-1">Lead Management</span>
          </div>
          <div className="d-flex sidebarLinks flex-wrap ps-3" style={{whiteSpace: "nowrap"}}>
            <img className="sideNavImage" src={chat} />
            <span onClick={() => goToNav("secure-chat")}>Secure Chat</span>
            {/* <div className="p-0 ms-2">
              <img style={{ height: "15px" }} className="m-0" src={comingSoon} />
            </div> */}
          </div>
          <div className="sidebarLinks ps-3" style={{whiteSpace: "nowrap"}} onClick={() => goToNav("3dLanding")}>
            <img src={block1} style={{ height: "19px" }} />
            <span style={{ marginLeft: "14px" }}>Book 3D views</span>
          </div>
          <div className="d-flex sidebarLinks flex-wrap ps-3" style={{whiteSpace: "nowrap"}}>
            <img className="sideNavImage" src={communtiy} />
            <span style={{ marginLeft: "1px" }}>Community</span>
            <div className="p-0 ms-2">
              <img style={{ height: "15px" }} className="m-0 ps-3" src={comingSoon} />
            </div>
          </div>
          <hr style={{ width: "90%" }} />
          <div className="sidebarLinks ps-3" style={{whiteSpace: "nowrap"}} onClick={() => goToNav("aboutidesign")}>
            <img className="sideNavImage" src={path.pathname === "/aboutidesign" ? infoVectorSelected : terms} />
            <span style={{ marginLeft: "3px" }}>About</span>
          </div>
          <div className="sidebarLinks ps-3" style={{whiteSpace: "nowrap"}} onClick={() => goToNav("howidesignworks")}>
            <img className="sideNavImage" src={path.pathname === "/howidesignworks" ? questionCircleSelected : questionCircle} style={{ height: "19px" }} />
            <span>How iDesign Works</span>
          </div>
        </div>
        {profileData[0]?.data?.data?.rmProfile?.name ? (
          <div className="d-flex flex-column mx-5">
            {/* <div className="relationship-image">
            <img style={{ width: "100%" }} src={profileData[0]?.data?.data?.rmProfile?.profileImagePath} alt="test" />
          </div> */}
            <div className="d-flex flex-column ">
              <div className="relationship-name  mb-0 pb-0" style={{ fontSize: "12px", color: "#888888", fontWeight: "400" }}>
                {profileData[0]?.data?.data?.rmProfile?.name}
              </div>
              <div className="pb-0" style={{ fontSize: "12px", color: "#888888", fontWeight: "400" }}>
                {profileData[0]?.data?.data?.rmProfile?.phoneNumber}
              </div>
              <div className="relationship-number w-100 m-0 p-0" style={{ fontSize: "12px", color: "#888888", fontWeight: "400" }}>
                {profileData[0]?.data?.data?.rmProfile?.email}
              </div>
              <div className="relationship-position" style={{ fontSize: "12px", color: "#888888" }}>
                Your Relationship Manager
              </div>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: "12px", padding: "0 12px", display: "flex", justifyContent: "center", textAlign: "center", color: "#888888" }}>
            A relationship manager will be assigned to you shortly.
          </div>
        )}
        <div className="signout--- sidebarLinks ps-3" onClick={goLogOut}>
          <img className="sideNavImage" src={signout} />
          <span>Sign Out</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CollapsibleSidebar;
