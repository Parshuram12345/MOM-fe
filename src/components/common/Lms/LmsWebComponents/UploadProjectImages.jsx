import React, { useRef } from "react";
import editImage from "../../Images/editIcon.png";
import { Link } from "react-router-dom";
import img from "../../Images/plusForProject.svg";
import bluetick from "../../Images/projectEditTick.svg";
import saveImage from "../../Images/bx_save.svg";
import { Row, Col } from "react-bootstrap";
import arrow from "../../Assets/profile/LeftArrow.png"
import { useState } from "react";
import { useContext } from "react";
import { OnboardingContext } from "../../Context/Context";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMoreProjectImages, addProjectToArray, deleteProjectImages, saveEditedProjectImages, setProjectDetailsRedux } from "../Actions";
import HeaderNav from "./HeaderNav";
import SideBarWeb from "./SideBarWeb";

export default function UploadProjectimages() {
  const dispatch = useDispatch();
  const addImagesRef = useRef(null);
  const [currentIds, setCurrentIds] = useState([]);
  const [files, setFiles] = useState();
  // const [tempProjArr, setTempProjArr] = useState();
  const context = useContext(OnboardingContext);
  const projName = useSelector((state) => state.addToCartReducer.projectDetails);
  const filesArr = useSelector((state) => state.addToCartReducer.projectImages);
  const tempProjArr = useSelector((state) => state.addToCartReducer.tempProjectList);
  console.log(filesArr)
  const [title, setTitle] = useState(projName.name);
  // const [title, setTitle] = useState()
  const [isEditMode, setIsEditMode] = useState(false);

  const navigateTo = useNavigate();

  function handleClick(element) {
    if (!currentIds.includes(element)) {
      setCurrentIds((prev) => {
        return [...prev, element]
      })
    } else {
      setCurrentIds(
        currentIds.filter((curElem) => {
          return curElem !== element;
        })
      )
    }
  }

  function handleDelete(e) {
    dispatch(deleteProjectImages(currentIds));
    setCurrentIds(currentIds.filter((curElem) => {
      return !currentIds.includes(curElem);
    }))
  }

  function handleSaveProject() {
    let temp = 0;
    tempProjArr?.forEach((curElem) => {
      if (curElem.name === projName.name) {
        temp++;
      }
    })
    if (temp > 0) {
      dispatch(saveEditedProjectImages(projName.name, filesArr));
      navigateTo("/uploadedprojectsummaryweb");
    }
    else if (filesArr.length > 0 && temp == 0) {
      const x = {
        name: projName?.name,
        city: projName?.city,
        images: filesArr
      }
      dispatch(addProjectToArray(x))
      navigateTo("/uploadedprojectsummaryweb");
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
    setTitle(projName?.name)
  }, [projName])

  useEffect(() => {
    setFiles(filesArr)
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
      <div> <HeaderNav /></div>
      <div className="d-flex justify-content-between">
        <div> <SideBarWeb />
        </div>

        <div>
          <div className="d-flex justify-content-center align-items-center" style={{ width: '78vw', backgroundColor: "white" }}>
            <div style={{ background: "white", borderRadius: "10px", width: '100%' }} className="">
              <div className="main-saveoredit-web" style={{ borderRadius: "10px", width: '76vw' }}>
                <div className="h-100">
                  <div className="" style={{border:'1px solid white', display: 'flex', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)', background: '#ffffff', marginTop: '5px', width: '100%',borderRadius:'10px',marginLeft:'10px' }}>
                    {/* {!isEditMode && <p className='fs-5' style={{ border: "none", marginTop: "3%" }}>{title}</p>} */}
                    <div style={{marginTop:'6px'}} onClick={() => navigateTo("/webaddprojectpics")}>
                      <img style={{ width: '15px', height: '15px', objectFit: 'contain', marginLeft: '10px' }} src={arrow} />
                    </div>
                    <div>
                      <p className='' style={{ border: "none", marginTop: "6px", marginLeft: '5px',fontSize:'16px' }}>{title}</p>
                    </div>
                  </div>
                  {/* {isEditMode && <input style={{ marginTop: "0.5rem", fontSize: "20px", border: "1px solid black", borderRadius: "4px", width: "12rem" }} className="editField" onChange={handleTitle} type="text" value={title} />}
                <div onClick={handleEdit} style={{ backgroundColor: "white", marginTop: "0.3rem", marginLeft: "0.5rem" }}>
                  <img style={{height: "16px"}} src={isEditMode ? saveImage : editImage} alt="" />
                </div> */}

                  <div className="d-flex flex-column" style={{ height: "76vh", marginLeft: "0.4rem", marginRight: "0.3rem",marginTop:'10px', background: '#ffffff', width: '100%',borderRadius:'10px' }}>
                    <div className="body me-2" style={{ background: "#ffffff",marginLeft:'10px',borderRadius:'10px',height:'72vh' }}>
                      <div role="button" onClick={() => { addImagesRef.current.click() }} style={{ marginTop: "1rem", height: "120px", display: "flex", justifyContent: "center", borderRadius: '5px' }} className="addmoreImage-web">
                        <div style={{ backgroundColor: "#F2F2F2", width:'8vw',height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "1rem" }}>
                          <input className="d-none" ref={addImagesRef} onChange={handlePics} type="file" multiple />
                          <img   src={img} alt="" />
                        </div>
                      </div>

                      {files?.map((obj, i) => {
                        return (
                          <div style={{ borderRadius: "10px",height: "14vh" }} onClick={() => handleClick(obj.path)} key={obj.path} id={obj.path} className="addmoreImages-web mb-5" >
                            <div style={{ overflow: "hidden", padding: "0.5rem 0.5rem 0 0.5rem", width: "100%" }}>
                              {currentIds.includes(obj.path) && (
                                <img
                                  id={obj.path}
                                  className="bluetick"
                                  src={bluetick}
                                  style={{
                                    position: "absolute",
                                    top: "12px",
                                    // right: "7px"
                                  }}
                                />
                              )}
                              <img style={{width:'143px' , height:'120px',marginTop:'8px', borderRadius:'10px'}} 
                              // className="uploadedImage"
                               id={obj.path} src={obj.path} alt="" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="btn-container-web1 my-3 d-flex justify-content-end" style={{ paddingRight: "0.6rem" }}>
                      {currentIds.length == 0 && (
                        <button onClick={handleSaveProject} className="nextbutton-web">
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
        </div>
      </div>
    </>
  )
}
