import React from 'react'
import { Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import task from './Images/task.svg'
import Vector1 from './Images/Vector1.svg'
import LocationTime from './Images/LocationTime.svg'
import Vector2 from './Images/Vector2.svg'
import LandingMobHeader from '../3dComponents/LandingMobHeader';
import houseMeasurment from './Images/houseMeasurment.svg'
import SOP from './Images/SOP.svg'
import { useSelector } from "react-redux";

const MeasurmentMobile = () => {
    const navigate = useNavigate()
    const profileData = useSelector((state) => state.addToCartReducer.profileData);

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
    const benefits = [
        {
            no: 1,
            data: "Detailed measurement done by professionals.",
        },
        {
            no: 2,
            data: "Get high quality on-site pictures.",
        },
        {
            no: 3,
            data: "As Built Drawings made on ACAD",
        },
        {
            no: 4,
            data: "Access measurements on cloud from anywhere",
        },
    ];


    const handleStart = () => {

        navigate('/measurementpage/hometype');

    }

    return (
        <>
            <LandingMobHeader />
            <div style={{ background: "White", display: "flex", paddingBottom: "0px" }}>
                <div className="landing_main">
                    <div className="landing_main2">
                        <div className="landing_top">
                            <h3 className="landing_header" style={{marginTop: '0px', fontWeight:'500' }}>Get Measurement with As-Built Drawings <br /> done by Professionals </h3>
                            <p className="landing_p">Detaild measurement, site pictures with <b>as builts drawings</b> on ACAD at <b>Rs 5 per sqrt</b> or <b>Rs 750 per room</b> </p>

                            <button className="landing_started" onClick={handleStart}>Get Started</button>
                            {/* <span className='mt-2' style={{ fontSize: "12px", color: "#888888", fontWeight: "400" }}>only for Residential Interiors</span> */}
                        </div>
                    </div>
                    {profileData && profileData[0]?.data?.data?.planId?.name === "Free" ? <div className="disc-offer mt-5">
                        <button className="dis_prem" onClick={() => navigate("/plans")}>Upgrade to premium</button>
                    </div>: " "}


                    <div className="lan-mob-info mt-5 d-flex flex-column" style={{padding:"0px 57px 3px 42px"}}>
                        {/* <div className="info_top d-flex mt-5"> */}
                        <div className="info1 d-flex flex-column" style={{ marginLeft: "4vh" }}>
                            <img src={task} alt="" className="sec3_img1" />
                            <h3 className="sec3_head" style={{ fontSize: '1rem' }}>Provide Requirement</h3>
                            <p className="sec3_byline" style={{ fontSize: '12px' }}>You can choose full roomwise option of full house measurement</p>
                        </div>
                        {/* <img src={Vector1} alt="" className="arrow_connector1" style={{width: '28%' , height: '23%'}}/> */}
                        <div className="info2 d-flex flex-column" style={{ marginLeft: "4vh", marginTop:'20px' }}>
                            <img src={LocationTime} alt="" className="sec3_img1" />
                            <h3 className="sec3_head" style={{ fontSize: '1rem' }}>Location & Time</h3>
                            <p className="sec3_byline" style={{ fontSize: '12px' }}>Provide address and time and convenient date and time</p>
                        </div>
                        {/* </div> */}
                        {/* <img src={Vector2} alt="" className="arrow_connector2" style={{width: '28%' , height: '23%'}}/> */}
                        {/* <div className="info_top d-flex"> */}
                        <div className="info1 d-flex flex-column" style={{paddingLeft: '23px', marginTop:'20px'}}>
                            <img src={houseMeasurment} alt="" className="sec3_img1"  style={{width:'70px'}}/>
                            <h3 className="sec3_head" style={{ fontSize: '1rem' , marginLeft:'10px'}}>Final Product </h3>
                            <p className="sec3_byline" style={{ fontSize: '12px' , marginLeft:'10px'}}>Recieve detailed measurements, site pictures and ACAD Drawings</p>
                        </div>

                        {/* </div> */}
                    </div>

                    <div style={{ width: '100%', height: '90px', padding: "15px", border: '1px solid #DFDFDF', borderRadius: "8px", display: "flex", gap: '10px', alignItems: 'center', marginTop: '40px' }}>
                        <img src={SOP} alt="sop icon" />
                        <div>
                            <p style={{ color: "black", fontSize: "14px", marginTop: "13px" }} className="mb-0">How do we measure ? Want to see our Standard Operating Protocol ? </p>
                            <a href="#" style={{ fontSize: "14px" }}> Click here</a>
                        </div>
                    </div>

                    <div className="side_benefitsd-flex flex-column" style={{marginTop:'40px'}}>
                        <h3 className="img_lan_header mb-3">Benefits</h3>
                        {benefits.map((item, index) => (
                            <div className="benefit1 d-flex" style={{marginBottom:'10px'}} key={index}>
                                <p className="bno1">{item.no}</p>
                                <p className="bnoContent">{item.data}</p>
                            </div>
                        ))}
                    </div>
                    <div className="landing_faqs">
                        <p className="faqs_header">FAQs</p>
                        <Accordion style={{ width: "88%" }}>
                            {faqs.map((item, index) => (<Accordion.Item eventKey={item.no} key={index}>
                                <Accordion.Header>{item.faq}</Accordion.Header>
                                <Accordion.Body>
                                    {item.faqa}
                                </Accordion.Body>
                            </Accordion.Item>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MeasurmentMobile;