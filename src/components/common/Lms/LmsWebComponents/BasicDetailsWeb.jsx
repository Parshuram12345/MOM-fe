import React, { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserProfile } from "../../Apis";
import { fetchProfileData, updateProfileData } from "../Actions";
import Left from "../Images/leftarrow.png";
import { useNavigate } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import SideBarWeb from "./SideBarWeb";

const BasicDetailsWeb = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
    const profileData = useSelector((state) => state.addToCartReducer.profileData);
    // console.log(profileData[0]?.data?.data?.)
    const [formData, setFormData] = useState({
        profession: profileData[0]?.data?.data?.type,
        companyName: profileData[0]?.data?.data?.companyName,
        phNum: profileData[0]?.data?.data?.phoneNumber,
        pinCode: profileData[0]?.data?.data?.pinCode,
        city: profileData[0]?.data?.data?.city,
        email: profileData[0]?.data?.data?.email,
        website: profileData[0]?.data?.data?.webSite,
        workExp: profileData[0]?.data?.data?.workExperience,
        numOfProjects: profileData[0]?.data?.data?.NumberOfProjectsDone,
    });

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const [IsSaveMode, SetSaveMode] = useState(false);
    const handleEditData = ()=> {
        SetSaveMode(true)
    }
  
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

    const handleSubmit = () => {
        
        const payload = new FormData();
        
        payload.append("type", formData.profession);
        payload.append("companyName", formData.companyName);
        payload.append("phoneNumber", formData.phNum);
        payload.append("pinCode", formData.pinCode);
        payload.append("city", formData.city);
        payload.append("email", formData.email);
        payload.append("webSite", formData.website);
        payload.append("workExperience", formData.workExp);
        payload.append("NumberOfProjectsDone", formData.numOfProjects);
        dispatch(updateProfileData(authTok, payload));
        SetSaveMode(false);
        navigateTo("/myprofile");

    };

    useEffect(() => {
        dispatch(fetchProfileData(authTok));
    }, []);

    return (
        <>
            <HeaderNav />
            <div className="d-flex">
                <div>
                    <SideBarWeb />
                </div>
                <div className="basicDetails-container" style={{ marginTop: '10px', width: '100vw' }}>
                    <section className="basicDetailsContent" style={{ width: '100vw', marginLeft: '20px' }}>
                        <div className=" d-flex justify-content-between mb-3" style={{ backgroundColor: "#ffffff", width: '76vw', padding: '6px', borderRadius: '5px' }}>
                            <Link className="d-flex align-items-center" to="/myprofile" 
                                style={{ textDecoration: "none", color: "black" }}>
                                <span className="d-flex align-items-center">
                                    <div className="me-3 d-flex align-items-center">
                                        <img style={{ width: "5px", height: "10px" }} src={Left} />
                                    </div>
                                    <div className="page-Heading">Basic Details</div>
                                </span>
                            </Link>

                        </div>
                        <div style={{ background: "#efefef" }}>
                            <div style={{ background: "#ffffff", width: '76vw', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)', paddingLeft: '10px', borderRadius: '10px',height:'78vh' }} className="">
                                {IsSaveMode === false ? <div className=" page-save-edit d-flex " role="button" onClick={handleEditData}>
                                    <p style={{ marginLeft: 'auto', marginTop: '10px', marginRight: '15px' }}>Edit</p>
                                </div> : <div className=" page-save-edit d-flex " role="button" onClick={handleSubmit}>
                                    <p style={{ marginLeft: 'auto', marginTop: '10px', marginRight: '15px' }}>Save</p>
                                </div>}


                                <form style={{ height: '62vh' }}>
                                    {/* <div className="d-flex justify-content-between">
                                        {IsSaveMode === true ? <div className="mb-3  basic_div">
                                            <label for="exampleInputEmail1" className="form-label">
                                                Profession <span>* </span>
                                            </label>
                                            <Form.Select style={{ height: "40px", fontSize: "14px", width: '30vw' }} name="profession" value={formData.profession} onChange={inputHandler}>
                                                <option value={1}>Interior Designer</option>
                                                <option value={2}>Contractor</option>
                                            </Form.Select>
                                        </div> : <div style={{ backgroundColor: '#ffffff', height: 'fit-content' }}>
                                            <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                Profession <span>* </span> </label>
                                                {profileData[0]?.data?.data?.type === 1 ?  <div style={{ border: '1px solid #A7A7A7', marginBottom: '10px', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px',fontSize:'14px',paddingLeft:'10px' }}> 
                                            Interior Designer 
                                            </div> : profileData[0]?.data?.data?.type === 2 ?  <div style={{ border: '1px solid #A7A7A7', marginBottom: '10px', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px',fontSize:'14px' ,paddingLeft:'10px'}}> 
                                            Contractor 
                                            </div> : <div style={{ border: '1px solid #A7A7A7', marginBottom: '10px', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px' ,fontSize:'14px',paddingLeft:'10px'}}> 
                                            OEM 
                                            </div>}
                                           
                                        </div>
                                        }

                                        {IsSaveMode === true ?
                                            <div className="mb-3 me-4 basic_div justify-content-between">
                                                <label for="exampleInputEmail1" className="form-label" >
                                                    Company Name <span>* </span>
                                                </label>
                                                <input type="text" style={{ width: '30vw' }} name="companyName" value={formData.companyName} className="form-control" id="Profession" placeholder="Company Name" onChange={inputHandler} />
                                            </div> : <div style={{ backgroundColor: '#ffffff', height: 'fit-content', marginRight: '25px',marginTop:'5px' }}>
                                                <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                    Company Name  <span>* </span> </label>
                                                <div style={{ border: '1px solid #A7A7A7', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px',fontSize:'14px',paddingLeft:'10px' }}>{profileData[0]?.data?.data?.companyName}</div>
                                            </div>}

                                    </div> */}
                                    <div className="d-flex justify-content-between">
                                        <div style={{ backgroundColor: '#ffffff', height: 'fit-content' }}>
                                            <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                Profession <span>* </span> </label>
                                            {profileData[0]?.data?.data?.type === 1 ? <div style={{ border: '1px solid #A7A7A7', marginBottom: '10px', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', fontSize: '14px', paddingLeft: '10px' }}>
                                                Interior Designer
                                            </div> : profileData[0]?.data?.data?.type === 2 ? <div style={{ border: '1px solid #A7A7A7', marginBottom: '10px', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', fontSize: '14px', paddingLeft: '10px' }}>
                                                Contractor
                                            </div> : <div style={{ border: '1px solid #A7A7A7', marginBottom: '10px', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', fontSize: '14px', paddingLeft: '10px' }}>
                                                OEM
                                            </div>}

                                        </div>
                                        

                                        {IsSaveMode === true ?
                                            <div className="mb-3 me-4 basic_div justify-content-between">
                                                <label for="exampleInputEmail1" className="form-label" >
                                                    Company Name <span>* </span>
                                                </label>
                                                <input type="text" style={{ width: '30vw' }} name="companyName" value={formData.companyName} className="form-control" id="Profession" placeholder="Company Name" onChange={inputHandler} />
                                            </div> : <div style={{ backgroundColor: '#ffffff', height: 'fit-content', marginRight: '25px', marginTop: '5px' }}>
                                                <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                    Company Name  <span>* </span> </label>
                                                <div style={{ border: '1px solid #A7A7A7', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', fontSize: '14px', paddingLeft: '10px' }}>{profileData[0]?.data?.data?.companyName}</div>
                                            </div>}

                                    </div>

                                    <div className="d-flex justify-content-between">
                                        {IsSaveMode === true ? <div className="mb-3 basic_div">
                                            <label for="exampleInputEmail1" className="form-label">
                                                Phone Number <span>* </span>
                                            </label>
                                            <input type="number" style={{ width: '30vw' }} name="phNum" value={formData.phNum} className="form-control" id="Profession" placeholder="Phone Number" onChange={inputHandler} />
                                        </div> : <div style={{ backgroundColor: '#ffffff', height: 'fit-content', marginRight: '25px',marginTop:'5px' }}>
                                            <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                Phone Number    <span>* </span> </label>
                                            <div style={{ border: '1px solid #A7A7A7', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', marginBottom: '10px',fontSize:'14px',paddingLeft:'10px' }}>{profileData[0]?.data?.data?.phoneNumber}</div>
                                        </div>}
                                        {IsSaveMode === true ? <div className="mb-2 me-4 basic_div">
                                            <label for="exampleInputEmail1" className="form-label">
                                                Pin Code <span>* </span>
                                                <input type="number" style={{ width: '30vw', marginTop: '5px' }} name="pinCode" value={formData.pinCode} className="form-control" id="Profession" placeholder="Pin Code" onChange={inputHandler} />
                                            </label>
                                        </div> : <div style={{ backgroundColor: '#ffffff', height: 'fit-content', marginRight: '25px',marginTop:'7px' }}>
                                            <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                Pin Code   <span>* </span> </label>
                                            <div style={{ border: '1px solid #A7A7A7', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px',fontSize:'14px',paddingLeft:'10px' }}>{profileData[0]?.data?.data?.pinCode}</div>
                                        </div>}

                                    </div>

                                    <div className="mb-2 d-flex justify-content-between basic_div">
                                         <div style={{ backgroundColor: '#ffffff', height: 'fit-content', marginRight: '25px',marginTop:'5px' }}>
                                            <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                City  <span>* </span> </label>
                                            <div style={{ border: '1px solid #A7A7A7', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px',fontSize:'14px',paddingLeft:'10px' }}>{profileData[0]?.data?.data?.city}</div>
                                        </div>
                                        {IsSaveMode === true ? <div className="mb-3 me-4 basic_div">
                                            <label for="exampleInputEmail1" className="form-label">
                                                Email <span>* </span>
                                            </label>
                                            <input type="text" style={{ width: '30vw' }} name="email" value={formData.email} className="form-control" id="Profession" placeholder="Email" onChange={inputHandler} />
                                        </div> : <div style={{ backgroundColor: '#ffffff', height: 'fit-content', marginRight: '25px',marginTop:'5px' }}>
                                            <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                Email  <span>* </span> </label>
                                            <div style={{ border: '1px solid #A7A7A7', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px',fontSize:'14px',paddingLeft:'10px' }}>{profileData[0]?.data?.data?.email}</div>
                                        </div>}

                                    </div>


                                    <div className="d-flex justify-content-between">
                                        {IsSaveMode === true ? <div className="mb-2 basic_div">
                                            <label for="exampleInputEmail1" className="form-label">
                                                Website Link
                                            </label>
                                            <input type="text" style={{ width: '30vw' }} name="website" value={formData.website} className="form-control" id="Profession" placeholder="www.abc.com" onChange={inputHandler} />
                                        </div> : <div style={{ backgroundColor: '#ffffff', height: 'fit-content', marginRight: '25px',marginTop:'5px' }}>
                                            <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                Website Link   <span>* </span> </label>
                                            <div style={{ border: '1px solid #A7A7A7', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px' ,fontSize:'14px',paddingLeft:'10px'}}>{profileData[0]?.data?.data?.webSite}</div>
                                        </div>}

                                        <div className="d-flex">
                                            <div className="mb-3  me-4 basic_div ">
                                                {IsSaveMode === true ? <div>
                                                    <label for="exampleInputEmail1" className="form-label">
                                                        Work Experience <span>* </span>
                                                    </label>
                                                    <Form.Select style={{ fontSize: "14px", height: "40px", width: '30vw' }} name="workExp" value={formData.workExp} placeholder="Select your work experience" onChange={inputHandler}>
                                                        <option value="0-2">0-2</option>
                                                        <option value="2-5">2-5</option>
                                                        <option value="Above 5">Above 5</option>
                                                    </Form.Select>
                                                </div> : <div style={{ backgroundColor: '#ffffff', height: 'fit-content', marginRight: '2px',marginTop:'5px' }}>
                                                    <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                    Work Experience  <span>* </span> </label>
                                                    <div style={{ border: '1px solid #A7A7A7', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px',fontSize:'14px',paddingLeft:'10px' }}>{profileData[0]?.data?.data?.workExperience}</div>
                                                </div>}

                                            </div>

                                        </div>
                                    </div>
                                    <div className="mb-3 basic_div">
                                        {IsSaveMode === true ?  <div>
                                            <label for="exampleInputEmail1" className="form-label">
                                                How many Projects have you done <span>* </span>
                                            </label>
                                            <Form.Select style={{ fontSize: "14px", height: "40px", width: '30vw' }} name="numOfProjects" value={formData.numOfProjects} placeholder="Select number of projects done" onChange={inputHandler}>
                                                <option value="less than 25">Less than 25</option>
                                                <option value="25 to 50">25 to 50</option>
                                                <option value="50 to 100">50 to 100</option>
                                                <option value="More than 100">More than 100</option>
                                            </Form.Select>
                                        </div> :<div style={{ backgroundColor: '#ffffff', height: 'fit-content', marginRight: '2px',marginTop:'5px' }}>
                                                    <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                                                    How many Projects have you done <span>* </span> </label>
                                                    <div style={{ border: '1px solid #A7A7A7', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px',fontSize:'14px',paddingLeft:'10px' }}>{profileData[0]?.data?.data?.NumberOfProjectsDone}</div>
                                                </div> }
                                       
                                    </div>
                                </form>

                            </div>

                            {/* <div className="mt-2 justify-=content-between">
                                <form style={{backgroundColor:'#ffffff',width:'76vw',height:'25vh',borderRadius:'10px',paddingLeft:'10px' }}>
                                    <div className=" page-save-edit d-flex " role="button" onClick={handleSubmit}>
                                        <p style={{ marginTop: '10px',marginLeft:'auto',marginRight:'10px' }}>Edit</p>
                                    </div>
                                    <div className="mb-2 basic_div">
                                        <label for="exampleInputEmail1" className="form-label">
                                            Current Password  <span>* </span>
                                        </label>
                                        <input type="number" style={{ width: '30vw' }} name="Current Password" value={formData.phNum} className="form-control" id="Profession" placeholder="" onChange={inputHandler} />
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <div className="mb-3 basic_div">
                                            <label for="exampleInputEmail1" className="form-label">
                                                Type New Password  <span>* </span>
                                            </label>
                                            <input type="number" style={{ width: '30vw' }} name="" value={formData.phNum} className="form-control" id="Profession" placeholder="" onChange={inputHandler} />
                                        </div>
                                        <div className="mb-3 me-4  basic_div">
                                            <label for="exampleInputEmail1" className="form-label">
                                                Re-Type New Password <span>* </span>
                                                <input type="number" style={{ width: '30vw', marginTop: '5px' }} name="pinCode" value={formData.pinCode} className="form-control" id="Profession" placeholder="" onChange={inputHandler} />
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div> */}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default BasicDetailsWeb;
