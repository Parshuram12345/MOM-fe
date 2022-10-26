import { upload } from '@testing-library/user-event/dist/upload';
import React from 'react';
import { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import add from "../../Images/Add.svg"
import card from "../../Images/card_image.svg"
import threedots from "../../Images/threeDots.svg"
import file from "../../Images/upload.svg"
import { Link, useNavigate } from "react-router-dom";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AddProjectWeb from "../../../Components/OnboardingWebScreens/AddProjectWeb"
import { fetchUserProjects, setProjectDetailsRedux } from "../../../Lms/Actions";
import { OnboardingContext } from "../../../Context/Context"
import { useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from "../../../Config";
import Resizer from "react-image-file-resizer";
import { getToken } from "../../../Lms/getToken";
import project_upload from '../../../Assets/profile/project_upload.png';
import WebProjectCard from "./WebProjectCard"
import { cleanTempProjectList, deleteProjectFromTempArr, deletProjectFromTempArr, editProjectImages, fetchProfileData } from '../../../Lms/Actions';
import comprofile from "../../../Lms/Images/comprofile.svg"
import threeDots from "../../../Lms/Images/threeDots.svg"
import like from "../../../Lms/Images/like.svg"
import dot from "../../../Lms/Images/dot.svg"
import share from "../../../Lms/Images/share.svg"
import comment from "../../../Lms/Images/comment.svg"

export default function ProjectsPosts() {
    const dispatch = useDispatch();
       
    const [isDesktop, setIsDesktop] = useState(window.screen.width > 767);
    const updateMedia = () => {
        setIsDesktop(window.screen.width > 767);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });
    const projectData = useSelector((state) => state.addToCartReducer.projectList);
    console.log(projectData)

    const authTok = localStorage.getItem("token") ? getToken() : "";
    const userId = localStorage.getItem('userId');
    const [isLoading, setIsLoading] = useState(false);
    const [tab, setTab] = useState(0);
    const profileInfo = useSelector((state) => state.addToCartReducer?.profileData);
    
    const context = useContext(OnboardingContext);
    const navigateTo = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ name: "", city: "" });

    const [addProject, setAddProject] = useState(false);
    const [comPost, setComPost] = useState([]);

    function handleNext(data) {
        localStorage.removeItem("path");
        dispatch(setProjectDetailsRedux(data.name, data.city));
        navigateTo("/projectadd");
    }

    const handlePost = async () => {
        setTab(1);
        const response = await axios.get(`https://community-api.idesign.market/api/post/getPost?userDataId=${localStorage.getItem("userId")}`, {
        }).then((res) => {

            console.log(res)
            setComPost(res?.data?.posts);
        }).catch((err) => {

            console.log(err)
        })
    }
    useEffect(()=> {
        dispatch(fetchUserProjects(authTok));
    },[])

    return (


        <div>
            <div className='d-flex projectt' >

                <div role="button" style={{paddingBottom:'14px'}} className={tab === 0 ? 'activee' : 'inactivee'} onClick={() => setTab(0)}>
                    Projects
                </div>
                <div role="button" style={{paddingBottom:'14px'}}  className={tab === 1 ? 'activee' : 'inactivee'} onClick={handlePost}>
                    Posts
                </div>
                {/* <button  onClick={handlePost}>shkj</button> */}

            </div>
            <Modal centered show={addProject} onHide={() => { setAddProject(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit(handleNext)}>
                        <div style={{ margin: "16px 0" }}>
                            <div style={{ marginBottom: "8px" }}>Project Name</div>
                            <div>
                                <Form.Control
                                    className="w-100"
                                    style={{ fontSize: "15px", fontWeight: "400" }}
                                    {...register("name", {
                                        required: true,
                                    })}
                                    name="name"
                                    type="text"
                                    placeholder="Enter Project Name" />
                            </div>
                        </div>
                        <div style={{ margin: "0 0 16px 0" }}>
                            <div style={{ marginBottom: "8px" }}>City</div>
                            <div>
                                <Form.Control
                                    className="w-100"
                                    style={{ fontSize: "15px", fontWeight: "400" }}
                                    {...register("city", {
                                        required: true,
                                    })}
                                    name="city"
                                    type="text"
                                    placeholder="Enter City"
                                />
                            </div>
                        </div>
                        <button type="submit" style={{ width: "100%", border: "none", backgroundColor: "#176091", color: "#FFFFFF", padding: "8px 16px", borderRadius: "8px" }}>Next </button>
                    </Form>
                </Modal.Body>
            </Modal>

            <div style={{ width: '100%', borderBottom: '1px solid #d6d6d6' }}></div>
            {tab === 0 &&
                <>
                    <div className='d-flex' style={{ background: 'white' }}>
                        <div className='d-flex ' style={{ flexWrap: 'wrap' }}>
                            <div role="button" className='postbox' style={{ height: '10.6rem', width: '13.5rem', marginTop: '1.5rem', marginRight: '1rem' }} onClick={() => {
                                setAddProject(true);
                            }}>

                                <img src={add} style={{ width: '40px', height: '40px', alignSelf: 'center', marginTop: '1rem' }} />
                                <div className='feature'>Add New Project</div>
                            </div>


                            {projectData[0]?.data?.data?.count > 0 ? (
                                // <div className="d-flex  align-items-center" style={{
                                //     display: 'flex', flexWrap: 'wrap', background: '#ffffff',
                                //     width: '77vw', borderRadius: '10px',
                                //     marginTop: '5px'
                                // }}>
                                projectData[0]?.data?.data?.data.map((curElem) => {
                                    return <WebProjectCard projectInfo={curElem} />;
                                })
                                // </div>
                            ) : (
                                <div className='d-flex' style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    
                                }}>

                                </div>
                            )}






                        </div>
                    </div>
                </>
            }

            {tab === 1 &&
                <>
                 {comPost.length == 0 && <div className='mt-3 d-flex' style={{fontSize:'18px',justifyContent:'center',alignItems:'center',fontWeight:'500'}}>You haven't post anything yet!</div>}
                    <div className='d-flex flex-wrap mx-2 w-100'>
                        {comPost?.map((elm) => {
                            return (

                                <div className='me-3' style={{
                                    display: 'flex', flexDirection: 'column', width: '30%',
                                    borderRadius: '4px', padding: '2px', border: '1px solid #d7d7d7', marginTop: '15px'
                                }}>
                                    <div className='d-flex' style={{
                                    }}>


                                        <div style={{ margin: '15px', display: 'flex' }}>
                                            <img src={comprofile} style={{ width: '30px', height: '30px' }} />

                                            <div className='mx-3'>
                                                <div style={{
                                                    fontFamily: 'Manrope', FontWeight: '700',
                                                    fontSize: '12px',
                                                    lineHeight: '17px', color: '#000000'
                                                }}> {profileInfo[0]?.data?.data?.companyName}</div>
                                                <div style={{
                                                    fontFamily: 'Manrope', FontWeight: '700',
                                                    fontSize: '12px',
                                                    lineHeight: '17px', color: '#8F969E'
                                                }}>{elm.createdAt.slice(0, 10)}</div>
                                            </div>
                                        </div>
                                        <div className='d-flex' style={{ marginLeft: 'auto' }}>
                                            <div className='mt-3' style={{
                                                fontFamily: 'Manrope',

                                                fontWeight: '700',
                                                fontSize: '8.885px',
                                                lineHeight: '12px',

                                                color: '#8F969E'
                                            }}>{elm.tags.length === 0 ? " " : `#${elm.tags[0]}`}</div>
                                            {/* <img src={threeDots} style={{ width: '39%', height: '43%', marginTop: '10px' }} /> */}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '10px', padding: '10px' }}>
                                        {elm.description}
                                    </div>
                                    <div className='d-flex justify-content-between' style={{ padding: '10px' }}>

                                        <div className='d-flex'>
                                            <img src={like} />
                                            <div style={{ fontSize: '12px', color: "#888888" }}>{elm.likes.length}</div>
                                        </div>
                                        <div className='justify-content-between'>
                                            <div className='d-flex' >
                                                <div style={{ fontSize: '12px', color: "#888888" }}>{elm.comments.length} Comments</div>
                                                <img src={dot} style={{ marginLeft: '10px', marginRight: '10px' }} />
                                                <div style={{ fontSize: '12px', color: "#888888" }}>13 Shares</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='d-flex mx-2' style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ borderRadius: '50px', background: '#F6F6F6', width: '29%', height: '1.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <div className='d-flex' style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img className='mx-2' src={like} style={{ width: '15px', filter: 'brightness(0.5)' }} />
                                                <div style={{ marginTop: '3px', fontSize: '10px' }}>Like</div>
                                            </div>

                                        </div>
                                        <div style={{ borderRadius: '50px', background: '#F6F6F6', width: '29%', height: '1.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <div className='d-flex'>
                                                <img className='mx-2' src={comment} style={{ width: '15px' }} />
                                                <div style={{ fontSize: '10px' }}>Comment</div>
                                            </div>

                                        </div>
                                        <div style={{ borderRadius: '50px', background: '#F6F6F6', width: '29%', height: '1.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <div className='d-flex'>
                                                <img className='mx-2' src={share} style={{ width: '15px' }} />
                                                <div style={{ fontSize: '10px' }}>Share</div>
                                            </div>

                                        </div>
                                    </div> */}
                                </div>

                            )
                        })}
                    </div>
                </>
            }
        </div>

    );
}