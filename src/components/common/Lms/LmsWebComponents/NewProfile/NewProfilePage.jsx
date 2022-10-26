import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft, faAngleRight, faCamera, faCircle } from "@fortawesome/free-solid-svg-icons";
import Camera from "../../Images/camera.png"
import Icon from "../../Images/icon.png";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { updateUserProfile } from "../../../Apis";
import { toast, ToastContainer } from "react-toastify";
import { completeProfile } from "../../../Redux/Actions/auth";
import { useRef } from "react";
import HeaderNav from "../HeaderNav";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import bluetick from "../../Images/bluetick.svg"
import pencil from "../../Images/pencil.svg"
import ProfileFeature from "./ProfileFeature";
import ProjectsPosts from "./ProjectsPosts"
import SideBarWeb from "../SideBarWeb";
import Plan from "./Plan";
import ChangePassword from "./ChangePassword";
import Review from "./Review";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { fetchProfileData, updateProfileData, setAboutUs } from "../../Actions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import left from "../../Images/leftarrow.png"
import residentialImg from "../../../Images/Residential.png";
import officeImg from "../../../Images/Office.png";
import showroomImg from "../../../Images/Showrooms & Retail.png";
import retailImg from "../../../Images/High End Retail.png";
import farmhouseImg from "../../../Images/Farmhouse.png";
import factoryImg from "../../../Images/Factory & Warehouse.png";
import hotelsImg from "../../../Images/Hotels.png";
import restaurantsImg from "../../../Images/Restaurants.png";
import img1 from "../../../Components/StyleImages/scandinavian.png";
import img2 from "../../../Components/StyleImages/glam.png";
import img3 from "../../../Components/StyleImages/bohemian.png";
import img4 from "../../../Components/StyleImages/ModernMinimal.png";
import img5 from "../../../Components/StyleImages/Indian.png";
import img6 from "../../../Components/StyleImages/Rustic.png";
import img7 from "../../../Components/StyleImages/classic.png";
import img8 from "../../../Components/StyleImages/Industrial.png";
import NewProfilePageMob from "./NewProfilePageMob";
import select from "../../../Lms/Images/select.svg"
import rupees from "../../../Lms/Images/rupees.jpg"

