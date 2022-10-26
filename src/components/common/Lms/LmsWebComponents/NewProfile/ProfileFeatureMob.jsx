import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from "react";
import add from "../../Images/Add.svg"
import Camera from "../../Images/camera.png"

export default function ProfileFeatureMob() {
    const profileInfo = useSelector((state) => state.addToCartReducer?.profileData);
    console.log(profileInfo[0]?.data?.data?.imageUrl)

    const changeImage = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0])
    };
    const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
  
    const FeaturePicRef = useRef(null);
    const [file, setFile] = useState("");

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

    console.log(file)

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


    return (

        // <div className='profile_div' style={{marginTop:'0px',padding:'1rem'}}>
        //     <div className='profile_name'>Profile Featured Image</div>
        //     <div className='boxx'>

        //         <img src={profileInfo[0]?.data?.data?.imageUrl?.original ? profileInfo[0]?.data?.data?.imageUrl?.original : add} style={{ width: '40px', height: '40px', alignSelf: 'center', marginTop: '2rem' }} />
        //         <div className='feature'>Add Featured image</div>
        //     </div>
        // </div>

        <div className='profile_div' style={{ marginLeft: '1rem',width:'100%' }}>
            <div className='profile_name'>Profile Featured Image</div>
            {/* {profileInfo[0]?.data?.data?.imageUrl?.original ? <div className='box2'>
                <img src={profileInfo[0]?.data?.data?.imageUrl?.original} style={{ width: '90vw' }} /> </div> : <div className='box' >

                <img src={add} style={{ width: '40px', height: '40px', alignSelf: 'center', marginTop: '2rem' }} />
                <div className='feature'>Add Featured image</div>
            </div>} */}
            {profileInfo[0]?.data?.data?.imageUrl?.original ?
                <>
                    <div className='box2' style={{ width: '92%' }}>
                        {profileInfo[0]?.data?.data?.profileFeatured?.original ? <img

                            src={profileInfo[0]?.data?.data?.profileFeatured?.original} style={{borderRadius:'5px',width:'100%'}}
                        /> :

                            <div className='box'style={{width:'21rem'}} role="button" onClick={profilePicUploadHandler} >

                                <img role="button" src={add} style={{ width: '30px', height: '30px', alignSelf: 'center', marginTop: '2rem' }} onClick={profilePicUploadHandler} />
                                <input className="d-none" ref={FeaturePicRef} type="file" onChange={changeImage} />
                                <div className='feature'>Add Featured image</div>
                            </div>
                        }
                        {profileInfo[0]?.data?.data?.profileFeatured?.original && <> <div className='d-flex'>
                            <button style={{
                                position: 'relative', top: '-2.7rem', left: '14rem', color: '#3B5998', fontSize: '12px', background: '#ffffff', border: '1px solid #ffffff', borderRadius: '5px', paddingLeft: '4px', paddingRight: '4px',height:'20px'
                            }} onClick={removeFeature}>Remove</button>
                            <img className="icon_pro_cap" style={{ width: '25px', height: '28px', top: '-2.7rem', position: 'relative', left:'15rem' }} src={Camera} onClick={profilePicUploadHandler} />
                        </div>
                            <input className="d-none" ref={FeaturePicRef} type="file" onChange={changeImage} /> </>}

                    </div>


                </>
                : <div className='box' role="button" onClick={profilePicUploadHandler}>

                    <img role="button" src={add} style={{ width: '30px', height: '30px', alignSelf: 'center', marginTop: '2rem' }} onClick={profilePicUploadHandler} />
                    <input className="d-none" ref={FeaturePicRef} type="file" onChange={changeImage} />
                    <div className='feature'>Add Featured image</div>
                </div>}

        </div>

    );
}