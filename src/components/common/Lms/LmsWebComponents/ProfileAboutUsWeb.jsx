import { faAngleLeft, faArrowLeft, faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchProfileData, setAboutUs } from "../Actions";
import { getToken } from "../getToken";
import left from "../Images/leftarrow.png";
import HeaderNav from "./HeaderNav";
import SideBarWeb from "./SideBarWeb";


const ProfileAboutUsWeb = () => {
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
            <ToastContainer />
            <HeaderNav />
            <div className="d-flex">
                <div>
                    <SideBarWeb />
                </div>
                <div className="aboutUs" style={{ marginLeft: '10px', height: '90vh', width: '100vw' }}>
                    <section className="aboutUsContent" style={{ width: '100vw' }}>
                        <div className="ms-2 d-flex justify-content-between" style={{ width: '77vw', backgroundColor: '#ffffff' }}>
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

                        <div className="main_container" style={{ width: '77vw', backgroundColor: '#ffffff', border: '1px solid lightgrey', borderRadius: '10px', height: '78vh' }}>
                            <div style={{ fontWeight: "400", fontSize: "14px", color: "black", paddingBottom: '21px', marginTop: '20px',marginLeft:'15px'}}>About Us</div>
                            <Form.Control
                                className="textArea"
                                style={{ resize: "none", fontSize: "14px", height: '40vh', width: '75.8vw' ,marginLeft:'10px'}}
                                as="textarea"
                                rows={18}
                                value={aboutText}
                                maxLength={1000}
                                placeholder="Write something about your company or services you provide..."
                                name="about"
                                onChange={aboutTextHandler}
                            />
                            <div style={{ float: "right", fontSize: "10px", color: "#888888" ,marginRight:'10px',marginTop:'10px'}}>{aboutText?.length}/1000</div>
                        </div>

                    </section>
                </div>
            </div>
        </>
    );
};

export default ProfileAboutUsWeb;
