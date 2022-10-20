import React, { useEffect, useState } from "react";
// import upgrade from "../../../Images/upgrade.png";
// import chat from "../../../Images/chat.png";
// import communtiy from "../../../Images/community.png";
// import terms from "../../../Images/newabout.png";
// import signout from "../../../Images/signout.png";
// import comingSoon from "../../../Images/comingSoon.svg";
// import leadsImageOutlined from "../../../Images/OutlinedVector2.svg";
// import leadsImageSelected from "../../../Images/SelectedVector2.svg";
// import questionCircle from "../../../Images/questionCircleVector.svg";
// import questionCircleSelected from "../../../Images/questionCircleVectorSelected.svg";
// import infoVectorSelected from "../../../Images/infoCircleVectorSelected.svg";
// import callIcon from "../../../Images/RelationshipCallIcon.svg";
// import block1 from "../../../3dComponents/3dImages/block1.svg";
// import vendorsSubs from "../../../VendorComponentsMain/VendorImgs/vendorsSubs.svg";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";
// import Measurement from "../../Images/Measurement.svg";
import { fetchProfileData } from "../../../Redux/Actions";
// import sidebaricon from "../../../VendorComponentsMain/VendorImgs/sidebaricon.svg";
import { Dropdown, Modal } from "react-bootstrap";
// import { handleLogout } from "../../../Redux/Reducers/auth";
// import CreateNewProjectButton from "./PMTconnectionData/CreateNewProjectButton";
import { SidebarLinksArray } from "./SidebarLinksArray";
// import CreateNewProjectButton from "./PMTconnectionData/CreateNewProjectButton";
// import requestReceived from "./iconimages/requestReceived.svg"
// import mssg from "./iconimages/mssg.svg"
import sendcall from "./iconimages/sendcall.svg"
import sendmess from "./iconimages/sendmess.svg"

