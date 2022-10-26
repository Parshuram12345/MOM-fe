import { faCircle, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Form, Offcanvas, Overlay, OverlayTrigger, Popover } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addPremiumPlanToCart, deleteLeadFromCart, deletePremiumPlanFromCart, fetchLeadsInCart, fetchPremiumPlanInfo, fetchProfileData, removeFromCart, setGstDetails } from "./Actions";
import closeCanvasBar from "./Images/closeCanvasBar.svg";
import { getToken } from "./getToken";
import BottomNav from "./BottomNav";
import CartAddedLeadCard from "./CartAddedLeadCard";
import gstDoc from "../Images/gstDocument.svg";
import left from "./Images/leftarrow.png";
import check from "../Images/tickIcon.svg";
import premiumTabTick from "../Images/premiumTabTick.svg";
import cartPlanCardIcon from "../Images/cartPlanCardIcon.svg";
import { useParams } from "react-router-dom";

export default function MyPlanCartMob() {
  const { planId } = useParams();
  const [premiumTab, setPremiumTab] = useState(planId === "1-month-plan" ? 1 : planId === "3-month-plan" ? 3 : null);
  const path = useLocation();
  const navigateTo = useNavigate();
  const authTok = getToken() ? getToken() : "";

  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
  const planInCart = useSelector((state) => state.addToCartReducer.planInCart);

  //everything related to the GST below this
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
  const gstOffcanHandler = (event) => {
    setGstOffcan(event.target.checked);
  };
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

  const handleCheckout = () => {
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

  return (
    <React.Fragment>
      <Offcanvas
        show={gstOffcan}
        onHide={() => {
          setGstOffcan(false);
        }}
        placement="bottom"
        style={{ height: "fit-content", borderRadius: "1rem 1rem 0 0" }}
      >
        <Offcanvas.Header className="mb-0">
          <div
            className="w-100 d-flex justify-content-center"
            onClick={() => {
              setGstOffcan(false);
            }}
          >
            <img src={closeCanvasBar} />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-3">
          <div className="w-100 fs-4 fw-bold mb-3">GST Information</div>
          <div className="mb-3">
            <Form.Control type="text" value={gstData.companyName} name="companyName" placeholder="Company Name" onChange={gstDataInputHandler} />
            {gstData?.companyName?.length < 1 && <span style={{ color: "red", fontSize: "10px", fontWeight: "400" }}>{showError.companyNameError}</span>}
          </div>
          <div className="mb-3">
            <Form.Control type="text" maxLength={15} value={gstData.gstNum} name="gstNum" placeholder="GST Number" onChange={gstDataInputHandler} />
            {gstData?.gstNum?.length < 1 && <span style={{ color: "red", fontSize: "10px", fontWeight: "400" }}>{showError.gstNumError}</span>}
          </div>
          <div className="w-100 d-flex justify-content-center">
            <button style={{ width: "100%", padding: "0.5rem", border: "none", backgroundColor: "#176091", color: "white", borderRadius: "0.3rem" }} onClick={handleGstSubmit}>
              CONFIRM
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <div>
        <div>
          <div>
            <div className="myCart-container">
              <div className="heading">
                <Link to="/lead">
                  <img style={{ width: "5px", height: "10px", marginRight: "0.5rem" }} src={left} />
                </Link>
                <div style={{ fontSize: "18px", fontWeight: "600", padding: "6px 0" }}>My Cart</div>
              </div>

              <div className="priceDetailsCard">
                <h6>Price Details</h6>
                <div className="leadPrice-container p">
                  <div className="price" style={{ fontSize: "14px", fontWeight: "400" }}>
                    Item Price (1)
                  </div>
                  <div className="actualPrice" style={{ fontSize: "14px", fontWeight: "600" }}>
                    ₹ {planInCart[0]?.data?.data?.planPrice}
                  </div>
                </div>

                <div className="gst-container p">
                  <div className="gst" style={{ fontSize: "14px", fontWeight: "400" }}>
                    GST-18%
                  </div>
                  <div className="actualGst" style={{ fontSize: "14px", fontWeight: "600" }}>
                    ₹ {planInCart[0]?.data?.data?.gst}
                  </div>
                </div>

                <div className="totalPrice-container p">
                  <div className="totalprice mb-2">Total Price</div>
                  <div className="actualTotalPrice" style={{ fontSize: "14px", fontWeight: "600" }}>
                    ₹ {planInCart[0]?.data?.data?.totalPrice}
                  </div>
                </div>
              </div>

              <div className="optionToAddPremiumPlan-container">
                <div className="w-100 p-3 mt-3" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                  <div className="d-flex align-items-center">
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
                    <div>
                      <span style={{ fontSize: "14px", fontWeight: "600" }}>I have a GST number</span>
                      <span style={{ fontSize: "14px", fontWeight: "400" }}> (Optional)</span>
                    </div>
                  </div>
                  {profileInfo[0]?.data?.data?.gstCompanyName && profileInfo[0]?.data?.data?.gstNumber ? (
                    <div className="w-100 p-2 mt-2 d-flex justify-content-between" style={{ backgroundColor: "#F6F6F6" }}>
                      <div className="d-flex">
                        <div className="gstIcon-container">
                          <img src={gstDoc} />
                        </div>
                        <div>
                          <div style={{ fontSize: "10px" }}>{profileInfo[0]?.data?.data?.gstCompanyName}</div>
                          <div style={{ fontSize: "10px", color: "#000000" }}>{profileInfo[0]?.data?.data?.gstNumber}</div>
                        </div>
                      </div>
                      <div
                        className="d-flex align-items-center"
                        onClick={() => {
                          setGstOffcan(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} color="#A7A7A7" />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="mt-3">
                  {planInCart[0]?.data?.data?.plan?._id !== "6200c35b083dd9b8c3f69391" && (
                    <div className="cartPlanCard flex-column align-items-center">
                      <div className="d-flex" style={{ borderBottom: "1px solid #DFDFDF" }}>
                        <div className="me-2 d-flex justify-content-center align-items-center" style={{ width: "4rem", height: "3rem", backgroundColor: "#3B599826", borderRadius: "4px" }}>
                          <img style={{ height: "1.5rem" }} src={cartPlanCardIcon} alt="planCardIcon" />
                        </div>
                        <div className=" d-flex flex-column justify-content-between w-100 mb-2">
                          <div className="d-flex justify-content-between w-100">
                            <div className="d-flex justify-content-between w-100">
                              <div className="me-2" style={{ fontSize: "16px", fontWeight: "600" }}>
                                Premium Plan
                              </div>
                              <div>{premiumTab === 1 ? "₹ 1999" : premiumTab === 3 ? "₹ 999" : "-"}/month</div>
                            </div>
                          </div>
                          <div style={{ marginBottom: "0.8rem", marginTop: "8px" }}>
                            <div style={{ fontSize: "12px", color: "#888888", display: "flex", alignItems: "flex-start", lineHeight: "15px", marginBottom: "0.6rem" }}><FontAwesomeIcon icon={faCircle} style={{fontSize: "4px", marginRight: "0.3rem", marginTop: "0.4rem"}} />Get flat 50% discount on all leads & minimum assured {premiumTab === 1 ? "8 queries in 1 month" : "12 queries in 3 months"}</div>
                            <div style={{ fontSize: "12px", color: "#888888", display: "flex", alignItems: "flex-start", lineHeight: "15px" }}><FontAwesomeIcon icon={faCircle} style={{fontSize: "4px", marginRight: "0.3rem", marginTop: "0.4rem"}} />We will automatically continue your membership (currently ₹{premiumTab === 1 ? "1,999 per month" : "2,997 per 3 months"}) until you cancel</div>
                          </div>
                          <div>
                            <div className="d-flex">
                              <div
                                className={`${premiumTab === 1 ? "activePlanTab" : "inactivePlanTab"}`}
                                onClick={() => handlePlanClick(1)}
                                role="button"
                                style={{ borderRadius: "12px", fontSize: "10px", display: "flex", alignItems: "center", padding: "2px 16px", margin: "0 0.5rem", userSelect: "none" }}
                              >
                                {premiumTab === 1 && <img style={{ height: "0.8rem", marginRight: "0.2rem" }} src={premiumTabTick} alt="" />}1 month plan
                              </div>
                              <div
                                className={`${premiumTab === 3 ? "activePlanTab" : "inactivePlanTab"}`}
                                onClick={() => handlePlanClick(3)}
                                role="button"
                                style={{ borderRadius: "12px", fontSize: "10px", display: "flex", alignItems: "center", padding: "2px 16px", margin: "0 0.5rem", userSelect: "none" }}
                              >
                                {premiumTab === 3 && <img style={{ height: "0.8rem", marginRight: "0.2rem" }} src={premiumTabTick} alt="" />}3 months plan
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-100 d-flex justify-content-center align-items-center mt-2">
                        <div style={{ fontSize: "12px", color: "#888888" }} role="button" onClick={removePlanFromCart}>
                          Remove
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: "100%", position: "fixed", bottom: "0" }}>
            <div className="card-footer-controls" style={{ marginBottom: "7rem" }}>
              <div className="price-details">
                <button style={{ justifyContent: "center" }} className="d-flex flex-column">
                  <span style={{ fontSize: "16px", fontWeight: "500" }} className="fw-bold">
                    {planInCart[0]?.data?.data?.totalPrice}
                  </span>
                  <span style={{ color: "#407BFF", fontSize: "12px", fontWeight: "400" }}>More Details</span>
                </button>
              </div>
              <div className="buy-button">
                <button style={{ fontSize: "14px", fontWeight: "400" }} onClick={handleCheckout}>
                  Buy Now
                </button>
              </div>
            </div>
            <BottomNav path={path} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
