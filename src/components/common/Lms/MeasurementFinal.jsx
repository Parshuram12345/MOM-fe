import React, { useEffect, useState, useNavigatese } from "react";
import { Accordion } from "react-bootstrap";
import HeaderNav from "./LmsWebComponents/HeaderNav";
import SideBarWeb from "./LmsWebComponents/SideBarWeb";
import "../3dComponents/3d.css";
import RightSideBar from "./RightSideBar";
import MeasurmentMobile from "./MeasurmentMobile";
import { useNavigate } from "react-router-dom";

import houseMeasurment from "./Images/houseMeasurment.svg";
import axios from "axios";
import SOP from "./Images/SOP.svg";
import { useSelector } from 'react-redux';

import location from "./Images/location.svg";
import smallHouse from "./Images/smallHouse.svg";
import smallCalender from "./Images/smallCalender.svg";
import CartItem from "./Images/CartItem.svg";

const MeasurementFinal = () => {

  const profile = useSelector(state => state.addToCartReducer.profileData);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 599);
  const navigate = useNavigate();

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });


  const authtoken = localStorage.getItem("token");

  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(()=>{

    console.log("useEffect")
    const func = async ()=>{

      const response = await axios.get('https://pro-api.idesign.market/user/getUserOrders', {
        headers: {
          authorization: `Bearer ${authtoken}`,
        },
      })
      .then((res)=>{
        console.log(res);
        setOrderStatus(res?.data?.data)
        
      }).catch((err)=>{
        console.log(err);
      })
    }
    func()
  }, [])
 

  const faqs = [
    {
      no: 1,
      faq: "How soon will I get the measurements ?",
      faqa: "You will get the measurements within 2 days of the measurement date. The measurement will be given in ACAD dwg format with site pictures. You can read more about our measurement SOP here",
    },
    {
      no: 2,
      faq: "Are the measurements accurate ?",
      faqa: "Measurements are done by experts with a good experience of minimum 03 years and are very accurate. However, 100% accuracy is not guaranteed.",
    },
    {
      no: 3,
      faq: "Do I also get ACAD Drawings ?",
      faqa: "Yes, our team will draft the measurements taken into Autocad with details of beams, columns, windows, doors etc. Switch sockets positions are also marked in the drawing",
    },
    {
      no: 4,
      faq: "How much time do you need for measurement ?",
      faqa: "Time for measurements depends on the space. Typically a full house 3BHK apartment takes around 2-3 hours to measure.",
    },
  ];

  const handleStart = () => {
    navigate("/measurementpage/hometype");
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

  return (
    <>
      {isDesktop ? (
        <div>
          <HeaderNav />
          <div style={{ background: "White", display: "flex" }}>
            <div
              className="sidBarHeight d-none d-md-block"
              style={{ paddingRight: "0" }}
            >
              <SideBarWeb />
            </div>
            <div className="landing_main" style={{ overflowX: "hidden" }}>
              <div className="landing_main2" style={{padding: '0px 72px 0px 15px', width:'75%'}}>
                <div style={{width: "90%"}}>
                  <div className="landing_top" style={{ width: "100%" }}>
                    <h3 className="landing_header" style={{ fontWeight:'500'}}>
                      Get Measurement with As-Built Drawings <br /> done by
                      Professionals{" "}
                    </h3>
                    <p className="landing_p" style={{ width: "100%" }}>
                      Detailed measurement, site pictures with{" "}
                      <b>as builts drawings</b> on ACAD at <b>Rs 5 per sqrt</b>{" "}
                      or <b>Rs 750 per room</b>
                    </p>
                    <button className="landing_started" onClick={handleStart}>
                      Get Started
                    </button>
                  </div>

                  <div style={{marginTop:'40px'}}>

                    <div className="d-flex" style={{gap:'1rem'}}>

                        <p style={{fontSize: '17px', fontWeight: '500', borderBottom:'3px solid #3B5998'}} role="button">Ordered Measurements</p>
                        {/* <p style={{fontSize: '17px', fontWeight: '500'}}  role="button">Received Measurements</p> */}

                    </div>

                    <div style={{borderTop: '1px solid #DFDFDF', borderBottom:'1px solid rgb(223, 223, 223)', width:'50vw', height:'40vh', padding:'10px', margin:'-16px 0px', overflow:'scroll'}}>
                    {orderStatus.length !== 0 && orderStatus.map((element, index) => {
                      return (
                        <div style={{ marginTop: "10px" }}>
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
                                  margin: "11px 6px",
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
                                  <h5>Measurement </h5>
                                 
                                </div>
                                <div className="d-flex" style={{ gap: "6px" , marginTop:'-5px'}}>
                                  <img
                                    src={location}
                                    style={{ marginTop: "-14px" }}
                                  />
                                  <div className="d-flex" style={{ height: "58px", padding: '8px 2px', gap: '4px', }}>

                                    <p>{element?.houseNumber}</p>
                                    <p>{element?.projectLocation} </p>
                                  </div>

                                  <img
                                    src={smallCalender}
                                    style={{ marginTop: "-17px" }}
                                  />
                                  <div className="mx-1 d-flex" style={{ height: "58px", padding: '8px 2px', }}>
                                    {" "}
                                    <p>{dateConverter(element.Date)}</p>

                                    {/* <p>{element.isConfirmDate === 1
                                      ? "(Confirm)"
                                      : element.isConfirmDate === 2
                                        ? "(Tentative)"
                                        : " "}</p> */}
                                  </div>
                                </div>

                                <div className="d-flex" style={{marginTop:'-14px'}}>
                                  <p>
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
                                      width: "93px",
                                      backgroundColor: "#F0F0F0",
                                      padding: "1px 8px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {" "}
                                    Full Home
                                  </div>
                                </div>
                              </div>
                              <div
                                className="mx-3"
                                style={{ width: "20%", height: "100%" }}
                              >
                               
                                <b
                                  className="font-weight-bold"
                                  style={{ fontSize: "1.5rem" }}
                                >
                                  ₹ { (Intl.NumberFormat('en-IN').format(element.totalPrice)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(element?.totalPrice) }
                                </b>
                            
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
                                  margin: "2px 6px",
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
                                  <h5>Measurement </h5>
                                 
                                </div>
                                <div className="d-flex" style={{ gap: "6px", marginTop:'-5px' }}>
                                  <img
                                    src={location}
                                    style={{ marginTop: "-14px" }}
                                  />
                                  <div className="d-flex" style={{ height: "58px", padding: '8px 2px', gap: '4px', }}>

                                    <p>{element?.houseNumber}</p>
                                    <p>{element?.projectLocation} </p>
                                  </div>

                                  <img
                                    src={smallCalender}
                                    style={{ marginTop: "-17px" }}
                                  />
                                  <div className="mx-1 d-flex" style={{ height: "58px", padding: '8px 2px', }}>
                                    {" "}
                                    <p>{dateConverter(element?.Date)}</p>

                                  </div>
                                </div>

                                <div
                                  className="d-flex"
                                  style={{ flexWrap: "wrap", gap: "2px", columnGap: '10px', rowGap: '5px', marginTop:'-17px' }}
                                >
                                  {element?.rooms?.map((room) => {
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
                              <div className="mx-3" style={{ width: "20%" }}>
                                <b
                                  className="font-weight-bold"
                                  style={{ fontSize: "1.5rem" }}
                                >
                                  ₹ {(Intl.NumberFormat('en-IN').format(element.totalPrice)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(element?.totalPrice)}
                                </b>
                                
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    </div>

                  </div>

                  <div
                    style={{
                      width: "49vw",
                      height: "fit-content",
                      padding: "15px",
                      border: "1px solid #DFDFDF",
                      borderRadius: "8px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      marginTop: "40px",
                    }}
                  >
                    <img src={SOP} alt="sop icon" />
                    <p
                      style={{
                        color: "black",
                        fontSize: "14px",
                        marginTop: "19px",
                      }}
                    >
                      How do we measure ? Want to see our Standard Operating
                      Protocol ?{" "}
                    </p>
                    <a href="#"> Click here</a>
                  </div>

                  <div className="landing_faqs" style={{ width: "49vw" }}>
                    <p className="faqs_header">FAQs</p>
                    <Accordion style={{ width: "100%" }}>
                      {faqs.map((item, i) => (
                        <Accordion.Item eventKey={item.no}>
                          <Accordion.Header style={{margin:"0px -23px"}}>{item.faq}</Accordion.Header>
                          <Accordion.Body style={{margin:"0px -23px"}} >{item.faqa}</Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </div>
              <RightSideBar />
            </div>
          </div>
        </div>
      ) : (
        <MeasurmentMobile />
      )}
    </>
  );
};

export default MeasurementFinal;
