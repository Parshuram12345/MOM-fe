import React from "react";
import img1 from "../Components/StyleImages/scandinavian.png";
import img2 from "../Components/StyleImages/glam.png";
import img3 from "../Components/StyleImages/bohemian.png";
import img4 from "../Components/StyleImages/ModernMinimal.png";
import img5 from "../Components/StyleImages/Indian.png";
import img6 from "../Components/StyleImages/Rustic.png";
import img7 from "../Components/StyleImages/classic.png";
import img8 from "../Components/StyleImages/Industrial.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfileData, updateProfileData } from "./Actions";
import { getToken } from "./getToken";

const DesignStylesComponent = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const authTok = getToken() ? getToken() : "";
  const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
  const isLoading = useSelector((state) => state.addToCartReducer.loading);
  if (profileInfo[0]?.data?.data?.designStyle !== undefined) {
    var designStyles = profileInfo[0]?.data?.data?.designStyle;
  } else {
    var designStyles = [];
  }
  const [styleSelectArr, setStyleSelectArr] = useState(designStyles);
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
  useEffect(() => {
    dispatch(fetchProfileData(authTok));
  }, []);

  const designSelectHandler = (name) => {
    if (!styleSelectArr.includes(name)) {
      setStyleSelectArr((prev) => {
        return [...prev, name];
      });
    } else {
      setStyleSelectArr(
        styleSelectArr.filter((curElem) => {
          return name !== curElem;
        })
      );
    }
  };

  const handleSubmit = () => {
    const payload = new FormData();
    const styles = JSON.stringify(styleSelectArr);
    payload.append("designStyle", [styles]);
    dispatch(updateProfileData(authTok, payload));
    navigateTo("/designandservices");
  }

  return (
    <React.Fragment>
      {isLoading === false && (
        <>
          <Link style={{ textDecoration: "none", color: "black" }} to="/designandservices">
            <div className="d-flex justify-content-end me-4 fs-3">x</div>
          </Link>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {designStylesArr.map((curElem) => {
              return (
                <div
                  onClick={() => {
                    designSelectHandler(curElem.name);
                  }}
                  style={{ backgroundImage: `url(${curElem.image})` }}
                  className="design-style-checkboxes d-flex flex-column justify-content-between"
                >
                  <div className="d-flex justify-content-end m-2">{styleSelectArr.includes(curElem.name) && <FontAwesomeIcon icon={faCheckCircle} color="white" size="lg" />}</div>
                  <div
                    className="d-flex justify-content-center"
                    style={{ color: "white", background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.42) 41.17%, #000000 114.37%)", borderRadius: "1rem" }}
                  >
                    {curElem.name}
                  </div>
                </div>
              );
            })}
            <div className="w-100 m-3">
              <button className={`w-100 design-styles-save-button ${styleSelectArr.length < 3 ? "d-none" : ""}`} onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default DesignStylesComponent;
