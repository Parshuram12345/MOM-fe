import React, { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePlan, createOrder, createPlan, createSubscription } from "../Apis";
import { RAZOR_PAY_KEY } from "../Config";
import { ROUTES } from "../Router/routes";
import { addPurchasedLeads, sendInvoice, updateProfileData } from "./Actions";
import { getToken } from "./getToken";
import PreferredLocationWeb from "./LmsWebComponents/PreferredLocationWeb";

const PreferredLocation = () => {
  const navigate = useNavigate();
  const authTok = localStorage.getItem("token") ? getToken() : "";
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const cartData = useSelector((state) => state.addToCartReducer.leadsInCart);
  const planInCart = useSelector((state) => state.addToCartReducer.planInCart);
  const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
  const [addCityArr, setAddCityArr] = useState([]);
  const locationArr = [
    {
      city: "Delhi",
      label: "Delhi, Gurugram, Noida",
    },
    {
      city: "Faridabad",
      label: "Faridabad",
    },
    {
      city: "Ghaziabad",
      label: "Ghaziabad",
    },
    {
      city: "Bengaluru",
      label: "Bengaluru",
    },
    {
      city: "Pune",
      label: "Pune",
    },
    {
      city: "Mumbai",
      label: "Mumbai Area",
    },
    {
      city: "Hyderabad",
      label: "Hyderabad Area",
    },
    {
      city: "Chandigarh",
      label: "Chandigarh, Mohali, Panchkula",
    },
    {
      city: "Jaipur",
      label: "Jaipur",
    },
    {
      city: "Lucknow",
      label: "Lucknow",
    },
    {
      city: "Indore",
      label: "Indore",
    },
    {
      city: "Ahmedabad",
      label: "Ahmedabad",
    },
    {
      city: "Chennai",
      label: "Chennai",
    },
    {
      city: "Kolkata",
      label: "Kolkata Area",
    },
  ];

  const handleCityAdd = (city) => {
    if (addCityArr.length <= 1) {
      if (!addCityArr.includes(city)) {
        setAddCityArr((prev) => {
          return [...prev, city];
        });
      } else {
        setAddCityArr(
          addCityArr.filter((curElem) => {
            return curElem !== city;
          })
        );
      }
    } else {
      setAddCityArr(
        addCityArr.filter((curElem) => {
          return curElem !== city;
        })
      );
    }
  };

  const placeOrderOnRazorpay = async () => {
    const amount = Math.round(planInCart[0]?.data?.data?.totalPrice);
    const res = await createOrder({ amount: parseFloat(amount.toFixed(2)) });

    if (res) {
      const planRes = await createPlan({
        period: "monthly",
        interval: planInCart[0]?.data?.data?.plan?.duration,
        planName: planInCart[0]?.data?.data?.plan?.name,
        planAmt: parseFloat(amount.toFixed(2)),
        description: "subscription plan",
      });
      localStorage.setItem("PremiumPlanId", planRes?.data?.id)
      if (planRes) {
        const x = {
          planId: planRes?.data?.id,
          paymentCycles: planInCart[0]?.data?.data?.plan?.duration === 1 ? 120 : planInCart[0]?.data?.data?.plan?.duration === 3 ? 30 : null,
        };
        const subRes = await createSubscription(x);
        // console.log(subRes);
        localStorage.setItem("PremiumSubsId", subRes?.data?.id)
        if (subRes) {
          console.log(subRes);
          setIsLoading(false);
          const option = {
            description: "iDesign payment",
            currency: "INR",
            key: RAZOR_PAY_KEY,
            amount: Math.round(planInCart[0]?.data?.data?.totalPrice) * 100,
            name: "iDesign.market pvt. ltd.",
            // order_id: res?.data?.id,
            subscription_id: subRes?.data?.id,
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
              color: "#3b5998",
            },
            recurring: true,
            checkout: {
              method: {
                upi: 1,
                netbanking: 1,
                card: 1,
                wallet: 1,
              },
            },
          };
          try {
            const paymentObject = new window.Razorpay(option);
            paymentObject.open();
          } catch (err) {
            console.log(err?.message);
          }
        }
        return;
      }
    }
  };
  
  const paymentHandler = async (amount, response) => {
    console.log(response);
    const data = {
      planId: planInCart[0]?.data?.data?.plan?.duration == 1 ? "62ebaa44b4de66a62839e0e5" : planInCart[0]?.data?.data?.plan?.duration == 3 ? "6200c35b083dd9b8c3f69392" : "6200c35b083dd9b8c3f69391",
      pricePaid: amount,
      razorPaymentId: response?.razorpay_payment_id,
      razorOrderId: response?.razorpay_order_id,
      razorSignature: response?.razorpay_signature, 
      razorpay_plan_id: localStorage.getItem("PremiumPlanId"),
      razorpay_subscription_id: localStorage.getItem("PremiumSubsId")
    };
    changePlan(data).then((res) => {
      console.log("Plan Changed Successfully");
      navigate(ROUTES.ORDER_PLACED, { replace: true });
      dispatch(sendInvoice(authTok, data.planId, []));
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const payload = new FormData();
    const cities = JSON.stringify(addCityArr);
    payload.append("preferredCitiesForLead", cities);
    dispatch(updateProfileData(authTok, payload));
    placeOrderOnRazorpay();
  };

  return (
    <React.Fragment>
      <div className="d-flex d-md-none flex-column justify-content-between" style={{ minHeight: "100vh" }}>
        <div>
          <div className="pref-cities-header ms-3 mt-3" style={{ fontSize: "18px", fontWeight: "500" }}>
            Select the cities in which you want to have leads <span style={{ fontSize: "12px", fontWeight: "500", color: "#888888" }}>(Select Max 2 options)</span>
          </div>
          <div className="d-flex flex-wrap ms-3 mt-3">
            {locationArr.map((curElem) => {
              return (
                <div className={`pref-cities-tabs ${addCityArr.includes(curElem.city) ? "pref-cities-tabs-active" : null}`} onClick={() => handleCityAdd(curElem.city)}>
                  {curElem.label}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          {/* <div className="d-flex ps-3 mb-2">
            <div className="me-2">
              <input type="checkbox" />
            </div>
            <div>I have a GST number</div>
          </div> */}
          {addCityArr.length < 3 ? (
            <div className="pref-cities-btn-container">
              <button onClick={handleSubmit}>{isLoading ? <Spinner animation="border" /> : "Continue to Checkout"}</button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="d-none d-md-block">
        <PreferredLocationWeb />
      </div>
    </React.Fragment>
  );
};

export default PreferredLocation;
