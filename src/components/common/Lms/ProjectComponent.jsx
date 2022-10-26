import React from "react";
import ProjectCard from "./ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import left from "./Images/leftarrow.png";
import noProject from "../Images/addProjectHome.svg";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchUserProjects, setProjectDetailsRedux } from "./Actions";
import { useEffect } from "react";
import WebProjectSummary from "./LmsWebComponents/WebProjectSummary";

const ProjectComponent = () => {
  const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
  const [addProject, setAddProject] = useState(false);
  const projectData = useSelector((state) => state.addToCartReducer.projectList);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  
  const {    
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ name: "", city: "" });

  function handleNext(data) {
    dispatch(setProjectDetailsRedux(data.name, data.city));
    navigateTo("/addprojectpics");
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

  useEffect(() => {
    dispatch(fetchUserProjects(authTok));

  }, [])

  return (

    <React.Fragment>
      <div className="d-none d-md-block"><WebProjectSummary /></div>
      <div className="d-block d-md-none">
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
                <button type="submit" style={{ width: "100%", border: "none", backgroundColor: "#176091", color: "#FFFFFF", padding: "8px 16px", borderRadius: "8px" }} onClick={setStartPosition}>Next</button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        <div className="project-container">
          <div className="projectContent">
            <div style={{ height: "100vh" }}>
              <div className="d-flex m-3 fs-4 d-flex justify-content-between">
                <div role="button" className="d-flex" onClick={() => navigateTo("/myprofile")}>
                  <span className="d-flex align-items-center">
                    <div className="me-3 d-flex align-items-center">
                      <img style={{ width: "5px", height: "10px" }} src={left} />
                    </div>
                    <div className="page-Heading">My Projects</div>
                  </span>
                </div>
                <div role="button" className="page-save-edit" style={{ color: "#0099FF" }} onClick={() => { setAddProject(true) }}>
                  Add My Projects
                </div>
              </div>
              {projectCount > 0 ? (
                <div className="d-flex flex-column align-items-center" style={{ overflow: "scroll", height: "91vh" }}>
                  {projectData[0]?.data?.data?.data.map((curElem) => {
                    return <ProjectCard projectInfo={curElem.isDeleted ? "" : curElem} />;
                  })}
                </div>
              ) : (
                <div className="emptyProject-container">
                  <div role="button" className="emptyProjectContent" style={{ marginBottom: "5rem" }} onClick={() => setAddProject(true)}>
                    <div className="d-flex justify-content-center" style={{ paddingBottom: "16px" }}>
                      <img style={{ height: "160px", width: "160px" }} src={noProject} />
                    </div>
                    <div style={{ color: "grey", fontSize: "20px" }}>Please add projects</div>
                  </div>
                </div>
              )}
              
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectComponent;
