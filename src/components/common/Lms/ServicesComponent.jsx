import React, { useState } from "react";
import residentialImg from "../Images/Residential.png";
import officeImg from "../Images/Office.png";
import showroomImg from "../Images/Showrooms & Retail.png";
import retailImg from "../Images/High End Retail.png";
import farmhouseImg from "../Images/Farmhouse.png";
import factoryImg from "../Images/Factory & Warehouse.png";
import hotelsImg from "../Images/Hotels.png";
import restaurantsImg from "../Images/Restaurants.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProfileData, updateProfileData } from "./Actions";
import { getToken } from "./getToken";
import { useEffect } from "react";

const ServicesComponent = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
  const authTok = getToken() ? getToken() : "";
  console.log(profileInfo);
  // if (profileInfo[0]?.data?.data?.services !== undefined) {
  //   var service = profileInfo[0]?.data?.data?.services;
  // } else {
  //   var service = [];
  // }
  const [service, setService] = useState();

  const [servicesArr, setServicesArr] = useState(service);
  console.log(servicesArr)

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

  const servicesAddHandler = (name) => {
    if (!servicesArr.includes(name)) {
      setServicesArr((prev) => {
        return [...prev, name];
      });
    } else {
      setServicesArr(
        servicesArr.filter((curElem) => {
          return name !== curElem;
        })
      );
    }
  };

  useEffect(() => {
    setServicesArr(profileInfo[0]?.data?.data?.services);
  }, [profileInfo])

  useEffect(() => {
    dispatch(fetchProfileData(authTok));
  }, [])

  const handleSubmit = () => {
    const payload = new FormData();
    const services = JSON.stringify(servicesArr);
    payload.append("services", [services]);
    dispatch(updateProfileData(authTok, payload));
    navigateTo("/designandservices");
  }

  return (
    <React.Fragment>
      <div style={{display: "flex", justifyContent: "center", backgroundColor: "#F0F0F0"}}>
        <div className="servicesComponent">
          <Link style={{ textDecoration: "none", color: "black" }} to="/designandservices">
            <div className="d-flex justify-content-end me-4 fs-2">x</div>
          </Link>
          <div className="d-flex flex-wrap justify-content-center">
            {servicesProvidedArr.map((curElem, index) => {
              return (
                <React.Fragment key={curElem.index}>
                  <div
                    className={`services-checkboxes ${servicesArr && servicesArr.includes(curElem.name) ? "active-services" : "inactive-services"}`}
                    onClick={() => {
                      servicesAddHandler(curElem.name);
                    }}
                    role="button"
                  >
                    <img src={curElem.image} />
                    <div>{curElem.name}</div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div className="services-save-button">
            <button className="w-100" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ServicesComponent;
