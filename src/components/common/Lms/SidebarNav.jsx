import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import myOrders from "../../src/Images/myOrders.svg";
import termsNCond from "../Images/TermsNCond.svg";
import privacyPol from "../Images/privacyPolicy.svg";
import infoCircle from "../Images/infoCircleVector.svg";
import infoCircleSelected from "../Images/infoCircleVectorSelected.svg";
import questionCircle from "../Images/questionCircleVector.svg";
import questionCircleSelected from "../Images/questionCircleVectorSelected.svg";

import leadsImageOutlined from "../Images/OutlinedVector2.svg";
import communityImageOutlined from "../Images/OutlinedVector1.svg";
import chatImageOutlined from "../Images/OutlinedVector4.svg";
import cartImageOutlined from "../Images/OutlinedVector3.svg";
import OfferBannerInsideIcon from "../Lms/Images/OfferBannerInsideIcon.png";
import leadsImageSelected from "../Images/SelectedVector2.svg";
import cartImageSelected from "../Images/SelectedVector3.svg";
import comingSoonImage from "../Images/comingSoon.svg";
import callIcon from "../Images/RelationshipCallIcon.svg";
import relationshipManager from "../Images/relationshipManager.svg";
import signOutIcon from "../Images/signOutIcon.svg";
import { handleLogout } from "../Redux/Actions/auth";
import { useEffect } from "react";
import { fetchProfileData } from "./Actions";
import { getToken } from "./getToken";
import block1 from '../3dComponents/3dImages/block1.svg'
import sidebaricon from '../VendorComponentsMain/VendorImgs/sidebaricon.svg'
import Measurement from "./Images/Measurement.svg"

