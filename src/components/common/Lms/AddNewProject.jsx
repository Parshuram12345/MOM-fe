import React, { useContext, useState } from "react";
import image from "../Images/addProjectHome.svg";
import f1 from "../Images/f1.png";
import f2 from "../Images/f2.png";
import f3 from "../Images/f3.png";
import "../App.css";
import AddProjectDetails from "../Components/AddProjectDetails";
import { Link, useNavigate } from "react-router-dom";
import left from "./Images/leftarrow.png";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { OnboardingContext } from "../Context/Context";

export default function AddNewProject() {
  const [addProject, setAddProject] = useState(false);

  const [projectDetails, setProjectDetails] = useState({ name: "", city: "" });
  const context = useContext(OnboardingContext);
  const navigateTo = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ name: "", city: "" });

  const handleChange = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };

  function handleNext(data) {
    let details = [];
    if (context.data.projects) {
      // details = [...context.data.projects,{details:projectDetails}]
      details = [...context.data.projects, { details: data }];
      context.setData((pre) => ({ ...pre, projects: details }));
    } else {
      // context.setData((pre)=>({...pre,projects:[{details:projectDetails}]}))
      context.setData((pre) => ({ ...pre, projects: [{ details: data }] }));
    }

    navigateTo("/addprojectpics");
  }

  return (
    <React.Fragment>
      <Modal className="addProjectModal" centered show={addProject} onHide={() => setAddProject(false)}>
        <Modal.Header className="addProjectModal-title" closeButton>
          <Modal.Title><div style={{fontSize: "18px", fontWeight: "400"}}>Add Project Details</div></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleNext)}>
            <div style={{ marginBottom: "16px" }}>
              <div style={{fontSize: "12px", fontWeight: "400"}}>Project Name</div>
              <div>
                <Form.Control
                style={{fontSize: "12px", fontWeight: "400"}}
                  {...register("name", {
                    required: true,
                  })}
                  name="name"
                  type="text"
                  placeholder="Enter Project Name"
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div style={{fontSize: "12px", fontWeight: "400"}}>City</div>
              <div>
                <Form.Control
                style={{fontSize: "12px", fontWeight: "400"}}
                  {...register("city", {
                    required: true,
                  })}
                  name="city"
                  type="text"
                  placeholder="Enter City"
                />
              </div>
            </div>

            <div className="w-100">
              <button type="submit" style={{ width: "100%", border: "none", backgroundColor: "#176091", color: "white", borderRadius: "0.3rem", padding: "0.5rem" }}>Next</button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="d-flex justify-content-center align-items-center addProject-container">
        <div className="main-addProject">
          <div className="w-100 addNewProject-heading" style={{ padding: "1rem" }}>
            <Link style={{ textDecoration: "none", color: "black" }} className="d-flex w-100 justify-content-start" to="/projectpage">
              <span className="d-flex align-items-center">
                <div className="me-3 d-flex align-items-center">
                  <img style={{ width: "5px", height: "10px" }} src={left} />
                </div>
                <div className="page-Heading">Projects</div>
              </span>
            </Link>
          </div>

          <div className="d-flex flex-column justify-content-between align-items-center" style={{ height: "100%", width: "100%", paddingLeft: "1rem", paddingRight: "1rem" }}>
            <div className="d-flex flex-column align-items-center" style={{ paddingTop: "48px" }}>
              <img src={image} />
              <h2>
                Add Projects & Unlock <br />
                Free Access To Client <br /> Queries
              </h2>
              <div className="features" style={{ marginTop: "80px" }}>
                <div className="feature">
                  <div className="imgContainer" style={{ backgroundColor: "lightGreen" }}>
                    <img src={f1} style={{ width: "22px", height: "19px" }} />
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: "600" }}>
                    Get <b style={{ fontSize: "14px", fontWeight: "700" }}> 3X </b>more <br /> Clients
                  </p>
                </div>
                <div className="feature">
                  <div className="imgContainer" style={{ backgroundColor: "lightPink" }}>
                    <img src={f2} />
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: "600" }}>
                    Portray your <br />
                    <b style={{ fontSize: "14px", fontWeight: "700" }}>Experience</b>
                  </p>
                </div>
                <div className="feature">
                  <div className="imgContainer" style={{ backgroundColor: "lightBlue" }}>
                    <img src={f3} />
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: "600" }}>
                    Build{" "}
                    <b style={{ fontSize: "14px", fontWeight: "700" }}>
                      {" "}
                      trust <br />
                      with Clients.
                    </b>
                  </p>
                </div>
              </div>
            </div>
            {/* <button onClick={()=>{setAddProject(true)}} className="addProjectbtn">Add Project</button> */}
            <div className="btn-container w-100" style={{ paddingBottom: "24px" }}>
              <Link className="w-100" to="">
                {" "}
                <button
                  onClick={() => {
                    setAddProject(true);
                  }}
                  className="nextbutton1 w-100"
                >
                  Add Project
                </button>
              </Link>
            </div>
            {/* {addProject && <AddProjectDetails setAddProject={setAddProject} />} */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
