import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageImage from "../../Images/webIncompletePhotoImages.svg";

const ProfileIncomplete = () => {
  const navigateTo = useNavigate();
  const profileData = useSelector((state) => state.addToCartReducer.profileData);
  const goToProfile = () => {
    navigateTo("/myprofile")
  }
  return (
    <React.Fragment>
      <div className="profileIncomplete-web">
        <div className="profileIncomplete-content">
          <div>
            <img style={{height: "180px", opacity: "0.5"}} src={imageImage} />
          </div>
          <div style={{fontSize: "16px", fontWeight: "800", color: "#3B5998"}}>Hi {profileData[0]?.data?.data?.companyName}! Your profile is incomplete.</div>
          <div style={{fontSize: "14px", fontWeight: "500", color: "#3B5998", marginTop: "10px"}}>Complete your profile to unlock</div>
          <div style={{fontSize: "14px", fontWeight: "600", color: "#3B5998", marginBottom: "20px"}}>Free Access to Client Queries</div>
          <div className="completeNow-button">
            <button onClick={goToProfile}>Complete Now</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileIncomplete;
