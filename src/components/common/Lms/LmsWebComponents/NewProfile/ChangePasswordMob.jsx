import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfileData, updateProfileData } from "../../Actions";
import { useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function ChangePasswordMob() {

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
    const [IsSaveMode, SetSaveMode] = useState(false);
    const handleEditData = () => {
        SetSaveMode(true)
    }
    const [pass, setpass] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setrePassword] = useState();
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

    const handleChangee = (e) => {
        {
            setpass(e.target.value);
        }
    }
    const handleChange = (e) => {
        setPassword(e.target.value)
        inputHandler();
    }


    const handleChange1 = (e) => {
        setrePassword(e.target.value);
        inputHandler();
    }

    console.log(password)
    console.log(rePassword)

    const updatePassword = async (e) => {
        e.preventDefault();

        if (pass.length && password.length >= 7 && password === rePassword) {
            const res = await axios.post('https://pro-api.idesign.market/user/changePassword', {


                oldPassword: pass,
                newPassword: password
            },
                {
                    headers: {

                        authorization: authTok,

                    },
                }

            ).then((res) => {
                console.log(res)
                toast.success("Password Changed Successfully!!")
                // navigateTo('/newprofilepage')
            }).catch((error) => {
                toast.error("Password Changed Successfully!!")
            }

            )
            setPassword()

        }
        else {
            toast.error("New Password and Re-type New Password did not match!")
        }

    }


    useEffect(() => {
        dispatch(fetchProfileData(authTok));
    }, []);

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <ToastContainer />
            <div className="justify-content-between" style={{ padding: '1rem', width: '99%', backgroundColor: '#ffffff' }}>
                <form style={{ backgroundColor: '#ffffff', width: '100%', borderRadius: '10px', paddingLeft: '10px' }}>
                    {/* <div className=" page-save-edit d-flex " role="button" onClick={handleSubmit}> */}
                    {/* <p style={{ marginTop: '10px', marginLeft: 'auto', marginRight: '10px' }}>Edit</p> */}
                    {/* </div> */}
                    <div className="mb-2 basic_div" style={{ background: '#ffffff', width: '98%', marginTop: '3rem' }}>
                        <label for="exampleInputEmail1" className="curnt">
                            Current Password  <span style={{ color: 'red' }}>* </span>
                        </label>
                        <input type="text" style={{ width: '97%', height: '2.4rem', border: '1px solid #DDDDDD', marginTop: '0.5rem' }} name="Current Password" value={pass} maxlength="7" className="form-control" id="Profession" placeholder="Type something" onChange={handleChangee} />


                        <div className="justify-content-between">
                            <div className="mb-3 basic_div" style={{ marginTop: '1rem' }}>
                                <label for="exampleInputEmail1" className="curnt">
                                    Type New Password  <span style={{ color: 'red' }}>* </span>
                                </label>
                                <input type="text" style={{ width: '97%', height: '2.4rem', border: '1px solid #DDDDDD', marginTop: '0.5rem' }} name="" value={password} maxlength="7" className="form-control" id="Profession" placeholder="Type something" onChange={handleChange} />
                            </div>
                            <div className="basic_div" style={{ marginTop: '1rem' }}>
                                <label for="exampleInputEmail1" className="curnt" style={{ flexDirection: 'column' }}>
                                    Re-Type New Password <span style={{ color: 'red' }}>* </span>
                                    <input type="text" style={{ width: '19.2rem', height: '2.4rem', border: '1px solid #DDDDDD', marginTop: '0.5rem' }} name="pinCode" value={rePassword} maxlength="7"className="form-control" id="Profession" placeholder="Type something" onChange={handleChange1} />
                                </label>
                            </div>
                            <div className="" style={{ marginTop: '6rem' }}>
                                <button className="submit_mob" onClick={updatePassword}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}