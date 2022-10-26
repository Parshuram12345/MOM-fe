// import React from "react";
// import styles from "./createNewProjectButton.module.css";
// import { IoHome } from "react-icons/io5";
// import { GiPiggyBank } from "react-icons/gi";
// import { useDispatch, useSelector } from "react-redux";
// import { selectLeadForDiscussion } from "../../../Actions";
// // import { selectLeadForDiscussion } from "../../Redux/Actions";

// const ModalClientCard = (props) => {
//     const selectedLeadForDiscussion = useSelector((state) => state.addToCartReducer.selectedLeadForDiscussion);
//     // console.log(selectedLeadForDiscussion)
//     const dispatch = useDispatch();
//     const selectLead = (leadDetail) => {
//         if (selectedLeadForDiscussion.id === props.clientData._id) {
//             dispatch(selectLeadForDiscussion(""));
//         } else {
//             dispatch(selectLeadForDiscussion(leadDetail));
//         }
//     };

//     const x = {
//         id: props.clientData._id,
//         address: props.clientData.address ? props.clientData.address : "",
//         city: props.clientData.city ? props.clientData.city : "",
//         config: props.clientData.config ? props.clientData.config : "",
//         budget:
//             props.clientData.budget &&
//             (props.clientData.budget === "Over ₹ 7,00,000"
//                 ? "Over 7 Lacs"
//                 : props.clientData.budget === "₹ 1,00,000 - ₹ 3,00,000"
//                     ? "₹ 1-3 Lacs"
//                     : props.clientData.budget === "₹ 3,00,000 - ₹ 7,00,000"
//                         ? "₹ 3-7 Lacs"
//                         : ""),
//         name: props.clientData.name,
//     };

//     return (
//         <React.Fragment>
//             <div className={props?.clientData?._id !== selectedLeadForDiscussion?.id ? styles.clientCardContainer : styles.clientCardContainerActive} onClick={() => selectLead(x)}>
//                 <div className="d-flex align-items-center">
//                     <div className={styles.initials}>
//                         {props.clientData.name && props.clientData.name.split(" ")[0].split("")[0]}
//                         {props.clientData.name.split(" ").length > 1 && props.clientData.name.split(" ")[1].split("")[0]}
//                     </div>
//                     <div>
//                         <div style={{ fontSize: "18px", fontWeight: "600", width: "8rem" }}>{props.clientData.name && props.clientData.name}</div>
//                         <div>
//                             <div>{props.clientData.address && `${props.clientData.address},`}</div>
//                             <div>{props.clientData.city && `${props.clientData.city}`}</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="d-flex">
//                     <div className="d-flex align-items-center me-4" style={{ fontSize: "16px", color: "#888888" }}>
//                         <IoHome style={{ marginRight: "0.5rem" }} />
//                         {props.clientData.config && props.clientData.config}
//                     </div>
//                     <div className="d-flex align-items-center" style={{ fontSize: "16px", color: "#888888" }}>
//                         <GiPiggyBank fontSize={20} style={{ marginRight: "0.5rem" }} />
//                         {props.clientData.budget && props.clientData.budget === "₹ 1,00,000 - ₹ 3,00,000"
//                             ? "1-3 Lacs"
//                             : props.clientData.budget === "₹ 3,00,000 - ₹ 7,00,000"
//                                 ? "3-7 Lacs"
//                                 : props.clientData.budget === "Over ₹ 7,00,000"
//                                     ? "Over 7 Lacs"
//                                     : null}
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// };

// export default ModalClientCard;