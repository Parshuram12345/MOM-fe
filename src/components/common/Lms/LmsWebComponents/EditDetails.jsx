import React from 'react';
import HeaderNav from './HeaderNav';
import SideBarWeb from './SideBarWeb';
import Left from "../Images/leftarrow.png";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import close from "../../Assets/profile/close.png";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteImagesFromProject, fetchUserProjects } from '../Actions';

export default function EditDetails(props) {
    const authTok = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "";
    const { id } = useParams();
    const projectData = useSelector((state) => state.addToCartReducer.projectList);
    const tok = `Bearer${localStorage.getItem("token")}`
    const [project, setProject] = useState();
    const dispatch = useDispatch();


    useEffect(() => {
        setProject(
            projectData[0]?.data?.data?.data.filter((curElem) => {
                return curElem._id === id;
            })
        )

    }, [projectData])


    const DeleteProject = async (imageID) => {
        await axios.post("https://pro-api.idesign.market/user/deleteProjectImage", {
            imageId: imageID,
            projectId: localStorage.getItem('projectID')
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authTok
                }
            }
        ).then((res) => {
            console.warn(res)
            dispatch(fetchUserProjects(authTok))
        })
            .catch((err) => console.warn('error'))

    }
    const navigate = useNavigate();
    const goTo = () => {
        navigate('/myprofile')
    }
    return (
        <>
            <HeaderNav />
            <div className='d-flex '>
                <div>
                    <SideBarWeb />
                </div>
                <div className="EditDetails_container" style={{ width: '100%', marginTop: '20px', marginLeft: '20px' }}>
                    <div className='EditDetails_content d-flex justify-content-between'>
                        <div className='d-flex' style={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)', backgroundColor: '#ffffff', borderRadius: '10px', width: '75vw', padding: '5px' }}>
                            <img role="button" onClick={goTo} style={{ width: '10px', height: "10px", objectFit: 'contain', marginTop: '7px' }} src={Left} />
                            <div className='main_heading' style={{ marginLeft: '20px' }}>{localStorage.getItem('name')}</div>


                            <Link className="editdetails" to="/myprofile"
                                style={{
                                    fontFamily: 'Manrope', marginTop: '3px',
                                    color: '#0099FF',
                                    fontWeight: '400',marginLeft:'auto',
                                    fontHize: '18px',
                                    lineHeight: '25px', marginRight: '20px'
                                }}>Save

                            </Link>
                        </div>
                    </div>
                    <div style={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)', backgroundColor: '#ffffff', borderRadius: '10px', width: '75vw', height: '70vh',overflow:'scroll'}}>
                        <div className=" basic_div" style={{ marginLeft: '10px', marginTop: '10px',paddingTop:'10px'}}>
                            <label for="exampleInputEmail1" className="form-label">
                                Project Name <span>* </span>
                            </label>
                            <input type="text" style={{ width: '30vw' }} name="" value={localStorage.getItem('name')} className="form-control" id="Profession" placeholder="" />
                        </div>
                        <div className="mb-3 basic_div" style={{ marginLeft: '10px', marginTop: '10px' }}>
                            <label for="exampleInputEmail1" className="form-label">
                                City <span>* </span>
                            </label>
                            <input type="text" style={{ width: '30vw' }} name="" value={localStorage.getItem('City')} className="form-control" id="Profession" placeholder="" />
                        </div>
                        <div className="basic_div" style={{ marginLeft: '10px', marginTop: '10px' }}>
                            <label for="exampleInputEmail1" className="form-label">
                                Uploaded Images
                            </label>
                            <div className='d-flex' style={{ marginLeft: '15px', flexWrap: 'wrap',overflow:'scroll' }}>
                                {project && project[0]?.data[0]?.images.map((data, index) => (
                                    <div className='d-flex flex-column' style={{ flexWrap: 'wrap' }}>
                                        <img role="button" style={{
                                            width: '20px', height: "20px", marginTop: '7px', marginLeft: 'auto', position: 'relative',
                                            top: '2rem',
                                            left: '-0.8rem',
                                            backgroundColor: "#ffffff", borderRadius: '100px', padding: '5px'
                                        }} src={close} onClick={() => DeleteProject(data?._id)} />

                                        <img alt="summaryImage1" style={{ width: '190px', height: '127px', margin: '5px', borderRadius: '5px' }} className="" src={data?.original} />

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}