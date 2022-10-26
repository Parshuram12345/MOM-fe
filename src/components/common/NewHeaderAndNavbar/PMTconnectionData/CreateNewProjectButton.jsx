import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import styles from "./createNewProjectButton.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import CreateNewProjectExisting from "./CreateNewProjectExisting";
import CreateNewProjectNew from "./CreateNewProjectNew";

const CreateNewProjectButton = (props) => {
    const [showExisting, setShowExisting] = useState(false);
    const hideExistingModal = () => {
        setShowExisting(false);
    };
    const showExistingModal = () => {
        setShowExisting(true);
    };

    const [showNew, setShowNew] = useState(false);
    const hideNewModal = () => {
        setShowNew(false);
    };

    const showNewModal = () => {
        setShowNew(true);
    };

    return (
        <React.Fragment>
            <CreateNewProjectExisting modalShow={showExisting} modalHide={hideExistingModal} modalShowFunction={showExistingModal} />
            <CreateNewProjectNew modalShow={showNew} modalHide={hideNewModal} modalShowFunction={showNewModal} />
            <Dropdown drop="down" style={{ backgroundColor: "#ffffff", border: "none", outline: "none" }}>
                <Dropdown.Toggle as="button" style={{ backgroundColor: "#ffffff", border: "none", color: "#000000", padding: "0",width: "100%" }}>
                    <div className={styles.createNewButton}>
                        <button><AiOutlinePlus style={{ marginRight: "0.5rem" }} />Create New</button>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setShowNew(true)}>Add New</Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowExisting(true)}>Use Existing Lead</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
};

export default CreateNewProjectButton;