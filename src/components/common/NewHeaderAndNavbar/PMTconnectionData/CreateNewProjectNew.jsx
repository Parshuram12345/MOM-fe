import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./createNewProjectButton.module.css";
import { BsCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


const CreateNewProjectNew = (props) => {
    const navigateTo = useNavigate();
    const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
    const [checkbox, setCheckbox] = useState(true);
    const checkboxAction = () => {
        setCheckbox((prev) => !prev);
    };
    const [continueForward, setContinueForward] = useState(false);

    const [details, setDetails] = useState({
        projName: "",
        cliName: "",
        location: "",
        email: "",
    });

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setDetails((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const goToPage = (place) => {
        navigateTo(`/${place}`);
    };

    const createProject = async () => {
        const res = await axios.post(`https://pmt.idesign.market/api/projects/addClient`, { name: details.cliName, email: details.email, location: details.location });
        if (res && !res.error) {
            const projRes = await axios.post(`https://pmt.idesign.market/api/projects/addEditProject`, {
                clientId: res.data._id,
                name: details.projName,
                location: details.location,
                userId: localStorage.getItem("userId"),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authTok
                }
            });
            if (projRes && !projRes.error) {
                const roomRes = await axios.post(`https://pmt.idesign.market/api/projects/addRoom`, { projectId: projRes.data._id, roomData: "General Discussion" }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authTok
                    }
                });
                if (roomRes && !roomRes.error) {
                    if (checkbox) {
                        const shareRes = await axios.post(`https://pmt.idesign.market/api/projects/shareProject`, { projectId: projRes.data._id }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': authTok
                            }
                        });
                        if (shareRes && !shareRes.error) {
                            goToPage("project-discussion");
                        } else {
                            console.log(shareRes.error);
                        }
                    } else {
                        goToPage("project-discussion");
                    }
                } else {
                    console.log(roomRes.error);
                }
            } else {
                console.log(projRes.error);
            }
        } else {
            console.log(res.error);
        }
    };

    useEffect(() => {
        if (checkbox) {
            if (!details.cliName || !details.location || !details.location || !details.projName || !details.email) {
                setContinueForward(false);
            } else {
                setContinueForward(true);
            }
        } else {
            if (!details.cliName || !details.location || !details.location || !details.projName) {
                setContinueForward(false);
            } else {
                setContinueForward(true);
            }
        }
    }, [details]);
    return (
        <React.Fragment>
            <Modal show={props.modalShow} onHide={props.modalHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.inputSection}>
                        <div>Project Name</div>
                        <input placeholder="Project Name" value={details.projName} onChange={inputHandler} name="projName" />
                    </div>
                    <div className={styles.inputSection}>
                        <div>Client Name</div>
                        <input placeholder="Client Name" value={details.cliName} onChange={inputHandler} name="cliName" />
                    </div>
                    <div className={styles.inputSection}>
                        <div>Location</div>
                        <input placeholder="Location" value={details.location} onChange={inputHandler} name="location" />
                    </div>

                    <div className={styles.customCheckboxContainer} style={{ userSelect: "none" }}>
                        <div className={checkbox ? styles.customCheckbox : styles.customCheckboxUnchecked} onClick={checkboxAction}>
                            {checkbox && <BsCheck />}
                        </div>
                        <div>Share project link with client</div>
                    </div>

                    {checkbox && (
                        <div className={styles.inputSection}>
                            <div>Email ID</div>
                            <input placeholder="Email ID" value={details.email} onChange={inputHandler} name="email" />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-start">
                    <button className={continueForward ? styles.modalContinueActive : styles.modalContinueInactive} onClick={createProject}>
                        Continue
                    </button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default CreateNewProjectNew;
