import React, { useEffect } from "react";
import styles from "./mobHeader.module.css";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineBell } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Accordion, Dropdown, Modal, Offcanvas } from "react-bootstrap";
import { mobHeaderArray } from "./mobHeaderArray";
import OffcanvasNav from "./OffcanvasNav";
// import { fetchProfileData } from "../../Actions";
// import { handleLogout } from "../../../Redux/Actions/auth";
import { confirmAlert } from "react-confirm-alert";
// import { getToken } from "../../../Components/SecureChat/piservices/authService";
// import comingSoon from "../../../Images/comingSoon.svg";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai";
import { HiOutlineShoppingCart, HiOutlineClipboardList, HiOutlineDocumentText } from "react-icons/hi";
import { BsPersonCircle, BsCartCheck } from "react-icons/bs";
import { MdOutlineReviews, MdLogout } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";
import {fetchProfileData } from "../../../Redux/Actions";
// import { postReq } from "../../../../Services/api";
import "./headerweb.css"

const MobHeader = () => {
  // const leadsInCart = useSelector((state) => state.communityPersistReducer.leadsInCart);
  const leadsInCart = useSelector(
    (state) => state.addToCartReducer.leadsInCart
  );
  const [menuShow, setMenuShow] = useState(false);
  const navigateTo = useNavigate();
  const path = useLocation();
  // console.log(path)
  const [showSidebar, setShowSidebar] = useState(false);
  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
  const dispatch = useDispatch();
  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const [show, setShow] = useState(false);
  // const profileData = useSelector((state) => state.communityPersistReducer.profileData);
  const profileData = useSelector(
    (state) => state.addToCartReducer.profileData
  );

  const goToNav = (location) => {
    navigateTo(`/${location}`);
  };
  useEffect(() => {
    dispatch(fetchProfileData(authTok));
  }, []);
  // const logoutHandler = () => {
  //   setShowSidebar(false);
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

  // const goLogOut = () => {
  //   const res = postReq(`https://pro-api.idesign.market/user/logout`);
  //   if (res && !res.error) {
  //     localStorage.removeItem("token");
  //     window.location.assign("https://pro.idesign.market");
  //     // dispatch(cleanProFileDataOnLogout());
  //   } else {
  //     console.log(res.error);
  //   }
  // };

  var firstLetter2 = "";
  var secondLetter2 = "";

  // const firstLetter2 =
  //     localStorage.getItem("initialName") &&
  //     localStorage.getItem("initialName").split(" ")[0].split("")[0].toUpperCase();
  // const secondLetter2 =
  //     localStorage.getItem("initialName") &&
  //     localStorage.getItem("initialName").split(" ")[0] &&
  //     localStorage.getItem("initialName").split(" ")[1].split("")[0].toUpperCase();

  if (profileData[0]?.data?.data?.companyName && profileData[0]?.data?.data?.companyName.includes(" ") == true) {
    firstLetter2 = profileData[0]?.data?.data?.companyName.split(" ")[0][0].toUpperCase();
    secondLetter2 = profileData[0]?.data?.data?.companyName.split(" ")[1][0].toUpperCase();
  }
  if (profileData[0]?.data?.data?.companyName && profileData[0]?.data?.data?.companyName.includes(" ") == false) {
    firstLetter2 = profileData[0]?.data?.data?.companyName.split(" ")[0][0].toUpperCase();
  }
  const initials2 = firstLetter2 + secondLetter2;
  // console.log(initials2)

  // console.log(initials2)
  const [logoutShow, setLogoutShow] = useState(false);
  const openLogoutModal = () => {
    setLogoutShow(true);
  };

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
            <div className="modal-wrapper-mobile">
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
      <OffcanvasNav sidebarShow={showSidebar} sidebarClose={closeSidebar} 
      // sidebarLogout={goLogOut} openlogModal={openLogoutModal}
       />
  
      <Offcanvas backdropClassName={styles.menuBackDrop} show={menuShow} onHide={() => setMenuShow(false)} placement="top" style={{ height: "fit-content", borderRadius: "0 0 8px 8px", top: "10vh" }}>
        <Offcanvas.Body style={{ padding: "0 1rem 1rem 1rem" }}>
          {mobHeaderArray.map((curElem) => {
            if (curElem.childrenLinks) {
              return (
                <Accordion key={curElem.forKey} className={!curElem.visible && "d-none"}>
                  <Accordion.Header as="div" className={styles.menuAccordion} style={{ border: "none", backgroundColor: "#ffffff", padding: "0", width: "100%" }}>
                    <div style={{ fontSize: "16px" }}>{curElem.label}</div>
                    {/* {curElem.comingSoon && <img style={{ height: "15px" }} className="m-0 ps-3" src={comingSoon} />} */}
                  </Accordion.Header>
                  <Accordion.Body>
                    {curElem.childrenLinks.map((curElem) => {
                      return (
                        <div
                          key={curElem.forKey}
                          className={styles.subLinks}
                          onClick={() => {
                            // alert(curElem.forKey);
                            // if (curElem.forKey == 3) {
                            //   window.location.assign("https://pro.idesign.market/community/")
                            // }
                            // else {
                            //   curElem.navTowards && navigateTo(curElem.navTowards)
                            // }
                            window.location.assign(curElem.navTowards);
                          }}
                        >
                          {curElem.label}
                          {curElem.comingSoon && <div className={styles.smallComingSoon}>coming soon</div>}
                        </div>
                      );
                    })}
                  </Accordion.Body>
                </Accordion>
              );
            } else {
              return (
                <div
                  key={curElem.forKey}
                  className={curElem.visible ? styles.menuLinks : "d-none"}
                  onClick={() => {
                    // if (curElem.forKey == 3) {
                    //   window.location.assign("https://pro.idesign.market/community/");
                    // } else {
                    //   curElem.navTowards && navigateTo(curElem.navTowards);
                    // }
                    window.location.assign(curElem.navTowards);
                  }}
                >
                  {curElem.label}
                  {/* {curElem.comingSoon && <img style={{ height: "15px" }} className="m-0 ps-3" src={comingSoon} />} */}
                </div>
              );
            }
          })}
        </Offcanvas.Body>
      </Offcanvas>
      <div style={{padding:"0 10px"}} className="d-flex align-center justify-between width-100"
      // {styles.mobHeaderContainer}
      >
        <div className={styles.headerLeft}>
          <div
            className={styles.hamburgerIcon}
            onClick={() => {
              setShowSidebar(true);
            }}
          >
            <HiOutlineMenuAlt1 size={20} />
          </div>
          <div className="d-flex align-center"
          // {styles.openMenu}
           onClick={() => setMenuShow(true)}>
            Menu <BsChevronDown style={
            { marginLeft:"3px"}
            } />
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.notification}>
            <AiOutlineBell />
          </div>
          <div className={styles.cartIcon} onClick={() => navigateTo("/mycart")}>
            <MdOutlineShoppingCart />
            {leadsInCart[0] && leadsInCart[0].data.data.leads.length > 0 && <div className={styles.cartLeadNum}>{leadsInCart[0].data.data.leads.length}</div>}
          </div>
          <Dropdown style={{ display: "flex", alignItems: "center" }}>
            <DropdownToggle style={{ border: "none", backgroundColor: "#ffffff", background: 'none' }} as="button">
              <div className={styles.initialsagain}>{initials2}</div>
            </DropdownToggle>
            <Dropdown.Menu style={{ boxShadow: " 0px 0 20px rgb(206 201 201)" }}>
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

              <Dropdown.Item className="dropDownLinks" style={{ color: "#BE4C4C" }} onClick={openLogoutModal}>
                <MdLogout style={{ marginRight: "0.5rem" }} />
                Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MobHeader;
