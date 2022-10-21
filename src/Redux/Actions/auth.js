
// import { STATUS_CODES } from "../../Config";
// import axios from "axios";
// import {
//   LOGIN,
//   SUCCESS,
//   LOGOUT,
//   REQUEST,
//   REGISTER,
//   FAIL,
//   // COMPLETE_PROFILE,
// } from "./actionTypes";
// import { toast } from "react-toastify";
// import { login, logout, register } from "../../Apis";



// // export const handleLogin = (payload) => {
// //   return (dispatch) => {
// //     dispatch({
// //       type: LOGIN[REQUEST],
// //     });
// //     login(payload)
// //       .then((res) => {
// //         if (res?.statusCode === STATUS_CODES.SUCCESS) {
// //           // toast.success("Login successful!");
// //           window.localStorage.removeItem("sessionExpire");
// //           window.localStorage.setItem("userId", res.data._id);
// //           dispatch({
// //             type: LOGIN[SUCCESS],
// //             data: res?.data,
// //           });
// //           localStorage.setItem("token", res.data.accessToken);
// //           if (res.data.isProfileComplete) {
// //             window.location.href = "/dashboard";
// //           } else {
// //             window.location.href = "/profilebuild";
// //           }
// //         }
// //       })
// //       .catch(() => {
// //         dispatch({
// //           type: LOGIN[FAIL],
// //         });
// //       });
// //   };
// // };

// export const handleLogout = (auto) => {
//   return (dispatch) => {
//     if (auto) {
//       dispatch({
//         type: LOGOUT[SUCCESS],
//       });
//     } else {
//       logout()
//         .then((res) => {
//           if (res?.statusCode === STATUS_CODES.SUCCESS) {
//             toast.success("Logout successful!");
//             window.localStorage.removeItem("userId");
//             localStorage.setItem("token", null);
//             document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
//             dispatch({
//               type: LOGOUT[SUCCESS],
//             });
//           }
//         })
//         .catch((err) =>
//           dispatch({
//             type: LOGOUT[FAIL],
//           })
//         );
//     }
//   };
// };

// export const emailVerfy = (payload , navigateTo) => {
//   localStorage.setItem("deviceId", payload.deviceId);
//   localStorage.setItem("email", payload.email);
//   localStorage.setItem("password", payload.password);
//   // return (dispatch) => {
//   localStorage.setItem("email", payload.email);
//   axios
//   .post("https://email-api.idesign.market/api/send", {
//       email: payload.email,
//     },{
//       headers:{
//         'Access-Control-Allow-Origin': '*'
//       }
//     })
//     .then((res) => {
//       if (res.status == 200) {
//         console.log(1)
//         window.location.href = "/emailverification";
//       } else {
        
//       }
//     })
//     .catch((err) => {

//       console.log(err);
//     });

//   // };
// };

// export const handleRegister = (payload) => {
//   return (dispatch) => {
//     dispatch({
//       type: REGISTER[REQUEST],
//     });
//     register(payload)
//       .then(({ statusCode, data }) => {
//         if (statusCode === STATUS_CODES.SUCCESS) {
//           window.localStorage.removeItem("sessionExpire");
//           localStorage.setItem("token", data.accessToken);
//           window.localStorage.setItem("userId", data._id);
//           emailVerfy(payload);
//           window.localStorage.setItem("email", data.email);
//           window.localStorage.setItem("deviceId", data.deviceId);
//           dispatch({
//             type: REGISTER[SUCCESS],
//             data,
//           });
//         }
//       })
//       .catch(() => {
//         dispatch({
//           type: REGISTER[FAIL],
//         });
//       });
//   };
// };

// export const completeProfile = (data) => {
//   return (dispatch) => {
//     dispatch({
//       type: LOGIN[SUCCESS],
//       data,
//     });
//   };
// };
