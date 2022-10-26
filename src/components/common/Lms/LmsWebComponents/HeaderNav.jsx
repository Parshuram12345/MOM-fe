import React from "react";
import logo from "../../Images/webViewLogo.svg";
import search from "../../Images/searchIcon.svg";
import notification from "../../Images/notificationWebIcon.svg";
import cart from "../../Images/cartIcon.svg";
import cartImageSelected from "../../Images/SelectedVector3.svg";
import defaultProfile from "../../Images/defaultProfileIcon.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const HeaderNav = () => {
  const leadsInCart = useSelector((state) => state.addToCartReducer.leadsInCart);
  const path = useLocation();
  const navigateTo = useNavigate();
  const goToCart = () => {
    navigateTo("/mycart")
  }
  const goToProfile = () => {
    navigateTo("/myprofile")
  }
  return (
    <React.Fragment>
      <div className="lmsweb-header" style={{ height: "10vh" }}>
        <div className="d-flex">
          <div className="lmsweb-header-logo" role="button" onClick={() => {navigateTo("/lead")}}>
            <img src={logo} />
          </div>
          {/* <div className="header-search">
            <img src={search} />
            <input type="search" placeholder="Search" />
          </div> */}
        </div>
        <div className="lmsweb-header-controls">
          <div style={{ marginRight: "16px" }}>
            <img style={{ height: "20px" }} src={notification} />
          </div>
          <div style={{ marginRight: "8px", marginLeft: "4px", display: "flex" }} role="button" onClick={goToCart}>
            <img style={{ height: "20px" }} src={path.pathname === "/mycart" ? cartImageSelected : cart} />
            {leadsInCart[0]?.data?.data?.leads?.length !== 0 && <div className="leadsInCartCounter">{leadsInCart[0]?.data?.data?.leads?.length}</div>}
          </div>
          <div style={{marginLeft: "4px"}}>
            <div className="lmsweb-header-profile" role="button" onClick={goToProfile}>
              <img style={{ width: "100%", height: "100%" }} src={defaultProfile} alt="image" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeaderNav;