const SidebarNav = (props) => {
  const path = useLocation();
  const dispatch = useDispatch();
  const authTok = localStorage.getItem("token") ? getToken() : "";
  const [profileInfo, setProfileInfo] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const profileData = useSelector((state) => state.addToCartReducer.profileData);
  const navigateTo = useNavigate();
  useEffect(() => {
    dispatch(fetchProfileData(authTok));
  }, []);

  const goToNav = (location) => {
    navigateTo(`/${location}`);
  };

  useEffect(() => {
    setProfileInfo(profileData);
  }, [profileData]);

  useEffect(() => {
    if (localStorage.getItem("token") == "null" || localStorage.getItem("token") == null) {
      setIsLoggedIn(false);
    }
  }, []);

  const cityArr = ["Delhi", "delhi", "Noida", "noida", "Faridabad", "faridabad", "Ghaziabad", "ghaziabad", "Gurugram", "gurugram", "Gurgaon", "gurgaon"];

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <Offcanvas show={props.sidebarShow} onHide={props.sidebarClose}>
          <Offcanvas.Header closeButton>
            <div className="mt-4 d-flex w-100">
              <Link to="/myprofile">
                <div className="sidebar-profile-image">
                  <img style={{ objectFit: "cover", width: "100%", height: "100%" }} src={profileInfo ? profileInfo[0]?.data?.data?.imageUrl?.thumbnail : null} alt="profile image" />
                </div>
              </Link>
              <div className="w-100">
                <div className="fs-5 d-flex w-100">
                  <Link style={{ textDecoration: "none", color: "black", fontSize: "16px", fontWeight: "400" }} to="/myprofile">
                    {profileInfo && profileInfo[0]?.data?.data?.companyName}
                  </Link>
                  <div style={{ fontSize: "8px", fontWeight: "400" }} className="sidebar-profile-badge ms-2">
                    {profileInfo && profileInfo[0]?.data?.data?.planId?.name === "Free" ? profileInfo[0]?.data?.data?.planId?.name : "Premium"} Plan
                  </div>
                </div>
                <div className="d-flex">
                  <Link style={{ textDecoration: "none", color: "black", fontSize: "12px", fontWeight: "400" }} to="/myprofile">
                    {profileInfo && profileInfo[0]?.data?.data?.type === 1 ? "Interior Designer" : "Contractor"}
                  </Link>
                </div>
              </div>
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column justify-content-between">
            <div>
              {profileInfo && profileInfo[0]?.data?.data?.planId?.name === "Free" ? (
                <div className="w-100 d-flex justify-content-center" style={{ borderBottom: "1px solid #DFDFDF", paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "5px" }}>
                  <button className="upgrade-premium-button">
                    <Link style={{ textDecoration: "none", color: "white", fontSize: "14px", fontWeight: "500" }} to="/plans">
                      Upgrade to Premium Plan
                    </Link>
                  </button>
                </div>
              ) : null}
              <div className="mt-2 pb-2" style={{ borderBottom: "1px solid #DFDFDF" }}>
                <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px" }}>
                  <div className="me-2 d-flex align-items-center">
                    <img style={path.pathname === "/lead" ? { opacity: "1.0" } : { opacity: "0.5" }} src={path.pathname === "/lead" ? leadsImageSelected : leadsImageOutlined} />
                  </div>
                  <Link style={path.pathname === "/lead" ? { textDecoration: "none", color: "#176091" } : { textDecoration: "none", color: "#888888" }} to="/lead">
                    <div>Leads</div>
                  </Link>
                </div>
                <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px" }} onClick={() => goToNav("3dLanding")}>
                  <div className="me-2 d-flex align-items-center">
                    <img style={{ opacity: "1", height: "17px" }} src={block1} />
                  </div>
                  <div>Book 3D views</div>
                </div>

                {cityArr.map((element) => {
                  if (profileData[0]?.data?.data?.city === element) {
                    return (
                      <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px" }}>
                        <div className="me-2 d-flex align-items-center">
                          <img style={{ opacity: "1", height: "17px" }} src={Measurement} />
                        </div>
                        <div>Measurements</div>
                        <div style={{ paddingLeft: "1rem" }}>
                          <img style={{ width: "3rem" }} src={comingSoonImage} />
                        </div>
                      </div>
                    );
                  }
                })}
                {/* <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px" }} onClick={() => goToNav("vendor-list-designer")}>
                  <div className="me-2 d-flex align-items-center">
                    <img style={{ opacity: "1", height: "17px" }} src={sidebaricon} />
                  </div>
                  <div>Vendor Page</div>
                </div> */}
                <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px" }}>
                  <div className="me-2 d-flex align-items-center">
                    <img style={{ opacity: "0.5" }} src={communityImageOutlined} />
                  </div>
                  <div>Community</div>
                  <div style={{ paddingLeft: "1rem" }}>
                    <img style={{ width: "3rem" }} src={comingSoonImage} />
                  </div>
                </div>
                <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px" }}>
                  <div className="me-2 d-flex align-items-center">
                    <img style={{ opacity: "0.5" }} src={chatImageOutlined} />
                  </div>
                  <div>Chat</div>
                  <div style={{ paddingLeft: "1rem" }}>
                    <img style={{ width: "3rem" }} src={comingSoonImage} />
                  </div>
                </div>
                <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px" }}>
                  <div className="me-2 d-flex align-items-center">
                    <img style={path.pathname === "/mycart" ? { opacity: "1.0" } : { opacity: "0.5" }} src={path.pathname === "/mycart" ? cartImageSelected : cartImageOutlined} />
                  </div>
                  <Link style={path.pathname === "/mycart" ? { textDecoration: "none", color: "#176091" } : { textDecoration: "none", color: "#888888" }} to="/mycart">
                    <div>My Cart</div>
                  </Link>
                </div>
              </div>
              <div className="mt-2 pb-2">
                <div className="ms-3 mb-2 mt-2">
                  <Link className="d-flex" style={{ textDecoration: "none", color: "black", fontSize: "14px" }} to="/aboutidesign">
                    <div className="me-2 d-flex align-items-center">
                      <img src={path.pathname === "/aboutidesign" ? infoCircleSelected : infoCircle} style={{ height: "18px" }} />
                    </div>
                    About
                  </Link>
                </div>
                <div className="ms-3 mb-2">
                  <Link className="d-flex" style={{ textDecoration: "none", color: "black", fontSize: "14px" }} to="/howidesignworks">
                    <div className="me-2 d-flex align-items-center">
                      <img src={path.pathname === "/howidesignworks" ? questionCircleSelected : questionCircle} style={{ width: "19px" }} />
                    </div>
                    How iDesign Works
                  </Link>
                </div>
              </div>
              {/* <div className="mt-2 pb-2">
                <div className="ms-3 fs-5">Get the mobile application</div>
                <div className="ms-3 fs-5">
                  <img style={{ width: "8rem", height: "6rem" }} src={appDownloadPic} />
                </div>
              </div> */}
            </div>
            {profileData[0]?.data?.data?.rmProfile?.name ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="relationship-image">
                  <img style={{ width: "100%" }} src={profileData[0]?.data?.data?.rmProfile?.profileImagePath} alt="test" />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <div className="relationship-name m-0">{profileData[0]?.data?.data?.rmProfile?.name}</div>
                  <div style={{ fontSize: "14px" }}>
                    <img src={callIcon} style={{ marginRight: "0.5rem" }} />
                    {profileData[0]?.data?.data?.rmProfile?.phoneNumber}
                  </div>
                  <div className="relationship-number m-0">{profileData[0]?.data?.data?.rmProfile?.email}</div>
                  <div className="relationship-position">Your Relationship Manager</div>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: "12px", display: "flex", justifyContent: "center", textAlign: "center", margin: "0 12px" }}>A relationship manager will be assigned to you shortly.</div>
            )}
            <div className="ms-3 mb-3 fs-4" onClick={props.sidebarLogout}>
              <img src={signOutIcon} style={{ marginRight: "0.5rem" }} />
              <span style={{ fontSize: "14px" }}>Sign Out</span>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        <Offcanvas show={props.sidebarShow} onHide={props.sidebarClose}>
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column justify-content-between">
            <div>
              <div className="mt-2 pb-2" style={{ borderBottom: "1px solid #DFDFDF" }}>
                <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px" }}>
                  <Link style={{ textDecoration: "none", color: "#888888" }} to="/products">
                    <div style={{ fontSize: "20px" }}>Products</div>
                  </Link>
                </div>
                <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px" }}>
                  <Link style={{ textDecoration: "none", color: "#888888" }} to="/pricing">
                    <div style={{ fontSize: "20px" }}>Pricing</div>
                  </Link>
                </div>
                <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px" }}>
                  <a style={{ textDecoration: "none", color: "#888888" }} href="https://magazine.idesign.market/">
                    <div style={{ fontSize: "20px" }}>Magazine</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="ms-3 mb-3 fs-4" onClick={props.sidebarClose}>
              <img src={signOutIcon} style={{ marginRight: "0.5rem" }} />
              <Link to="/" style={{ textDecoration: "none", color: "#888888" }}>
                <span style={{ fontSize: "14px" }}>Sign In</span>
              </Link>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </React.Fragment>
  );
};

export default SidebarNav;
