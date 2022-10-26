import React, { useEffect, useState } from "react";
import HeaderNav from "./HeaderNav";
import SideBarWeb from "./SideBarWeb";
import goBack from "../../Images/gobackicon.svg";
import { useSelector } from "react-redux";
import WebCartAddedLeadCard from "./WebCartAddedLeadCard";
import premiumInfo from "../../Images/premiumPlanInfoIcon.svg";
import check from "../../Images/tickIcon.svg";
import gstDoc from "../../Images/gstShowingDocIcon.svg";
import editIcon from "../../Images/editingPencil.svg";
import cartPlanCardIcon from "../../Images/cartPlanCardIcon.svg";
import premiumTabTick from "../../Images/premiumTabTick.svg";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addPremiumPlanToCart, deletePremiumPlanFromCart, fetchPremiumPlanInCart, fetchProfileData, setGstDetails } from "../Actions";
import { getToken } from "../getToken";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import MyPlanCartMob from "../MyPlanCartMob";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const MyPlanCartWeb = () => {
  const { planId } = useParams();
  const [premiumTab, setPremiumTab] = useState(planId === "1-month-plan" ? 1 : planId === "3-month-plan" ? 3 : null);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const authTok = localStorage.getItem("token") ? getToken() : "";
  const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
  const planInCart = useSelector((state) => state.addToCartReducer.planInCart);

  const initialGstData = {
    companyName: profileInfo[0]?.data?.data?.companyName,
    gstNum: profileInfo[0]?.data?.data?.gstNumber,
  };
  const [gstOffcan, setGstOffcan] = useState(false);
  const [gstData, setGstData] = useState(initialGstData);
  const [showError, setShowError] = useState({
    companyNameError: "",
    gstNumError: "",
  });
  const gstDataInputHandler = (event) => {
    const { name, value } = event.target;
    setGstData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleGstSubmit = () => {
    if (gstData.companyName.length < 1) {
      setShowError((prev) => {
        return {
          ...prev,
          companyNameError: "You cannot leave company name empty",
        };
      });
    } else if (gstData.gstNum.length < 1) {
      setShowError((prev) => {
        return {
          ...prev,
          gstNumError: "You cannot leave GST number empty",
        };
      });
    } else {
      setGstOffcan(false);
      dispatch(setGstDetails(authTok, gstData.gstNum, gstData.companyName));
    }
  };

  const progressToPrefLocation = () => {
    navigateTo("/preferredcities");
  };

  const handlePlanClick = (tabId) => {
    setPremiumTab(tabId);
    navigateTo(`/mycart/${tabId}-month-plan`);
  };

  const removePlanFromCart = () => {
    if (premiumTab === 1) {
      dispatch(deletePremiumPlanFromCart(authTok, "62ebaa44b4de66a62839e0e5"));
    } else if (premiumTab === 3) {
      dispatch(deletePremiumPlanFromCart(authTok, "6200c35b083dd9b8c3f69392"));
    }
    navigateTo("/lead");
  };

  useEffect(() => {
    if (planId === "1-month-plan") {
      setPremiumTab(1);
    } else if (planId === "3-month-plan") {
      setPremiumTab(3);
    }
  }, [planId]);
  useEffect(() => {
    if (premiumTab === 1) {
      dispatch(addPremiumPlanToCart(authTok, "62ebaa44b4de66a62839e0e5"));
    } else if (premiumTab === 3) {
      dispatch(addPremiumPlanToCart(authTok, "6200c35b083dd9b8c3f69392"));
    }
  }, [premiumTab]);

  const [isDesktop, setIsDesktop] = useState(window.screen.width > 767);
  const updateMedia = () => {
    setIsDesktop(window.screen.width > 767);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  // useEffect(() => {
  //   if (profileInfo[0]?.data?.data?.planId?.name !== "Free") {
  //     setCustomCheckbox(false);
  //   } else {
  //     if (planId) {
  //       setCustomCheckbox(true);
  //     } else {
  //       setCustomCheckbox(false);
  //     }
  //   }
  //   dispatch(fetchProfileData(authTok));
  // }, [profileInfo[0]?.data?.data?.planId?.name]);

  return (
    <React.Fragment>
      {isDesktop ? (
        <React.Fragment>
          <Modal
            show={gstOffcan}
            onHide={() => {
              setGstOffcan(false);
            }}
            centered
          >
            <Modal.Header className="p-0" closeButton style={{ margin: "16px 16px 0 16px" }}>
              <Modal.Title>GST Information</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0" style={{ margin: "16px" }}>
              <div style={{ marginBottom: "24px" }}>
                <div>Company Name</div>
                <div>
                  <input className="w-100" placeholder="Type company name" name="companyName" value={gstData.companyName} onChange={gstDataInputHandler} />
                  {gstData?.companyName?.length < 1 && <span style={{ fontSize: "12px", color: "red" }}>{showError.companyNameError}</span>}
                </div>
              </div>
              <div style={{ marginBottom: "32px" }}>
                <div>Registration No.</div>
                <div>
                  <input className="w-100" maxLength={15} placeholder="Enter Registration No." name="gstNum" value={gstData.gstNum} onChange={gstDataInputHandler} />
                  {gstData?.gstNum?.length < 1 && <span style={{ fontSize: "12px", color: "red" }}>{showError.gstNumError}</span>}
                </div>
              </div>
              <div>
                <button className="gstModalWebButton" onClick={handleGstSubmit}>
                  Confirm
                </button>
              </div>
            </Modal.Body>
          </Modal>

          <div style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <HeaderNav />
            <div style={{ height: "90vh", display: "flex" }}>
              <SideBarWeb />
              <div style={{ width: "78vw", padding: "2rem", height: "90vh", overflowY: "scroll" }} className="myCart-wholeContent">
                <div className="webMyCart-header">
                  <div style={{ fontSize: "20px" }} role="button">
                    My Cart
                  </div>
                </div>
                <div style={{ margin: "24px 0", fontSize: "18px" }}>My Items</div>
                <div className="d-flex justify-content-between w-100">
                  <div style={{ width: "65%", overflow: "auto", marginBottom: "1rem" }} className="myCartMiddle">
                    <div>
                      {planInCart[0]?.data?.data?.plan?._id !== "6200c35b083dd9b8c3f69391" && (
                        <div className="cartPlanCard">
                          <div className="me-3 d-flex justify-content-center align-items-center" style={{ width: "6rem", height: "5rem", backgroundColor: "#3B599826", borderRadius: "4px" }}>
                            <img style={{ height: "2.5rem" }} src={cartPlanCardIcon} alt="planCardIcon" />
                          </div>
                          <div className=" d-flex flex-column justify-content-between w-100">
                            <div className="d-flex justify-content-between w-100">
                              <div className="d-flex">
                                <div className="me-2" style={{ fontSize: "16px", fontWeight: "500" }}>
                                  Premium Plan
                                </div>
                                <div className="d-flex">
                                  <div
                                    className={`${premiumTab === 1 ? "activePlanTab" : "inactivePlanTab"}`}
                                    onClick={() => handlePlanClick(1)}
                                    role="button"
                                    style={{ borderRadius: "12px", fontSize: "12px", display: "flex", alignItems: "center", margin: "0 0.5rem", userSelect: "none" }}
                                  >
                                    {premiumTab === 1 && <img style={{ height: "0.8rem", marginRight: "0.2rem" }} src={premiumTabTick} alt="" />} 1 month plan
                                  </div>
                                  <div
                                    className={`${premiumTab === 3 ? "activePlanTab" : "inactivePlanTab"}`}
                                    onClick={() => handlePlanClick(3)}
                                    role="button"
                                    style={{ borderRadius: "12px", fontSize: "12px", display: "flex", alignItems: "center", margin: "0 0.5rem", userSelect: "none" }}
                                  >
                                    {premiumTab === 3 && <img style={{ height: "0.8rem", marginRight: "0.2rem" }} src={premiumTabTick} alt="" />} 3 months plan
                                  </div>
                                </div>
                              </div>
                              <div>{premiumTab === 1 ? "₹ 1999" : premiumTab === 3 ? "₹ 999" : "-"}/month</div>
                            </div>
                            <div style={{ fontSize: "12px", color: "#888888", display: "flex", alignItems: "flex-start", marginTop: "12px", width: "90%" }}>
                              <FontAwesomeIcon icon={faCircle} style={{fontSize: "4px", marginTop: "7px", marginRight: "4px"}} /> Get flat 50% discount on all leads & minimum assured {premiumTab === 1 ? "8" : "12"} queries in{" "}
                              {premiumTab === 1 ? "1 month" : "3 months"}
                            </div>
                            <div style={{ fontSize: "12px", color: "#888888", display: "flex", alignItems: "flex-start", width: "90%" }}>
                              <FontAwesomeIcon icon={faCircle} style={{fontSize: "4px", marginTop: "7px", marginRight: "4px"}} /> We will automatically continue your membership (currently ₹{premiumTab === 1 ? "1,999" : "2,997"} per{" "}
                              {premiumTab === 1 ? "1 month" : "3 months"}) until you cancel
                            </div>
                            <div style={{ fontSize: "12px", color: "#888888", textAlign: "end", position: "absolute", display: "flex", bottom: "12px", right: "12px" }} role="button" onClick={removePlanFromCart}>
                              Remove
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="webCart-pricingPart">
                    <div className="sections">
                      <button className="proceedToBuyButton" onClick={progressToPrefLocation}>
                        Proceed To Buy
                      </button>
                    </div>
                    <div className="sections" style={{ padding: "32px 24px 16px 20px" }}>
                      <div style={{ fontSize: "16px", fontWeight: "400", marginBottom: "16px" }}>Price Details</div>
                      <div className="d-flex justify-content-between">
                        <div style={{ fontSize: "14px", fontWeight: "700" }}>Item Price (1)</div>
                        <div style={{ fontSize: "14px", fontWeight: "400" }}>₹ {planInCart[0]?.data?.data?.planPrice}</div>
                      </div>

                      <div className="d-flex justify-content-between" style={{ borderBottom: "1px solid #DFDFDF", paddingBottom: "16px", marginBottom: "16px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "700" }}>GST- 18%</div>
                        <div style={{ fontSize: "14px", fontWeight: "400" }}>₹ {planInCart[0]?.data?.data?.gst}</div>
                      </div>

                      <div className="d-flex justify-content-between">
                        <div style={{ fontSize: "16px", fontWeight: "700" }}>Total Price</div>
                        <div style={{ fontSize: "14px", fontWeight: "400" }}>₹ {Math.round(planInCart[0]?.data?.data?.totalPrice)}</div>
                      </div>
                    </div>

                    <div className="sections" style={{ padding: "12px 18px 16px 18px" }}>
                      <div className="d-flex align-items-center">
                        <div>
                          <div
                            className="customCheckbox"
                            style={{ marginRight: "12px", userSelect: "none" }}
                            onClick={() => {
                              setGstOffcan(true);
                            }}
                            role="button"
                          >
                            {profileInfo[0]?.data?.data?.gstNumber ? <img src={check} /> : null}
                          </div>
                        </div>
                        <div>
                          I have a GST number <span>(Optional)</span>
                        </div>
                      </div>
                      {profileInfo[0]?.data?.data?.gstCompanyName && profileInfo[0]?.data?.data?.gstNumber ? (
                        <div>
                          <div className="gstInfoShowingBox" style={{ padding: "12px 16px 12px 12px" }}>
                            <div className="d-flex align-items-center">
                              <div style={{ marginRight: "10px", display: "flex", alignItems: "center" }}>
                                <img src={gstDoc} />
                              </div>
                              <div>
                                <div style={{ fontSize: "12px", fontWeight: "700" }}>{profileInfo[0]?.data?.data?.gstCompanyName}</div>
                                <div style={{ fontSize: "12px", fontWeight: "700" }}>{profileInfo[0]?.data?.data?.gstNumber}</div>
                              </div>
                            </div>
                            <div>
                              <img
                                src={editIcon}
                                role="button"
                                onClick={() => {
                                  setGstOffcan(true);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <MyPlanCartMob />
      )}
    </React.Fragment>
  );
};

export default MyPlanCartWeb;