const SidebarWebNew = () => {
  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.addToCartReducer.profileData);
  console.log(profileData)
  // console.log(profileData[0]?.data?.data?.isVendorSubscribed)
  
  const path = useLocation();
  const goToNav = (location) => {
    navigateTo(`/${location}`);
  };

  useEffect(() => {
    dispatch(fetchProfileData(authTok));
  }, []);

  const goLogOut = () => {
    confirmAlert({
      message: `Are you sure you want to logout?`,
      buttons: [
        {
          label: "Yes",
          // onClick: () => dispatch(handleLogout()),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const cityArr = ["Delhi", "delhi", "Noida", "noida", "Faridabad", "faridabad", "Ghaziabad", "ghaziabad", "Gurugram", "gurugram", "Gurgaon", "gurgaon"];

  // console.log(path)

  // console.log(profileData[0]?.data?.data?.rmProfile);
  // console.log(path.pathname)
  
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

  return (
    <React.Fragment>
      <Modal show={show} onHide={handleClose} centered size="md" >
        <Modal.Body style={{ height: "22rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="d-flex flex-column align-items-center justify-content-between p-4 w-100" style={{height: "100%"}}>
            {/* <img src={mssg} alt="" /> */}
            <div style={{ fontSize: "20px", fontWeight: "500", color: "black" }}>Message Received</div>
            <div style={{ fontSize: "16px", fontWeight: "400", color: "black", textAlign: "center" }}>We have’ve received your message, you can <br /> expect a reply within 24 hours</div>
            <button className="" style={{ background: "#176091", color: "white", border: "none", height: "40px", textAlign: "center", width: " 85%", fontSize: "14px", borderRadius: "8px" }} onClick={handleClose}>Okay</button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={show2} onHide={handleClose2} centered size="md">
        <Modal.Body style={{ height: "22rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="d-flex flex-column align-items-center justify-content-between p-4 w-100" style={{height: "100%"}}>
            {/* <img src={requestReceived} alt="" /> */}
            <div style={{fontSize: "20px", fontWeight: "500", color: "black"}}>Request Received</div>
            <div style={{ fontSize: "16px", fontWeight: "400", color: "black", textAlign: "center" }}>We have’ve received your request, <br /> you can expect a call within 4 hours</div>
            <button className="" style={{ background: "#176091", color: "white", border: "none", height: "40px", textAlign: "center", width: " 85%", fontSize: "14px", borderRadius: "8px" }} onClick={handleClose2}>Okay</button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={show3} onHide={handleClose3} centered size="md" >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px", fontWeight: "500", color: "black" }}>Send Message</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "19rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="d-flex flex-column align-items-center justify-content-between w-100" style={{ height: "100%" }}>
            <textarea value={message} onChange={handleChange} style={{ width: "100%", resize: "none", height: "77%", padding: "0.5rem 0rem 0 0.5rem", background: "#F0F0F0",border: "1px solid #DFDFDF",borderRadius: "4px" }} placeholder="Write your message here..."></textarea>
            <button className="" style={{ background: "#176091", color: "white", border: "none", height: "36px", textAlign: "center", width: " 30%", marginLeft: "auto", fontSize: "14px", borderRadius: "8px" }} onClick={handle2Func}>Send</button>
          
          </div>
          
        </Modal.Body>
      </Modal>
      <div className="sidenav" style={{ padding: "16px 16px 16px 10px", width: "18vw" }}>
        <div className="d-flex flex-column mt-2">
          {/* <div className="w-100">
          <CreateNewProjectButton />
            <hr />
          </div> */}
          <div className="d-flex flex-column pt-2 " style={{ paddingBottom: "5rem" }}>
            { SidebarLinksArray && SidebarLinksArray.map((item, index) => (
              <div
                className={`/${item.towards}` === path.pathname ? "d-flex sidebarLinks-active flex-wrap ps-2 " : "d-flex sidebarLinks flex-wrap ps-2 "}
                onClick={() => {
                  if (item.comingSoon === false) {
                    goToNav(`${item.towards}`);
                  }
                }}
              >
                <img className="sideNavImage me-0" src={`/${item.towards}` === path.pathname ? item.selected : item.notSelected} />
                {/* {item.notSelected} */}
                <span style={`/${item.towards}` === path.pathname ? { marginLeft: "0.75rem", color: "#3B5998" }: { marginLeft: "0.75rem", color: "#888888" }}>{item.label}</span>
                {item.comingSoon && (
                  <div className="" style={{
                    color: "#888888", border: "1px solid #dfdfdf", borderRadius: "50px", fontSize: "8px", width: "6rem",
                    height: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", marginLeft: "1.5rem", marginTop: "0.25rem"
                  }}>
                    Coming Soon
                  </div>
                )}
              </div>
            ))}
          </div>
          <hr />
          {profileData && profileData[0]?.data?.data?.planId?.name === "Free" ? (
            <>
              <div role="button" className="unique d-flex justify-content-center align-items-center ms-3" style={{ borderRadius: "4px" }} onClick={() => goToNav("plans")}>
                {/* <img className="sideNavImage" src={upgrade} />  */}
                <span>Upgrade to Premium</span>
              </div>
              <hr style={{ height: "0.5px" }} />
            </>
          ) : null}
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
        <div className="ps-4">
          {profileData[0]?.data?.data?.rmProfile?.name && (
            <Dropdown drop="end" style={{ backgroundColor: "#ffffff", border: "none", outline: "none" }}>
              <Dropdown.Toggle as="button" style={{ backgroundColor: "#ffffff", border: "none", color: "#000000" }}>
                <div style={{ fontSize: "14px", fontWeight: "500", display: "flex", flexDirection: "column", alignItems: "start" }}>
                  <div style={{ color: "#176091" }}>Contact me</div>
                  <div>{profileData && profileData[0]?.data?.data?.rmProfile?.name}</div>
                  <div>Relationship Manager</div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ padding: "1rem 1rem 0 1rem" }}>
                <div style={{ display: "flex", width: "20rem" }}>
                  <div style={{ height: "100%",  overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img style={{ height: "3.5rem", width: "3.5rem", borderRadius: "50%", }} src={profileData && profileData[0]?.data?.data?.rmProfile?.profileImagePath} alt="" />
                  </div>
                  <div style={{ width: "85%", fontSize: "12px", marginLeft: "1rem" }}>
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
                  <div style={{ width: "50%", borderRight: "1px solid #dfdfdf", textAlign: "center", padding: "0.5rem 0rem", color: "#176091" }} onClick={handleShow2}> 
                  <img src={sendcall} style={{height: "14px", width: "14px", marginRight: "0.15rem"}} /> 
                  Request a callback</div>
                  <div style={{ width: "50%", textAlign: "center", padding: "0.5rem 0rem", color: "#176091" }} onClick={handleShow3}>  
                  <img src={sendmess} style={{ height: "15px", width: "15px", marginRight: "0.15rem" }} />
                  Send a message</div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <div className="signout--- sidebarLinks ps-3" onClick={goLogOut}>
          {/* <img className="sideNavImage" src={signout} /> */}
          <span>Sign Out</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SidebarWebNew;
