import React, { useEffect, useState } from 'react'
import idesignLogo from "../../../3dComponents/3dImages/idesignLogo.svg"
import profile_svg from "../../../Lms/Images/profile_img.svg"
import SidebarNav from "../../../Lms/SidebarNav"
import { handleLogout } from "../../../Redux/Actions/auth";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from 'react-redux';
import notification from '../../Images/notification.svg'
import { fetchProfileData } from "../../../Lms/Actions"
import { getToken } from '../../../Components/SecureChat/piservices/authService';

const MobileSideBar = () => {
    const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
    // console.log(profileInfo)
    const authToken = localStorage.getItem("token") ? getToken() : "";
    const [showSidebar, setShowSidebar] = useState(false);
    const closeSidebar = () => {
        setShowSidebar(false);
    }
    const dispatch = useDispatch();
    const logoutHandler = () => {
        setShowSidebar(false);
        confirmAlert({
            message: `Are you sure you want to logout?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => dispatch(handleLogout()),
                },
                {
                    label: "No",
                },
            ],
        });
    };

    const handleSideShow = () => {
        setShowSidebar(true);
    }
    useEffect(() => {
        dispatch(fetchProfileData(authToken))
    }, [])
    return (
        <>
            <div className='landingMobNav d-flex p-3' style={{
                background: "#FFFFFF",
                boxShadow: "0px 4px 10px rgb(0 0 0 / 5%)", borderBottom: "1px solid rgb(0 0 0 / 5%)"
            }}>
                <div className='d-flex w-100'>
                    <img src={profile_svg} alt="" onClick={handleSideShow} />
                   <div className="d-flex flex-column mx-3">
                        <div style={{ fontSize: "14px", fontWeight: "600" }} className="d-flex align-items-center">
                            {profileInfo[0]?.data?.data?.companyName}
                        </div>
                        <div style={{ fontSize: "10px", fontWeight: "500", background:'#3B5998' }} className="homepage-header-plantype d-flex align-items-center">{profileInfo[0]?.data?.data?.planId?.name === "Free" ? profileInfo[0]?.data?.data?.planId?.name : "Premium"} Plan</div>
                   </div>
                    <button  style={{background: "none", border: "none", marginLeft: "auto"}}>
                        <img src={notification} alt="" />
                    </button>
                </div>
            </div>
            <SidebarNav sidebarShow={showSidebar} sidebarClose={closeSidebar} sidebarLogout={logoutHandler} />
        </>
    )
}

export default MobileSideBar;