import { faAngleLeft, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import residentialImg from "../Images/Residential.png";
import officeImg from "../Images/Office.png";
import showroomImg from "../Images/Showrooms & Retail.png";
import retailImg from "../Images/High End Retail.png";
import farmhouseImg from "../Images/Farmhouse.png";
import factoryImg from "../Images/Factory & Warehouse.png";
import hotelsImg from "../Images/Hotels.png";
import restaurantsImg from "../Images/Restaurants.png";
import img1 from "../Components/StyleImages/scandinavian.png";
import img2 from "../Components/StyleImages/glam.png";
import img3 from "../Components/StyleImages/bohemian.png";
import img4 from "../Components/StyleImages/ModernMinimal.png";
import img5 from "../Components/StyleImages/Indian.png";
import img6 from "../Components/StyleImages/Rustic.png";
import img7 from "../Components/StyleImages/classic.png";
import img8 from "../Components/StyleImages/Industrial.png";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import left from "./Images/leftarrow.png";
import DesignAndServicesWeb from "./LmsWebComponents/DesignAndServicesWeb";

const DesignAndServices = () => {
  const servicesProvidedArr = [
    {
      index: 0,
      image: residentialImg,
      name: "Residential",
    },
    {
      index: 1,
      image: officeImg,
      name: "Office",
    },
    {
      index: 2,
      image: showroomImg,
      name: "Showrooms",
    },
    {
      index: 3,
      image: retailImg,
      name: "Retail",
    },
    {
      index: 4,
      image: farmhouseImg,
      name: "Farmhouse",
    },
    {
      index: 5,
      image: factoryImg,
      name: "Factory",
    },
    {
      index: 6,
      image: hotelsImg,
      name: "Hotels",
    },
    {
      index: 7,
      image: restaurantsImg,
      name: "Restaurant",
    },
  ];

  const designStylesArr = [
    {
      index: 0,
      name: "Scandinavian",
      image: img1,
    },
    {
      index: 1,
      name: "Glam & Luxurious",
      image: img2,
    },
    {
      index: 2,
      name: "Bohemian",
      image: img3,
    },
    {
      index: 3,
      name: "Modern Minimal",
      image: img4,
    },
    {
      index: 4,
      name: "Indian",
      image: img5,
    },
    {
      index: 5,
      name: "Rustic",
      image: img6,
    },
    {
      index: 6,
      name: "Classic",
      image: img7,
    },
    {
      index: 7,
      name: "Industrial",
      image: img8,
    },
  ];

  const profileInfo = useSelector((state) => state.addToCartReducer.profileData);

  const selectedServices = servicesProvidedArr.filter((curElem) => {
    return profileInfo[0]?.data?.data?.services.includes(curElem.name);
  });

  const selectedDesignsArr = designStylesArr.filter((curElem) => {
    return profileInfo[0]?.data?.data?.designStyle.includes(curElem.name);
  });

  return (
    <React.Fragment>
      <div className="d-none d-md-block">
        <DesignAndServicesWeb />
      </div>
      <div className=" d-block d-md-none designService-container">
        <div className="designfee-container">
          <div className="fs-5 ps-3 py-3 d-flex designfee-header">
            <Link style={{ textDecoration: "none", color: "black" }} className="d-flex" to="/myprofile">
              <span className="d-flex align-items-center">
                <div className="me-3 d-flex align-items-center">
                  <img style={{ width: "5px", height: "10px" }} src={left} />
                </div>
                <div className="page-Heading">Design and Services</div>
              </span>
            </Link>
          </div>
          <div className="p-3 mt-3 designfee-services">
            <div className="d-flex justify-content-between">
              <div className="fs14fw400" style={{ color: "#888888" }}>
                Services
              </div>
              <Link style={{ textDecoration: "none" }} to="/editservices">
                <div style={{ color: "#0099FF" }} className="fs14fw400">
                  Edit
                </div>
              </Link>
            </div>
            <div className="d-flex flex-wrap align-items-center">
              {selectedServices.map((curElem) => {
                return (
                  <React.Fragment>
                    <div className="design-services-services-card">
                      <img src={curElem.image} />
                      <div>{curElem.name}</div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          {/* <div className="p-3 mt-3 designfee-styles">
            <div className="d-flex justify-content-between">
              <div className="fs-5">Design Styles</div>
              <Link style={{ textDecoration: "none" }} to="/editdesignstyles">
                <div style={{ color: "#0099FF" }}>Edit</div>
              </Link>
            </div>
            <div className="d-flex flex-wrap align-items-center">
              {selectedDesignsArr.map((curElem) => {
                return (
                  <React.Fragment>
                    <div style={{ backgroundImage: `url(${curElem.image})` }} className="design-styles-card d-flex flex-column justify-content-between align-items-center">
                      <div></div>
                      <div
                        className="w-100 d-flex justify-content-center"
                        style={{ color: "white", background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.42) 41.17%, #000000 114.37%)", borderRadius: "1rem" }}
                      >
                        {curElem.name}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div> */}
          <div className="p-3 mt-3 designfee-fees">
            <div className="d-flex justify-content-between">
              <div className="fs14fw400" style={{ color: "#888888" }}>
                Design Fees
              </div>
              <Link style={{ textDecoration: "none" }} to="/editprices">
                <div style={{ color: "#0099FF" }} className="fs14fw400">
                  Edit
                </div>
              </Link>
            </div>
            {/* <div className="d-flex justify-content-between my-3">
              <div className="d-flex align-items-center">For Virtual Consultation</div>
              <div className="price-box">
                <FontAwesomeIcon className="me-2" icon={faRupeeSign} />
                {profileInfo[0]?.data?.data?.fees?.zoomPrice}
                <span className="ms-4">/hour</span>
              </div>
            </div> */}
            <div className="d-flex justify-content-between my-3">
              <div className="d-flex align-items-center fs14fw400">For Per Room Basis</div>
              <div className="price-box fs14fw600">
                ₹ {profileInfo[0]?.data?.data?.fees?.designRoomPrice}
                <span className="ms-4">/hour</span>
              </div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <div className="d-flex align-items-center fs14fw400">For Per Hour Basis</div>
              <div className="price-box fs14fw600">
                ₹ {profileInfo[0]?.data?.data?.fees?.designAreaPrice}
                <span className="ms-4">/hour</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DesignAndServices;
