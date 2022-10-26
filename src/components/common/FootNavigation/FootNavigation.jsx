import React from "react";
import styles from "./footNavigation.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { BsGrid, BsChatLeftText, BsCardChecklist } from "react-icons/bs";
import { MdOutlineContacts } from "react-icons/md";
import { TbClipboardText } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setFootBanner } from "../../../../../Lms/Actions/lmsActions";

const FootNavigation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigateTo = useNavigate();
  // const footBannerState = useSelector((state) => state.lmsReducer.footBannerState);
  // const footBan = footBannerState === undefined && true;
  // console.log("foot", footBannerState);
  return (
    <React.Fragment>
      <div 
      // className={footBan ? styles.footNavContainer : styles.footNavContainerWithoutBanner}
      >
        {/* {footBan && (
          <div className={styles.advertisement}>
            <div className={styles.advertLeftPart}>
              <div>Do you want instant leads?</div>
              <button onClick={() => navigateTo("/buy-leads")}>Buy Leads</button>
            </div>
            <div onClick={() => dispatch(setFootBanner(false))}>
              <IoCloseOutline />
            </div>
          </div>
        )} */}
        <div  style={{color:"#888888",fontWeight:"400"}} className={styles.navIconsContainer}>
          <div className={location.pathname === "/dashboard" ? styles.eachNavIconActive : styles.eachNavIcon} onClick={() => navigateTo("/dashboard")}>
            <div className={location.pathname === "/dashboard" ? styles.iconContainer : styles.iconContainerInactive}>
              <BsGrid />
            </div>
            <div>Dashboard</div>
          </div>
          <div className={location.pathname === "/lead" ? styles.eachNavIconActive : styles.eachNavIcon} onClick={() => navigateTo("/lead")}>
            <div className={location.pathname === "/lead" ? styles.iconContainer : styles.iconContainerInactive}>
              <MdOutlineContacts />
            </div>
            <div>Leads</div>
          </div>
          <div className={styles.eachNavIcon}>
            <div className={styles.iconContainerInactive}>
              <TbClipboardText />
            </div>
            <div>Projects</div>
          </div>
          <div className={location.pathname === "/secure-chat" ? styles.eachNavIconActive : styles.eachNavIcon} onClick={() => navigateTo("/secure-chat")}>
            <div className={location.pathname === "/secure-chat" ? styles.iconContainer : styles.iconContainerInactive}>
              <BsChatLeftText />
            </div>
            <div>Chat</div>
          </div>
          <div className={styles.eachNavIcon}>
            <div className={styles.iconContainerInactive}>
              <BsCardChecklist />
            </div>
            <div>Quotation</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FootNavigation;
