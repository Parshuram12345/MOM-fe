import React, { useEffect, useState } from "react";
import logo_idesign from "./iconimages/logo-idesign.png";
import notification from "./iconimages/notificationWebIcon.svg";
import cart from "./iconimages/cartIcon.svg";
import cartImageSelected from "./iconimages/SelectedVector3.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Dropdown, Modal } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { AiOutlineBell, AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai";
import { HiOutlineShoppingCart, HiOutlineClipboardList, HiOutlineDocumentText } from "react-icons/hi";
import { BsPersonCircle, BsCartCheck, BsChevronDown } from "react-icons/bs";
import { MdOutlineReviews, MdLogout } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";
// import { handleLogout } from "../../../Redux/Actions/auth";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { fetchLeadsInCart } from "../../../Redux/Actions";
import './HeaderandNav.css';
import "./headerweb.css"

const HeaderWeb = () => {
  const authTok = localStorage.getItem("token");
  // const profileData = useSelector((state) => state.communityPersistReducer.profileData);
  // const leadsInCart = useSelector((state) => state.communityPersistReducer.leadsInCart);
  const leadsInCart = useSelector(
    (state) => state.addToCartReducer.leadsInCart
  );
  const profileData = useSelector(
    (state) => state.addToCartReducer.profileData
  );
  const path = useLocation();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const goToCart = () => {
    navigateTo("/mycart");
  };
  const goToProfile = () => {
    navigateTo("/myprofile");
  };

  const goToNav = (location) => {
    navigateTo(`/${location}`);
  };

  const cityArr = ["Delhi", "delhi", "Noida", "noida", "Faridabad", "faridabad", "Ghaziabad", "ghaziabad", "Gurugram", "gurugram", "Gurgaon", "gurgaon"];

  // const goLogOut = () => {
  //   confirmAlert({
  //     message: `Are you sure you want to logout?`,
  //     buttons: [
  //       {
  //         label: "Yes",
  //         // onClick: () => dispatch(handleLogout()),
  //       },
  //       {
  //         label: "No",
  //       },
  //     ],
  //   });
  // };

  useEffect(() => {
    dispatch(fetchLeadsInCart(`Bearer ${authTok}`));
  }, []);

  const [logoutShow, setLogoutShow] = useState(false);
  // const openLogoutModal = (value) => {
  //   setLogoutShow(value);
  // };

  return (
    <React.Fragment>
      {/* <Modal centered show={logoutShow}>
        <Modal.Body>Are you sure you want to Logout?</Modal.Body>
        <Modal.Footer>
          <div className="w-100 d-flex justify-content-end">
            <div>
              <button style={{ border: "1px solid #176091", marginRight: "1rem", padding: "0.3rem 0.8rem", borderRadius: "8px", backgroundColor: "#FFFFFF" }} onClick={goLogOut}>
                Yes
              </button>
              <button
                style={{ border: "1px solid #176091", marginRight: "1rem", padding: "0.3rem 0.8rem", borderRadius: "8px", backgroundColor: "#176091", color: "#FFFFFF" }}
                onClick={() => setLogoutShow(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal> */}
      { logoutShow && <div className="main-modal-wrapper">
            <div className="modal-wrapper-web">
              <div className="content">
                <p className="notice-text"> Are you sure you want to Logout?</p>
              </div>
              <div style={{marginTop:"20px"}} className="d-flex width-50">
                <div
                  className="ui button yes-logout-btn"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.assign("https://pro.idesign.market")
                  }}
                >
                  Yes
                </div>
                <div
                  className="ui button no-logout-btn"
                  onClick={()=>setLogoutShow(false)}
                >
                  No
                </div>
              </div>
            </div>
          </div>} 
      <div className="lmsweb-header" style={{ height: "10vh" }}>
        <div className="d-flex" style={{height: "100%"}}>
          <div
            className="lmsweb-header-logo"
            role="button"
            onClick={() => {
              navigateTo("/lead");
            }}
          >
           <img src={logo_idesign} />
          </div>
          {/* <div className="header-search">
            <img src={search} />
            <input type="search" placeholder="Search" />
          </div> */}
          <div className="d-flex align-items-center" style={{ marginLeft: "5rem" }}>
            <div className={path.pathname === "/lead" ? "headerLinks-active" : "headerLinks"} onClick={() => window.location.assign("https://pro.idesign.market/lead")}>
              Manage Leads
            </div>
            <div className={path.pathname === "/buy-leads" ? "headerLinks-active" : "headerLinks"} onClick={() => window.location.assign("https://pro.idesign.market/buy-leads")}>
              Buy Leads
            </div>
            <div className={path.pathname === "/3dLanding" || path.pathname === "/3dFinal" || path.pathname === "/3dUploadCad" || path.pathname === "/3dSelectRoom" || path.pathname === "/3dMakePPT" || path.pathname === "/3dMakePPT/MakeOne" || path.pathname === "/3dMakePPT/UploadPdf" || path.pathname === "/3dCart" || path.pathname === "/3dCartHalf" ? "headerLinks-active" : "headerLinks"} onClick={() => window.location.assign("https://pro.idesign.market/3dLanding")}>
             Book 3D Service
            </div>
            {/* <Dropdown style={{ display: "flex", alignItems: "center" }}>
              <DropdownToggle style={{ border: "none", backgroundColor: "#ffffff" }} as="button">
                <div className="headerLinks" style={{ marginLeft: "-5px" }}>
                  Services <BsChevronDown size={12} style={{ fontWeight: "500" }} />
                </div>
              </DropdownToggle>
              <Dropdown.Menu>
                <Dropdown.Item className="dropDownLinks" onClick={() => goToNav("3dLanding")}>
                  3D Service
                </Dropdown.Item>
                {cityArr.map((element) => {
                  if (profileData[0]?.data?.data?.city === element) {
                    return (
                      <Dropdown.Item className="dropDownLinks">
                        Measurement
                      </Dropdown.Item>
                    );
                  }
                })}
              </Dropdown.Menu>
            </Dropdown> */}
          
            {/* <div className="headerLinks" onClick={() => goToNav("community/")}>Community</div> */}
        
            <a href =  "https://pro.idesign.market/community/" style={{textDecoration: "none", color: "black",marginTop:"5px"}}>
            <div className="headerLinks">Community</div>
          </a>
            {/* <div className="headerLinks">
              Vendor <img style={{ height: "15px" }} className="m-0 ms-1" src={comingSoon} />
            </div> */}
          </div>
        </div>
        <div className="lmsweb-header-controls">
          <div style={{ marginRight: "16px" }}>
            <img style={{ height: "20px" }} src={notification} />
          </div>
          <div style={{ marginRight: "8px", marginLeft: "4px", display: "flex" }} role="button" onClick={goToCart}>
            <img style={{ height: "20px" }} src={path.pathname === "/mycart" ? cartImageSelected : cart} />
            {leadsInCart[0]?.data?.data?.leads?.length !== 0 && <div className="leadsInCartCounter">{leadsInCart[0]?.data?.data?.leads?.length}</div>}
          </div>
          {/* <div style={{marginLeft: "4px"}}>
            <div className="lmsweb-header-profile" role="button" onClick={goToProfile}>
              <img style={{ width: "100%", height: "100%" }} src={defaultProfile} alt="image" />
            </div>
          </div> */}
          <div>
            <Dropdown style={{ display: "flex", alignItems: "center" }}>
              <DropdownToggle style={{ border: "none", backgroundColor: "#ffffff" }} as="button">
                <div className="d-flex">
                  {/* <div className="profileImageContainer">{profileData ? <img src={profileData[0]?.data?.data?.imageUrl?.thumbnail} alt="" /> : <BsPersonCircle />}</div> */}
                  <div className="d-flex flex-column align-items-start">
                    <div style={{ fontSize: "14px", fontWeight: "500" }}>
                      {profileData && profileData[0]?.data?.data?.companyName} <BsChevronDown />
                    </div>
                    <div style={{ fontSize: "12px", backgroundColor: "#17609126", borderRadius: "50px", padding: "0 0.7rem" }}>
                      {profileData && (profileData[0]?.data?.data?.planId?._id === "6200c35b083dd9b8c3f69391" ? "Free Plan" : "Premium Plan")}
                    </div>
                  </div>
                </div>
              </DropdownToggle>
              <Dropdown.Menu>
                <Dropdown.Item className="dropDownLinks" onClick={() => window.location.assign("https://pro.idesign.market/myprofile")} myprofile>
                  <BsPersonCircle style={{ marginRight: "0.5rem" }} />
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item className="dropDownLinks" onClick={() => window.location.assign("https://pro.idesign.market/my-plan-details")}>
                  <HiOutlineClipboardList style={{ marginRight: "0.5rem" }} />
                  My Plan
                </Dropdown.Item>
                <Dropdown.Item className="dropDownLinks" onClick={() => window.location.assign("https://pro.idesign.market/myreviewspage")}>
                  <MdOutlineReviews style={{ marginRight: "0.5rem" }} />
                  Reviews
                </Dropdown.Item>
                {/* <Dropdown.Item className="dropDownLinks" onClick={goToCart}>
                  <BsCartCheck style={{ marginRight: "0.5rem" }} />
                  My Orders
                </Dropdown.Item> */}
                <Dropdown.Divider />

                <Dropdown.Item className="dropDownLinks" onClick={() => window.location.assign("https://pro.idesign.market/aboutidesign")}>
                  <AiOutlineInfoCircle style={{ marginRight: "0.5rem" }} />
                  About iDesign
                </Dropdown.Item>
                <Dropdown.Item className="dropDownLinks" onClick={() => window.location.assign("https://pro.idesign.market/howidesignworks")} >
                  <AiOutlineQuestionCircle style={{ marginRight: "0.5rem" }} />
                  How iDesign Works
                </Dropdown.Item>
                {/* <Dropdown.Item className="dropDownLinks">
                  <HiOutlineDocumentText style={{ marginRight: "0.5rem" }} />
                  Terms & Conditions
                </Dropdown.Item> */}
                <Dropdown.Divider />

                <Dropdown.Item className="dropDownLinks" style={{ color: "#BE4C4C" }} onClick={()=> setLogoutShow(true)}>
                  <MdLogout style={{ marginRight: "0.5rem" }} />
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeaderWeb;
