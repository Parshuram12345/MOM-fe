import React, { useEffect } from "react";
import image from "../../../Images/ProjectSummaryImage1.png";
import editImagebtn from "../../../Images/projectEditButton.png";
import Resizer from "react-image-file-resizer";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { store } from "../../../Redux/store";
import { BASE_URL } from "../../../Config";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { OnboardingContext } from "../../../Context/Context";
// import { useNavigate } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import { getToken } from "../../../Lms/getToken";
// import { useSelector } from "react-redux";
import left from "../../../Lms/Images/leftarrow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ProjectSummaryWeb from "../../../Components/OnboardingWebScreens/AddProjectPicsDesignerWeb";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cleanTempProjectList, deleteProjectFromTempArr, editProjectImages, fetchUserProjects, setProjectDetailsRedux } from "../../../Lms/Actions";
import { set, useForm } from "react-hook-form";
import { Form, Modal } from "react-bootstrap";
import MobileSideBar from "./MobileSideBar";

export default function ProjectSummMob() {
    const dispatch = useDispatch();
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [currentId, setCurrentId] = useState();
    const [projectArray, setProjectArray] = useState([]);
    const [addNewProjectModal, setAddNewProjectModal] = useState(false);
    const tempProjectList = useSelector((state) => state.addToCartReducer.tempProjectList);
    const [editMode, setEditMode] = useState(false);
    const navigateTo = useNavigate();
    const authTok = localStorage.getItem("token") ? getToken() : "";
    const userId = localStorage.getItem("userId");

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
        setEditMode(!editMode);
        setCurrentId(e.target.id);
    }

    function handleSubmission() {
        setDisabledBtn(true);

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
                                    console.log("feature image uploaded successfully");
                                })
                                .catch((err) => {
                                    console.log("error from feature");
                                });
                            toast.success("Projects uploaded successfully");
                            dispatch(cleanTempProjectList());
                            if (startPosition === "profilepage") {
                                navigateTo("/newprofilepage");
                            } else {
                                navigateTo("/newprofilepage")
                            }
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    function handleNext(data) {
        dispatch(setProjectDetailsRedux(data.name, data.city));
        navigateTo("/projectadd");
    }

    const editProject = (name, city, images) => {
        dispatch(editProjectImages(name, city, images));
        navigateTo("/uploadimages")
    }

    function handleDelete(name) {
        dispatch(deleteProjectFromTempArr(name))
    }
    useEffect(() => {
        setProjectArray(tempProjectList)
    }, [tempProjectList])

    const goBack = () => {
        navigateTo("/uploadimages")
    }

    // useEffect(() => {
    //   if (tempProjectList.length === 0) {
    //     navigateTo("/addproject")
    //   }
    // }, [])

    return (
        <>
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
            {window.screen.width > "768" ?
                <ProjectSummaryWeb />
                :
                <div className="projectSummary-container">

                    <ToastContainer />
                    <div className="main-projectSummary" style={{overflowY:'hidden'}}>
                        <div style={{ width: '100%' }}>
                            <MobileSideBar />
                        </div>
                        <div onClick={goBack} style={{ fontSize: "16px", fontWeight: "400", width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "14px", borderBottom: '1px solid ##DFDFDF' }}><img style={{ height: "10px", width: "5px", marginRight: "16px",borderBottom:'1px solid #D7D7D7' }} src={left} />Project</div>
                        <div className="w-100 p-2" style={{ overflow: "scroll", height: "81vh" }}>
                            {projectArray.map((p, i) => {
                                return (
                                    <div className="projects" style={{margin:'15px'}}>
                                        <div className="projectSummaryImageContainer">
                                            <img className="projectSummaryImage" style={{ width: "100%", height: "120px",borderRadius:'5px 5px 0 0' }} src={p?.images[0]?.path} alt="" />
                                        </div>
                                        <div className="projectdesc"style={{marginTop:'0px',marginLeft:'10px',marginRight:'10px',padding:'0px',paddingBottom:'3px'}}>
                                            <div className="nameAndcity">
                                                <div style={{ marginTop: "5px", fontSize: "12px", fontWeight: "400" }}>{p?.name}</div>
                                                <div style={{ fontSize: "10px", fontWeight: "400", color: "#888888" }}>{p?.city}</div>
                                            </div>
                                            <div className="editbtn d-flex align-items-center">
                                                <button id={i} onClick={handleEdit} style={{ border: "none", backgroundColor: "white" }}>
                                                    <div id={i}><FontAwesomeIcon color="#A7A7A7" icon={faEllipsisV} /></div>
                                                </button>
                                            </div>
                                        </div>
                                        {currentId == i && !editMode && (
                                            <div className="editMenu">
                                                <button style={{ marginLeft: "18px" }} onClick={() => editProject(p.name, p.city, p.images)}>Edit</button>
                                                <button key={i} id={i} onClick={() => handleDelete(p.name)}>
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="d-flex p-1" style={{ position: "fixed", bottom: "0" }}>
                            <button className="addNewProjectbtn b" style={{ fontSize: "14px", fontWeight: "400", margin: "0 12px 0 0",height:'37px' }} onClick={() => { setAddNewProjectModal(true) }}>Add New Project</button>
                            <button style={{ fontSize: "14px", fontWeight: "400", margin: "0 0 0 12px",height:'37px' }} onClick={handleSubmission} disabled={disabledBtn} className="submitbtn b">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
