import { BiDotsVerticalRounded  } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../../Images/bannerBackground.png";
import React, { useEffect } from "react";
import { Dropdown, OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../getToken";
import { deleteProjectFromProfile, fetchUserProjects } from "../../Actions";
import { Link, useNavigate } from "react-router-dom";
import file from "../../Images/file.svg";


const WebProjectCard = (props) => {
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
    navigate(`/summaryimages/${props.projectInfo._id}`)
  }
  return (
    <React.Fragment>
      <div className="mt-2" style={{}}>
        <div className="projectCard" style={{ height: "9rem", width: "13.5rem", backgroundColor: '#ffffff', marginTop: '1rem',marginLeft:'0rem' }}>
          <div className="projectCard-image" style={{ height: '75%', borderRadius: '5px 5px 0 0' }} onClick={goTo}>
            <img style={{ objectFit: 'cover',height:'100%' }} src={props?.projectInfo?.featured ? props?.projectInfo?.featured?.thumbnail : image} />
          </div>
          <div className="d-flex justify-content-between align-items-center p-2" style={{ backgroundColor: 'white', height: '4rem',border:'1px solid #DFDFDF' ,borderRadius:'4px'}}>
            <div style={{ marginTop: '-13px' }}>
              <div className="" style={{ fontSize: '13px',fontWeight:'500' }}>{props.projectInfo.name}</div>
              <div className="" style={{ fontSize: '10px' }}>{props.projectInfo.city}</div>

            </div>

            <Dropdown style={{ marginTop: '-12px' }}>
              <Dropdown.Toggle style={{ backgroundColor: "#FFFFFF", border: "none", background: 'none', boxShadow: 'none',position:'relative',top:'-3px',right:'-15px' }}>
              <BiDotsVerticalRounded size={20} color={'grey'}/>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={deleteProject}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WebProjectCard;
