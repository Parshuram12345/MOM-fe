import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateProfileData } from "./Actions";
import { getToken } from "./getToken";

const PricesComponent = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const authTok = getToken() ? getToken() : "";
  const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
  console.log(profileInfo);
  const [priceInput, setPriceInput] = useState({
    virtual: profileInfo[0]?.data?.data?.fees?.zoomPrice,
    perRoom: profileInfo[0]?.data?.data?.fees?.designRoomPrice,
    perHour: profileInfo[0]?.data?.data?.fees?.designAreaPrice,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (value.length <= 5) {
      setPriceInput((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const feesData = {
    zoomPrice: priceInput.virtual,
    designRoomPrice: priceInput.perRoom,
    designAreaPrice: priceInput.perHour,
  };

  const handleSubmit = () => {
    const payload = new FormData();
    const fees = JSON.stringify(feesData);
    payload.append("fees", fees);
    dispatch(updateProfileData(authTok, payload));
    navigateTo("/designandservices");
  };

  return (
    <React.Fragment>
      <div style={{display: "flex", justifyContent: "center", backgroundColor: "#F0F0F0", minHeight: "100vh"}}>
        <div className="d-flex flex-column align-items-center editPrices-container m-0">
          <div className="w-100 d-flex justify-content-between align-items-center p-2" style={{ backgroundColor: "#FFFFFF" }}>
            <Link style={{ textDecoration: "none", display: "flex", alignItems: "center", color: "black" }} to="/designandservices">
              <div className="me-4">
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
              <div className="fs-5">Edit Prices</div>
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to="/designandservices">
              <div style={{ color: "#0099FF" }} onClick={handleSubmit}>
                SAVE
              </div>
            </Link>
          </div>
          {/* <div className="w-100 d-flex flex-column m-3">
          <label>For Virtual Consultation</label>
          <input value={priceInput.virtual} name="virtual" type="number" onChange={handleInputChange} />
        </div> */}
          <div className="w-100 d-flex flex-column m-3 p-3">
            <label>For Per Room Basis</label>
            <input value={priceInput.perRoom} name="perRoom" type="number" onChange={handleInputChange} />
          </div>
          <div className="w-100 d-flex flex-column m-3 p-3">
            <label>For Per Hour Basis</label>
            <input value={priceInput.perHour} name="perHour" type="number" onChange={handleInputChange} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PricesComponent;
