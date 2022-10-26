import React from "react";
import { useState } from "react";
import img from "../../../Images/addImageIcon.png";
import editImage from "../../../Images/editIcon.png";
import saveImage from "../../../Images/bx_save.svg";
import AddProjectDetails from "../../../Components/AddProjectDetails";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router";
import { OnboardingContext } from "../../../Context/Context"
import { useRef } from "react";
import AddProjectPicsDesignerWeb from "../../../Components/OnboardingWebScreens/AddProjectPicsDesignerWeb";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addMoreProjectImages, addProjectImages, setProjectDetailsRedux } from "../../../Lms/Actions";
import { useEffect } from "react";
import HeaderNav from "../HeaderNav";
import SideBarWeb from "../SideBarWeb";
import LeftArrow from "../../../Assets/profile/LeftArrow.png"
import MobileSideBar from "./MobileSideBar";

export default function ProjectAddMob() {
  const dispatch = useDispatch();
  const addImageRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const projName = useSelector((state) => state.addToCartReducer.projectDetails);
  const [title, setTitle] = useState(projName?.name);
  const navigateTo = useNavigate();
  console.log(projName)
  function handlePics(e) {
    let obj = e.target.files;
    let filesArr = [];
    for (let i = 0; i < obj.length; i++) {
      filesArr.push({ file: obj[i], path: URL.createObjectURL(obj[i]) });
    }
    dispatch(addProjectImages(filesArr))
    navigateTo("/uploadimages");
  }

  function handleClick() {
   
    setIsEditMode((prev) => !prev);
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  const saveProjectTitle = () => {
    dispatch(setProjectDetailsRedux(title, projName?.city))
  }

  const clickToAddImages = () => {
    addImageRef.current.click();
  }

  // useEffect(() => {
  //   setTitle(projName?.name);
  // }, [projName.name])

  // useEffect(() => {
  //   if(!title){
  //     navigateTo("/addproject")
  //   }
  // }, [])

  return (
    <>
    
      <div>
      <div>
        <MobileSideBar/>
        </div>
        <div className="w-100">
          <div>
            <div className="" style={{ width: '100%', display: 'flex',marginTop:'10px',paddingBottom:'10px',borderBottom:'1px solid #D7D7D7'}}>
              <div className="d-flex">
                <div role="button" style={{marginLeft:'5px'}} onClick={() => navigateTo("/newprofilepage")}>
                  <img style={{ width: '15px', height: '15px', objectFit: 'contain',marginLeft:'10px' }} src={LeftArrow} />
                </div>
                <div style={{}}>
                  {!isEditMode && <div style={{ marginLeft: "10px", fontSize: "16px", fontWeight: "400" }}>{projName?.name}</div>}
                  {isEditMode && <input onChange={handleTitle} type="text" value={title} />}
                </div>
              </div>
              <div>
                <button onClick={handleClick} style={{border:'none', backgroundColor:'#ffffff',marginLeft:'10px'}}>
                  {isEditMode ? <img src={saveImage} onClick={saveProjectTitle} /> : <img src={editImage} alt="" />}
                </button>
              </div>
            </div>



            <div className="body d-flex justify-content-center" style={{ width: '90vw', height: '80vh' ,backgroundColor: '#ffffff',marginLeft:'20px' ,borderRadius: '10px'}} onClick={clickToAddImages}>
              <div className="" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin:"auto"
              }}>
                <button className="clicktoaddpics" style={{border:'none',backgroundColor:'white'}}>
                  <input className="d-none" onChange={handlePics} ref={addImageRef} type="file" multiple /> <img src={img} />
                </button>
                <div style={{ fontSize: "14px", fontWeight: "600", margin: "40px 0 4px 0" ,fontWeight:'400'}}>Please upload your project photos</div>
                <div style={{ fontSize: "14px", fontWeight: "400",color: '#888888' }}> Accepted format jpeg,png </div>
              </div>
            </div>
            <div></div>
            {/* {isEditMode && <AddProjectDetails />} */}
          </div>
        </div>
      </div>
    </>
  );
}
