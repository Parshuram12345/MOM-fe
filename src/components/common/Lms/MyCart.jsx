import { faDotCircle, faFile, faInfoCircle, faPencilAlt, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Form, Offcanvas, Overlay, OverlayTrigger, Popover } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addPremiumPlanToCart, fetchLeadsInCart } from "./Actions";
import closeCanvasBar from "./Images/closeCanvasBar.svg";
import { addPurchasedLeads, fetchProfileData, sendInvoice, setGstDetails } from "./Actions";
import { store } from "../Redux/store";
import { getToken } from "./getToken";
import BottomNav from "./BottomNav";
import CartAddedLeadCard from "./CartAddedLeadCard";
import NoLeadsInCart from "./NoLeadsInCart";
import gstDoc from "../Images/gstDocument.svg";
import left from "./Images/leftarrow.png";
import check from "../Images/tickIcon.svg";
import WebMyCart from "./LmsWebComponents/WebMyCart";
import { createOrder } from "../Apis";
import { RAZOR_PAY_KEY } from "../Config";

export default function MyCart() {
  const [premium, setPremium] = useState("3");
  const path = useLocation();
  const uri = new URLSearchParams(window.location.search);
  const planId = uri.get("planid");
  const navigateTo = useNavigate();
  const authTok = getToken() ? getToken() : "";

  useEffect(() => {
    if (planId) {
      setPremium(planId)
      setAddPremium(true)
    }
  }, []);

  const dispatch = useDispatch();
  const leadsAddedToCart = useSelector((state) => state.addToCartReducer.leadsInCart);
  const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
  const cartData = useSelector((state) => state.addToCartReducer.leadsInCart);

  const [addedPlanId, setAddedPlanId] = useState("");
  useEffect(() => {
    setAddedPlanId(leadsAddedToCart[0]?.data?.data?.plan?._id);
  }, [leadsAddedToCart[0]?.data?.data?.plan?._id])

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

  // controls for add premium card
  const [addPremium, setAddPremium] = useState(false);

  if (leadsAddedToCart.length > 0) {
    var leadsInCart = leadsAddedToCart[0]?.data?.data?.leads;
    var numOfLeadsInCart = leadsAddedToCart[0]?.data?.data?.leadCount;
    var onlyLeadsTotal = leadsAddedToCart[0]?.data?.data?.leadPrice;
    var discount = leadsAddedToCart[0]?.data?.data?.discount;
    var gst = leadsAddedToCart[0]?.data?.data?.gst;
    var totalPrice = Math.round(leadsAddedToCart[0]?.data?.data?.totalPrice);
  } else {
    var leadsInCart = [];
    var numOfLeadsInCart = 0;
    var onlyLeadsTotal = 0;
    var discount = 0;
    var gst = 0;
    var totalPrice = 0;
  }

  useEffect(() => {
    dispatch(fetchProfileData(authTok));
  }, []);

  const placeOrderOnRazorpay = async () => {
    const amount = cartData[0]?.data?.data?.totalPrice;
    const res = await createOrder({ amount: parseFloat(amount.toFixed(2)) });

    if (res?.statusCode !== 200) {
      console.log(res?.message);
      return;
    }

    const option = {
      description: "iDesign payment",
      currency: "INR",
      key: RAZOR_PAY_KEY,
      amount: cartData[0]?.data?.data?.totalPrice,
      name: "iDesign.market pvt. ltd.",
      order_id: res?.data?.id,
      handler: paymentHandler.bind(this, amount),
      prefill: {
        name: profileInfo[0]?.data?.data?.companyName,
        email: profileInfo[0]?.data?.data?.email,
        contact: profileInfo[0]?.data?.data?.phoneNumber,
      },
      notes: {
        address: `Payment for cart`,
      },
      theme: {
        color: "#61dafb",
      },
    };

    try {
      const paymentObject = new window.Razorpay(option);
      paymentObject.open();
    } catch (err) {
      console.log(err?.message);
    }
  };

  const leadArr = cartData[0]?.data?.data?.leads.map((curElem) => {
    return curElem._id;
  });
  const paymentHandler = async (amount, response) => {
    console.log(response);
    const data = {
      pricePaid: amount,
      razorPaymentId: response?.razorpay_payment_id,
      razorOrderId: response?.razorpay_order_id,
      razorSignature: response?.razorpay_signature,
    };
    if (cartData[0].data.data.leads.length > 0) {
      const leadIdArray = cartData[0].data.data.leads.map((curElem) => {
        return curElem._id;
      });
      dispatch(addPurchasedLeads(authTok, leadArr, data.pricePaid, data.razorOrderId, data.razorPaymentId, data.razorSignature));
      dispatch(sendInvoice(authTok, "", leadIdArray));
    }
  };

  const handleCheckout = () => {
    placeOrderOnRazorpay();
  };

  return (
    <React.Fragment>
      <div className="d-block d-md-none">
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

        {numOfLeadsInCart > 0 || addedPlanId !== "6200c35b083dd9b8c3f69391" ? (
          <div>
            <div className="myCartContent w-100">
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
                        Lead Price ({numOfLeadsInCart})
                      </div>
                      <div className="actualPrice" style={{ fontSize: "14px", fontWeight: "600" }}>
                        ₹ {onlyLeadsTotal}
                      </div>
                    </div>
                    <div className="discount-container p">
                      <div className="discount" style={{ fontSize: "14px", fontWeight: "400" }}>
                        Discount
                      </div>
                      <div className="actualDiscount" style={{ color: "#176091", fontSize: "14px", fontWeight: "600" }}>
                        {-1 * discount}
                      </div>
                    </div>

                    <div className="gst-container p">
                      <div className="gst" style={{ fontSize: "14px", fontWeight: "400" }}>
                        GST-18%
                      </div>
                      <div className="actualGst" style={{ fontSize: "14px", fontWeight: "600" }}>
                        ₹ {gst}
                      </div>
                    </div>

                    <div className="totalPrice-container p">
                      <div className="totalprice mb-2">Total Price</div>
                      <div className="actualTotalPrice" style={{ fontSize: "14px", fontWeight: "600" }}>
                        ₹ {totalPrice}
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
                    <div style={{ paddingBottom: "12rem", backgroundColor: "#FAFAFA" }}>
                      {leadsInCart.map((curElem) => {
                        const firstLetter = curElem.name.split(" ")[0].split("")[0].toUpperCase();
                        const secondLetter = curElem?.name.trim().split(" ").length > 1 ? curElem?.name.trim().split(" ")[curElem.name.trim().split(" ").length - 1].split("")[0].toUpperCase() : "";
                        const initials = firstLetter + secondLetter;
                        return <CartAddedLeadCard data={curElem} initials={initials} />;
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ width: "inherit", position: "fixed", bottom: "0" }}>
                <div className="card-footer-controls">
                  <div className="price-details">
                    <button style={{ justifyContent: "center" }} className="d-flex flex-column">
                      <span style={{ fontSize: "16px", fontWeight: "500" }} className="fw-bold">
                        {totalPrice}
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
        ) : (
          <NoLeadsInCart />
        )}
      </div>
      <div className="d-none d-md-block">
        <WebMyCart />
      </div>
    </React.Fragment>
  );
}
