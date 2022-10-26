import React, { useEffect, useState } from "react";
import planDetailsImage from "../Images/planDetailsPageImage.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import vendorDetailImg from "../Images/vendorDetailImg.svg";

const MyPlanDetailsMob = () => {
  const navigateTo = useNavigate();
  const profileData = useSelector((state) => state.addToCartReducer.profileData);
  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
  const [vendorData, setVendorData] = useState([])

  const goBackToProfile = () => {
    navigateTo("/myprofile");
  }
  const profileInfo = async () => {
    const remM = await axios.get("https://pro-api.idesign.market/user/profile", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authTok
      }
    })
    setVendorData(remM?.data?.data)
  }
  // console.log(vendorData)

  useEffect(() => {
    profileInfo()
  }, [])

  const cancelSubscription = async () => {
    // console.log("cancel subscription");
    await axios.post(`https://pro-api.idesign.market/user/cancelSubscription?subscriptionId=${vendorData?.razorpaySubscriptionId}`, { type: 1 }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authTok
      }
    }).then((res) => {
      console.warn(res)
      navigateTo("/lead")
    }).catch(err => console.warn(err))
  };

  const cancelVendorSubscription = async () => {
    // console.log("cancel subscription")
    await axios.post(`https://pro-api.idesign.market/user/cancelSubscription?subscriptionId=${vendorData?.razorpayVendorSubId}`, { type: 2 }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authTok
      }
    }).then((res) => {
      // console.warn(res)
      navigateTo("/lead")
    }).catch(err => console.warn(err))
    // console.log(authTok)
  };


  return (
    <React.Fragment>
      <div className="w-100 p-3" style={{ backgroundColor: "#FFFFFF", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)", marginBottom: "1rem" }}>
        <span onClick={goBackToProfile}><FontAwesomeIcon icon={faAngleLeft} /> My Plan</span>
      </div>
      <div className="profilePage-container d-flex flex-column" style={{ width: "100%", padding: "1rem", backgroundColor: "#ffffff" }}>
        <div className="d-flex flex-column w-100 mb-5">
          <div style={{ border: "1px solid #DFDFDF", borderRadius: "4px", width: "100%", marginBottom: "2rem" }}>
            <div className="d-flex justify-content-center align-items-center overflow-hidden">
              <img src={planDetailsImage} alt="" style={{ width: "100%" }} />
            </div>
            <div style={{ padding: "0.8rem" }}>
              <div style={{ fontSize: "14px", color: "#888888", display: "flex", alignItems: "flex-start" }}>
                <FontAwesomeIcon style={{ fontSize: "4px", marginRight: "0.5rem", marginTop: "0.5rem" }} color="#888888" icon={faCircle} />
                Minimum {profileData[0]?.data?.data?.planId?._id === "6200c35b083dd9b8c3f69391" ? "2" : "4"} projects enquiries per month
              </div>
              <div style={{ fontSize: "14px", color: "#888888", display: "flex", alignItems: "flex-start" }}>
                <FontAwesomeIcon style={{ fontSize: "4px", marginRight: "0.5rem", marginTop: "0.5rem" }} color="#888888" icon={faCircle} />
                Get access to all direct queries from client who visit your listing
              </div>
              {profileData[0]?.data?.data?.planId?._id !== "6200c35b083dd9b8c3f69391" && (
                <div style={{ fontSize: "14px", color: "#888888", display: "flex", alignItems: "flex-start" }}>
                  <FontAwesomeIcon style={{ fontSize: "4px", marginRight: "0.5rem", marginTop: "0.5rem" }} color="#888888" icon={faCircle} />
                  50% discount on hot leads
                </div>
              )}
            </div>
          </div>
          <div className="d-flex flex-column justify-content-between" style={{ width: "100%" }}>
            <div>
              <div className="d-flex justify-content-between" style={{ marginBottom: "1rem" }}>
                <div className="d-flex">
                  <div style={{ marginRight: "1rem", fontSize: "16px", fontWeight: "600" }}>
                    {profileData[0]?.data?.data?.planId?._id === "6200c35b083dd9b8c3f69391" ? "Free Plan" : "Premium Plan"}
                  </div>
                  <div className="d-flex align-items-center" style={{ fontSize: "14px" }}>
                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: "6px", marginRight: "0.3rem" }} color="#1EA866" /> Active
                  </div>
                </div>
                <div style={{ color: "#199669", fontSize: "16px", fontWeight: "600" }}>
                  {profileData[0]?.data?.data?.planId?._id !== "6200c35b083dd9b8c3f69391" && `₹${profileData[0]?.data?.data?.planId?.price}/month`}
                </div>
              </div>
              {profileData[0]?.data?.data?.planId?._id !== "6200c35b083dd9b8c3f69391" && (
                <div style={{ fontSize: "12px" }}>
                  <div>
                    Starts on <span style={{ fontSize: "13px", fontWeight: "600" }}>{profileData[0]?.data?.data?.planBuyDate.split("T")[0].split("-").reverse().join("-")}</span>
                  </div>
                  <div>
                    Expires on <span style={{ fontSize: "13px", fontWeight: "600" }}>{profileData[0]?.data?.data?.planExpireDate.split("T")[0].split("-").reverse().join("-")}</span>
                  </div>
                  <div>
                    Your subcription will auto renew on{" "}
                    <span style={{ fontSize: "13px", fontWeight: "600" }}>{profileData[0]?.data?.data?.planExpireDate.split("T")[0].split("-").reverse().join("-")}</span> for{" "}
                    <span style={{ fontSize: "13px", fontWeight: "600" }}>{profileData[0]?.data?.data?.planId?.duration} months</span>
                  </div>
                </div>
              )}
            </div>
            <div>
              {/* {profileData[0]?.data?.data?.planId?._id !== "6200c35b083dd9b8c3f69391" && (
                <div style={{ color: "#3B5998", fontSize: "12px", textDecoration: "underline", fontWeight: "600", marginBottom: "2rem", marginTop: "1rem" }}>View invoice</div>
              )} */}
              <div style={{ marginBottom: "1rem", marginTop: "2rem" }}>
                <div style={{ fontSize: "14px", fontWeight: "500" }}>{profileData[0]?.data?.data?.planId?._id === "6200c35b083dd9b8c3f69391" ? "Get Premium Plan" : "Cancel Subscription"}</div>
                <div style={{ fontSize: "12px" }}>You can cancel the auto renewal anytime you want</div>
              </div>
              <div className="d-flex w-100 justify-content-between">
                {profileData[0]?.data?.data?.planId?._id === "6200c35b083dd9b8c3f69391" ? (
                  <div
                    style={{ width: "100%", display: "flex", justifyContent: "center", border: "1px solid #A7A7A7", borderRadius: "8px", fontSize: "14px", color: "#FFFFFF", backgroundColor: "#3B5998", padding: "0.3rem 1rem" }}
                    onClick={() => navigateTo("/plans")}
                  >
                    Get Premium Plan
                  </div>
                ) : (
                  <div style={{ width: "100%", display: "flex", justifyContent: "center", border: "1px solid #A7A7A7", borderRadius: "8px", fontSize: "14px", color: "#888888", padding: "0.3rem 1rem" }} onClick={cancelSubscription}>
                    Cancel my subscription
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {vendorData?.type === 2 && vendorData?.isVendorSubscribed ? <div className="d-flex flex-column w-100 mb-5">
          <div style={{ border: "1px solid #DFDFDF", borderRadius: "4px", width: "100%", marginBottom: "2rem" }}>
            <div className="d-flex justify-content-center align-items-center overflow-hidden">
              <img src={vendorDetailImg} alt="" style={{ width: "100%" }} />
            </div>
            {vendorData?.isVendorSubscribed ? <div style={{ padding: "0.8rem" }}>
              <div style={{ fontSize: "14px", color: "#888888", display: "flex", alignItems: "flex-start" }}>
                <FontAwesomeIcon style={{ fontSize: "4px", marginRight: "0.5rem", marginTop: "0.5rem" }} color="#888888" icon={faCircle} />
                Min 8 Projects Enquiries/month
              </div>
              <div style={{ fontSize: "14px", color: "#888888", display: "flex", alignItems: "flex-start" }}>
                <FontAwesomeIcon style={{ fontSize: "4px", marginRight: "0.5rem", marginTop: "0.5rem" }} color="#888888" icon={faCircle} />
                Unlimited Access to Project Enquiries
              </div>
              <div style={{ fontSize: "14px", color: "#888888", display: "flex", alignItems: "flex-start" }}>
                <FontAwesomeIcon style={{ fontSize: "4px", marginRight: "0.5rem", marginTop: "0.5rem" }} color="#888888" icon={faCircle} />
                Monthly Exclusive Articles on iDesign Magazine
              </div>
            </div> : ""}
          </div>
          <div className="d-flex flex-column justify-content-between" style={{ width: "100%" }}>
            <div>
              <div className="d-flex justify-content-between" style={{ marginBottom: "1rem" }}>
                <div className="d-flex">
                  <div style={{ marginRight: "1rem", fontSize: "16px", fontWeight: "600" }}>
                    {vendorData?.isVendorSubscribed ? "Vendor Subscription" : "Free Plan"}
                  </div>
                  <div className="d-flex align-items-center" style={{ fontSize: "14px" }}>
                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: "6px", marginRight: "0.3rem" }} color="#1EA866" /> Active
                  </div>
                </div>
                <div style={{ color: "#199669", fontSize: "16px", fontWeight: "600" }}>
                  {vendorData?.isVendorSubscribed ? "₹ 1000/month" : "₹ Free"}
                </div>
              </div>
              {vendorData?.isVendorSubscribed && (
                <div style={{ fontSize: "12px" }}>
                  <div>
                    Starts on <span style={{ fontSize: "13px", fontWeight: "600" }}>{vendorData?.vendorSubPlanBuyDate.split("T")[0].split("-").reverse().join("-")}</span>
                  </div>
                  <div>
                    Expires on <span style={{ fontSize: "13px", fontWeight: "600" }}>{vendorData?.vendorSubplanExpireDate.split("T")[0].split("-").reverse().join("-")}</span>
                  </div>
                  <div>
                    Your subcription will auto renew on{" "}
                    <span style={{ fontSize: "13px", fontWeight: "600" }}>{vendorData?.vendorSubplanExpireDate.split("T")[0].split("-").reverse().join("-")}</span> for{" "}
                    <span style={{ fontSize: "13px", fontWeight: "600" }}>1 month</span>
                  </div>
                </div>
              )}
            </div>
            <div>
              {/* {profileData[0]?.data?.data?.planId?._id !== "6200c35b083dd9b8c3f69391" && (
                <div style={{ color: "#3B5998", fontSize: "12px", textDecoration: "underline", fontWeight: "600", marginBottom: "2rem", marginTop: "1rem" }}>View invoice</div>
              )} */}
              <div style={{ marginBottom: "1rem", marginTop: "2rem" }}>
                <div style={{ fontSize: "14px", fontWeight: "500" }}>{!vendorData?.isVendorSubscribed ? "Get Vendor Subscription" : "Cancel Subscription"}</div>
                <div style={{ fontSize: "12px" }}>You can cancel the auto renewal anytime you want</div>
              </div>
              <div className="d-flex w-100 justify-content-between">
                {!vendorData?.isVendorSubscribed ? (
                  <div
                    style={{ width: "100%", display: "flex", justifyContent: "center", border: "1px solid #A7A7A7", borderRadius: "8px", fontSize: "14px", color: "#FFFFFF", backgroundColor: "#3B5998", padding: "0.3rem 1rem" }}
                    onClick={() => navigateTo("/vendor-page")}
                  >
                    Get Vendor Subscription
                  </div>
                ) : (
                  <div style={{ width: "100%", display: "flex", justifyContent: "center", border: "1px solid #A7A7A7", borderRadius: "8px", fontSize: "14px", color: "#888888", padding: "0.3rem 1rem" }} onClick={cancelVendorSubscription}>
                    Cancel my subscription
                  </div>
                )}
              </div>
            </div>
          </div>
        </div> : ""}
      </div>
    </React.Fragment>
  );
};

export default MyPlanDetailsMob;
