import React, { useEffect, useState, useNavigatese } from "react";
import { Accordion } from "react-bootstrap";
import HeaderNav from "./LmsWebComponents/HeaderNav";
import SideBarWeb from "./LmsWebComponents/SideBarWeb";
import "../3dComponents/3d.css";
import RightSideBar from "./RightSideBar";
import MeasurmentMobile from "./MeasurmentMobile";
import { useNavigate } from "react-router-dom";
import task from "./Images/task.svg";
import Vector1 from "./Images/Vector1.svg";
import LocationTime from "./Images/LocationTime.svg";
import Vector2 from "./Images/Vector2.svg";
import houseMeasurment from "./Images/houseMeasurment.svg";
import axios from "axios";
import SOP from "./Images/SOP.svg";
import { useSelector } from 'react-redux';


const MeasurmentComponent = () => {

  const profile = useSelector(state => state.addToCartReducer.profileData);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 599);
  const navigate = useNavigate();
  const authtoken = localStorage.getItem('token');

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  useEffect(async ()=>{

    const response = await axios.get('https://pro-api.idesign.market/user/getUserOrders', {
        headers: {
            authorization: `Bearer ${authtoken}`,
          },
    })
    .then((res)=>{
        // console.log(res);
        // console.log(res?.data?.data)

        if(res.data.data.length > 0){
          navigate('/measurementfinal')
          return
        }

    }).catch((err)=>{
        console.log(err);
    })
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

                  <div className="landing_section3 d-flex flex-column mt-5">
                    <h3 className="img_lan_header mb-3">How it Works?</h3>
                    <div
                      className="landing_section3 d-flex mt-5"
                      style={{ width: "83%" }}
                    >
                      <div className="section3_main1 d-flex flex-column ">
                        <img src={task} alt="" className="sec3_img1" />
                        <h3 className="sec3_head">Provide Requirement</h3>
                        <p className="sec3_byline">
                          You can choose full roomwise option of full house
                          measurement
                        </p>
                      </div>

                      <img
                        src={Vector1}
                        alt="vectorImage"
                        style={{
                          width: "30%",
                          height: "23%",
                          margin: "0px -30px",
                        }}
                      />
                      <div
                        className="section3_main1 d-flex flex-column "
                        style={{}}
                      >
                        <img src={LocationTime} alt="" className="sec3_img1" />
                        <h3 className="sec3_head">Location & Time</h3>
                        <p className="sec3_byline">
                          Provide address and time and convenient date and time
                        </p>
                      </div>

                      <img
                        src={Vector2}
                        alt="vectorImage"
                        style={{
                          width: "30%",
                          height: "23%",
                          margin: "11px -30px",
                        }}
                      />
                      <div
                        className="section3_main1 d-flex flex-column "
                        style={{}}
                      >
                        <img
                          src={houseMeasurment}
                          alt=""
                          className="sec3_img1"
                        />
                        <h3 className="sec3_head">Final Product </h3>
                        <p className="sec3_byline">
                          Recieve detailed measurements, site pictures and ACAD
                          Drawings
                        </p>
                      </div>
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
                        marginTop: "4px",
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
                      {faqs.map((item, index) => (
                        <Accordion.Item eventKey={item.no} key={index}>
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

export default MeasurmentComponent;
