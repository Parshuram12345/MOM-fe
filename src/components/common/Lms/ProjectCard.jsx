import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "./Images/bannerBackground.png";
import React, { useEffect } from "react";
import { Dropdown, OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "./getToken";
import { deleteProjectFromProfile, fetchUserProjects } from "./Actions";


const ProjectCard = (props) => {
  const authTok = localStorage.getItem('token') ? getToken() : "";
  const dispatch = useDispatch();
  const projectInfo = useSelector((state) => state.addToCartReducer.projectList);
  // const projectImage = props?.projectInfo?.featured?.original ? props.projectInfo?.featured?.original : image;

  const deleteProject = () => {
    dispatch(deleteProjectFromProfile(authTok, props.projectInfo._id));
  }

  
  useEffect(()=>{
    dispatch(fetchUserProjects(authTok));
  },[])

  return (
    <React.Fragment>
      <div className="projectCard" style={{ height: "13rem", width: "22rem" }}>
        <div className="projectCard-image">
          <img src={props?.projectInfo?.featured ? props?.projectInfo?.featured?.thumbnail : image} />
        </div>
        <div className="d-flex justify-content-between align-items-center p-3">
          <div>
            <div className="fs-5">{props.projectInfo.name}</div>
            <div className="fs-6">{props.projectInfo.city}</div>
          </div>
          <Dropdown>
            <Dropdown.Toggle style={{backgroundColor: "#FFFFFF", border: "none"}}>
              <FontAwesomeIcon color="#888888" icon={faEllipsisV} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={deleteProject}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectCard;
