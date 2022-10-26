import { faAngleLeft, faArrowLeft, faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchProfileData, setAboutUs } from "./Actions";
import { getToken } from "./getToken";
import left from "./Images/leftarrow.png";
import ProfileAboutUsWeb from "./LmsWebComponents/ProfileAboutUsWeb";


const About = () => {
  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
  const authTok = localStorage.getItem("token") ? getToken() : "";
  const [aboutText, setAboutText] = useState(profileInfo[0]?.data?.data?.aboutUs);
  
  const aboutTextHandler = (event) => {
    setAboutText(event.target.value);
  };
  const onSubmit = () => {
    dispatch(setAboutUs(authTok, aboutText, toast));
  };


  useEffect(() => {
    dispatch(fetchProfileData(authTok));

  }, [authTok, dispatch]);

  return (
    <>
      <div className="d-none d-md-block">
        <ProfileAboutUsWeb />
      </div>
      
      <div className="d-block d-md-none">
        <ToastContainer />
        <div className="aboutUs-container">
          <section className="aboutUsContent">
            <div className="ms-2 d-flex justify-content-between">
              <Link className="mt-3 mb-3 ms-1 fs-4" to="/myprofile" style={{ textDecoration: "none", color: "black" }}>
                <span className="d-flex align-items-center">
                  <div className="me-3 d-flex align-items-center">
                    <img style={{ width: "5px", height: "10px" }} src={left} />
                  </div>
                  <div className="page-Heading">About Us</div>
                </span>
              </Link>
              <span className="m-3 page-save-edit cursor-pointer" role="button" style={{ color: "#0099FF" }} onClick={onSubmit}>
                SAVE
              </span>
            </div>
            <div className="container">
              <div style={{ fontWeight: "400", fontSize: "14px", color: "#717171" }}>About Us</div>
              <Form.Control
                className="aboutUs-textArea"
                style={{ resize: "none", fontSize: "14px" }}
                as="textarea"
                rows={18}
                value={aboutText}
                maxLength={1000}
                placeholder="Write something about your company or services you provide..."
                name="about"
                onChange={aboutTextHandler}
              />
              <div style={{ float: "right", fontSize: "10px", color: "#888888" }}>{aboutText?.length}/1000</div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
