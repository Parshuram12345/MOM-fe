import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePlan, createOrder } from "../Apis";
import { RAZOR_PAY_KEY } from "../Config";
import { ROUTES } from "../Router/routes";
import PlanWebComponent from "./LmsWebComponents/PlanWebComponent";
import limited from "../Images/LimitedOfferTag.svg";

const Plan = () => {
  const navigateTo = useNavigate();
  const [premiumId, setPremiumId] = useState(3);
  // console.log(premiumId+"-"+premiumPrice+"-"+month);

  // const placeOrderOnRazorpay = async () => {
  //   const amount = premiumPrice * month;
  //   const res = await createOrder({ amount: parseFloat(amount.toFixed(2)) });

  //   if (res?.statusCode !== 200) {
  //     console.log(res?.message);
  //     return;
  //   }

  //   const option = {
  //     description: "iDesign payment",
  //     currency: "INR",
  //     key: RAZOR_PAY_KEY,
  //     amount: premiumPrice * month,
  //     name: "iDesign.market pvt. ltd.",
  //     order_id: res?.data?.id,
  //     handler: paymentHandler.bind(this, amount),
  //     prefill: {
  //       name: profileData[0].data.data.companyName,
  //       email: profileData[0].data.data.email,
  //       contact: profileData[0].data.data.phoneNumber,
  //     },
  //     notes: {
  //       address: `Payment for cart`,
  //     },
  //     theme: {
  //       color: "#61dafb",
  //     },
  //   };

  //   try {
  //     const paymentObject = new window.Razorpay(option);
  //     paymentObject.open();
  //   } catch (err) {
  //     console.log(err?.message);
  //   }
  // };

  // const paymentHandler = async (amount, response) => {
  //   const data = {
  //     planId: premiumId,
  //     pricePaid: amount,
  //     razorPaymentId: response?.razorpay_payment_id,
  //     razorOrderId: response?.razorpay_order_id,
  //     razorSignature: response?.razorpay_signature,
  //   };
  //   if (premiumId === "6200c35b083dd9b8c3f69391") {
  //     navigateTo("/lead");
  //   } else {
  //     changePlan(data).then((res) => {
  //       console.log("Plan Changed Successfully");
  //       navigateTo(ROUTES.ORDER_PLACED, { replace: true });
  //     });
  //   }
  // };

  const goHome = () => {
    navigateTo("/lead");
  };
  const buySelectedPlan = () => {
    // placeOrderOnRazorpay();
    navigateTo(`/mycart/${premiumId}-month-plan`);
  };

  return (
    <>
      <div style={{ minHeight: "100vh" }} className="plan-container d-flex d-md-none">
        <section style={{ height: "100%" }} className="text-center section_prop plan-content">
          <div className="text-center">
            <div className="shape_div mt-2">
              <div style={{ fontSize: "20px", fontWeight: "500" }} className="mt-5">
                Get Guaranteed leads every <br />
                month!
              </div>
              <div style={{ fontSize: "12px", fontWeight: "400", margin: "8px 0px 20px 0" }}>Choose one of our easy plan & Create higher visibility</div>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="back py-3">
              <div style={{ marginBottom: "0.8rem" }}>
                <img src={limited} />
              </div>
              <div style={{ marginBottom: "24px", fontSize: "18px", fontWeight: "500" }}>Premium</div>
              <div style={{ marginBottom: "2rem", padding: "8px 0", backgroundColor: "#EBF0FA", display: "flex", justifyContent: "center" }}>
                <span style={{ fontSize: "24px", fontWeight: "600", display: "flex", alignItems: "center" }}>
                  <span style={{ textDecoration: "line-through", fontSize: "14px", color: "#888888", marginRight: "1rem", position: "absolute", right: "62%" }}>
                    ₹ {`${premiumId === 1 ? "2999" : premiumId === 3 ? "1499" : null}`}
                  </span>{" "}
                  ₹ {`${premiumId === 1 ? "1999" : premiumId === 3 ? "999" : null}`}
                </span>
                <span style={{ fontSize: "18px", fontWeight: "400", display: "flex", alignItems: "flex-end" }}>/mo</span>
              </div>
              <div className="w-100 d-flex justify-content-center px-2" style={{ marginBottom: "2rem" }}>
                <div
                  className={`planSelect-tab ${premiumId === 1 ? "planSelect-tab-active" : null}`}
                  onClick={() => {
                    setPremiumId(1);
                  }}
                >
                  1 Month
                </div>
                <div
                  className={`planSelect-tab ${premiumId === 3 ? "planSelect-tab-active" : null}`}
                  onClick={() => {
                    setPremiumId(3);
                  }}
                >
                  3 Months
                </div>
              </div>
              <ul className="ms-2 me-1 ulcls" style={{ marginBottom: "2rem", fontSize: "14px", fontWeight: "300" }}>
                <li style={{ marginBottom: "12px" }}>
                  Minimum <span style={{ fontWeight: "600" }}>{premiumId === 1 ? "8" : "4"} projects enquiries per month</span>
                </li>
                <li style={{ marginBottom: "12px" }}>Get access to all direct queries from client who visit your listing</li>
                <li style={{ marginBottom: "12px" }}>50% discount on hot leads</li>
              </ul>
              <div onClick={buySelectedPlan} className="btn_promo mx-2" role="button" style={{ backgroundColor: "#3B5998", color: "white" }}>
                Get Started
              </div>
            </div>
            <div className="back py-3">
              <div style={{ marginBottom: "24px", fontSize: "18px", fontWeight: "500" }}>Basic</div>
              <div style={{ marginBottom: "2rem", fontSize: "24px", fontWeight: "600" }}>FREE</div>
              <ul className="ulcls" style={{ marginBottom: "2rem", fontSize: "14px", fontWeight: "300" }}>
                <li style={{ marginBottom: "12px" }}>Make a powerful listing</li>
                <li style={{ marginBottom: "12px" }}>Get access to all direct queries from client who visit your listing</li>
                <li style={{ marginBottom: "12px" }}>Get access and buy hot leads</li>
              </ul>
              <div className="btn_promo" role="button" onClick={goHome}>
                Continue with Free Plan
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="d-none d-md-block">
        <PlanWebComponent />
      </div>
    </>
  );
};

export default Plan;