export default function NewProfilePage() {

    const [isDesktop, setIsDesktop] = useState(window.screen.width > 767);
    const updateMedia = () => {
        setIsDesktop(window.screen.width > 767);
    };


    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });


    const profileInfo = useSelector((state) => state.addToCartReducer?.profileData);
    const profileData = useSelector((state) => state.addToCartReducer.profileData);
    console.log(profileInfo)
    console.log(profileInfo[0]?.data?.data?.NumberOfProjectsDone)
    console.log(profileInfo[0]?.data?.data?.workExperience)
    const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
    const [aboutText, setAboutText] = useState();

    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);
    const coverPicRef = useRef(null);
    const navigateTo = useNavigate();
    const [IsEditMode, SetEditMode] = useState(false);

    console.log(profileData[0])

    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            profession: profileData[0]?.data?.data?.type,
            companyName: profileData[0]?.data?.data?.companyName,
            phNum: profileData[0]?.data?.data?.phoneNumber,
            pinCode: profileData[0]?.data?.data?.pinCode,
            city: profileData[0]?.data?.data?.city,
            email: profileData[0]?.data?.data?.email,
            website: profileData[0]?.data?.data?.webSite,
            workExp: profileData[0]?.data?.data?.workExperience,
            numOfProjects: profileData[0]?.data?.data?.NumberOfProjectsDone,
        })
        setAboutText(profileData[0]?.data?.data?.aboutUs.length > 0 ? profileData[0]?.data?.data?.aboutUs : " ")

        setPriceInput(
            {
                // virtual: profileInfo[0]?.data?.data?.fees?.zoomPrice,
                perRoom: profileInfo[0]?.data?.data?.fees?.designRoomPrice,
                perHour: profileInfo[0]?.data?.data?.fees?.designAreaPrice,
            }
        )
    }, [profileData])


    console.log(formData?.profession)
    const handleSubmit = () => {

        const payload = new FormData();
        // payload.append("type", formData.profession);
        payload.append("companyName", formData.companyName);
        payload.append("phoneNumber", formData.phNum);
        payload.append("pinCode", formData.pinCode);
        // payload.append("city", formData.city);
        payload.append("email", formData.email);
        payload.append("webSite", formData.website);
        payload.append("workExperience", formData.workExp);
        payload.append("NumberOfProjectsDone", formData.numOfProjects);
        dispatch(updateProfileData(authTok, payload));
        // SetSaveMode(false);
        navigateTo("/newprofilepage");

    };

    console.log(profileData)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [IsSaveMode, SetSaveMode] = useState(true);
    const [SaveMode, setSaveMode] = useState(true);


    const [priceInput, setPriceInput] = useState({

    });

    const [servicesArr, setServicesArr] = useState([]);

    useEffect(() => {
        dispatch(fetchProfileData(authTok));
    }, []);

    useEffect(() => {
        setServicesArr(profileInfo[0]?.data?.data?.services);
    }, [profileInfo])

    console.log(servicesArr)
    const coverPicUploadHandler = () => {
        coverPicRef.current.click();
    };
    const profilePicUploadHandler = () => {
        profilePicRef.current.click();
    };
    const profilePicRef = useRef(null);
    const changeImage = (e, cover) => {
        const file = e.target.files[0];
        if (file) {
            const payload = new FormData();
            if (cover) {
                payload.append("coverImage", file);
            } else {
                payload.append("image", file);
            }
            confirmAlert({
                message: `Are you sure you want to change ${cover || "profile"} image?`,
                buttons: [
                    {
                        label: "Yes",
                        onClick: () => {
                            updateUserProfile(payload).then((res) => {
                                dispatch(completeProfile(res?.data));
                                toast.success("Image Updated!");
                                window.location.reload();
                            });
                        },
                    },
                    {
                        label: "No",
                    },
                ],
            });
        }
    };
    const inputHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const aboutTextHandler = (event) => {
        console.log(event.target.value.length)
        setAboutText(event.target.value);
    };

    const onSubmit = (event) => {

        // setAboutText(event.target.value);
        dispatch(setAboutUs(authTok, aboutText, toast));
    };


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
    const exceptThisSymbols2 = ["e", "E", "+", "-", "."];
    const cityArr = [
        {
            key: 0,
            value: "Delhi",
            placeholder: "Delhi",
        },
        {
            key: 1,
            value: "Gurugram",
            placeholder: "Gurugram",
        },
        {
            key: 2,
            value: "Noida",
            placeholder: "Noida",
        },
        {
            key: 3,
            value: "Faridabad",
            placeholder: "Faridabad",
        },
        {
            key: 4,
            value: "Ghaziabad",
            placeholder: "Ghaziabad",
        },
        {
            key: 5,
            value: "Bengaluru",
            placeholder: "Bengaluru",
        },
        {
            key: 6,
            value: "Pune",
            placeholder: "Pune",
        },
        {
            key: 7,
            value: "Mumbai",
            placeholder: "Mumbai Area",
        },
        {
            key: 8,
            value: "Hyderabad",
            placeholder: "Hyderabad Area",
        },
        {
            key: 9,
            value: "Chandigarh",
            placeholder: "Chandigarh",
        },
        {
            key: 10,
            value: "Mohali",
            placeholder: "Mohali",
        },
        {
            key: 11,
            value: "Panchkula",
            placeholder: "Panchkula",
        },
        {
            key: 12,
            value: "Jaipur",
            placeholder: "Jaipur",
        },
        {
            key: 13,
            value: "Lucknow",
            placeholder: "Lucknow",
        },
        {
            key: 14,
            value: "Indore",
            placeholder: "Indore",
        },
        {
            key: 15,
            value: "Ahmedabad",
            placeholder: "Ahmedabad",
        },
        {
            key: 16,
            value: "Chennai",
            placeholder: "Chennai",
        },
        {
            key: 17,
            value: "Kolkata",
            placeholder: "Kolkata Area",
        },
    ];

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
            name: "High End Retail",
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


    console.log(servicesProvidedArr)

    const stateManage = () => {
        SetSaveMode(!IsSaveMode);
    }

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


    const [showw, setShoww] = useState(false);
    const handleClosee = () => setShoww(false);
    const handleShoww = () => setShoww(true);

    const selectedServices = servicesProvidedArr.filter((curElem) => {
        return profileInfo[0]?.data?.data?.services.includes(curElem.name);
    });
    const feesData = {
        // zoomPrice: priceInput.virtual,
        designRoomPrice: priceInput.perRoom,
        designAreaPrice: priceInput.perHour,
    };


    const handleSubmitServices = () => {
        const payload = new FormData();
        const services = JSON.stringify(servicesArr);
        payload.append("services", [services]);
        dispatch(updateProfileData(authTok, payload));
        // navigateTo("/newprofilepage");
        handleClosee()
    }

    const handleSubmitFees = () => {
        const payload = new FormData();
        const fees = JSON.stringify(feesData);
        payload.append("fees", fees);
        dispatch(updateProfileData(authTok, payload));
        navigateTo("/newprofilepage");
    };

    const handlechange = () => {
        stateManage();
        handleSubmitFees();

    }

    const handleSave = () => {
        onSubmit();
        handleSubmit();
        handleSubmitServices();
        handlechange();
        handleClose();
        navigateTo("/newprofilepage");

    }
    return (
        <>
            <div>
                {isDesktop ? <div>
                    <HeaderNav />
                    <div className="d-flex w-100">
                        <div>
                            <SideBarWeb />
                        </div>



                        <Modal show={show} centered onHide={handleClose} dialogClassName="edit_services_modal" size="md">
                            <Modal.Header closeButton style={{
                                fontFamily: 'Inter',
                                color: '#000000',
                                fontWeight: '400',
                                fontSize: '16px', borderBottom: '1px solid #D7D7D7'
                            }}>Edit Your Details</Modal.Header>
                            <Modal.Body style={{ justifyContent: 'center', display: 'flex', overflow: 'scroll' }}>
                                <div style={{ background: "#ffffff", width: '100%', paddingLeft: '10px', borderRadius: '10px', height: '72vh' }} className="">
                                    <div className=" page-save-edit d-flex " role="button" onClick={handleSubmit}>
                                        <div style={{
                                            fontFamily: 'Inter',
                                            marginLeft: '10px',
                                            fontWeight: '400',
                                            fontSize: '16px',
                                            lineHeight: '24px',


                                            color: '#000000'
                                        }}>Basic Details</div>
                                    </div>


                                    <form style={{ height: '63vh', marginTop: '10px', marginLeft: '10px' }}>
                                        <div className="d-flex justify-content-between ">
                                            <div className="mb-3  basic_div">
                                                {/* <label for="exampleInputEmail1" className="form-label">
                                                    Profession <span>* </span>
                                                </label> */}
                                                <div style={{ height: "38px", fontSize: "14px", width: '17vw' }} name="profession" value={formData.profession} onChange={inputHandler}>
                                                    <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                        Profession <span>* </span> </label>
                                                    {profileData[0]?.data?.data?.type === 1 ? <div style={{ border: '1px solid #A7A7A7', marginBottom: '10px', width: '17vw', height: '38px', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', fontSize: '14px', paddingLeft: '10px' }}>
                                                        Interior Designer
                                                    </div> : profileData[0]?.data?.data?.type === 2 ? <div style={{ border: '1px solid #A7A7A7', marginBottom: '10px', width: '17vw', height: '38px', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', fontSize: '14px', paddingLeft: '10px' }}>
                                                        Contractor
                                                    </div> : <div style={{ border: '1px solid #A7A7A7', marginBottom: '10px', width: '17vw', height: '6vh', borderRadius: '5px', paddingLeft: '38px', paddingTop: '5px', fontSize: '14px', paddingLeft: '10px' }}>
                                                        OEM
                                                    </div>}
                                                    {/* <option value={1}>Interior Designer</option>
                                                    <option value={2}>Contractor</option> */}
                                                </div>


                                            </div>


                                            <div className="mb-3 me-4 basic_div justify-content-between">
                                                <label for="exampleInputEmail1" className="form-label" >
                                                    Company Name <span>* </span>
                                                </label>
                                                <input type="text" style={{ width: '17vw', height: '38px' }} name="companyName" value={formData.companyName} className="form-control" id="Profession" placeholder="Company Name" onChange={inputHandler} />
                                            </div>

                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <div className="mb-2 basic_div" style={{ marginTop: '-5px' }}>
                                                <label for="exampleInputEmail1" className="form-label">
                                                    Phone Number <span>* </span>
                                                </label>
                                                <input type="number" style={{ width: '17vw', height: '35px' }} name="phNum" value={formData.phNum} className="form-control" id="Profession" placeholder="Phone Number" onChange={inputHandler} />
                                            </div>
                                            <div className="mb-2 me-4 basic_div">
                                                <label for="exampleInputEmail1" className="form-label">
                                                    Pin Code <span>* </span>
                                                    <input type="number" style={{ width: '17vw', marginTop: '5px', height: '35px' }} name="pinCode" value={formData.pinCode} className="form-control" id="Profession" placeholder="Pin Code" onChange={inputHandler} />
                                                </label>
                                            </div>

                                        </div>

                                        <div className="mb-1 d-flex justify-content-between basic_div">
                                            <div style={{ backgroundColor: '#ffffff', height: 'fit-content', marginRight: '25px' }}>
                                                <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                    City  <span>* </span> </label>
                                                <div style={{ border: '1px solid #A7A7A7', width: '17vw', height: '35px', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', fontSize: '14px', paddingLeft: '10px' }}>{profileData[0]?.data?.data?.city}</div>
                                            </div>
                                            <div className="mb-2 me-4 basic_div">
                                                <label for="exampleInputEmail1" className="form-label">
                                                    Email <span>* </span>
                                                </label>
                                                <input type="text" style={{ width: '17vw', height: '35px' }} name="email" value={formData.email} className="form-control" id="Profession" placeholder="Email" onChange={inputHandler} />
                                            </div>

                                        </div>


                                        <div className="d-flex justify-content-between" style={{ marginBottom: '10px' }}>
                                            <div className="mb-2 basic_div" style={{ marginLeft: '-6px' }}>
                                                <label for="exampleInputEmail1" className="form-label">
                                                    Website Link
                                                </label>
                                                <input type="text" style={{ width: '17vw', height: '35px' }} name="website" value={formData.website} className="form-control" id="Profession" placeholder="www.abc.com" onChange={inputHandler} />
                                            </div>

                                            <div className="d-flex">
                                                <div className="mb-2  me-4 basic_div ">
                                                    <div>
                                                        <label for="exampleInputEmail1" className="form-label">
                                                            Work Experience <span>* </span>
                                                        </label>
                                                        <Form.Select style={{ fontSize: "14px", height: "35px", width: '17vw' }} name="workExp" value={formData.workExp} placeholder="Select your work experience" onChange={inputHandler}>
                                                            <option value="0-2">0-2</option>
                                                            <option value="2-5">2-5</option>
                                                            <option value="Above 5">Above 5</option>
                                                        </Form.Select>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                        <div className="mb-0 basic_div">
                                            <div>
                                                <label for="exampleInputEmail1" className="form-label">
                                                    How many Projects have you done <span>* </span>
                                                </label>
                                                <Form.Select style={{ fontSize: "14px", height: "38px", width: '17vw' }} name="numOfProjects" value={formData.numOfProjects} placeholder="Select number of projects done" onChange={inputHandler}>
                                                    <option value="less than 25">Less than 25</option>
                                                    <option value="25 to 50">25 to 50</option>
                                                    <option value="50 to 100">50 to 100</option>
                                                    <option value="More than 100">More than 100</option>
                                                </Form.Select>
                                            </div>

                                        </div>
                                    </form>
                                    <div>
                                        <div className="about" style={{ marginLeft: '10px', fontSize: '16px', fontWeight: '400px' }}>About Us </div>
                                        <div className="aboutUs" style={{ marginLeft: '10px', height: '18vh', width: '100%' }}>
                                            <section className="aboutUsContent" style={{ width: '100%' }}>
                                                <div className="ms-2 d-flex justify-content-between" style={{ width: '43%', backgroundColor: '#ffffff' }}>
                                                    {/* <Link className="mt-3 mb-3 ms-1 fs-4" to="/myprofile" style={{ textDecoration: "none", color: "black" }}>
                                                        <span className="d-flex align-items-center">
                                                            <div className="me-3 d-flex align-items-center">
                                                                <img style={{ width: "5px", height: "10px" }} src={left} />
                                                            </div>
                                                            <div className="page-Heading">About Us</div>
                                                        </span>
                                                    </Link> */}
                                                    {/* <span className="m-3 page-save-edit cursor-pointer" role="button" style={{ color: "#0099FF" }} onClick={onSubmit}>
                                                        SAVE
                                                    </span> */}
                                                </div>

                                                <div className="main_container">

                                                    <Form.Control
                                                        className="textArea"
                                                        style={{
                                                            resize: "none", fontSize: "14px", height: '16vh', width: '95%', background: ' #FAFAFA', border: '1px solid #DFDFDF',
                                                            borderRadius: '4px', marginTop: '10px'
                                                        }}
                                                        as="textarea"
                                                        rows={18}
                                                        value={aboutText}
                                                        maxLength={1000}
                                                        placeholder="Write something about your company or services you provide..."
                                                        name="about"
                                                        onChange={aboutTextHandler}
                                                    />
                                                    <div style={{ fontSize: "10px", color: "#888888", marginTop: '10px', display: "block", position: "absolute", right: "2rem" }}>{aboutText?.length}/1000</div>

                                                </div>

                                            </section>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="designService-container" style={{ background: '#ffffff', width: '100%' }}>
                                            <div style={{ width: '45vw', background: '#ffffff' }}>
                                                <div className="fs-5 ps-2 py-2 d-flex designfee-header" style={{ backgroundColor: '#ffffff', width: '97%', borderRadius: '5px', marginTop: '10px' }}>
                                                    <div className="page-Heading" style={{ fontSize: '16px', fontWeight: '400', color: 'black' }}>Services Provided</div>


                                                </div>
                                                <div className="p-1 mt-1 designfee-services" style={{ backgroundColor: '', borderRadius: '5px' }}>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="fs14fw400" style={{ color: "#888888" }}>

                                                        </div>
                                                        {/* <div role='button' style={{ color: "#0099FF", marginRight: '20px' }} className="fs14fw400" onClick={handleShoww} size="sm">
                                                    
                                                        </div> */}
                                                        {/* <Modal show={showw} centered onHide={handleClosee} dialogClassName="edit_services_modal" size="sm">
                                                            <Modal.Header closeButton></Modal.Header>
                                                            <Modal.Body style={{ justifyContent: 'center', display: 'flex' }}> */}

                                                        <div className="d-flex flex-wrap">
                                                            {servicesProvidedArr.map((curElem, index) => {
                                                                return (
                                                                    <React.Fragment key={curElem.index}>
                                                                        <div
                                                                            style={{ width: '22%', height: '2.3rem', padding: '0rem' }}
                                                                            className={`services-checkboxes ${servicesArr && servicesArr.includes(curElem.name) ? "active-services" : "inactive-services"}`}

                                                                            onClick={() => {
                                                                                servicesAddHandler(curElem.name);
                                                                            }}
                                                                            role="button"
                                                                        ><div className="d-flex">
                                                                                {servicesArr && servicesArr.includes(curElem.name) && <div style={{ display: 'flex' }}>
                                                                                    <img src={select} style={{ width: "15px", height: '20px' }} className="mx-1" />

                                                                                </div>}
                                                                                <div style={{ fontSize: '12px' }}>{curElem.name}</div>
                                                                            </div>
                                                                        </div>
                                                                    </React.Fragment>
                                                                );
                                                            })}
                                                        </div>

                                                        {/* </Modal.Body>
                                                            <Modal.Footer>

                                                                <Button variant="primary" onClick={handleSubmitServices}>
                                                                    Save
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal> */}
                                                    </div>
                                                    {/* <div className="d-flex  align-items-center" style={{ flexWrap: 'wrap' }}>
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
                                                    </div> */}
                                                </div>

                                                <div className="p-3 designfee-fees" style={{ backgroundColor: '#ffffff', borderRadius: '5px' }}>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="fs14fw400" style={{ color: "#888888", fontSize: '16px', fontWeight: '400', color: 'black' }}>
                                                            Design Fees
                                                        </div>
                                                        {/* <div style={{ textDecoration: "none" }} to="/editprices">
                                                            <div role="button" onClick={() => {
                                                                handlechange();
                                                            }} style={{ color: "#0099FF", marginRight: '20px' }} className="fs14fw400">
                                                                Save
                                                            </div>


                                                        </div> */}
                                                    </div>



                                                    <div className="d-flex align-items-center fs14fw400" style={{ marginLeft: '0.5rem', marginTop: '15px' }}>For Per Room Basis
                                                        <div style={{ marginLeft: '1.7rem' }}>

                                                            <div className="d-flex">
                                                                <input style={{ width: '80%', backgroundColor: '#F5F5F5', border: '1px solid #ffffff', borderRadius: '4px', height: '1.8rem' }} value={priceInput.perRoom} name="perRoom" type="number" onChange={handleInputChange} onKeyDown={(e) =>
                                                                    exceptThisSymbols2.includes(e.key) && e.preventDefault()} />
                                                                <div>
                                                                    {/* <img src={rupees} style={{ width: '20px', height: '18px', position: 'absolute', left: '14rem', marginTop: '5px' }} /> */}
                                                                </div>
                                                                <div style={{ position: 'relative', right: '4em', color: '#888888', fontSize: '12px', top: '3px' }}>/Room</div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="d-flex align-items-center fs14fw400" style={{ marginLeft: '0.5rem', marginTop: '15px' }}>For Per Hour Basis
                                                        <div style={{ marginLeft: '2.0rem' }}>
                                                            <div className="d-flex">
                                                                <input style={{ width: '83%', backgroundColor: '#F5F5F5', border: '1px solid #ffffff', borderRadius: '4px', height: '1.8rem' }} value={priceInput.perHour} name="perHour" type="number" onChange={handleInputChange} onKeyDown={(e) =>
                                                                    exceptThisSymbols2.includes(e.key) && e.preventDefault()} />
                                                                <div>
                                                                    {/* <img src={rupees} style={{ width: '20px', height: '18px', position: 'absolute', left: '14rem', marginTop: '5px' }} /> */}
                                                                </div>
                                                                <div style={{ position: 'relative', right: '3.5em', color: '#888888', fontSize: '12px', top: '3px' }}>/hour</div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Modal.Body>
                            <Modal.Footer style={{ justifyContent: 'flex-start', marginLeft: '0rem' }}>
                                <Link to="/newprofilepage">
                                    <Button variant="primary" onClick={() => handleSave()} style={{ background: '#3B5998' }}>
                                        Save
                                    </Button>
                                </Link>
                            </Modal.Footer>
                        </Modal>
                        <div className="w-100 px-3" style={{ overflow: 'scroll', height: '88vh' }}>
                            <div className="" style={{ backgroundColor: '#ffffff', position: 'fixed', width: '76%', height: '2.9rem', zIndex: '1', borderBottom: '1px solid #D7D7D7' }}>
                                <div className="d-flex" style={{ justifyContent: 'space-between', width: '42%', alignItems: 'center' }}>
                                    <div role="button" style={{ paddingBottom: '14px', paddingTop: '10px', fontSize: '14px' }} className={tab === 0 ? "activee" : "inactivee"} onClick={() => setTab(0)}>
                                        My Profile
                                    </div>

                                    <div role="button" style={{ paddingBottom: '14px', paddingTop: '10px', fontSize: '14px' }} className={tab === 1 ? "activee" : "inactivee"} onClick={() => setTab(1)}>
                                        My Plan
                                    </div>

                                    <div role="button" style={{ paddingBottom: '14px', paddingTop: '10px', fontSize: '14px' }} className={tab === 2 ? "activee" : "inactivee"} onClick={() => setTab(2)}>
                                        Change Password
                                    </div>
                                    <div role="button" style={{ paddingBottom: '14px', paddingTop: '10px', fontSize: '14px' }} className={tab === 3 ? "activee" : "inactivee"} onClick={() => setTab(3)}>
                                        Reviews
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '63rem', border: '1px solid #DFDFDF', marginBottom: '15px', height: '2px' }}></div>
                            {tab === 0 &&
                                <>
                                    <div style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #d7d7d7', borderRadius: '4px', marginTop: '3.5rem' }}>
                                        <div
                                            className="img_div" onClick={coverPicUploadHandler} role="button"
                                            style={
                                                profileInfo[0]?.data?.data?.coverImage?.original
                                                    ? { background: `url(${profileInfo[0]?.data?.data?.coverImage?.original})`, backgroundSize: "cover", backgroundPosition: "center" }
                                                    : { backgroundColor: "rgb(231, 231, 231)" }
                                            }
                                        >
                                            <div className="camera" style={{ cursor: 'pointer' }} onClick={coverPicUploadHandler}>
                                                <FontAwesomeIcon style={{ width: "12px" }} icon={faCamera} />
                                                <input className="d-none" ref={coverPicRef} type="file" onChange={(e) => changeImage(e, "cover")} />
                                            </div>
                                        </div>
                                        <div className="icon_pro" style={{ width: '15%', cursor: 'pointer' }} role="button" onClick={profilePicUploadHandler}>
                                            {profileInfo[0]?.data?.data?.imageUrl?.original ? <img className="icon_pro_img" src={profileInfo[0]?.data?.data?.imageUrl?.original} /> : <img className="icon_pro_img" src={Icon} />}
                                            <img className="icon_pro_cap" role="button" src={Camera} />
                                            <input className="d-none" ref={profilePicRef} type="file" onChange={(e) => changeImage(e)} />
                                        </div>
                                        <div className="name_pro">
                                            <div className=" d-flex w-100">
                                                <div className="d-flex" style={{ width: '100%' }}>
                                                    <span className="profilePage-name">{profileInfo[0]?.data?.data?.companyName}</span>{" "}
                                                    {profileInfo[0]?.data?.data?.planId?.name !== "Free" &&
                                                        <img src={bluetick} style={{ width: '15px', height: '15px', marginTop: '5px', marginLeft: '10px' }} />}
                                                    <div role="button" className="d-flex" style={{ marginLeft: '1rem', marginTop: '0.2rem', border: '1px solid #3B5998', borderRadius: '50px', width: '3.2rem', justifyContent: 'center' }} onClick={handleShow}>
                                                        <img src={pencil} style={{ width: '10px', height: '10px', marginTop: '5px' }} /> <span className="edit_option" role="button" style={{ marginLeft: '0.2rem', marginTop: '0.1rem' }}>Edit</span>

                                                    </div>
                                                    <div style={{ marginLeft: 'auto' }}>
                                                        <div className="view">View your listing

                                                            <span className="click" role="button" style={{ marginLeft: '6px' }} onClick={() => window.open(`https://www.idesign.market/find-professionals/${profileInfo[0]?.data?.data?.type == 1 ? "interior-designers" : profileInfo[0]?.data?.data?.type == 2 ? "contractors" : "oem"
                                                                }-in-${profileInfo[0]?.data?.data?.city.toLowerCase()}/${profileInfo[0]?.data?.data?.companyName.toLowerCase()}`, "_blank")}>Click Here</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="profilePage-position">{profileInfo[0]?.data?.data?.type === 1 ? "Interior Designer" : "Contractor"}</div>
                                        </div>
                                        <div className="paragraph">
                                            {profileInfo[0]?.data?.data?.aboutUs}
                                        </div>
                                        <div style={{ marginTop: '1.5rem', display: 'flex', marginLeft: '1rem', paddingBottom: '10px' }}>
                                            <div className="exp"> {profileInfo[0]?.data?.data?.workExperience}<span className="of"> years of experience</span></div>
                                            <div className="exp"> {profileInfo[0]?.data?.data?.NumberOfProjectsDone} <span className="of">  of projects</span></div>
                                            <div className="exp"> ₹ {profileInfo[0]?.data?.data?.fees?.designRoomPrice}/room <span className="of"> Design Fees</span></div>
                                        </div>
                                        {profileInfo && profileInfo[0]?.data?.data?.services?.length > 0 ? <div>

                                            <div className="style">Style forte</div>
                                            <div className="sub_bohe">

                                                {
                                                    profileInfo[0]?.data?.data?.services.map((elm) => {
                                                        return (
                                                            <div className="bohe">{elm}</div>
                                                        )
                                                    })}
                                            </div>

                                        </div> : ""}

                                    </div>

                                    <ProfileFeature />
                                    <ProjectsPosts />
                                </>}

                            {tab === 1 &&
                                <Plan />
                            }
                            {tab === 2 &&
                                <ChangePassword />
                            }
                            {tab === 3 &&
                                <Review />
                            }
                        </div>
                    </div>
                </div> : <NewProfilePageMob />}
            </div>
        </>
    );
}