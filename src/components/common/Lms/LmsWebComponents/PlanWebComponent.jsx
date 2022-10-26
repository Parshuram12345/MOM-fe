import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import limited from "../../Images/LimitedOfferTag.svg";

const PlanWebComponent = () => {
  const navigateTo = useNavigate();
  const [premiumId, setPremiumId] = useState(1);
  const [premiumPrice, setPremiumPrice] = useState(999);
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
  //     WebComponentId: premiumId,
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
      <div style={{ minHeight: "100vh" }} className="plan-container">
        <section style={{ height: "100%" }} className="text-center section_prop_web plan-content">
          <div className="text-center">
            <div className="shape_div mt-2">
              <div style={{ fontSize: "32px", fontWeight: "500" }} className="mt-5">
                Get Guaranteed leads every month!
              </div>
              <div style={{ fontSize: "18px", fontWeight: "400", margin: "8px 0px 8px 0", color: "#A0B7E9" }}>Choose one of our easy plan & Create higher visibility</div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="back d-flex flex-column justify-content-between me-2" style={{ width: "23rem", height: "25rem" }}>
              <div style={{ marginTop: "1.5rem" }}>
                <div style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "500", padding: "1rem 0 0 0" }}>Basic</div>
                <div style={{ fontSize: "24px", fontWeight: "600", backgroundColor: "#EBF0FA", padding: "8px 0", marginBottom: "2rem" }}>FREE</div>
              </div>
              <div className="w-100 d-flex justify-content-center" style={{ marginBottom: "1rem", visibility: "hidden" }}>
                <div>3 Months</div>
              </div>
              <ul style={{ marginBottom: "1rem", fontSize: "14px", fontWeight: "300", padding: "0 0 0 3rem", textAlign: "left" }}>
                <li style={{ marginBottom: "0" }}>Make a powerful listing</li>
                <li style={{ marginBottom: "0" }}>Get access to all direct queries from client who visit your listing</li>
                <li style={{ marginBottom: "0" }}>Get access and buy hot leads</li>
              </ul>
              <div className="btn_promo" style={{ margin: "0 1.5rem 2rem 1.5rem" }} role="button" onClick={goHome}>
                Continue with Free Plan
              </div>
            </div>
            <div className="back d-flex flex-column justify-content-between ms-2" style={{ width: "23rem", height: "25rem", position: "relative" }}>
              <div style={{ marginTop: "0.3rem" }}>
                <div style={{ marginBottom: "0.8rem" }}>
                  <img src={limited} />
                </div>
                <div style={{ marginBottom: "13px", fontSize: "18px", fontWeight: "500" }}>Premium</div>
                <div style={{ marginBottom: "2rem", padding: "8px 0", backgroundColor: "#EBF0FA", display: "flex", justifyContent: "center" }}>
                  <span style={{ fontSize: "24px", fontWeight: "600", display: "flex", alignItems: "center" }}>
                    <span style={{ textDecoration: "line-through", fontSize: "14px", color: "#888888", marginRight: "1rem", position: "absolute", right: "225px" }}>
                      ₹ {`${premiumId === 1 ? "2999" : premiumId === 3 ? "1499" : null}`}
                    </span>{" "}
                    ₹ {`${premiumId === 1 ? "1999" : premiumId === 3 ? "999" : null}`}
                  </span>
                  <span style={{ fontSize: "18px", fontWeight: "400", display: "flex", alignItems: "flex-end" }}>/mo</span>
                </div>
                <div className="w-100 d-flex justify-content-center" style={{ marginBottom: "1rem" }}>
                  <div
                    role="button"
                    className={`planSelect-tab ${premiumId === 1 ? "planSelect-tab-active" : null}`}
                    onClick={() => {
                      setPremiumId(1);
                    }}
                  >
                    1 Month
                  </div>
                  <div
                    role="button"
                    className={`planSelect-tab ${premiumId === 3 ? "planSelect-tab-active" : null}`}
                    onClick={() => {
                      setPremiumId(3);
                    }}
                  >
                    3 Months
                  </div>
                </div>
              </div>
              <ul className="ulcls" style={{ marginLeft: "1rem", fontSize: "14px", fontWeight: "300" }}>
                <li style={{ marginBottom: "0" }}>
                  Minimum <span style={{ fontWeight: "500" }}>{premiumId === 1 ? "8" : "4"} leads per month</span>
                </li>
                <li style={{ marginBottom: "0" }}>Get access to all direct queries from client who visit your listing</li>
                <li style={{ marginBottom: "0" }}>50% discount on hot leads</li>
              </ul>
              <div onClick={buySelectedPlan} className="btn_promo" role="button" style={{ backgroundColor: "#3B5998", color: "white", margin: "0 1.5rem 2rem 1.5rem" }}>
                Get Started
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PlanWebComponent;
