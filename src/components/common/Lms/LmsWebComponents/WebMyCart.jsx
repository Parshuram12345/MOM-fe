import React, { useEffect, useState } from "react";
import HeaderNav from "./HeaderNav";
import SideBarWeb from "./SideBarWeb";
import goBack from "../../Images/gobackicon.svg";
import { useSelector } from "react-redux";
import WebCartAddedLeadCard from "./WebCartAddedLeadCard";
import check from "../../Images/tickIcon.svg";
import gstDoc from "../../Images/gstShowingDocIcon.svg";
import editIcon from "../../Images/editingPencil.svg";
import buyPremiumAd from "../../Images/buyPlanAdvertisement.svg";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addPurchasedLeads, fetchProfileData, sendInvoice, setGstDetails } from "../Actions";
import { getToken } from "../getToken";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../Apis";
import { RAZOR_PAY_KEY } from "../../Config";

const WebMyCart = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const authTok = localStorage.getItem("token") ? getToken() : "";
  const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
  const leadsAddedToCart = useSelector((state) => state.addToCartReducer.leadsInCart);
  const cartData = useSelector((state) => state.addToCartReducer.leadsInCart);

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

  const goSpendYourMoney = () => {
    placeOrderOnRazorpay();
  };
  const goToPlanPage = () => {
    navigateTo("/plans");
  }

  return (
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
          <div style={{ width: "78vw", padding: "1rem", height: "90vh", overflowY: "scroll" }} className="myCart-wholeContent">
            <div className="webMyCart-header">
              <div style={{ fontSize: "20px", marginBottom: "0.5rem" }} role="button">
                My Cart
              </div>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div style={{ width: "65%", overflow: "auto", marginBottom: "1rem" }} className="myCartMiddle">
                <div>
                  {leadsAddedToCart[0]?.data?.data?.leads.map((curElem) => {
                    const firstLetter = curElem.name.split(" ")[0].split("")[0].toUpperCase();
                    const secondLetter = curElem?.name.trim().split(" ").length > 1 ? curElem?.name.trim().split(" ")[curElem.name.trim().split(" ").length - 1].split("")[0].toUpperCase() : "";
                    const initials = firstLetter + secondLetter;
                    return <WebCartAddedLeadCard data={curElem} initials={initials} />;
                  })}
                </div>
              </div>
              <div className="webCart-pricingPart">
                <div className="sections">
                  <button className="proceedToBuyButton" onClick={goSpendYourMoney}>
                    Proceed To Buy
                  </button>
                </div>
                <div className="sections" style={{ padding: "32px 24px 16px 20px" }}>
                  <div style={{ fontSize: "16px", fontWeight: "400", marginBottom: "16px" }}>Price Details</div>

                  <div className="d-flex justify-content-between">
                    <div style={{ fontSize: "14px", fontWeight: "700" }}>Price ({`${leadsAddedToCart[0]?.data?.data?.leadCount} items`})</div>
                    <div style={{ fontSize: "14px", fontWeight: "400" }}>₹ {leadsAddedToCart[0]?.data?.data?.leadPrice}</div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div style={{ fontSize: "14px", fontWeight: "700" }}>Discount</div>
                    <div style={{ fontSize: "14px", fontWeight: "400", color: "#176091" }}>- ₹ {leadsAddedToCart[0]?.data?.data?.discount}</div>
                  </div>

                  <div className="d-flex justify-content-between" style={{ borderBottom: "1px solid #DFDFDF", paddingBottom: "16px", marginBottom: "16px" }}>
                    <div style={{ fontSize: "14px", fontWeight: "700" }}>GST- 18%</div>
                    <div style={{ fontSize: "14px", fontWeight: "400" }}>₹ {leadsAddedToCart[0]?.data?.data?.gst}</div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div style={{ fontSize: "16px", fontWeight: "700" }}>Total Price</div>
                    <div style={{ fontSize: "14px", fontWeight: "400" }}>₹ {Math.round(leadsAddedToCart[0]?.data?.data?.totalPrice)}</div>
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
                  {profileInfo[0]?.data?.data?.gstCompanyName && profileInfo[0]?.data?.data?.gstNumber ? <div>
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
                  </div> : null}
                </div>

                <div className="d-flex flex-column align-items-start p-4" style={{ borderRadius: "8px", background: `url(${buyPremiumAd})`, width: "100%", height: "18rem", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                  <div className="d-flex justify-content-start" style={{ fontSize: "30px", marginBottom: "0.5rem" }}>Buy all your leads at 50% off </div>
                  <div className="d-flex justify-content-start" style={{ fontSize: "24px", marginBottom: "1.5rem" }}>with our Premium Plan</div>
                  <div className="d-flex justify-content-start">
                    <button style={{ backgroundColor: "#176091", color: "#FFFFFF", border: "none", padding: "0.4rem 1rem", borderRadius: "1.2rem" }} onClick={goToPlanPage}>Get Premium Now</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WebMyCart;
