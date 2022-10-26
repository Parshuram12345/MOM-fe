import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import styles from "./createNewProjectButton.module.css";
import ModalClientCard from "./ModalClientCard";
import { BsCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";


const CreateNewProjectExisting = (props) => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const [checkbox, setCheckbox] = useState(true);
    const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
    const [addNameModal, setAddNameModal] = useState(false);
    const [filterText, setFilterText] = useState("");
    const [shareProjectDetails, setShareProjectDetails] = useState({
        projectName: "",
        email: "",
    });
    const selectedLeadForDiscussion = useSelector((state) => state.addToCartReducer.selectedLeadForDiscussion);
    // console.log(selectedLeadForDiscussion);

    const assignedLeads = useSelector((state) => state.addToCartReducer.allotedLeadsWeb);
    const [filteredLeadsArray, setFilteredLeadsArray] = useState(assignedLeads);

    console.log(assignedLeads)

    const handleShareProjectDetails = (event) => {
        const { name, value } = event.target;
        setShareProjectDetails((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const continueToAddName = () => {
        props.modalHide();
        setAddNameModal(true);
    };

    const goBackToPrevious = () => {
        setAddNameModal(false);
        props.modalShowFunction();
    };

    const checkboxAction = () => {
        setCheckbox((prev) => !prev);
    };

    const goToPage = (place) => {
        navigateTo(`/${place}`);
    };

    const handleFilterText = (event) => {
        setFilterText(event.target.value);
    };

    const addProject = async () => {
        const cliRes = await axios.post(`https://pmt.idesign.market/api/projects/addClient`, {
            homeOwner_id: selectedLeadForDiscussion.homeOwner_id && selectedLeadForDiscussion.homeOwner_id,
            email: shareProjectDetails.email,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authTok
            }
        });
        if (cliRes && !cliRes.error) {
            // console.log(cliRes);
            const res = await axios.post(`https://pmt.idesign.market/api/projects/addEditProject`, {
                name: shareProjectDetails.projectName,
                userId: localStorage.getItem("userId"),
                location: `${selectedLeadForDiscussion.address ? selectedLeadForDiscussion.address : ""}`,
                city: `${selectedLeadForDiscussion.city ? selectedLeadForDiscussion.city : ""}`,
                clientId: cliRes.data._id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authTok
                }
            });
            if (res && !res.error) {
                // console.log(res);
                const roomRes = await axios.post(`https://pmt.idesign.market/api/projects/addRoom`, { projectId: res.data._id, roomData: "General Discussion" });
                if (roomRes && !roomRes.error) {
                    // console.log(roomRes);
                    goToPage("project-discussion");
                } else {
                    console.log(roomRes.error);
                }
            } else {
                console.log(res.error);
            }
        }
    };

    const handleAddProject = () => {
        addProject();
    };

    useEffect(() => {
        setFilteredLeadsArray(
            assignedLeads?.filter((curElem) => {
                return curElem?.name?.includes(filterText);
            })
        );
    }, [filterText, assignedLeads]);
    
    // console.log(filteredLeadsArray)

    return (
        <React.Fragment>
            <Modal show={addNameModal} onHide={goBackToPrevious} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ userSelect: "none" }}>Add Project Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.inputSection} style={{ userSelect: "none" }}>
                        <div>Project Name</div>
                        <input placeholder="Project Name" onChange={handleShareProjectDetails} value={shareProjectDetails.projectName} name="projectName" />
                    </div>
                    <div className={styles.customCheckboxContainer} style={{ userSelect: "none" }}>
                        <div className={checkbox ? styles.customCheckbox : styles.customCheckboxUnchecked} onClick={checkboxAction}>
                            {checkbox && <BsCheck />}
                        </div>
                        <div>Share project link with client</div>
                    </div>
                    <div className={styles.inputSection} style={{ userSelect: "none" }}>
                        <div>Email ID</div>
                        <input placeholder="Email ID" onChange={handleShareProjectDetails} value={shareProjectDetails.email} name="email" />
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-start">
                    <button className={shareProjectDetails.projectName && shareProjectDetails.email ? styles.modalContinueActive : styles.modalContinueInactive} onClick={handleAddProject}>
                        Continue
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={props.modalShow} onHide={props.modalHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select any one client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.inputField}>
                        <input type="text" placeholder="Search Client" onChange={handleFilterText} value={filterText} />
                    </div>
                    <div className={styles.modalBodyScrollable}>
                        <div style={{ height: "18rem" }}>
                            <div>
                                {filteredLeadsArray &&
                                    filteredLeadsArray.map((curElem) => {
                                        return <ModalClientCard clientData={curElem} />;
                                    })}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ display: "flex", justifyContent: "flex-start" }}>
                    <button className={selectedLeadForDiscussion ? styles.modalContinueActive : styles.modalContinueInactive} onClick={continueToAddName}>
                        Continue
                    </button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default CreateNewProjectExisting;