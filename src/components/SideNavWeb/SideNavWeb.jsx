import React from "react";
import styles from "./SideNavWeb.module.css";
import {data } from "../utils"
// import upgradeMedal from "../Assets/upgradeMedal.svg";
import { Dropdown } from "react-bootstrap";
// import CreateNewProjectButton from "../CreateNewProjectButton/CreateNewProjectButton";
import { useSelector } from "react-redux";

const SideNavWeb = () => {
    const sideNavLinkArray =data.sideNavLinkArray
  const profileData = useSelector((state) => {
    return state?.addToCartReducer?.profileData});
    console.log(profileData)
  const goToPage = (navigable, towards) => {
    if (navigable) {
      window.location.assign(towards);
    }
  };
  return (
    <React.Fragment>
      <div className={styles.sidenavContainer}>
        <div>
          <div className={styles.createProjectButton}>
            {/* <CreateNewProjectButton place="sidebar" /> */}
          </div>

          <hr />

          {sideNavLinkArray.map(
            (curElem,index) =>
              curElem.visible && (
                <div key={index} className={curElem.label === "My Projects" ? styles.sidenavLinkActive : styles.sidenavLinkStyle} onClick={() => goToPage(curElem.navigable, curElem.towards)}>
                  <div className="d-flex align-items-center me-3">{curElem.label === "My Projects" ? curElem.selected : curElem.notSelected}</div>
                  <div className="me-2">{curElem.label}</div>
                  {curElem.comingSoon && (
                    <div style={{ fontSize: "8px", border: "0.5px solid #dfdfdf", display: "flex", alignItems: "center", padding: "0 0.2rem", borderRadius: "50px", marginTop: "8px" }}>
                      Coming Soon
                    </div>
                  )}
                </div>
              )
          )}

          <hr />

          <div className={styles.upgradeButton} onClick={() => goToPage(true, "https://pro.idesign.market/plans")}>
            <button>
              {/* <img src={upgradeMedal} alt="" /> */}
              Upgrade To Premium
            </button>
          </div>

          <hr />
        </div>
        <div>
          <Dropdown drop="end" style={{ backgroundColor: "#ffffff", border: "none", outline: "none" }}>
            <Dropdown.Toggle as="button" style={{ backgroundColor: "#ffffff", border: "none", color: "#000000" }}>
              <div style={{ fontSize: "14px", fontWeight: "500", display: "flex", flexDirection: "column", alignItems: "start" }}>
                <div style={{ color: "#176091" }}>Contact me</div>
                <div>{profileData && profileData[0]?.rmProfile?.name}</div>
                <div>Relationship Manager</div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ padding: "1rem 1rem 0 1rem" }}>
              <div style={{ display: "flex", width: "30rem", justifyContent: "space-between" }}>
                <div style={{ height: "4rem", width: "4rem", borderRadius: "50%", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img style={{ height: "100%" }} src={profileData && profileData[0]?.rmProfile?.profileImagePath} alt="" />
                </div>
                <div style={{ width: "85%", fontSize: "14px" }}>
                  <div className="mb-2">Hello there!</div>
                  <div className="mb-2">I am Ramesh, your relationship manager. I love to travel and to draw anime sketches. </div>
                  <div className="mb-2">If you have any query regarding anything, you can contact me.</div>
                  <div className="mb-2">
                    <span style={{ fontWeight: "500" }}>Call me:</span> {profileData && profileData[0]?.rmProfile?.phoneNumber}
                  </div>
                  <div className="mb-2">
                    <span style={{ fontWeight: "500" }}>Email me:</span> {profileData && profileData[0]?.rmProfile?.email}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around", borderTop: "1px solid #dfdfdf" }}>
                <div style={{ width: "50%", borderRight: "1px solid #dfdfdf", textAlign: "center", padding: "0.25rem 1rem", color: "#176091" }}>request a callback</div>
                <div style={{ width: "50%", textAlign: "center", padding: "0.25rem 1rem", color: "#176091" }}>send a message</div>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideNavWeb;
