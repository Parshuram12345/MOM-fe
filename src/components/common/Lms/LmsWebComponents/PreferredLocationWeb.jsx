import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePlan, createOrder, createPlan, createSubscription } from "../../Apis";
import { RAZOR_PAY_KEY } from "../../Config";
import { ROUTES } from "../../Router/routes";
import { addPurchasedLeads, sendInvoice, updateProfileData } from "../Actions";
import { getToken } from "../getToken";
import HeaderNav from "./HeaderNav";
import SideBarWeb from "./SideBarWeb";

const PreferredLocationWeb = () => {
  const navigate = useNavigate();
  const authTok = localStorage.getItem("token") ? getToken() : "";
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const cartData = useSelector((state) => state.addToCartReducer.leadsInCart);
  const planInCart = useSelector((state) => state.addToCartReducer.planInCart);
  const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
  const profileName = profileInfo[0]?.data?.data?.companyName;
  const profileEmail = profileInfo[0]?.data?.data?.email;
  const profilePhNum = profileInfo[0]?.data?.data?.phoneNumber;
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
    // const amount = 1
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

        if (subRes) {
          console.log(subRes);
          setIsLoading(false);
          localStorage.setItem("PremiumSubsId", subRes?.data?.id)
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
      <div style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <HeaderNav />
        <div style={{ height: "90vh", display: "flex" }}>
          <SideBarWeb />
          <div className="d-flex flex-column justify-content-between" style={{ width: "78vw", padding: "16px" }}>
            <div className="d-flex flex-column justify-content-between" style={{ backgroundColor: "#FFFFFF", padding: "16px", height: "85vh" }}>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="d-flex flex-column justify-content-around align-items-center h-100" style={{ width: "66%" }}>
                  <div className="pref-cities-header ms-3 mt-3" style={{ fontSize: "32px", fontWeight: "500", flexDirection: "column" }}>
                    <div className="text-center">Select the cities in which you want to have leads</div>{" "}
                    <div style={{ fontSize: "20px", fontWeight: "500", color: "#888888" }} className="d-flex justify-content-center">
                      (Select Max 2 options)
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center flex-wrap ms-3 mt-3">
                    {locationArr.map((curElem) => {
                      return (
                        <div role="button" className={`pref-cities-tabs ${addCityArr.includes(curElem.city) ? "pref-cities-tabs-active" : null}`} onClick={() => handleCityAdd(curElem.city)}>
                          {curElem.label}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ height: "8vh" }}>
                    {/* <div className="d-flex ps-3 mb-2">
                    <div className="me-2">
                    <input type="checkbox" />
                    </div>
                    <div>I have a GST number</div>
                    </div> */}
                    {addCityArr.length < 3 ? (
                      <div className="webPrefCity-btnContainer">
                        <button onClick={handleSubmit}>{isLoading ? <Spinner animation="border" /> : "Continue to Checkout"}</button>
                      </div>
                    ) : null}
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

export default PreferredLocationWeb;
