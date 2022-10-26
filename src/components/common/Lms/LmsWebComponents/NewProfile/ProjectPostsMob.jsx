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
import { setProjectDetailsRedux , fetchUserProjects,} from "../../../Lms/Actions";
import { OnboardingContext } from "../../../Context/Context"
import WebProjectCard from './WebProjectCard';
import MobProjectCard from './MobProjectCard';
import comprofile from "../../../Lms/Images/comprofile.svg"
import threeDots from "../../../Lms/Images/threeDots.svg"
import like from "../../../Lms/Images/like.svg"
import dot from "../../../Lms/Images/dot.svg"
import share from "../../../Lms/Images/share.svg"
import comment from "../../../Lms/Images/comment.svg"
import axios from 'axios';
import { getToken } from "../../../Lms/getToken";
import { useEffect } from 'react';


export default function ProjectPostsMob() {
    const dispatch = useDispatch();
    const authTok = localStorage.getItem("token") ? getToken() : "";
    const [tab, setTab] = useState(0);
    const profileInfo = useSelector((state) => state.addToCartReducer?.profileData);
    console.log(profileInfo[0]?.data?.data?.projects)
    console.log(profileInfo[0]?.data)


    const [comPost, setComPost] = useState([]);

    const [projectDetails, setProjectDetails] = useState({ name: "", city: "" });
    const context = useContext(OnboardingContext);
    const navigateTo = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ name: "", city: "" });

    const [addProject, setAddProject] = useState(false);

    const projectData = useSelector((state) => state.addToCartReducer.projectList);
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
            <div className='d-flex projectt' style={{ width: '40%', marginLeft: '1rem' }}>

                <div role="button" style={{paddingBottom:'10px'}} className={tab === 0 ? 'active' : 'inactive'} onClick={() => setTab(0)}>
                    Projects
                </div>
                <div role="button" style={{paddingBottom:'10px'}} className={tab === 1 ? 'active' : 'inactive'} onClick={handlePost}>
                    Posts
                </div>

            </div>
            <Modal className="addProjectModalPopup" centered show={addProject} onHide={() => { setAddProject(false) }}>
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
                        <div style={{ margin: "0 0 16px 0" }}>
                            <button type="submit" style={{ width: "100%", border: "none", backgroundColor: "#176091", color: "#FFFFFF", padding: "8px 16px", borderRadius: "8px" }}>Next</button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <div style={{ width: '64rem', borderBottom: '1px solid #d6d6d6' }}></div>
            {tab === 0 &&
                <>
                    {/* <div className='d-flex flex-wrap mx-1'style={{width:'22rem',margin:'8rem'}}>
                        <div role="button" className='postbox' onClick={() => {
                            setAddProject(true);
                        }}>

                            <img src={add} style={{ width: '40px', height: '40px', alignSelf: 'center', marginTop: '1rem' }} />
                            <div className='feature'>Add New Project</div>
                        </div>
                        {profileInfo[0]?.data?.data?.projects.length > 0 ?

                            <div style={{ display: 'contents' }}>
                                {profileInfo[0]?.data?.data?.projects.map((elm) => {
                                    return (
                                        <>
                                            <div className='imgbox'>
                                                <img src={elm?.featured?.original} style={{ width: '100%', height: '6.5rem', objectFit: 'cover' }} />
                                                <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                                    <div className='d-flex' style={{ flexDirection: 'column', marginLeft: '10px', marginTop: '5px' }}>{elm.name}</div>
                                                    <div className='d-flex'><img src={threedots} style={{ width: '20px', height: '20px', marginTop: '10px' }} /></div>

                                                </div>

                                                <div clsasName="locations" style={{ marginLeft: '10px', fontSize: '12px' }}>{elm.city}</div>
                                                <div className='d-flex' style={{ fontSize: '12px', marginTop: '5px', width: '44%', height: '9%', justifyContent: 'space-evenly' }}>
                                                    <img src={file} style={{ width: '15px', height: '15px' }} />
                                                    <div style={{ fontSize: '10px' }}>{elm?.data[0]?.images?.length} Photos</div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </div> : ""}


                    </div> */}
                    <div className='d-flex flex-wrap' style={{ width: '100%' }}>
                        <div className='d-flex' style={{ flexDirection: 'column',width:'100%',alignItems:'center' }}>
                            <div role="button" className='postbox' style={{ width: '20.5rem', margin: '20px', height: '8rem' }} onClick={() => {
                                setAddProject(true)
                            }}>

                                <img src={add} style={{ width: '30px', height: '30px', alignSelf: 'center', marginTop: '1rem' }} />
                                <div className='feature' style={{ marginTop: '1rem', marginBottom: '1rem' }}>Add New Project</div>
                            </div>
                        </div>
                        <div style={{ background: 'white' }}>
                            <div className='d-flex flex-wrap justify-content-center'>
                                {projectData[0]?.data?.data?.count > 0 ? (
                                    // <div className="d-flex  align-items-center" style={{
                                    //     display: 'flex', flexWrap: 'wrap', background: '#ffffff',
                                    //     width: '77vw', borderRadius: '10px',
                                    //     marginTop: '5px'
                                    // }}>
                                    projectData[0]?.data?.data?.data.map((curElem) => {
                                        return <MobProjectCard projectInfo={curElem} />;
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
                        {/* <div className="d-flex justify-content-center align-items-center" style={{ borderRadius: "10px", width: '76vw', height: '80vh', marginLeft: '10px', backgroundColor: '#ffffff', marginTop: '5px' }}>
                            <div style={{ background: "#ffffff", position: "relative", borderRadius: "10px", width: '75vw', height: '70vh', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }} className="main-div row">

                                <div className="projectSummary-container-web">
                                    <ToastContainer />
                                    <div className="">
                                        <div className="projectspics-container-web">
                                            {projectArray?.map((p, i) => {
                                                return (
                                                    <div className="projects-web">
                                                        <div className="projectSummaryImageContainer-web">
                                                            <img className="projectSummaryImage-web" src={p?.images[0]?.path} alt="" />
                                                        </div>
                                                        <div className="projectdesc-web">
                                                            <div className="nameAndcity-web ps-2">
                                                                <div style={{ fontSize: "15px", fontWeight: "600" }} >{p?.name}</div>
                                                                <p style={{ fontSize: "10px" }}>{p?.city}</p>
                                                            </div>
                                                            <div className="editbtn-web pe-2">
                                                                <div id={i} onClick={handleEdit} style={{ border: "none", backgroundColor: "white" }}>
                            <div role="button" style={{ height: "2px" }} id={i}><FontAwesomeIcon size="sm" color="#888888" icon={faEllipsisV}/></div>
                          </div>
                                                                <Dropdown>
                                                                    <Dropdown.Toggle style={{ backgroundColor: "#FFFFFF", border: "none", boxShadow: 'none' }}>
                                                                        <FontAwesomeIcon size="lg" color="#888888" icon={faEllipsisV} />
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item onClick={() => editProject(p.name, p.city, p.images)}>Edit</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => handleDelete(p.name)}>Delete</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div style={{ position: "absolute", right: "1rem", bottom: "1rem", width: "50%", backgroundColor: "white" }} className="btn-container-web d-flex justify-content-end">
                                            <button style={{ width: "8rem", fontSize: "12px", height: "2rem", fontWeight: "600" }} className="addNewProjectbtn b" onClick={() => { setAddNewProjectModal(true) }}>Add New Project</button>
                                            {isLoading ? <button style={{ width: "6rem", fontSize: "12px", height: "2rem", fontWeight: "600", marginLeft: "1rem" }} onClick={handleSubmitPost} disabled={disabledBtn} className="submitbtn b">
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                /> </button> : <button style={{ width: "6rem", fontSize: "12px", height: "2rem", fontWeight: "600", marginLeft: "1rem" }} onClick={handleSubmitPost} disabled={disabledBtn} className="submitbtn b">
                                                Submit
                                            </button>}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div> */}
                        {/* {profileInfo[0]?.data?.data?.projects.length > 0 ?

                            <div style={{ display: 'contents' }}>
                                {profileInfo[0]?.data?.data?.projects.map((elm) => {
                                    return (
                                        <>
                                            <div className='imgbox'>
                                                <img src={elm?.featured?.original} style={{ width: '100%', height: '6.5rem', objectFit: 'cover' }} />
                                                <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                                    <div className='d-flex' style={{ flexDirection: 'column', marginLeft: '10px', marginTop: '5px',fontSize:'14px' }}>{elm.name}</div>
                                                    <Dropdown>
                                                                <Dropdown.Toggle style={{ backgroundColor: "#FFFFFF", border: "none" ,boxShadow:'none'}}>
                                                                    <FontAwesomeIcon size="lg" color="#888888" icon={faEllipsisV} />
                                                                    <div className='d-flex'><img src={threedots} style={{ width: '20px', height: '20px', marginTop: '10px' }} /></div>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item onClick={() => editProject(p.name, p.city, p.images)}>Edit</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => handleDelete(p.name)}>Delete</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                    

                                                </div>

                                                <div clsasName="locations" style={{ marginLeft: '10px', fontSize: '12px' }}>{elm.city}</div>
                                                <div className='d-flex' style={{ fontSize: '12px', marginTop: '5px', width: '36%', height: '9%', justifyContent: 'space-evenly',marginLeft:'6px' }}>
                                                    
                                                    <img src={file} style={{ width: '15px', height: '15px' }} />
                                                    <div style={{ fontSize: '12px' }}>{elm?.data[0]?.images?.length} Photos</div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </div> : ""} */}


                    </div>
                </>
            }
            {tab === 1 &&
                <>
                {comPost.length == 0 && <div className='mt-3 d-flex' style={{fontSize:'18px',justifyContent:'center',alignItems:'center',fontWeight:'500'}}>You haven't post anything yet!</div>}
                    {comPost.map((elm) => {
                        return (
                            <div style={{
                                display: 'flex', flexDirection: 'column', width: '93%', height: '10rem',
                                borderRadius: '4px', padding: '2px', border: '1px solid #d7d7d7', marginTop: '15px'
                                , marginLeft: '10px'
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
                                                fontSize: '10px',
                                                lineHeight: '17px', color: '#8F969E'
                                            }}>{elm.createdAt.slice(0, 10)}</div>
                                        </div>
                                    </div>
                                    <div className='d-flex' style={{ marginTop: '10px', position: 'relative', right: '10px', marginLeft: 'auto' }}>
                                        <div className='mt-2' style={{
                                            fontFamily: 'Manrope',

                                            fontWeight: '700',
                                            fontSize: '8.885px',
                                            lineHeight: '10px',

                                            color: '#8F969E'
                                        }}>{elm.tags.length === 0 ? " " : `#${elm.tags[0]}`}</div>
                                        {/* <img src={threeDots} style={{ width: '39%', height: '43%' }} /> */}
                                    </div>
                                </div>
                                <div style={{ fontSize: '10px', padding: '10px' }}>
                                    {elm.description}
                                </div>
                                <div className='d-flex justify-content-between' style={{ padding: '10px' }}>

                                    <div className='d-flex'>
                                        <img src={like} className="mx-1" />
                                        <div style={{ fontSize: '10px', color: "#888888" }}>{elm.likes.length}</div>
                                    </div>
                                    <div className='justify-content-between'>
                                        <div className='d-flex' >
                                            <div style={{ fontSize: '10px', color: "#888888" }}>{elm.comments.length}  Comments</div>
                                            <img src={dot} style={{ marginLeft: '10px', marginRight: '10px' }} />
                                            <div style={{ fontSize: '10px', color: "#888888" }}>13 Shares</div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='d-flex mx-2' style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ borderRadius: '50px', background: '#F6F6F6', width: '32%', height: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div className='d-flex' style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img className='mx-2' src={like} style={{ width: '15px', filter: 'brightness(0.5)' }} />
                                    <div style={{ marginTop: '3px',fontSize:'12px'}}>Like</div>
                                </div>

                            </div>
                            <div style={{ borderRadius: '50px', background: '#F6F6F6', width: '32%', height: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div className='d-flex'>
                                    <img className='mx-2' src={comment} style={{ width: '15px'}} />
                                    <div style={{fontSize:'12px'}}>Comment</div>
                                </div>

                            </div>
                            <div style={{ borderRadius: '50px', background: '#F6F6F6', width: '32%', height: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div className='d-flex'>
                                    <img className='mx-2' src={share} style={{ width: '15px'}}/>
                                    <div  style={{fontSize:'12px'}}> Share</div>
                                </div>

                            </div>
                        </div> */}
                            </div>
                        )
                    })}

                </>
            }

        </div>
    );
}