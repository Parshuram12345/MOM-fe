import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../Images/bannerBackground.png";
import React, { useEffect } from "react";
import { Dropdown, OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../getToken";
import { deleteProjectFromProfile, fetchUserProjects } from "../Actions";
import { Link, useNavigate } from "react-router-dom";

const ProjectCard = (props) => {
  const authTok = localStorage.getItem('token') ? getToken() : "";
  const dispatch = useDispatch();
  const projectInfo = useSelector((state) => state.addToCartReducer.projectList);


  const deleteProject = () => {
    dispatch(deleteProjectFromProfile(authTok, props.projectInfo._id));
  }

  useEffect(() => {
    dispatch(fetchUserProjects(authTok));
  }, [])
  const navigate = useNavigate();
  const goTo = () => {
    localStorage.setItem('projectID', props.projectInfo._id)
    localStorage.setItem('name', props.projectInfo.name)
    localStorage.setItem('City', props.projectInfo.city)
    navigate(`/projectpage/${props.projectInfo._id}`)
  }
  return (
    <React.Fragment>
      <div className="projectCard" style={{ height: "9rem", width: "15rem", backgroundColor: '#ffffff', marginBottom: '70px', marginLeft: '30px' }}>
        <div className="projectCard-image" style={{ height: '75%', borderRadius: '5px 5px 0 0' }} onClick={goTo}>
          <img style={{ objectFit: 'contain' }} src={props?.projectInfo?.featured ? props?.projectInfo?.featured?.thumbnail : image} />
        </div>
        <div className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: 'white' }}>
          <div style={{ marginTop: '-13px' }}>
            <div className="" style={{ fontSize: '14px' }}>{props.projectInfo.name}</div>
            <div className="" style={{ fontSize: '12px' }}>{props.projectInfo.city}</div>
          </div>
          <Dropdown style={{ marginTop: '-12px' }}>
            <Dropdown.Toggle style={{ backgroundColor: "#FFFFFF", border: "none", background: 'none',boxShadow:'none' }}>
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
