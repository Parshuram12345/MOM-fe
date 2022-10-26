import React, { useEffect } from "react";
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
import block1 from '../../3dComponents/3dImages/block1.svg'
import vendorsSubs from '../../VendorComponentsMain/VendorImgs/vendorsSubs.svg'
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../Redux/Actions/auth";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHome } from "react-icons/ai"
import Measurement from "../Images/Measurement.svg"
import { fetchProfileData } from "../Actions";
import sidebaricon from '../../VendorComponentsMain/VendorImgs/sidebaricon.svg'

const SideBarWeb = () => {
  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.addToCartReducer.profileData);
  // console.log(profileData[0]?.data?.data?.isVendorSubscribed)

  const path = useLocation();
  const goToNav = (location) => {
    navigateTo(`/${location}`);
  };

  useEffect(() => {
    dispatch(fetchProfileData(authTok))
  }, [])

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

  const cityArr = ["Delhi", "delhi", "Noida", "noida", "Faridabad", "faridabad", "Ghaziabad", "ghaziabad", "Gurugram", "gurugram", "Gurgaon", "gurgaon"];

  // console.log(path)
  return (
    <React.Fragment>
      <div className="sidenav" style={{ padding: "16px 16px 16px 0" }}>
        <div className="d-flex flex-column">
          {profileData && profileData[0]?.data?.data?.planId?.name === "Free" ? (
            <>
              <div role="button" className="unique d-flex justify-content-center align-items-center ms-3" onClick={() => goToNav("plans")}>
                <img className="sideNavImage" src={upgrade} /> <span>Upgrade to Premium</span>
              </div>
              <hr />
            </>
          ) : null}
          <div className="sidebarLinks ps-3" onClick={() => goToNav("dashboard")}>
            <AiOutlineHome />
            <span className="mx-3">Home</span>
          </div>
          <div className="sidebarLinks ps-3" onClick={() => goToNav("lead")}>
            <img className="sideNavImage" src={path.pathname === "/lead" ? leadsImageSelected : leadsImageOutlined} />
            <span className="mx-1">Lead Management</span>
          </div>
          <div className="d-flex sidebarLinks flex-wrap ps-3" onClick={() => goToNav("secure-chat")}>
            <img className="sideNavImage" src={chat} />
            <span>Secure Chat</span>
            {/* <div className="p-0 ms-2">
              <img style={{ height: "15px" }} className="m-0" src={comingSoon} />
            </div> */}
          </div>
          <div className="sidebarLinks ps-3" onClick={() => goToNav("3dLanding")}>
            <img src={block1} style={{ height: "19px" }} />
            <span style={{ marginLeft: "14px" }}>Book 3D views</span>
          </div>

          {cityArr.map((element) => {
            if (profileData[0]?.data?.data?.city === element) {
              return (
                <div className="sidebarLinks ps-3">
                  <img src={Measurement} style={{ height: "19px" }} />
                  <span style={{ marginLeft: "14px" }}>Measurements</span>
                  <div className="p-0 ms-2">
                    <img style={{ height: "15px" }} className="m-0" src={comingSoon} />
                  </div>
                </div>
              );
            }
          })}
          {/* <div className="sidebarLinks ps-3" onClick={() => goToNav("vendor-list-designer")}>
            <img src={sidebaricon} style={{ height: "19px" }} />
            <span style={{ marginLeft: "13px" }}>Vendor Page</span>
          </div> */}
          <div className="d-flex sidebarLinks flex-wrap ps-3">
            <img className="sideNavImage" src={communtiy} />
            <span style={{ marginLeft: "1px" }}>Community</span>
            <div className="p-0 ms-2">
              <img style={{ height: "15px" }} className="m-0 ps-3" src={comingSoon} />
            </div>
          </div>
          <hr />
          {/* <div className="sidebarLinks ps-3" onClick={() => goToNav("aboutidesign")}>
            <img className="sideNavImage" src={path.pathname === "/aboutidesign" ? infoVectorSelected : terms} />
            <span style={{ marginLeft: "3px" }}>About</span>
          </div> */}
          {/* <div className="sidebarLinks ps-3" onClick={() => goToNav("howidesignworks")}>
            <img className="sideNavImage" src={path.pathname === "/howidesignworks" ? questionCircleSelected : questionCircle} style={{ height: "19px" }} />
            <span>How iDesign Works</span>
          </div> */}
        </div>
        {/* {profileData[0]?.data?.data?.type === 2 && profileData[0]?.data?.data?.isVendorSubscribed === false && path.pathname !== "/vendor-page" && path.pathname !== "/vendor-ratelist" && path.pathname !== "/vendor-edit-rate-list" && path.pathname !== "/vendorcart" ? <div className="d-flex flex-column p-2 mx-5" style={{
          background: `url(${vendorsSubs})`, backgroundRepeat: "no-repeat", height: "22vh",
          width: "65%",
        }}>
          <p className="mb-2" style={{
            fontWeight: "400",
            fontSize: "18px", color: "black"
          }}>Want to <span style={{ color: "#176091", fontSize: "16px" }}> increase </span> <br /> your  <span style={{ color: "#176091", fontSize: "18px" }}>sales</span><br />
            with a <span style={{ color: "#176091", fontSize: "16px" }}>push?</span></p>
          <p className="mb-0" style={{ fontWeight: "400", fontSize: "12px", color: "#176091" }}>Check our vendor plan</p>
          <button style={{
            background: "#176091", width: "51%",
            borderRadius: "100px", border: "none", color: "white", fontSize: "12px"
          }} onClick={() => goToNav("vendor-page")}>Check now</button>
        </div> : ""} */}
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

export default SideBarWeb;
