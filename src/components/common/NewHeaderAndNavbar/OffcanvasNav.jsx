/* eslint-disable import/first */
import React, { useState } from "react";

import { useEffect } from "react";

import { Dropdown, Modal, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import call from "./iconimages/call.svg";;
import cartImageOutlined from "./iconimages/OutlinedVector3.svg";
import cartImageSelected from "./iconimages/SelectedVector3.svg";
import newcross from "./iconimages/newcross.svg";
import signOutIcon2 from "./iconimages/signOutIcon2.svg";
import { SidebarLinksArray } from "./SidebarLinksArray";
import { GrDown } from 'react-icons/gr'
import requestReceived from "./iconimages/requestReceived.svg"
import mssg from "./iconimages/mssg.svg"
import sendcall from "./iconimages/sendcall.svg"
import sendmess from "./iconimages/sendmess.svg"
import { cleanProFileDataOnLogout, fetchProfileData } from "../../../Redux/Actions";
// import { postReq } from "../../../../Services/api";

const OffcanvasNav = (props) => {
  const path = useLocation();
  const dispatch = useDispatch();
  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
  const [profileInfo, setProfileInfo] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const profileData = useSelector((state) => state.communityPersistReducer.profileData);
  const profileData = useSelector(
    (state) => state.addToCartReducer.profileData
  );
  const navigateTo = useNavigate();
  useEffect(() => {
    dispatch(fetchProfileData(authTok));
  }, []);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const handle2Func = () => {
    setShow3(false)
    setShow(true)
  }

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
      <Modal show={show} onHide={handleClose} centered size="md" style={{zIndex: "1"}} >
        <Modal.Body style={{ height: "22rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="d-flex flex-column align-items-center justify-content-between p-4 w-100" style={{ height: "100%" }}>
            <img src={mssg} alt="" />
            <div style={{ fontSize: "20px", fontWeight: "500", color: "black" }}>Message Received</div>
            <div style={{ fontSize: "16px", fontWeight: "400", color: "black", textAlign: "center" }}>We have’ve received your message, you can <br /> expect a reply within 24 hours</div>
            <button className="" style={{ background: "#176091", color: "white", border: "none", height: "40px", textAlign: "center", width: " 100%", fontSize: "14px", borderRadius: "8px" }} onClick={handleClose}>Okay</button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={show2} onHide={handleClose2} centered size="md" style={{ zIndex: "1" }}>
        <Modal.Body style={{ height: "22rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="d-flex flex-column align-items-center justify-content-between p-4 w-100" style={{ height: "100%" }}>
            <img src={requestReceived} alt="" />
            <div style={{ fontSize: "20px", fontWeight: "500", color: "black" }}>Request Received</div>
            <div style={{ fontSize: "16px", fontWeight: "400", color: "black", textAlign: "center" }}>We have’ve received your request, <br /> you can expect a call within 4 hours</div>
            <button className="" style={{ background: "#176091", color: "white", border: "none", height: "40px", textAlign: "center", width: " 100%", fontSize: "14px", borderRadius: "8px" }} onClick={handleClose2}>Okay</button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={show3} onHide={handleClose3} centered size="md" style={{ zIndex: "1" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px", fontWeight: "500", color: "black" }}>Send Message</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "19rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="d-flex flex-column align-items-center justify-content-between w-100" style={{ height: "100%" }}>
            <textarea value={message} onChange={handleChange} style={{ width: "100%", resize: "none", height: "77%", padding: "0.5rem 0rem 0 0.5rem", background: "#F0F0F0", border: "1px solid #DFDFDF", borderRadius: "4px" }} placeholder="Write your message here..."></textarea>
            <button className="" style={{ background: "#176091", color: "white", border: "none", height: "36px", textAlign: "center", width: " 40%", marginLeft: "auto", fontSize: "14px", borderRadius: "8px" }} onClick={handle2Func}>Send</button>
          </div>
        </Modal.Body>
      </Modal>
      {isLoggedIn ? (
        <Offcanvas show={props.sidebarShow} onHide={props.sidebarClose} style={{ width: '290px', borderRadius: "0px 20px 20px 0px" }}>
          <Offcanvas.Header >
            <div className="mt-4 pb-2 d-flex w-100" style={{ borderBottom: "1px solid #DFDFDF" }}>
              <div onClick={() => window.location.assign("https://pro.idesign.market/myprofile")} >
                <div className="sidebar-profile-image" style={{ width: "30px", height: "30px" }}>
                  <img style={{ objectFit: "cover", width: "100%", height: "100%" }} src={profileInfo ? profileInfo[0]?.data?.data?.imageUrl?.thumbnail : null} alt="profile image" />
                </div>
              </div>
              <div className="w-100">
                <div className="fs-5 d-flex flex-column w-100">
                  <div style={{ textDecoration: "none", color: "black", fontSize: "12px", fontWeight: "400" }} onClick={() => window.location.assign("https://pro.idesign.market/myprofile")}>
                    {profileInfo && profileInfo[0]?.data?.data?.companyName}
                  </div>
                  <div className="sidebar-profile-badge2">
                    {profileInfo && profileInfo[0]?.data?.data?.planId?.name === "Free" ? profileInfo[0]?.data?.data?.planId?.name : "Premium"} Plan
                  </div>
                  {/* <div style={{ fontSize: "8px", fontWeight: "400" }} className="sidebar-profile-badge ms-2">
                    {profileInfo && profileInfo[0]?.data?.data?.planId?.name === "Free" ? profileInfo[0]?.data?.data?.planId?.name : "Premium"} Plan
                  </div> */}
                </div>
                {/* <div className="d-flex">
                  <Link style={{ textDecoration: "none", color: "black", fontSize: "12px", fontWeight: "400" }} to="/myprofile">
                    {profileInfo && profileInfo[0]?.data?.data?.type === 1 ? "Interior Designer" : "Contractor"}
                  </Link>
                </div> */}
              </div>
            </div>
            <GrDown style={{ transform: "rotate(270deg)", color: "#888888" }} />
            <img src={newcross} onClick={props.sidebarClose} style={{
              position: "absolute",
              right: "-10px",
              top: "1rem"
}} />
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column justify-content-between px-3" >
            <div>
              <div className="mt-2 pb-2" style={{ borderBottom: "1px solid #DFDFDF" }}>
                {/* <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px", color: "#888888" }}>
                  <div className="me-2 d-flex align-items-center">
                    <img style={path.pathname === "/lead" ? { opacity: "1.0" } : { opacity: "0.5" }} src={path.pathname === "/lead" ? leadsImageSelected : leadsImageOutlined} />
                  </div>
                  <Link style={path.pathname === "/lead" ? { textDecoration: "none", color: "#176091" } : { textDecoration: "none", color: "#888888" }} to="/lead">
                    <div>Leads</div>
                  </Link>
                </div> */}
                {/* <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px", color: "#888888" }} onClick={() => goToNav("3dLanding")}>
                  <div className="me-2 d-flex align-items-center">
                    <img style={{ opacity: "1", height: "17px" }} src={block1} />
                  </div>
                  <div>Book 3D views</div>
                </div> */}

                {/* {cityArr.map((element) => {
                  if (profileData[0]?.data?.data?.city === element) {
                    return (
                      <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px", color: "#888888" }}>
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
                })} */}
  
                {/* <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px", color: "#888888" }}>
                  <div className="me-2 d-flex align-items-center">
                    <img style={{ opacity: "0.5" }} src={communityImageOutlined} />
                  </div>
                  <div>Community</div>
                  <div style={{ paddingLeft: "1rem" }}>
                    <img style={{ width: "3rem" }} src={comingSoonImage} />
                  </div>
                </div> */}
                {/* <div className="ms-3 mb-2 d-flex" style={{ fontSize: "14px", color: "#888888" }}>
                  <div className="me-2 d-flex align-items-center">
                    <img style={{ opacity: "0.5" }} src={chatImageOutlined} />
                  </div>
                  <div>Chat</div>
                  <div style={{ paddingLeft: "1rem" }}>
                    <img style={{ width: "3rem" }} src={comingSoonImage} />
                  </div>
                </div> */}
                {SidebarLinksArray.map((item, index) => (
                  <div className="mb-2 d-flex" style={{ fontSize: "14px" }} onClick={() => {
                    if (item.comingSoon === false){
                      window.location.assign(item.towards)

                    }
                    }}>
                    <div className="me-2 d-flex align-items-center flex-wrap">
                      <img style={{ opacity: "1", height: "16px", width: "16px" }} src={`/${item.towards}` === path.pathname ? item.selected : item.notSelected} />
                      {/* {item.notSelected} */}
                    </div>
                    <div style={`/${item.towards}` === path.pathname ? { color: "#3B5998" } : { color: "#888888" }}>{item.label}</div>
                    {item.comingSoon && <div className="" style={{
                      color: "#888888", border: "1px solid #dfdfdf", borderRadius: "50px", fontSize: "8px", width: "6rem",
                      height: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center", marginLeft: "1.5rem", marginTop: "0.25rem"
                    }}>
                      Coming Soon
                    </div>}
                  </div>
                ))}
       

                <div className="mb-2 d-flex" style={{ fontSize: "14px", color: "#888888" }}>
                  <div className="me-2 d-flex align-items-center">
                    <img style={path.pathname === "/mycart" ? { opacity: "1.0" } : { opacity: "0.5" }} src={path.pathname === "/mycart" ? cartImageSelected : cartImageOutlined} />
                  </div>
                  <div style={{textDecoration: "none", color: "#888888" }} onClick={() => window.location.assign("https://pro.idesign.market/mycart")}>
                    <div>My Cart</div>
                  </div>
                </div>
              </div>
              {profileInfo && profileInfo[0]?.data?.data?.planId?.name === "Free" ? (
                <div className="w-100 d-flex justify-content-center" style={{ paddingBottom: "5px", paddingTop: "1.5rem" }}>
                  <button className="upgrade-premium-button">
                    <div style={{ textDecoration: "none", color: "white", fontSize: "14px", fontWeight: "500" }} onClick={() => window.location.assign("https://pro.idesign.market/my-plan-details")}>
                      Upgrade to Premium Plan
                    </div>
                  </button>
                </div>
              ) : null}
            </div>
            <div className="ps-2 mb-3 py-2" style={{ borderBottom: "1px solid #DFDFDF", borderTop: "1px solid #DFDFDF", marginTop: "auto" }}>
              {profileData[0]?.data?.data?.rmProfile?.name && (
                <div>
                  <Dropdown drop="top" style={{ backgroundColor: "white", border: "none", outline: "none" }}>
                    <Dropdown.Toggle as="button" style={{ backgroundColor: "white", border: "none", color: "#000000", width: "100%", justifyContent: "space-between" }}>
                      <div className="d-flex w-100">
                        <div style={{ fontSize: "14px", fontWeight: "500", display: "flex", flexDirection: "column", alignItems: "start" }}>
                          <div>{profileData && profileData[0]?.data?.data?.rmProfile?.name}</div>
                          <div style={{ color: "#888888", fontSize: "12px", fontWeight: "400" }}>Relationship Manager</div>
                        </div>
                        <img className="ms-auto" src={call} alt="" />
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ padding: "1rem 1rem 0 1rem" }}>
                      <div style={{ display: "flex", width: "18rem", justifyContent: "space-between" }}>
                        <div style={{ height: "2.5rem", width: "2.5rem", borderRadius: "50%", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <img style={{ height: "100%" }} src={profileData && profileData[0]?.data?.data?.rmProfile?.profileImagePath} alt="" />
                        </div>
                        <div style={{ width: "83%", fontSize: "11px" }}>
                          <div className="mb-2">Hello there!</div>
                          <div className="mb-2">I am {profileData && profileData[0]?.data?.data?.rmProfile?.name}, your relationship manager. I love to travel and to draw anime sketches. </div>
                          <div className="mb-2">If you have any query regarding anything, you can contact me.</div>
                          <div className="mb-2">
                            <span style={{ fontWeight: "500" }}>Call me:</span> {profileData && profileData[0]?.data?.data?.rmProfile?.phoneNumber}
                          </div>
                          <div className="mb-2">
                            <span style={{ fontWeight: "500" }}>Email me:</span> {profileData && profileData[0]?.data?.data?.rmProfile?.email}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-around", borderTop: "1px solid #dfdfdf" }}>
                        <div style={{ width: "50%", borderRight: "1px solid #dfdfdf", textAlign: "center",  fontSize: "12px", padding: "0.5rem 0rem", color: "#176091" }}>  <img src={sendcall} style={{ height: "14px", width: "14px", marginRight: "0.15rem" }} /> Request a callback</div>
                        <div style={{ width: "50%", textAlign: "center", padding: "0.5rem 0rem", color: "#176091",fontSize: "12px" }} >  <img src={sendmess} style={{ height: "15px", width: "15px", marginRight: "0.15rem" }} />Send a message</div>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

              )}   </div>
            <div className="ms-3 mb-3 fs-4" onClick={props.openlogModal}>
              <img src={signOutIcon2} style={{ marginRight: "0.5rem", height: "20px" }} />
              <span style={{ fontSize: "14px", color: "#F6691A" }}>Sign Out</span>
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
              <img src={signOutIcon2} style={{ marginRight: "0.5rem" }} />
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

export default OffcanvasNav;
