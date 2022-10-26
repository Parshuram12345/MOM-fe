import React, { useState } from 'react';
import HeaderNav from '../HeaderNav';
import SideBarWeb from '../SideBarWeb';
import Left from "../../Images/leftarrow.png";
import summaryImage1 from '../../../Assets/profile/ProjectImage1.png';
import summaryImage2 from '../../../Assets/profile/ProjectImage2.png';
import { Link } from 'react-router-dom';
import { Routes, Route, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import MobileSideBar from './MobileSideBar';

export default function EditProjectMob() {
    const { id } = useParams();
    const projectData = useSelector((state) => state.addToCartReducer.projectList);
    const [project, setProject] = useState();
    const data = [
        { tag: summaryImage1 },
        { tag: summaryImage2 },
        { tag: summaryImage2 },
        { tag: summaryImage2 },
        { tag: summaryImage2 },

    ];


    useEffect(() => {
        setProject(
            projectData[0]?.data?.data?.data.filter((curElem) => {
                return curElem._id === id;
            })
        )
    }, [projectData])
    const navigate = useNavigate();
    const goToDifferentScreen = () => {
        navigate('/newprofilepage')
    }

    return (
        <>

            <div style={{overflow:'hidden'}}>

                <div>
                <MobileSideBar/>
                </div>
                <div className='' style={{ backgroundColor: 'white', width: '100%', marginTop: '20px', marginLeft: '10px' }}>
                    <section className='projectImages_content d-flex justify-content-between' style={{
                        background: '#ffffff',
                        padding: '5px',
                        width: '100%',  borderBottom:'1px solid #D7D7D7'
                    }}>
                        <div className='d-flex' onClick={goToDifferentScreen}>
                            <img style={{ width: '10px', height: "10px", objectFit: 'contain', marginTop: '7px' }} src={Left} />
                            <div className='main_heading' style={{ marginLeft: '10px', cursor: 'pointer' }}> {localStorage.getItem('name')}</div>
                        </div>
                        <Link to={`/sumaryimages/${id}`}
                            className='edit_text' style={{
                                fontFamily: 'Manrope',
                                color:'rgb(59, 89, 152)',
                                fontWeight: '400',
                                fontHize: '18px',
                                lineHeight: '25px', marginRight: '20px'
                            }}>Edit

                        </Link>

                    </section>
                    <div className='d-flex mt-4' style={{

                        flexWrap: 'wrap', background: 'white',
                        width: '100%', borderRadius: '10px'
                    }}>
                        {project && project[0]?.data[0]?.images.map((data, index) => (
                            <img alt="summaryImage1" style={{ width: '6.8rem', height: '5rem', margin: '5px', borderRadius: '5px' }} className="" src={data?.original} />
                        ))}

                    </div>
                </div>
            </div >
        </>

    )
}