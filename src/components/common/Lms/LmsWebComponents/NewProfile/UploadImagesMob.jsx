import React, { useRef } from "react";
import editImage from "../../../Images/editIcon.png";
import { Link } from "react-router-dom";
import img from "../../../Images/plusForProject.svg";
import bluetick from "../../../Images/projectEditTick.svg";
import saveImage from "../../../Images/bx_save.svg";
import { Row, Col } from "react-bootstrap";

import { useState } from "react";
import { useContext } from "react";
import { OnboardingContext } from "../../../Context/Context";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMoreProjectImages, addProjectToArray, deleteProjectImages, saveEditedProjectImages, setProjectDetailsRedux } from "../../../Lms/Actions";
import MobileSideBar from "./MobileSideBar";
import LeftArrow from "../../../Assets/profile/LeftArrow.png"

export default function UploadImagesMob() {
    const dispatch = useDispatch();
    const addImagesRef = useRef(null);
    const [currentIds, setCurrentIds] = useState([]);
    const [files, setFiles] = useState();
    // const [tempProjArr, setTempProjArr] = useState();
    const context = useContext(OnboardingContext);
    const projPicsLoading = useSelector((state) => state.addToCartReducer.projPicsLoading);
    const projName = useSelector((state) => state.addToCartReducer.projectDetails);
    const filesArr = useSelector((state) => state.addToCartReducer.projectImages);
    const tempProjArr = useSelector((state) => state.addToCartReducer.tempProjectList);
    const [title, setTitle] = useState(projName.name);
    // const [title, setTitle] = useState()
    const [isEditMode, setIsEditMode] = useState(false);

    const navigateTo = useNavigate();

    function handleClick(element) {
        if (!currentIds.includes(element)) {
            setCurrentIds((prev) => {
                return [...prev, element];
            });
        } else {
            setCurrentIds(
                currentIds.filter((curElem) => {
                    return curElem !== element;
                })
            );
        }
    }

    function handleDelete(e) {
        dispatch(deleteProjectImages(currentIds));
        setCurrentIds(
            currentIds.filter((curElem) => {
                return !currentIds.includes(curElem);
            })
        );
    }

    function handleSaveProject() {
        let temp = 0;
        tempProjArr?.forEach((curElem) => {
            if (curElem.name === projName.name) {
                temp++;
            }
        });
        if (temp > 0) {
            dispatch(saveEditedProjectImages(projName.name, filesArr));
            navigateTo("/projectsumm");
        } else if (filesArr.length > 0 && temp == 0) {
            const x = {
                name: projName?.name,
                city: projName?.city,
                images: filesArr,
            };
            dispatch(addProjectToArray(x));
            navigateTo("/projectsumm");
        }
    }

    function handleTitle(e) {
        dispatch(setProjectDetailsRedux(e.target.value, projName.city));
    }

    function handleEdit() {
        setIsEditMode(!isEditMode);
    }

    function handlePics(e) {
        let obj = e.target.files;
        // let filesArr = [];
        for (let i = 0; i < obj.length; i++) {
            dispatch(addMoreProjectImages({ file: obj[i], path: URL.createObjectURL(obj[i]) }));
        }
        // dispatch(addMoreProjectImages(filesArr));
    }

    useEffect(() => {
        setTitle(projName?.name);
    }, [projName]);

    useEffect(() => {
        setFiles(filesArr);
    }, [filesArr]);

    // useEffect(() => {
    //   if (filesArr.length == 0) {
    //     navigateTo("/addproject")
    //   }
    // }, [filesArr])

    // useEffect(() => {
    //   setTempProjArr(tempProjArr);
    // }, [tempProj])

    return (
        <>
            <div style={{ overflowX: 'hidden' }}>
                <div>
                    <MobileSideBar />
                </div>
                <div style={{ background: "white", borderRadius: "10px", overflowX: 'hidden' }} className="main-div row">
                    <div className="main-saveoredit-web" style={{ borderRadius: "10px" }}>
                        <div className="h-100">
                            <div className="header d-flex" style={{ boxShadow: "none", justifyContent: "start", position: "unset", height: '54px', paddingTop: '20px' }}>
                                {/* {!isEditMode && <p className='fs-5' style={{ border: "none", marginTop: "3%" }}>{title}</p>} */}
                                <div role="button" style={{ marginLeft: '5px' }} onClick={() => navigateTo("/projectadd")}>
                                    <img style={{ width: '15px', height: '15px', objectFit: 'contain' }} src={LeftArrow} />
                                </div>
                                <div className="mx-1" style={{ border: "none", fontSize: '14px' }}>
                                    {title}
                                </div>

                                {/* {isEditMode && <input style={{ marginTop: "0.5rem", fontSize: "20px", border: "1px solid black", borderRadius: "4px", width: "12rem" }} className="editField" onChange={handleTitle} type="text" value={title} />}
                <div onClick={handleEdit} style={{ backgroundColor: "white", marginTop: "0.3rem", marginLeft: "0.5rem" }}>
                  <img style={{height: "16px"}} src={isEditMode ? saveImage : editImage} alt="" />
                </div> */}
                            </div>
                            <div className="d-flex flex-column" style={{ marginLeft: "0.3rem", marginRight: "0.3rem", height: '78vh' }}>
                                <div className="body me-2" style={{ height: '100%' }}>
                                    <div style={{ height: "fit-content", width: "100%", display: "flex", flexWrap: "wrap" }}>
                                        <Col
                                            md={3}
                                            lg={3}
                                            xl={2}
                                            role="button"
                                            onClick={() => {
                                                addImagesRef.current.click();
                                            }}
                                            style={{ marginTop: "0.6rem", height: "120px", display: "flex", justifyContent: "center" }}
                                            className="addmoreImage-web"
                                        >
                                            <div style={{ backgroundColor: "#F2F2F2", height: "6.5rem", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "0.5rem", width: "109px", borderRadius: '5px', marginRight: '0.5rem', marginTop: '-10px', border: '1px solid #D7D7D7' }}>
                                                <input className="d-none" ref={addImagesRef} onChange={handlePics} type="file" multiple />
                                                <img src={img} alt="" style={{ width: '2.4rem' }} />
                                            </div>
                                        </Col>

                                        {files?.map((obj, i) => {
                                            return (
                                                <Col md={3} lg={3} xl={2} style={{ borderRadius: "10px" }} onClick={() => handleClick(obj.path)} key={obj.path} id={obj.path} className="addmoreImages-web">
                                                    <div style={{ overflow: "hidden", padding: "0.5rem 0.5rem 0 0.5rem", width: "100%" }}>
                                                        {currentIds.includes(obj.path) && (
                                                            <img
                                                                id={obj.path}
                                                                className="bluetick"
                                                                src={bluetick}
                                                                style={{
                                                                    position: "absolute",
                                                                    top: "14px",
                                                                    right: "9px",
                                                                }}
                                                            />
                                                        )}
                                                        <img className="uploadedImage" style={{ width: '100px', height: '6.5rem', borderRadius: '5px', margin: '0px', marginTop: '4px' }} id={obj.path} src={obj.path} alt="" />
                                                    </div>
                                                </Col>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="btn-container-web1  d-flex justify-content-end" style={{}}>
                                    {currentIds.length == 0 && (
                                        <button onClick={handleSaveProject} className="nextbutton-web" style={{ margin: '15px', height: '2.3rem', width: '21rem' }}>
                                            Submit
                                        </button>
                                    )}
                                    {currentIds.length > 0 && (
                                        <button onClick={handleDelete} className="nextbutton-web">
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
