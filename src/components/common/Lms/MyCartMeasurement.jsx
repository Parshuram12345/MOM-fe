import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderNav from "./LmsWebComponents/HeaderNav";
import SideBarWeb from "./LmsWebComponents/SideBarWeb";
import { useNavigate } from "react-router-dom";
import MeasurmentMobileCart from "./MeasurementMobileCart";
// import goBack from "./Images/gobackicon.svg";
import CartItem from "./Images/CartItem.svg";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner'
import { useSelector, useDispatch } from "react-redux";
import gstDoc from "../Images/gstDocument.svg";
import {
  faDotCircle,
  faFile,
  faInfoCircle,
  faPencilAlt,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import location from "./Images/location.svg";
import smallHouse from "./Images/smallHouse.svg";
import smallCalender from "./Images/smallCalender.svg";
import Sign from "./Images/Sign.svg";

import { Form, Modal } from "react-bootstrap";
import { createOrder } from "../Apis";
import { RAZOR_PAY_KEY } from "../Config";
import {
  addPurchasedLeads,
  fetchProfileData,
  sendInvoice,
  setGstDetails,
} from "./Actions";

const MyCartMeasurement = () => {

  const [loading, setIsLoading] = useState(false);  //here

  const [isDesktop, setDesktop] = useState(window.innerWidth > 599);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const profileInfo = useSelector(
    (state) => state.addToCartReducer.profileData
  );

  // console.log("profile data", profileInfo);

  const initialGstData = {
    companyName: profileInfo[0]?.data?.data?.companyName,
    gstNum: profileInfo[0]?.data?.data?.gstNumber,
  };

  const [gstData, setGstData] = useState(initialGstData);
  const [error, setError] = useState({nameError:"", gstError: ""});

  const authtoken = localStorage.getItem("token");
  const [isHome, setIsHome] = useState("true");

  const [cartItemArray, setCartItemArray] = useState([]);
  const [isAddedGst, setIsAddedGst] = useState(false);
  const [allCartInfo, setAllCartInfo] = useState();

  const gstDataInputHandler = (event) => {
    const { name, value } = event.target;
    // console.log(typeof(value))
    setGstData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

  };
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetch() {
      const response = await axios
        .get("https://pro-api.idesign.market/user/getUserMeasurements", {
          headers: {
            authorization: `Bearer ${authtoken}`,
          },
        })
        .then((res) => {
          // console.log("useEffect", res.data.data);
          setAllCartInfo(res.data.data);
          setCartItemArray(res.data.data.data);
          setMsg("")
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetch();

    // console.log("useEffect");
  }, [msg]);


  const goBackHome = () => {
    navigate("/lead");
  };

  const dateConverter = (date) => {
    if (date === null) {
      return "No dates Selected";
    }
    const dateObject = new Date(date);
    const allMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let day = dateObject.getDate();
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();

    if (day.length < 2) {
      day = "0" + day;
    }

    const actualdate = day + "-" + allMonths[month] + "-" + year;
    localStorage.setItem("date", actualdate);
    return actualdate;
  };

  const [gstFilled, setGstFilled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleGstInfo = () => {

    if(gstData.companyName === undefined){
      setError({nameError:"company name cannot be null"});    
      return
    }
    if(gstData.companyName === undefined){
      setError({gstError:"gst cannot be null"})
      return
    }

    setIsAddedGst(false);
    // dispatch(setGstData(authtoken, gstData.gstNum, gstData.companyName ));
    setGstFilled(true);
    setIsChecked(true)
    console.log(gstData)
  };

  const [isHalf, setHalf] = useState(false);
  const [halfIndex, setHalfIndex] = useState();

  const handleHalf = async (index, number) => {
 
    const id  = cartItemArray[index]._id;
    
    const response = await axios.post("https://pro-api.idesign.market/user/toggleMeasurementPrice", 
    {

      id: id,
      priceToPay: number,
    },
    {
      headers: {
        authorization: `Bearer ${authtoken}`,
      },
    }  
    ).then((res)=>{
      // console.log(res.data.data);
      setAllCartInfo(res.data.data)
      setCartItemArray(res?.data?.data?.data);

    }).catch((err)=>{
      console.log(err);
    })
    
    setHalf(true);
    setHalfIndex(index);
  };

  const [pay, setPay] = useState("full");

  const handleRadio = (event) => {

    setPay(event.target.value)
  }


  const handleRemove = async (index) => {
    const id = cartItemArray[index]._id;

    const response = await axios
      .post(
        "https://pro-api.idesign.market/user/removeMeasurementsFromCart",

        {
          id: id,
        },

        {
          headers: {
            authorization: `Bearer ${authtoken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        // window.location.reload();
        setMsg(res?.data?.data?.message)

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const placeOrderOnRazorpay = async () => {

    setIsLoading(true);  //here

    const amount = pay === "full" ? allCartInfo?.grandTotal : (allCartInfo?.grandTotal/2) ;
    
    const res = await createOrder({ amount: parseFloat(amount.toFixed(2)) });

    if (res?.statusCode !== 200) {
      // console.log(res?.message);
      return;
    }

    const option = {
      description: "iDesign payment",
      currency: "INR",
      key: RAZOR_PAY_KEY,
      amount: allCartInfo?.grandTotal,
      name: "iDesign.market pvt.ltd.",
      order_id: res?.data?.id,
      handler: paymentHandler.bind(this, amount),
      prefill: {
        name: profileInfo[0]?.data?.data?.companyName,
        email: profileInfo[0]?.data?.data?.email,
        contact: profileInfo[0]?.data?.data?.phoneNumber,
      },
      notes: {
        address: `Payment for cart`,
      },
      theme: {
        color: "#61dafb",
      },
    };

    try {
      const paymentObject = new window.Razorpay(option);
      paymentObject.open();
    } catch (err) {
      console.log(err?.message);
    }
  };

  
  const paymentHandler = async (amount, response) => {
    // console.log(response);
    const data = {
      pricePaid: amount,
      razorPaymentId: response?.razorpay_payment_id,
      razorOrderId: response?.razorpay_order_id,
      razorSignature: response?.razorpay_signature,
    };

    
    const measurementArr = cartItemArray.map((curElem) => {
      return {
        id: curElem._id,
        orderStatus: curElem.orderStatus,
        paymentStatus: curElem.paymentStatus,
        pricePaid: curElem.priceToPay === 2 ? curElem.totalPrice/2 : curElem.totalPrice,
        razorOrderId: response?.razorpay_order_id,
        razorPaymentId: response?.razorpay_payment_id,
        razorSignature: response?.razorpay_signature,
      };
    });



    if (response) {
      setIsLoading(false);  //here
      
        const response = await axios.post("https://pro-api.idesign.market/user/placeMeasurementOrder", {

          data: measurementArr

        }).then((res) => {
          // console.log(res);
          navigate("/measurementfinal");

        }).catch((err) => {
          console.log(err);
        })
    

    }
  };

  return (
    <>
      <Modal
        className="addProjectModalPopup"
        centered
        show={isAddedGst}
        onHide={() => {
          setIsAddedGst(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>GST Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div style={{ margin: "16px 0" }}>
              <div style={{ marginBottom: "8px" }}>Company Name</div>
              <div>
                <Form.Control
                  className="w-100"
                  style={{ fontSize: "15px", fontWeight: "400" }}
                  name="companyName"
                  type="text"
                  placeholder="Type Company Name"
                  value={gstData.companyName}
                  onChange={gstDataInputHandler}
                />
              </div>
            </div>
            {/* {error.gstError.length > 1 && <div style={{fontSize:'12px', color:'red'}}>gst no can not be null</div>} */}
            <div style={{ margin: "0 0 16px 0" }}>
              <div style={{ marginBottom: "8px" }}>Registration Number</div>
              <div>
                <Form.Control
                  className="w-100"
                  style={{ fontSize: "15px", fontWeight: "400" }}
                  name="gstNum"
                  type="text"
                  placeholder="Enter Registration Number"
                  value={gstData.gstNum}
                  onChange={gstDataInputHandler}
                />
              </div>
            </div>
            <div style={{ margin: "0 0 16px 0" }}>
              <div
                role="button"
                style={{
                  width: "100%",
                  border: "none",
                  backgroundColor: "#3B5998",
                  color: "#FFFFFF",
                  padding: "8px 187px",
                  borderRadius: "8px",
                }}
                onClick={handleGstInfo}
                disabled={
                  gstData.companyName === null
                }
              >
                Confirm
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {isDesktop ? (
        <div>
          <HeaderNav />
          <div
            style={{
              background: "White",
              display: "flex",
            }}
          >
            <div
              className="sidBarHeight d-none d-md-block"
              style={{ paddingRight: "0" }}
            >
              <SideBarWeb />
            </div>
            <div
              className="cart"
              style={{ width: "100%", height: "90vh", overflow: "scroll" }}
            >
              <div
                className="webMyCart-header"
                style={{
                  height: "60px",
                  borderBottom: "1px solid #DFDFDF",
                  padding: "10px",
                }}
              >
                <div
                  style={{ fontSize: "20px" }}
                  role="button"
                  onClick={goBackHome}
                >
                  My Cart ({cartItemArray.length})
                </div>
              </div>

              <div className="d-flex">
                <div
                  style={{
                    width: "100%",
                    height: "80vh",
                    overflow: "scroll",
                    overflowX: "hidden",
                    margin: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.7rem",
                  }}
                >
                {/* <p style={{color:'green', fontSize:'20px', position:'absolute'}}>{msg}</p> */}

                  <div>
                    {cartItemArray.map((element, index) => {
                      return (
                        <div key={index} style={{ marginTop: "10px" }}>
                          {element.rooms.length === 0 ? (
                            <div
                              className="d-flex"
                              style={{
                                width: "100%",
                                height: "fit-content",
                                border: "1px solid #DFDFDF",
                                margin: "0px",
                                padding: "15px 1px",
                                borderRadius: "7px",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "#C6D1D9",
                                  margin: "1px 6px",
                                  borderRadius: "3px",
                                }}
                              >
                                <img
                                  src={CartItem}
                                  style={{ width: "75%", margin: "18px 9px" }}
                                />
                              </div>

                              <div
                                style={{ width: "70%", padding: "0px 14px" }}
                              >
                                <div
                                  className="d-flex"
                                  style={{ gap: "0.6rem" }}
                                >
                                  <h5>Measurement Request</h5>
                                  <div
                                    role="button"
                                    style={{
                                      width: "121px",
                                      height: "31px",
                                      border: element.priceToPay === 1  ? '1px solid #3B5998' : '',
                                      borderRadius: "48px",
                                      fontSize: "13px",
                                      padding: "4px 10px",
                                    }}
                                    onClick={()=> handleHalf(index, 1)}

                                  >
                                    <img src={Sign} alt="s" /> Full Payment
                                  </div>
                                  <div role="button" style={{width: '121px', height: '31px', backgroundColor: element.priceToPay === 1 ? '#F0F0F0': 'white', borderRadius: '48px', fontSize:'13px', padding:'4px 10px', border: element.priceToPay === 2 ? '1px solid #3B5998' : ''}} onClick={()=> handleHalf(index, 2)}>50% Payment</div>
                                </div>
                                <div className="d-flex" style={{ gap: "6px" }}>
                                  <img
                                    src={location}
                                    style={{ marginTop: "-14px" }}
                                  />
                                  <div className="d-flex" style={{ height: "58px", padding: '8px 2px', gap: '4px', }}>

                                    <p>{element.houseNumber}</p>
                                    <p>{element.projectLocation} </p>
                                  </div>

                                  <img
                                    src={smallCalender}
                                    style={{ marginTop: "-17px" , marginLeft:'10px'}}
                                  />
                                  <div className="mx-1 d-flex" style={{ height: "58px", padding: '8px 2px', gap:'0.6rem'}}>
                                    {" "}
                                    <p>{element.isConfirmDate !== 3 ? dateConverter(element.Date): "No dates selected"}</p>
                                    <p>{element?.Date ? new Date(element?.createdAt).toLocaleTimeString().replace(/\:\d+\s/, " "): "No dates selected"}</p>


                                    {/* <p>{element.isConfirmDate === 1
                                      ? "(Confirm)"
                                      : element.isConfirmDate === 2
                                        ? "(Tentative)"
                                        : " "}</p> */}
                                  </div>
                                </div>

                                <div className="d-flex">
                                  <p style={{width:'80px'}}>
                                    <img
                                      src={smallHouse}
                                      style={{ marginTop: "-5px" }}
                                    />{" "}
                                    <span>{element.houseType}</span>{" "}
                                  </p>
                                  <div
                                    className="mx-3"
                                    style={{
                                      height: "26px",
                                      width: "102px",
                                      backgroundColor: "#F0F0F0",
                                      padding: "1px 8px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {" "}
                                    Full Home
                                  </div>

                                  <p style={{ fontSize:'14px', marginTop:'3px'}}>(Final payment will be based on actual carpet area)</p>
                                </div>
                              </div>
                              <div
                                className="mx-3"
                                style={{ width: "15%", height: "100%" }}
                              >
                               
                                  <b
                                    className="font-weight-bold"
                                    style={{ fontSize: "1.5rem" }}
                                  >
                                    ₹ { element.priceToPay === 1 ? (Intl.NumberFormat('en-IN').format(element.totalPrice)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(element.totalPrice) : (Intl.NumberFormat('en-IN').format(element.totalPrice/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(element.totalPrice/2) }
                                  </b>
                               
                                <div
                                  role="button"
                                  
                                  style={{
                                    
                                    padding: "1px 9px",
                                    textAlign: "center",
                                    marginTop: "57px"
                                  }}
                                  onClick={() => handleRemove(index)}
                                >
                                  {" "}
                                  Remove
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="d-flex"
                              style={{
                                width: "100%",
                                height: "fit-content",
                                border: "1px solid #DFDFDF",
                                margin: "0px",
                                padding: "15px 1px",
                                borderRadius: "7px",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "#C6D1D9",
                                  margin: "1px 6px",
                                  borderRadius: "3px",
                                }}
                              >
                                <img
                                  src={CartItem}
                                  style={{ width: "75%", margin: "18px 9px" }}
                                />
                              </div>

                              <div style={{ width: "70%", padding: "0 14px" }}>
                                <div
                                  className="d-flex"
                                  style={{ gap: "0.6rem" }}
                                >
                                  <h5>Measurement Request</h5>
                                  <div
                                    role = "button"
                                    style={{
                                      width: "121px",
                                      height: "31px",
                                      border: element.priceToPay === 1 ? '1px solid #3B5998' : '',
                                      borderRadius: "48px",
                                      fontSize: "13px",
                                      padding: "4px 10px",
                                    }}
                                    onClick={()=> handleHalf(index, 1)}

                                  >
                                    <img src={Sign} alt="s" /> Full Payment
                                  </div>
                                  <div role="button" style={{width: '121px', height: '31px', backgroundColor: element.priceToPay === 1 ? '#F0F0F0': 'white', borderRadius: '48px', fontSize:'13px', padding:'4px 10px', border: element.priceToPay === 2 ? '1px solid #3B5998' : ''}} onClick={()=> handleHalf(index, 2)}>50% Payment</div>
                                </div>
                                <div className="d-flex" style={{ gap: "6px" }}>
                                  <img
                                    src={location}
                                    style={{ marginTop: "-14px" }}
                                  />
                                  <div className="d-flex" style={{ height: "58px", padding: '8px 2px', gap: '4px', }}>

                                    <p>{element.houseNumber}</p>
                                    <p>{element.projectLocation} </p>
                                  </div>

                                  <img
                                    src={smallCalender}
                                    style={{ marginTop: "-17px",  marginLeft:'10px' }}
                                  />
                                  <div className="mx-1 d-flex" style={{ height: "58px", padding: '8px 2px', gap:'0.6rem'}}>
                                    {" "}
                                    <p>{element.isConfirmDate !== 3 ? dateConverter(element.Date): "No dates selected"}</p>
                                    <p>{element?.Date ? new Date(element?.createdAt).toLocaleTimeString().replace(/\:\d+\s/, " "): "No dates selected"}</p>

                                    {/* <p>{element.isConfirmDate === 1
                                      ? "(Confirm)"
                                      : element.isConfirmDate === 2
                                        ? "(Tentative)"
                                        : " "}</p> */}
                                  </div>
                                </div>

                                <div
                                  className="d-flex"
                                  style={{ flexWrap: "wrap", gap: "2px", columnGap: '10px', rowGap: '5px' }}
                                >
                                  {element.rooms.map((room) => {
                                    if (room.noOfRooms > 0) {
                                      return (
                                        <div
                                          className=""
                                          style={{
                                            height: "26px",
                                            width: "fit-content",
                                            backgroundColor: "#F0F0F0",
                                            padding: "1px 8px",
                                            borderRadius: "4px",
                                          }}
                                        >
                                          {room.room}({room.noOfRooms})
                                        </div>
                                      );
                                    }
                                  })}
                                </div>
                              </div>
                              <div className="mx-3" style={{ width: "15%" }}>
                                <b
                                  className="font-weight-bold"
                                  style={{ fontSize: "1.5rem" }}
                                >
                                  ₹ {element.priceToPay === 1  ? (Intl.NumberFormat('en-IN').format(element.totalPrice)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(element.totalPrice) : (Intl.NumberFormat('en-IN').format(element.totalPrice/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(element.totalPrice/2)}
                                </b>
                                <div
                                  role="button"
                                  
                                  style={{
                                   
                                    padding: "1px 9px",
                                    textAlign: "center", 
                                    marginTop: "57px"
                                  }}
                                  onClick={() => handleRemove(index)}
                                >
                                  {" "}
                                  Remove
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  style={{ width: "30%", margin: "10px 25px" }}
                  className=" "
                >
                  {/* {loading ? <Spinner style={{height:'21px', width:'21px', position:'absolute', margin: '12px 36px'}} animation="border" variant="light"/> : null} */}
                  <Button
                    variant="primary"
                    onClick={placeOrderOnRazorpay}
                    style={{ width: "100%", backgroundColor: "#3B5998" }}
                  >
                    Proceed to buy
                  </Button>

                  <div
                    className="my-3"
                    style={{
                      height: "fit-content",
                      border: "1px solid #DFDFDF",
                      padding: "5px 10px",
                      borderRadius: "8px",
                    }}
                  >
                    <div className="d-flex ">
                      <p style={{ fontWeight: "bolder", marginBottom:'15px' }}> Price Details</p>
                    </div>
                    <div className="d-flex justify-content-between" style={{  marginBottom:'10px' }}>
                      <p> Item Price({cartItemArray.length})</p>
                      <p className="fw-bolder">₹ {pay === "full" ? (Intl.NumberFormat('en-IN').format(allCartInfo?.totalPrice)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.totalPrice) : (Intl.NumberFormat('en-IN').format(allCartInfo?.totalPrice/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.totalPrice/2)}</p>
                    </div>
                    <div className="d-flex justify-content-between" style={{  marginBottom:'10px' }}>
                      <p> Discount</p>
                      <p className="fw-bolder" style={{ color: "#176091" }}>- ₹ {pay === "full" ? (Intl.NumberFormat('en-IN').format(allCartInfo?.discount)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.discount) : (Intl.NumberFormat('en-IN').format(allCartInfo?.discount/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.discount/2)}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p> GST - 18%</p>
                      <p className="fw-bolder" >₹ {pay === "full" ? (Intl.NumberFormat('en-IN').format(allCartInfo?.gst)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.gst) : (Intl.NumberFormat('en-IN').format(allCartInfo?.gst/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.gst/2)}</p>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-between">
                      <p> Grand Total</p>
                      <p className="fw-bolder">₹ {pay === "full" ? (Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal) : (Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal/2)}</p>
                    </div>
                  </div>

                  <div
                    style={{
                      height: "fit-content",
                      padding: "12px 20px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "8px",
                    }}
                    role="button"
                    onClick={() => setIsAddedGst(true)}
                  >

                    <div className="d-flex">

                      <Form.Check aria-label="option 1" checked={isChecked} />
                      <div>
                        I have a GST number{" "}
                        <span style={{ color: "#888888" }}>(Optional)</span>
                      </div>

                    </div>

                    {gstFilled ? (
                      <div
                        className="w-100 p-2 mt-2 d-flex justify-content-between"
                        style={{ backgroundColor: "#F6F6F6" }}
                      >
                        <div className="d-flex">
                          <div className="gstIcon-container">
                            <img src={gstDoc} />
                          </div>
                          <div>
                            <div style={{ fontSize: "10px" }}>
                              {gstData.companyName}
                            </div>
                            <div style={{ fontSize: "10px", color: "#000000" }}>
                              {gstData.gstNum}
                            </div>
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-center"
                          onClick={() => {
                            setIsAddedGst(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} color="#A7A7A7" />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* <div className="sections" style={{ padding: "12px 18px 16px 18px", border: "1px solid #DFDFDF", marginTop:'10px', borderRadius:'8px' }}>
                    <div className="d-flex flex-column align-items-center" >
                      <div className='d-flex w-100' style={{ borderBottom: "1px solid #DFDFDF" }}>
                        <input type="radio" value="full" checked={pay === "full"} onChange={handleRadio} /><p className='my-2 px-2 d-flex justify-content-between  w-100' style={{ fontWeight: "400", fontSize: "16px", color: "black" }}> Pay in full<span className='float-end'>₹ {(Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal) }</span></p>
                      </div>
                      <div className='d-flex w-100'>
                        <input type="radio" value="half" checked={pay === "half"} onChange={handleRadio} /><p className='my-2 px-2 d-flex justify-content-between  w-100' style={{ fontWeight: "400", fontSize: "16px", color: "black" }}>Pay 50% later <span className='float-end'>₹ {(Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal/2)}</span></p>
                      </div>
                    </div>
                    
                  </div> */}

                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MeasurmentMobileCart />
      )}
    </>
  );
};

export default MyCartMeasurement;
