import React from 'react';
import { useSelector } from 'react-redux';
import add from "../../Images/Add.svg"
import ProfileFeatureMob from './ProfileFeatureMob';
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Icon from "../../Images/icon.png";
import { updateUserProfile } from "../../../Apis";
import { confirmAlert } from "react-confirm-alert";
import { completeProfile } from "../../../Redux/Actions/auth";
import { toast, ToastContainer } from "react-toastify";
import Camera from "../../Images/camera.png"
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft, faAngleRight, faCamera, faCircle } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';


export default function ProfileFeature() {
    const profileInfo = useSelector((state) => state.addToCartReducer.profileData);

    const [isDesktop, setIsDesktop] = useState(window.screen.width > 767);
    const updateMedia = () => {
        setIsDesktop(window.screen.width > 767);
    };
    const dispatch = useDispatch();

    console.log(profileInfo)
    const FeaturePicRef = useRef(null);
    const [file, setFile] = useState("");
    const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    const changeImage = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0])


        // const file = e.target.files[0];
        // if (file) {
        //     const payload = new FormData();
        //     if (cover) {
        //         payload.append("coverImage", file);
        //     } else {
        //         payload.append("image", file);
        //     }
        //     confirmAlert({
        //         message: `Are you sure you want to change ${cover || "profile"} image?`,
        //         buttons: [
        //             {
        //                 label: "Yes",
        //                 onClick: () => {
        //                     updateUserProfile(payload).then((res) => {
        //                         dispatch(completeProfile(res?.data));
        //                         toast.success("Image Updated!");
        //                         window.location.reload();
        //                     });
        //                 },
        //             },
        //             {
        //                 label: "No",
        //             },
        //         ],
        //     });
        // }
    };

    console.log(file)

    useEffect(async () => {
        if (file) {
            // alert("pls")
            const featuredfile = new FormData();
            featuredfile.append("featured", file);
            console.log(featuredfile);

            const response = await axios.put('https://pro-api.idesign.market/api/uploadProfileFeatured',
                featuredfile
                ,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authTok
                    }
                }
            ).then((res) => {
                console.log(res)
                window.location.reload();

            })
                .catch((err) => console.warn('error'))
        }
    }, [file])

    const removeFeature = () => {
        axios.put('https://pro-api.idesign.market/user/deleteProfileFeatured', {},
            {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authTok
                }

            }).then((res) => {
                console.log(res)
                window.location.reload();
            })
            .catch((err) => console.warn('error'))
    }

    const profilePicUploadHandler = () => {
        FeaturePicRef.current.click();
    };


    // console.log(profileInfo[0]?.data?.data?.imageUrl)
    return (
        <div>
            {isDesktop ?
                <div className='profile_div'>
                    <div className='profile_name'>Profile Featured Image</div>
                    {profileInfo[0]?.data?.data?.imageUrl?.original ?
                        <>
                            <div className='box2' style={{ width: '23%' }}>
                                {profileInfo[0]?.data?.data?.profileFeatured?.original ? <img

                                    src={profileInfo[0]?.data?.data?.profileFeatured?.original} style={{borderRadius:'4px'}}
                                /> :

                                    <div className='box' role="button" onClick={profilePicUploadHandler}>

                                        <img role="button" src={add} style={{ width: '40px', height: '40px', alignSelf: 'center', marginTop: '2rem' }} onClick={profilePicUploadHandler} />
                                        <input className="d-none" ref={FeaturePicRef} type="file"  accept = "image/png, image/jpg , image/jpeg" onChange={changeImage} />
                                        <div className='feature'>Add Featured image</div>
                                    </div>
                                }
                                {profileInfo[0]?.data?.data?.profileFeatured?.original && <> <div className='d-flex'>
                                    <button style={{
                                        position: 'relative', top: '-2.3rem', left: '7rem', color: '#3B5998', fontSize: '12px', background: '#ffffff', border: '1px solid #ffffff', borderRadius: '5px', paddingLeft: '4px', paddingRight: '4px',height:'1.5rem'
                                    }} onClick={removeFeature}>Remove</button>
                                    <img className="icon_pro_cap" style={{ width: '25px', height: '28px', top: '-2.3rem', position: 'relative', right: '-8rem' }} src={Camera} onClick={profilePicUploadHandler} />
                                </div>
                                    <input className="d-none" ref={FeaturePicRef} type="file" accept = "image/png, image/jpg , image/jpeg"  onChange={changeImage} /> </>}

                            </div>


                        </>
                        : <div className='box' role="button" onClick={profilePicUploadHandler}>

                            <img role="button" src={add} style={{ width: '40px', height: '40px', alignSelf: 'center', marginTop: '2rem' }} onClick={profilePicUploadHandler} />
                            <input className="d-none" ref={FeaturePicRef} type="file" accept = "image/png, image/jpg , image/jpeg" onChange={changeImage} />
                            <div className='feature'>Add Featured image</div>
                        </div>}
                </div> : <ProfileFeatureMob />}
        </div>
    );
}