import React, { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserProfile } from "../Apis";
import { fetchProfileData, updateProfileData } from "./Actions";
import Left from "./Images/leftarrow.png";
import { useNavigate } from "react-router-dom";
import BasicDetailsWeb from "./LmsWebComponents/BasicDetailsWeb";

const Basic = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
  const profileData = useSelector((state) => state.addToCartReducer.profileData);
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
    navigateTo("/myprofile");
  };

  useEffect(() => {
    dispatch(fetchProfileData(authTok));
  }, []);

  return (
    <>
      <div className="d-none d-md-block">
        <BasicDetailsWeb />
      </div>

      <div className=" d-block d-md-none basicDetails-container">
        <section className="basicDetailsContent">
          <div className="container pro_style d-flex justify-content-between mb-3" style={{ backgroundColor: "white" }}>
            <Link className="d-flex align-items-center" to="/myprofile" style={{ textDecoration: "none", color: "black" }}>
              <span className="d-flex align-items-center">
                <div className="me-3 d-flex align-items-center">
                  <img style={{ width: "5px", height: "10px" }} src={Left} />
                </div>
                <div className="page-Heading">Basic Details</div>
              </span>
            </Link>
            <div className="page-save-edit d-flex align-items-center" role="button" onClick={handleSubmit}>
              Save
            </div>
          </div>
          <div style={{ background: "#efefef" }}>
            <div style={{ background: "#ffffff" }} className="mt-2 container">
              <form>
                <div className="mb-3 basic_div">
                  {/* <label for="exampleInputEmail1" className="form-label">
                    Profession <span>* </span>
                  </label> */}
                  {/* <Form.Select style={{ height: "40px", fontSize: "14px" }} name="profession" value={formData.profession} onChange={inputHandler}>
                    <option value={1}>Interior Designer</option>
                    <option value={2}>Contractor</option>
                  </Form.Select> */}
                  <div style={{ backgroundColor: '#ffffff', height: 'fit-content' }}>
                    <label for="exampleInputEmail1" className="form-label" style={{ color: '#A7A7A7' }}>
                      Profession <span>* </span> </label>
                    {profileData[0]?.data?.data?.type === 1 ? <div style={{ border: '1px solid #A7A7A7', marginBottom: '10px', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', fontSize: '14px', paddingLeft: '10px', width: "100%" }}>
                      Interior Designer
                    </div> : profileData[0]?.data?.data?.type === 2 ? <div style={{ border: '1px solid #A7A7A7', marginBottom: '10px', width: '100%', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', fontSize: '14px', paddingLeft: '10px' }}>
                      Contractor
                    </div> : <div style={{ border: '1px solid #A7A7A7', marginBottom: '10px', width: '100%', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', fontSize: '14px', paddingLeft: '10px' }}>
                      OEM
                    </div>}
                  </div>
                </div>
                <div className="mb-3 basic_div">
                  <label for="exampleInputEmail1" className="form-label">
                    Company Name <span>* </span>
                  </label>
                  <input type="text" name="companyName" value={formData.companyName} className="form-control" id="Profession" placeholder="Company Name" onChange={inputHandler} />
                </div>

                <div className="mb-3 basic_div">
                  <label for="exampleInputEmail1" className="form-label">
                    Ph. Number <span>* </span>
                  </label>
                  <input type="number" name="phNum" value={formData.phNum} className="form-control" id="Profession" placeholder="Phone Number" onChange={inputHandler} />
                </div>
                <div className="d-flex">
                  <div className="mb-3 basic_div me-4">
                    <div>
                      <label for="exampleInputEmail1" className="form-label">
                        Pin Code <span>* </span>
                      </label>
                      <input type="number" name="pinCode" value={formData.pinCode} className="form-control" id="Profession" placeholder="Pin Code" onChange={inputHandler} />
                    </div>
                  </div>
                  <div className="mb-3 basic_div">
                    <div>
                      <label for="exampleInputEmail1" className="form-label">
                        City <span>* </span>
                      </label>
                      {/* <Form.Select style={{ fontSize: "14px", height: "40px" }} name="city" value={formData.city} onChange={inputHandler}>
                        {cityArr.map((curElem) => {
                          return (
                            <option key={curElem.key} value={curElem.value}>
                              {curElem.placeholder}
                            </option>
                          );
                        })}
                      </Form.Select> */}
                      <div style={{ border: '1px solid #A7A7A7', width: '30vw', height: '6vh', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', fontSize: '14px', paddingLeft: '10px' }}>{profileData[0]?.data?.data?.city}</div>
                    </div>
                  </div>
                </div>
                <div className="mb-3 basic_div">
                  <label for="exampleInputEmail1" className="form-label">
                    Email <span>* </span>
                  </label>
                  <input type="text" name="email" value={formData.email} className="form-control" id="Profession" placeholder="Email" onChange={inputHandler} />
                </div>
                <div className="mb-3 basic_div">
                  <label for="exampleInputEmail1" className="form-label">
                    Website Link
                  </label>
                  <input type="text" name="website" value={formData.website} className="form-control" id="Profession" placeholder="www.abc.com" onChange={inputHandler} />
                </div>
                <div className="d-flex">
                  <div className="mb-3 basic_div me-4">
                    <div>
                      <label for="exampleInputEmail1" className="form-label">
                        Work Experience <span>* </span>
                      </label>
                      <Form.Select style={{ fontSize: "14px", height: "40px" }} name="workExp" value={formData.workExp} placeholder="Select your work experience" onChange={inputHandler}>
                        <option value="0-2">0-2</option>
                        <option value="2-5">2-5</option>
                        <option value="Above 5">Above 5</option>
                      </Form.Select>
                    </div>
                  </div>
                  <div className="mb-3 basic_div">
                    <div>
                      <label for="exampleInputEmail1" className="form-label">
                        Projects done <span>* </span>
                      </label>
                      <Form.Select style={{ fontSize: "14px", height: "40px" }} name="numOfProjects" value={formData.numOfProjects} placeholder="Select number of projects done" onChange={inputHandler}>
                        <option value="less than 25">Less than 25</option>
                        <option value="25 to 50">25 to 50</option>
                        <option value="50 to 100">50 to 100</option>
                        <option value="More than 100">More than 100</option>
                      </Form.Select>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* <div style={{ background: "#ffffff", paddingBottom: "5rem" }} className="mt-2 container">
            <div className="span_edit ">Edit</div>
            <form>
              <div className="mb-3 basic_div pt-3">
                <label for="exampleInputEmail1" className="form-label">
                  Current Password <span>* </span>
                </label>
                <input type="profession" className="form-control" id="Profession" placeholder="Current Password" />
              </div>
              <div className="mb-3 basic_div">
                <label for="exampleInputEmail1" className="form-label">
                  New Password <span> * </span>
                </label>
                <input type="profession" className="form-control" id="Profession" placeholder="New Password" />
              </div>
              <div className="mb-3 basic_div">
                <label for="exampleInputEmail1" className="form-label">
                  Re-Type New Password <span> * </span>
                </label>
                <input type="profession" className="form-control" id="Profession" placeholder="Re-Type New Password" />
              </div>
            </form>
          </div> */}
          </div>
        </section>

      </div>
    </>
  );
};

export default Basic;
