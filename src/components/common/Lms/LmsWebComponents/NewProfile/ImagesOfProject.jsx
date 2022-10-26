import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '../HeaderNav';
import SideBarWeb from '../SideBarWeb';
import Left from '../../Images/leftarrow.png';
import summaryImage1 from '../../../Assets/profile/ProjectImage1.png';
import summaryImage2 from '../../../Assets/profile/ProjectImage2.png';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchUserProjects, setProjectDetailsRedux } from "../../Actions";
import { useEffect } from "react";
import ProjectCardWeb from '../ProjectCardWeb';
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import project_upload from '../../../Assets/profile/project_upload.png';
import WebProjectCard from './WebProjectCard';


export default function ImagesOfProject() {
    const navigateTo = useNavigate();
    const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
    const dispatch = useDispatch();
    const [addProject, setAddProject] = useState(false);
    const projectData = useSelector((state) => state.addToCartReducer.projectList);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ name: "", city: "" });

    function handleNext(data) {
        dispatch(setProjectDetailsRedux(data.name, data.city));
        navigateTo("/projectadd");
    }

    if (projectData.length > 0) {
        var projectCount = projectData[0]?.data?.data?.count;
        var projectArray = projectData[0]?.data?.data?.data;
    } else {
        var projectCount = 0;
        var projectArray = [];
    }
    const setStartPosition = () => {
        localStorage.setItem("from", "profilepage")
    }

    const data = [
        { tag: summaryImage1 },
        { tag: summaryImage2 },
        { tag: summaryImage2 },
        { tag: summaryImage2 },

    ];
    
    const goTo = () => {
        navigateTo("/myprofile");
    }
    useEffect(() => {
        dispatch(fetchUserProjects(authTok));
    }, [])

    return (
        <>
            <HeaderNav />

            <div className='d-flex'>
                <div>
                    <SideBarWeb />
                </div>
                <div className='webProjectSummary_content_container' style={{ width: '100%' }}>
                    <section className="webProjectSummary_content" style={{ width: '100%', backgroundColor: '#ffffff' }}>
                        <div className=" d-flex justify-content-between mt-2" style={{ backgroundColor: "#ffffff", borderRadius: '10px',width:'77vw',marginTop:'5px',marginLeft:'10px' }}>
                            <div className=" align-items-center" to="/myprofile" style={{ textDecoration: "none", color: "black", marginLeft: '20px'}}>
                                <span className=" d-flex align-items-center">
                                    <Link className="me-3 mt-2 align-items-center" to="/myprofile">
                                        <img style={{ width: "5px", height: "10px" }} src={Left} />
                                        
                                    </Link>
                                    <div style={{marginTop:'7px'}} role="button"onClick={goTo} className="page-Heading">Project Summary</div>
                                </span>
                            </div>
                            <div className=" d-flex align-items-center" role="button">
                                <button onClick={() => { setAddProject(true) }}
                                    className='btn' style={{
                                        fontFamily: 'Public Sans',
                                        color: '#3B5998',
                                        fontWeight: '400',
                                        fontSize: '16px', marginRight: '30px',
                                        lineHeight: '18px', marginBottom: '10px',
                                        border: '1px solid #3B5998'
                                    }}>Add New Project</button>
                            </div>
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
                        <div style={{ background: 'white', height: '77vh',overflow:'scroll' }}>
                            <div className='d-flex'>
                                {projectData[0]?.data?.data?.count > 0 ? (
                                    <div className="d-flex  align-items-center" style={{display:'flex', flexWrap:'wrap',background: '#ffffff',
                                    width: '77vw',borderRadius:'10px',
                                    marginLeft: '10px',
                                    marginTop: '5px'}}>
                                        {projectData[0]?.data?.data?.data.map((curElem) => {
                                        return <WebProjectCard projectInfo={curElem} />;
                                        })}
                                    </div>
                                ) : (
                                    <div className='d-flex' style={{
                                        width: "100%",
                                        justifyContent: "center",
                                        height: "77vh"
                                    }}>
                                        <div className="emptyProject-container d-flex justify-content-center">
                                            <div role="button" className="emptyProjectContent" style={{ marginBottom: "5rem" }} onClick={() => setAddProject(true)}>
                                                <div className="d-flex justify-content-center" style={{ paddingBottom: "16px", margin: 'auto' }}>
                                                    <img style={{ width: "160px" }} src={project_upload}

                                                    />
                                                </div>
                                                <div style={{ color: "grey", fontSize: "20px" }}>No Project Uploaded</div>
                                            </div>
                                        </div>
                                    </div>
                                )}


                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>

    )
}
