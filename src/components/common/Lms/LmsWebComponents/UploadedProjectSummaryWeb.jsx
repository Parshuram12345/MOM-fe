import React from 'react'
import Resizer from "react-image-file-resizer";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { store } from "../../Redux/store";
import { BASE_URL } from "../../Config";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { OnboardingContext } from "../../Context/Context";
import { useNavigate } from "react-router";
import axios from "axios";
import { getToken } from "../../Lms/getToken";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cleanTempProjectList, deleteProjectFromTempArr, deletProjectFromTempArr, editProjectImages, fetchProfileData, setProjectDetailsRedux } from '../../Lms/Actions';
import { useEffect } from 'react';
import { Dropdown, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import HeaderNav from './HeaderNav';
import SideBarWeb from './SideBarWeb';
import arrow from "../../Assets//profile/LeftArrow.png"
import Spinner from 'react-bootstrap/Spinner';



export default function UploadedProjectSummaryWeb() {
    const dispatch = useDispatch();
    const [addNewProjectModal, setAddNewProjectModal] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [currentId, setCurrentId] = useState();
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [projectArray, setProjectArray] = useState([]);
    const tempProjectList = useSelector((state) => state.addToCartReducer.tempProjectList);
    const navigateTo = useNavigate();
    const context = useContext(OnboardingContext);
    const authTok = localStorage.getItem("token") ? getToken() : "";
    const userId = localStorage.getItem('userId');

    const [startPosition, setStartPosition] = useState();

    useEffect(() => {
        const startPosition = localStorage.getItem('from');
        setStartPosition(startPosition);
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ name: "", city: "" });

    function handleEdit(e) {
        navigateTo("/uploadprojectimages")
        setCurrentId(e.target.id);
    }

    const editProject = (name, city, images) => {
        dispatch(editProjectImages(name, city, images));
        navigateTo("/uploadprojectimages")
    }

    function handleSubmitPost() {
        setDisabledBtn(true);
        setIsLoading(true)
        const resizeFile = (file) =>
            new Promise((resolve) => {
                Resizer.imageFileResizer(
                    file,
                    1920,
                    1080,
                    "JPEG",
                    80,
                    0,
                    (uri) => {
                        resolve(uri);
                    },
                    "file"
                );
            });

        tempProjectList.map(async (data) => {
            await axios
                .post(
                    `${BASE_URL}/api/addProject`,
                    {
                        userId: userId,
                        name: data.name,
                        city: data.city,
                    },
                    {
                        headers: {
                            authorization: authTok,
                        },
                    }
                )
                .then(async (response) => {

                    const image = new FormData();
                    for (const files of data.images) {
                        var images = await resizeFile(files.file);
                        image.append("image", images);
                    }
                    const id = response.data.data._id;
                    await axios
                        .put(`${BASE_URL}/api/uploadImages?id=${id}`, image, {
                            headers: {
                                authorization: authTok,
                            },
                        })
                        .then((response) => {
                            toast.success("Project uploaded Successfully");
                            const featured = new FormData();
                            featured.append("featured", images);
                            axios
                                .put(`${BASE_URL}/api/uploadFeatured?id=${id}`, featured, {
                                    headers: {
                                        authorization: authTok,
                                    },
                                })
                                .then((res) => {
                                    setIsLoading(false)
                                    console.log("feature image uploaded successfully");
                                })
                                .catch((err) => {
                                    console.log("error from feature");
                                });
                            dispatch(cleanTempProjectList());
                                navigateTo("/projectpage");
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    function handleDelete(name) {
        dispatch(deleteProjectFromTempArr(name))
    }

    function handleNext(data) {
        dispatch(setProjectDetailsRedux(data.name, data.city));
        navigateTo("/webaddprojectpics");
    }

    useEffect(() => {
        setProjectArray(tempProjectList)
    }, [tempProjectList])

    // useEffect(() => {
    //   if (tempProjectList.length === 0) {
    //     navigateTo("/addproject")
    //   }
    // }, [])

    useEffect(() => {
        dispatch(fetchProfileData(authTok));
    }, [])

    return (
        <>
            <div><HeaderNav /></div>
            <div className='d-flex'>
                <div><SideBarWeb /></div>
                <div>
                    <Modal centered show={addNewProjectModal} onHide={() => { setAddNewProjectModal(false) }}>
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
                    <div className='d-flex' style={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)', background: '#ffffff', marginLeft: '10px', marginTop: '5px', borderRadius: '5px' }}>
                        <div role="button" style={{ marginTop: '10px', marginLeft: '10px' }} onClick={() => navigateTo('/uploadprojectimages')}>
                            <img style={{ width: '15px', height: '15px', objectFit: 'contain' }} src={arrow} />
                        </div>
                        <div  role= "button" className="d-flex" style={{ marginLeft: '10px', backgroundColor: '#ffffff', borderRadius: '5px', marginTop: '15px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}  onClick={() => navigateTo('/uploadprojectimages')}>
                            <h3 className='' style={{ backgroundColor: '#ffffff',fontSize:'16px' }}>Project Summary</h3>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center" style={{ borderRadius: "10px", width: '76vw', height: '80vh', marginLeft: '10px', backgroundColor: '#ffffff',marginTop:'5px' }}>
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
                                                            {/* <div id={i} onClick={handleEdit} style={{ border: "none", backgroundColor: "white" }}>
                            <div role="button" style={{ height: "2px" }} id={i}><FontAwesomeIcon size="sm" color="#888888" icon={faEllipsisV}/></div>
                          </div> */}
                                                            <Dropdown>
                                                                <Dropdown.Toggle style={{ backgroundColor: "#FFFFFF", border: "none" ,boxShadow:'none'}}>
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
                    </div>
                </div>
            </div>
        </>
    )
}
