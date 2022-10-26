import React from "react";
import { Link } from "react-router-dom";
import leadsImageOutlined from "../Images/OutlinedVector2.svg";
import communityImageOutlined from "../Images/OutlinedVector1.svg";
import chatImageOutlined from "../Images/OutlinedVector4.svg";
import cartImageOutlined from "../Images/OutlinedVector3.svg";
import NextArrow from "../Lms/Images/NextArrow.png";
import OfferBannerInsideIcon from "../Lms/Images/OfferBannerInsideIcon.png";
import leadsImageSelected from "../Images/SelectedVector2.svg";
import cartImageSelected from "../Images/SelectedVector3.svg";
import comingSoonImage from "../Images/comingSoon.svg";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const BottomNav = (props) => {
  const path = useLocation();
  const profileData = useSelector((state) => state.addToCartReducer.profileData);
  const leadsInCartArray = useSelector((state) => state.addToCartReducer.leadsInCart);
  
  return (
    <React.Fragment>
      <div className="featuresAndOfferBanner" style={path.pathname === "/mycart" ? { width: "inherit" } : null}>
        {profileData[0]?.data?.data?.planId?.name === "Free" ? (
          path.pathname === "/mycart" ? null : path.pathname === "/vendorcart" ? null : (
            <div className="offer-banner">
              <Link
                style={{ textDecoration: "none", color: "black", display: "flex", width: "100%", marginRight: "0.5rem", marginLeft: "0.5rem", justifyContent: "space-between", alignItems: "center" }}
                to="/plans"
              >
                {/* <div className="offerIcon"><img src={OfferBannerIcon} alt="" /></div> */}
                <div className="d-flex align-items-center">
                  <img style={{opacity: "0.5"}} className="me-2" src={OfferBannerInsideIcon} alt="" />
                  <h4 className="offer">
                    Flat <span style={{ color: "red" }}> 50% </span> off on leads with <b> Premium Membership</b>
                  </h4>
                </div>
                <img src={NextArrow} alt="" />
              </Link>
            </div>
          )
        ) : null}

        <div className="features">
          <div className="feature1 f mt-3" style={{border: "none"}}>
            <Link style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center" }} to="/lead">
              <div style={{ height: "1rem" }}></div>
              <img src={props.path.pathname === "/lead" ? leadsImageSelected : leadsImageOutlined} />
              <p style={props.path.pathname === "/lead" ? { fontSize: "12px", color: "#176091" } : { fontSize: "12px", color: "#000000" }}>Leads</p>
            </Link>
          </div>

          <div className="feature2 f mt-3" style={{border: "none"}}>
            <img className="mb-1" src={comingSoonImage} style={{ width: "3rem", height: "2rem" }} />
            <img src={communityImageOutlined} />
            <p style={{ fontSize: "12px" }}>Community</p>
          </div>

          <div className="feature3 f mt-3" style={{border: "none"}}>
            <img className="mb-1" src={comingSoonImage} style={{ width: "3rem", height: "2rem" }} />
            <img src={chatImageOutlined} />
            <p style={{ fontSize: "12px" }}>Chat</p>
          </div>

          <div className={`feature4 f mt-3 ${leadsInCartArray[0]?.data?.data?.leadCount === 0 ? "justify-content-start" : ""}`} style={{border: "none"}}>
            <Link style={{ textDecoration: "none" }} className="d-flex flex-column justify-content-between align-items-center" to="/mycart">
              {leadsInCartArray[0]?.data?.data?.leadCount !== 0 && <div className="numberOfCartItems">{leadsInCartArray[0]?.data?.data?.leadCount}</div>}
              <img style={{zIndex: "-1"}} src={props.path.pathname === "/mycart" ? cartImageSelected : cartImageOutlined} />
              <p style={props.path.pathname === "/mycart" ? { fontSize: "12px", color: "#176091" } : { fontSize: "12px", color: "#000000" }}>My Cart</p>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BottomNav;
