import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfileData, updateProfileData } from "../../Actions";
import { useEffect } from "react";
import ChangePasswordMob from "./ChangePasswordMob";
import axios from "axios";
import { set } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

export default function ChangePassword() {

    const [isDesktop, setIsDesktop] = useState(window.screen.width > 767);
    const updateMedia = () => {
        setIsDesktop(window.screen.width > 767);
    };

    const message = () => toast("Wow so easy!");

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
    const [pass, setpass] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setrePassword] = useState("");
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
        setpass(e.target.value);
    }
    const handleChange = (e) => {
        setPassword(e.target.value)
        inputHandler();
    }


    const handleChange1 = (e) => {
        setrePassword(e.target.value);
        inputHandler();
    }

    console.log(pass)
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
                toast.error("Error!")
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
        <div>

            {isDesktop ?

                <div className="justify-content-between" style={{ width: '100%', height: '80%', marginTop: '4rem' }}>
                    <ToastContainer />
                    <form style={{ backgroundColor: '#ffffff', width: '76vw', height: '25vh', borderRadius: '10px', paddingLeft: '10px' }}>
                        {/* <div className=" page-save-edit d-flex " role="button" onClick={handleSubmit}> */}
                        {/* <p style={{ marginTop: '10px', marginLeft: 'auto', marginRight: '10px' }}>Edit</p> */}
                        {/* </div> */}
                        <div className="mb-2 basic_div">
                            <label for="exampleInputEmail1" className="curnt">
                                Current Password  <span style={{ color: 'red' }}>* </span>
                            </label>
                            <input type="text" style={{ width: '30vw', border: '1px solid #DDDDDD' }} name="Current Password" value={pass} maxlength="7" className="form-control" id="Profession" placeholder="Type something" onChange={handleChangee} />
                        </div>

                        <div className="justify-content-between">
                            <div className="mb-3 basic_div" style={{ marginTop: '1rem' }}>
                                <label for="exampleInputEmail1" className="curnt">
                                    Type New Password  <span style={{ color: 'red' }}>* </span>
                                </label>
                                <input type="text" style={{ width: '30vw', border: '1px solid #DDDDDD' }} name="password" value={password} onChange={handleChange} maxlength="7" className="form-control" id="Profession" placeholder="Type something" />
                            </div>
                            <div className="basic_div" style={{ marginTop: '1rem' }}>
                                <label for="exampleInputEmail1" className="curnt" style={{ flexDirection: 'column' }}>
                                    Re-Type New Password <span style={{ color: 'red' }}>* </span>
                                    <input type="text" style={{ width: '30vw', marginTop: '5px', border: '1px solid #DDDDDD' }} name="rePassword" value={rePassword} maxlength="7"  className="form-control" id="Profession" placeholder="Type something" onChange={handleChange1} />
                                </label>
                            </div>
                            <div className="" style={{ marginTop: '2rem' }}>
                                <button className="submit_btn" onClick={updatePassword}>Submit </button>
                            </div>
                        </div>
                    </form>
                </div> : <ChangePasswordMob />}
        </div>
    );
}