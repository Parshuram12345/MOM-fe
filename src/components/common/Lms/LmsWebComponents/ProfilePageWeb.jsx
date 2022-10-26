import { faAngleDown, faAngleLeft, faAngleRight, faCamera, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Left from "../Images/leftarrow.png";
import Icon from "../Images/icon.png";
import Camera from "../Images/camera.png";
import Tick from "../../Images/completionTick.svg";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfileData } from "../Actions";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { updateUserProfile } from "../../Apis";
import { completeProfile } from "../../Redux/Actions/auth";
import { useNavigate } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import SideBarWeb from "./SideBarWeb";

const ProfilePageWeb = () => {
  const dispatch = useDispatch();

  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
  const navigateTo = useNavigate();

  const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
  // console.log(profileInfo[0]?.data?.data?.imageUrl?.thumbnail);

  const profilePicRef = useRef(null);
  const coverPicRef = useRef(null);
  const profilePicUploadHandler = () => {
    profilePicRef.current.click();
  };
  const coverPicUploadHandler = () => {
    coverPicRef.current.click();
  };

  const changeImage = (e, cover) => {
    const file = e.target.files[0];
    if (file) {
      const payload = new FormData();
      if (cover) {
        payload.append("coverImage", file);
      } else {
        payload.append("image", file);
      }
      confirmAlert({
        message: `Are you sure you want to change ${cover || "profile"} image?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              updateUserProfile(payload).then((res) => {
                dispatch(completeProfile(res?.data));
                toast.success("Image Updated!");
                window.location.reload();
              });
            },
          },
          {
            label: "No",
          },
        ],
      });
    }
  };

  useEffect(() => {
    dispatch(fetchProfileData(authTok));
  }, []);
  useEffect(() => {
    if (localStorage.getItem("token") === null || localStorage.getItem("token") == "null") {
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("sessionExpire", true);
      navigateTo("/");
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <HeaderNav />
      <div className="main_div" style={{ display: "flex" }}>
        <SideBarWeb />

        <div className="profilePage-container" style={{ width: "100%", padding: "1rem", backgroundColor: "#ffffff" }}>
          <section className="section_font profilePage" style={{ width: "100%" }}>
            <Link style={{ textDecoration: "none", color: "black" }} to="/lead">
              {/* <div className="container pro_style"> */}
              {/* <FontAwesomeIcon className='me-2' icon={faAngleLeft}/> */}
              {/* <div className="me-2"> */}
              {/* <img className="me-2 goback-icon" src={Left} /> */}
              {/* </div> */}
              {/* <div className="profilePage-heading"> Profile ghfjPage</div> */}
              {/* </div> */}
            </Link>
            <div>
              <div>
                <div
                  className="img_div"
                  style={
                    profileInfo[0]?.data?.data?.coverImage?.original
                      ? { background: `url(${profileInfo[0]?.data?.data?.coverImage?.original})`, backgroundSize: "cover", backgroundPosition: "center" }
                      : { backgroundColor: "rgb(231, 231, 231)" }
                  }
                >
                  <div className="camera">
                    <FontAwesomeIcon style={{ width: "12px" }} icon={faCamera} onClick={coverPicUploadHandler} />
                    <input className="d-none" ref={coverPicRef} type="file" onChange={(e) => changeImage(e, "cover")} />
                  </div>
                </div>
                <div className="icon_pro" role="button">
                  {profileInfo[0]?.data?.data?.imageUrl?.original ? <img className="icon_pro_img" src={profileInfo[0]?.data?.data?.imageUrl?.original} /> : <img className="icon_pro_img" src={Icon} />}
                  <img className="icon_pro_cap" onClick={profilePicUploadHandler} src={Camera} />
                  <input className="d-none" ref={profilePicRef} type="file" onChange={(e) => changeImage(e)} />
                </div>
                <div className="name_pro">
                  <div className="d-flex justify-content-between">
                    <div>
                      <span className="profilePage-name">{profileInfo[0]?.data?.data?.companyName}</span>{" "}
                      <span className="span_free">{profileInfo[0]?.data?.data?.planId?.name === "Free" ? "Free" : "Premium"} Plan</span>
                    </div>
                    {/* <div>
                                            <span style={{
                                                fontFamily: 'Inter',
                                                fontWeight: '400',
                                                fontSize: "14px",
                                                color: '#000000',
                                                lineHeight: '22px'
                                            }}>View your listing </span>
                                            <span style={{
                                                color: '#176091', fontWeight: '400', lineHeight: '22px',
                                                fontSize: "16px"
                                            }}>Click Here</span>
                                        </div> */}
                  </div>
                  {/* <div className="d-flex justify-content-between">
                                        <div>
                                            <p className="profilePage-position">{profileInfo[0]?.data?.data?.type === 1 ? "Interior Designer" : "Contractor"}</p>
                                        </div>
                                        <Link style={{ textDecoration: "none", color: "black" }} to="/viewyourreview">
                                            <span style={{
                                                color: '#176091', fontWeight: '400', lineHeight: '22px',
                                                fontSize: "16px"
                                            }}>View your reviews</span>
                                        </Link>
                                    </div> */}
                </div>
                <div className="anmes">
                  <div>
                    <Link style={{ textDecoration: "none", color: "black" }} to="/my-plan-details">
                      <div className="d-flex justify-content-between div_name mt-1">
                        <div className="profilePage-basicDetails">
                          <span style={{ marginRight: "0.5rem" }}>My Plan</span>
                        </div>

                        <div>
                          {/* <span className='me-2 span_incom'>Incomplete </span> */}
                          <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <Link style={{ textDecoration: "none", color: "black" }} to="/aboutuspage">
                    <div>
                      <div className="d-flex justify-content-between div_name mt-1">
                        <div className="profilePage-aboutUs">
                          <span>About Us</span>
                          <span style={{ color: "#888888", marginLeft: "5px" }}>(Optional)</span>
                          {profileInfo[0]?.data?.data?.aboutUs?.trim()?.length > 0 && <img src={Tick} className="mx-2" />}
                        </div>
                        <div>
                          {(!profileInfo[0]?.data?.data?.aboutUs || profileInfo[0]?.data?.data?.aboutUs?.trim()?.length === 0) && <span className="incomplete-badge">Incomplete </span>}
                          <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div>
                    <Link style={{ textDecoration: "none", color: "black" }} to="/basicdetails">
                      <div className="d-flex justify-content-between div_name mt-1">
                        <div className="profilePage-basicDetails">
                          <span style={{ marginRight: "0.5rem" }}>Basic Details</span>
                          <img src={Tick} />
                        </div>

                        <div>
                          {/* <span className='me-2 span_incom'>Incomplete </span> */}
                          <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                      </div>
                    </Link>
                  </div>
                  {profileInfo[0]?.data?.data?.type === 2 && profileInfo[0]?.data?.data?.isVendorSubscribed === true ? <div>
                    <Link style={{ textDecoration: "none", color: "black" }} to="/vendor-edit-rate-list">
                      <div className="d-flex justify-content-between div_name mt-1">
                        <div className="profilePage-basicDetails">
                          <span style={{ marginRight: "0.5rem" }}>Rate List</span>
                        </div>
                        <div>
                          {/* <span className='me-2 span_incom'>Incomplete </span> */}
                          <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                      </div>
                    </Link>
                  </div> : ""}
                  <div>
                    <Link style={{ textDecoration: "none", color: "black" }} to="/designandservices">
                      <div className="d-flex justify-content-between div_name mt-1">
                        <div className="profilePage-provisions">
                          <span style={{ fontWeight: "500", marginRight: "0.5rem" }}>Design Fees & Services Provided</span>
                          <img src={Tick} />
                        </div>
                        <div>
                          {" "}
                          {/* <span className="me-2 span_incom">Incomplete </span> */}
                          <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link style={{ textDecoration: "none", color: "black" }} to="/projectpage">
                      <div className="d-flex justify-content-between div_name mt-1">
                        <div className="profilePage-projects">
                          <span style={{ fontWeight: "500", marginRight: "0.5rem" }}>Projects</span>
                          {profileInfo[0]?.data?.data?.projects.length !== 0 && <img src={Tick} />}
                        </div>
                        <div>
                          {profileInfo[0]?.data?.data?.projects.length === 0 && <span className="incomplete-badge">Incomplete</span>}
                          <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link style={{ textDecoration: "none", color: "black" }} to="/myreviewspage">
                      <div className="d-flex justify-content-between div_name mt-1">
                        <div className="profilePage-projects">
                          <span style={{ fontWeight: "500", marginRight: "0.5rem" }}>My Reviews</span>
                          {profileInfo[0]?.data?.data?.projects.length !== 0 && <img src={Tick} />}
                        </div>
                        <div>
                          {/* {profileInfo[0]?.data?.data?.projects.length === 0 && <span className="incomplete-badge">Incomplete</span>} */}
                          <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfilePageWeb;
