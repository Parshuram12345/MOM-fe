// import React from "react";
// import styles from "./WebHeader.module.css";
// import logo from "../Assets/logo.svg";
// import upgradeMedal from "../Assets/upgradeMedal.svg";
// // import testProfile from "../Assets/testProfile.svg";
// import { AiOutlineBell, AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai";
// import { HiOutlineShoppingCart, HiOutlineClipboardList, HiOutlineDocumentText } from "react-icons/hi";
// import { Dropdown } from "react-bootstrap";
// import { BsPersonCircle, BsCartCheck } from "react-icons/bs";
// import { MdOutlineReviews, MdLogout } from "react-icons/md";

// import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
// import { useSelector } from "react-redux";

// const WebHeader = () => {
//   const profileData = useSelector((state) => state.pmtPersist.profileData);

//   return (
//     <React.Fragment>
//       <div className={styles.headerContainer}>
//         <div className={styles.logoContainer}>
//           <img src={logo} alt="" />
//         </div>
//         <div className={styles.navbarIcons}>
//           <div className="d-flex align-items-center position-relative">
//             <AiOutlineBell fontSize={22} />
//             <div style={{ backgroundColor: "#FB5622", borderRadius: "50%", height: "12px", width: "12px", position: "absolute", left: "14px", bottom: "12px" }}></div>
//           </div>
//           <div className={styles.navbarIcons}>
//             <HiOutlineShoppingCart fontSize={21} />
//             <div
//               style={{
//                 backgroundColor: "#FB5622",
//                 borderRadius: "50%",
//                 height: "12px",
//                 width: "12px",
//                 position: "absolute",
//                 left: "14px",
//                 bottom: "12px",
//                 fontSize: "8px",
//                 fontWeight: "500",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 color: "#ffffff",
//               }}
//             >
//               2
//             </div>
//           </div>
//           <div className={styles.upgradeButton}>
//             <button>
//               <img src={upgradeMedal} alt="" />
//               Upgrade
//             </button>
//           </div>
//           <div>
//             <Dropdown style={{ display: "flex", alignItems: "center" }}>
//               <DropdownToggle style={{ border: "none", backgroundColor: "#ffffff" }} as="button">
//                 <div className="d-flex">
//                   <div className={styles.profileImageContainer}>{profileData ? <img src={profileData[0]?.imageUrl?.thumbnail} alt="" /> : <BsPersonCircle />}</div>
//                   <div className="d-flex flex-column align-items-start">
//                     <div style={{ fontSize: "14px", fontWeight: "500" }}>{profileData && profileData[0]?.companyName}</div>
//                     <div style={{ fontSize: "12px", backgroundColor: "#17609126", borderRadius: "50px", padding: "0 0.7rem" }}>
//                       {profileData && (profileData[0]?.planId?._id === "6200c35b083dd9b8c3f69391" ? "Free Plan" : "Premium Plan")}
//                     </div>
//                   </div>
//                 </div>
//               </DropdownToggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item className={styles.dropDownLinks}>
//                   <BsPersonCircle style={{ marginRight: "0.5rem" }} />
//                   My Profile
//                 </Dropdown.Item>
//                 <Dropdown.Item className={styles.dropDownLinks}>
//                   <HiOutlineClipboardList style={{ marginRight: "0.5rem" }} />
//                   My Plan
//                 </Dropdown.Item>
//                 <Dropdown.Item className={styles.dropDownLinks}>
//                   <MdOutlineReviews style={{ marginRight: "0.5rem" }} />
//                   Reviews
//                 </Dropdown.Item>
//                 <Dropdown.Item className={styles.dropDownLinks}>
//                   <BsCartCheck style={{ marginRight: "0.5rem" }} />
//                   My Orders
//                 </Dropdown.Item>

//                 <Dropdown.Divider />

//                 <Dropdown.Item className={styles.dropDownLinks}>
//                   <AiOutlineInfoCircle style={{ marginRight: "0.5rem" }} />
//                   About iDesign
//                 </Dropdown.Item>
//                 <Dropdown.Item className={styles.dropDownLinks}>
//                   <AiOutlineQuestionCircle style={{ marginRight: "0.5rem" }} />
//                   How iDesign Works
//                 </Dropdown.Item>
//                 <Dropdown.Item className={styles.dropDownLinks}>
//                   <HiOutlineDocumentText style={{ marginRight: "0.5rem" }} />
//                   Terms & Conditions
//                 </Dropdown.Item>

//                 <Dropdown.Divider />

//                 <Dropdown.Item className={styles.dropDownLinks} style={{ color: "#BE4C4C" }}>
//                   <MdLogout style={{ marginRight: "0.5rem" }} />
//                   Sign Out
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default WebHeader;
