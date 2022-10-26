import { faAngleLeft, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import residentialImg from "../../Images/Residential.png";
import officeImg from "../../Images/Office.png";
import showroomImg from "../../Images/Showrooms & Retail.png";
import retailImg from "../../Images/High End Retail.png";
import farmhouseImg from "../../Images/Farmhouse.png";
import factoryImg from "../../Images/Factory & Warehouse.png";
import hotelsImg from "../../Images/Hotels.png";
import restaurantsImg from "../../Images/Restaurants.png";
import img1 from "../../Components/StyleImages/scandinavian.png";
import img2 from "../../Components/StyleImages/glam.png";
import img3 from "../../Components/StyleImages/bohemian.png";
import img4 from "../../Components/StyleImages/ModernMinimal.png";
import img5 from "../../Components/StyleImages/Indian.png";
import img6 from "../../Components/StyleImages/Rustic.png";
import img7 from "../../Components/StyleImages/classic.png";
import img8 from "../../Components/StyleImages/Industrial.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import left from "../Images/leftarrow.png";
import HeaderNav from "./HeaderNav";
import SideBarWeb from "./SideBarWeb";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { updateProfileData } from "../Actions";
import { getToken } from "../getToken";



const DesignAndServicesWeb = () => {
    const dispatch = useDispatch()
    const navigateTo = useNavigate();
    const authTok = getToken() ? getToken() : "";
    const profileInfo = useSelector((state) => state.addToCartReducer.profileData);
    const [priceInput, setPriceInput] = useState({
        // virtual: profileInfo[0]?.data?.data?.fees?.zoomPrice,
        perRoom: profileInfo[0]?.data?.data?.fees?.designRoomPrice,
        perHour: profileInfo[0]?.data?.data?.fees?.designAreaPrice,
      });
    const [service, setService] = useState();

    const [servicesArr, setServicesArr] = useState(service);
    console.log(servicesArr)
     const [IsSaveMode, setSaveMode] = useState(true);
   
    const stateManage = () => {
        setSaveMode(!IsSaveMode);
    }
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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const selectedServices = servicesProvidedArr.filter((curElem) => {
        return profileInfo[0]?.data?.data?.services.includes(curElem.name);
    });

    const selectedDesignsArr = designStylesArr.filter((curElem) => {
        return profileInfo[0]?.data?.data?.designStyle.includes(curElem.name);
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (value.length <= 5) {
          setPriceInput((prev) => {
            return {
              ...prev,
              [name]: value,
            };
          });
        }
      };
    const handlechange = () => {
        stateManage();
        handleSubmitt();
    }
    const handleSubmit = () => {
        const payload = new FormData();
        const services = JSON.stringify(servicesArr);
        payload.append("services", [services]);
        dispatch(updateProfileData(authTok, payload));
        navigateTo("/designandservices");
        handleClose()
    }
    const feesData = {
        // zoomPrice: priceInput.virtual,
        designRoomPrice: priceInput.perRoom,
        designAreaPrice: priceInput.perHour,
      };
    const handleSubmitt = () => {
        const payload = new FormData();
        const fees = JSON.stringify(feesData);
        payload.append("fees", fees);
        dispatch(updateProfileData(authTok, payload));
        navigateTo("/designandservices");
      };

    return (
        <React.Fragment>
            <HeaderNav />
            <div className="d-flex">
                <div>
                    <SideBarWeb />
                </div>
                <div className="designService-container" style={{ background: '#ffffff', width: '100%' }} >
                    <div style={{ width: '76vw', background: '#ffffff', marginLeft: '20px' }}>
                        <div className="fs-5 ps-3 py-3 d-flex designfee-header" style={{ border: '1px solid white', backgroundColor: '#ffffff', width: '76vw', borderRadius: '5px', marginTop: '10px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}>
                            <Link style={{ textDecoration: "none", color: "black" }} className="d-flex" to="/myprofile">
                                <span className="d-flex align-items-center">
                                    <div className="me-3 d-flex align-items-center">
                                        <img style={{ width: "5px", height: "10px" }} src={left} />
                                    </div>
                                    <div className="page-Heading">Design and Services</div>
                                </span>
                            </Link>
                        </div>
                        <div className="p-3 mt-3 designfee-services" style={{ backgroundColor: '#ffffff', borderRadius: '5px' }}>
                            <div className="d-flex justify-content-between">
                                <div className="fs14fw400" style={{ color: "#888888" }}>
                                    Services
                                </div>
                                <div role='button' style={{ color: "#0099FF", marginRight: '20px' }} className="fs14fw400" onClick={handleShow}>
                                    Edit
                                </div>
                                <Modal show={show} centered onHide={handleClose} dialogClassName="edit_services_modal">
                                    <Modal.Header closeButton></Modal.Header>
                                    <Modal.Body style={{ justifyContent: 'center', display: 'flex' }}>

                                        <div className="d-flex flex-wrap" style={{ marginLeft: '30px' }}>
                                            {servicesProvidedArr.map((curElem, index) => {
                                                return (
                                                    <React.Fragment key={curElem.index}>
                                                        <div
                                                            style={{ width: '29%' }}
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

                                    </Modal.Body>
                                    <Modal.Footer>

                                        <Button variant="primary" onClick={handleSubmit}>
                                            Save
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div className="d-flex  align-items-center" style={{ flexWrap: 'wrap' }}>
                                {selectedServices.map((curElem) => {
                                    return (
                                        <React.Fragment>
                                            <div style={{ width: '8rem' }} className="design-services-services-card">
                                                <img src={curElem.image} />
                                                <div>{curElem.name}</div>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="p-3 mt-3 designfee-fees" style={{ backgroundColor: '#ffffff', borderRadius: '5px' }}>
                            <div className="d-flex justify-content-between">
                                <div className="fs14fw400" style={{ color: "#888888" }}>
                                    Design Fees
                                </div>
                                <div style={{ textDecoration: "none" }} to="/editprices">
                                    {IsSaveMode === true ? <div role="button" onClick={() => setSaveMode(!IsSaveMode)} style={{ color: "#0099FF", marginRight: '20px' }} className="fs14fw400">
                                        Edit
                                    </div> : <div role="button" onClick={() => {
                                        handlechange();
                                    }} style={{ color: "#0099FF", marginRight: '20px' }} className="fs14fw400">
                                        Save
                                    </div>}


                                </div>
                            </div>


                            {IsSaveMode === true ? <div className="d-flex my-3" >
                                <div className="d-flex align-items-center fs14fw400" style={{ marginLeft: '0.5rem' }}>For Per Room Basis</div>
                                <div className="price-box fs14fw600" style={{ marginLeft: '2.6rem' }}>
                                    ₹ {profileInfo[0]?.data?.data?.fees?.designRoomPrice}
                                    <span className="ms-4">/hour</span>
                                </div>
                            </div> :
                                <div className="d-flex align-items-center fs14fw400" style={{ marginLeft: '0.5rem', marginTop: '15px' }}>For Per Room Basis
                                    <div style={{ marginLeft: '2.0rem' }}>
                                    <input value={priceInput.perRoom} name="perRoom" type="number" onChange={handleInputChange} />
                                    </div>
                                </div>
                            }

                            {IsSaveMode === true ? <div className="d-flex my-3">
                                <div className="d-flex align-items-center fs14fw400" style={{ marginLeft: '0.5rem' }}>For Per Hour Basis</div>
                                <div className="price-box fs14fw600" style={{ marginLeft: '2.6rem' }}>

                                    ₹ {profileInfo[0]?.data?.data?.fees?.designAreaPrice}
                                    <span className="ms-4">/hour</span>
                                </div>
                            </div> : <div className="d-flex align-items-center fs14fw400" style={{ marginLeft: '0.5rem', marginTop: '15px' }}>For Per Room Basis
                                <div style={{ marginLeft: '2.0rem' }}>
                                <input value={priceInput.perHour} name="perHour" type="number" onChange={handleInputChange} />
                                </div>
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DesignAndServicesWeb;
