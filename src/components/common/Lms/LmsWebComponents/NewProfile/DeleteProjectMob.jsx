import React from 'react';
import HeaderNav from '../HeaderNav';
import SideBarWeb from '../SideBarWeb';
import Left from "../../Images/leftarrow.png";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import close from "../../../Assets/profile/close.png";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteImagesFromProject, fetchUserProjects } from '../../Actions';
import MobileSideBar from './MobileSideBar';

export default function DeleteProjectMob(props) {
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
        navigate('/newprofilepage')
    }
    return (
        <>
            
            <div style={{overflow:'hidden'}}>
                <MobileSideBar/>
                <div className="EditDetails_container" style={{ width: '100%', marginTop: '20px', marginLeft: '10px' }}>
                    <div className='EditDetails_content d-flex justify-content-between'>
                        <div className='d-flex' style={{ backgroundColor: '#ffffff',borderBottom:'1px solid #D7D7D7', width: '100%', padding: '5px' }}>
                            <img role="button" onClick={goTo} style={{ width: '10px', height: "10px", objectFit: 'contain', marginTop: '7px' }} src={Left} />
                            <div className='main_heading' style={{ marginLeft: '10px',fontSize:'14px',marginTop:'2px' }}>{localStorage.getItem('name')}</div>


                            <Link className="editdetails" to="/newprofilepage"
                                style={{
                                    fontFamily: 'Manrope', marginTop: '3px',
                                    color:'rgb(59, 89, 152)',
                                    fontWeight: '400',marginLeft:'auto',
                                    fontSize: '14px',
                                    lineHeight: '25px', marginRight: '20px'
                                }}>Save

                            </Link>
                        </div>
                    </div>
                    <div style={{  backgroundColor: '#ffffff', borderRadius: '10px', width: '100%', height: '70vh'}}>
                        <div className=" basic_div" style={{marginTop: '10px',marginLeft:'10px'}}>
                            <label for="exampleInputEmail1" className="form-label">
                                Project Name <span>* </span>
                            </label>
                            <input type="text" style={{ width: '91%' }} name="" value={localStorage.getItem('name')} className="form-control" id="Profession" placeholder="" />
                        </div>
                        <div className="mb-3 basic_div" style={{ marginLeft: '10px', marginTop: '10px' }}>
                            <label for="exampleInputEmail1" className="form-label">
                                City <span>* </span>
                            </label>
                            <input type="text" style={{ width: '91%' }} name="" value={localStorage.getItem('City')} className="form-control" id="Profession" placeholder="" />
                        </div>
                        <div className="basic_div" style={{marginLeft:'10px',color:'#888888' }}>
                           
                                Uploaded Images
                            
                            <div className='d-flex' style={{ flexWrap: 'wrap',overflow:'scroll' }}>
                                {project && project[0]?.data[0]?.images.map((data, index) => (
                                    <div className='d-flex flex-column' style={{ flexWrap: 'wrap',marginTop:'-1rem' }}>
                                        <img role="button" style={{
                                            width: '20px', height: "20px", marginTop: '7px', marginLeft: 'auto', position: 'relative',
                                            top: '2rem',
                                            left: '-0.8rem',
                                            backgroundColor: "#ffffff", borderRadius: '100px', padding: '5px'
                                        }} src={close} onClick={() => DeleteProject(data?._id)} />

                                        <img alt="summaryImage1" style={{ width: '6.5rem', height: '6rem', margin: '5px', borderRadius: '5px' }} className="" src={data?.original} />

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