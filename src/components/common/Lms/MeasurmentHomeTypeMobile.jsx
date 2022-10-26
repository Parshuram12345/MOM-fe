import React,{ useEffect, useState} from 'react'
import HeaderNav from './LmsWebComponents/HeaderNav'
import { useNavigate} from 'react-router-dom'
import Line from './Images/Line.svg'
import Home from './Images/Home.svg'
import Room from './Images/Room.svg'
import MeasurmentFullHomeWeb from './MeasurmentFullHomeWeb'
import MeasurmentRoomwiseWeb from './MeasurmentRoomwiseWeb'
import axios from 'axios';
import LandingMobHeader from '../3dComponents/LandingMobHeader';
import MeasurmentFullHomeMobile from './MeasurmentFullHomeMobile';
import MeasurmentRoomwiseMobile from './MeasurmentRoomwiseMobile';

const MeasurmentHomeTypeMobile = () => {

    const [isDesktop, setDesktop] = useState(window.innerWidth > 599);
    const navigate = useNavigate();

    const updateMedia = () => {
        setDesktop(window.innerWidth > 800);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });


    // const [isHouseSelect, setIsHouseSelect] = useState(false);
    // const [isRoomSelect, setIsRoomSelect] = useState(false);

    const authtoken = localStorage.getItem("token");

    const [fullHomeId, setFullHomeId] = useState("");
    const [roomWiseId, setRoomWiseId] = useState("");
    const [onHoverHome, setOnHoverHome] = useState(false);
    const [onHoverRoom, setOnHoverRoom] = useState(false);
    // console.log(authtoken);

    const handleHouseSelect = async () => {

        const response = await axios.post('https://pro-api.idesign.market/user/addWorkType', 
        {

          workType: 'Full Home',
        },

        {

            headers: {

                authorization: `Bearer ${authtoken}`,
                    
            },
        }

        ). then((res) => {

            // console.log(res);
            setFullHomeId(res.data.data._id);
            localStorage.setItem("fullHomeId", res.data.data._id);


        }).catch((err) =>{

            console.log(err)
        })

        // console.log(response);

        // setIsHouseSelect(true);
        navigate('/measurementpage/fullhome');
       
    }

    const handleRoomSelect = async () => {

        const response = await axios.post('https://pro-api.idesign.market/user/addWorkType', 
        {
          workType: 'Roomwise',
        },

        {

            headers: {

                authorization: `Bearer ${authtoken}`,
                    
            },
        }

        ). then((res) => {

            // console.log(res);
            setRoomWiseId(res.data.data._id);
            localStorage.setItem('roomWiseId', res.data.data._id );


        }).catch((err) =>{

            console.log(err)
        })

        // setIsRoomSelect(true);
        navigate('/measurementpage/roomwsie');

        
    }

  return ( 
    <>
        <div>
            <LandingMobHeader/>

            <div className="container my-4" style={{display: 'flex', flexDirection:'column', alignItems:'center', position:'relative', top:'0px'}}>
                
                <div>
                    <div className="my-3">
                        <ul className="d-flex" style={{listStyleType: 'none', }}>
                        <div style={{ height: '25px', width: '25px', border: '1px solid #3B5998', borderRadius: '51%', padding: '0px 8px', backgroundColor:'#C6D0E8', color:'#3B5998' }}> 1 <p style={{ width: '105px', fontSize: '12px', margin: '10px -35px', color:'#3B5998' }}> Select work type</p></div>
                            <img src={Line} alt="line" className="mx-2" style={{width:'26%'}}/>

                            <div  style={{height:'25px', width:'25px', border:'1px solid grey', borderRadius:'51%', padding:'0px 7px'}}> 2 <p style={{ width: '105px', fontSize:'12px', margin:'10px -35px'}}> Project Details</p></div>
                            <img src={Line} alt="line" className="mx-2" style={{width:'26%'}}/>

                            <div  style={{height:'25px', width:'25px', border:'1px solid grey', borderRadius:'51%', padding:'0px 7px'}}> 3 <p style={{ fontSize:'12px', margin:'10px -21px'}}> Payment </p></div>

                        </ul>
                    </div>


                    <div className="" style={{padding:'20px 0px'}}>
                    
                        <div className="my-5" style={{color:'black', textAlign: "center"}}>
                            <h5>Do you require a full house to be measured or just a few rooms ?</h5>
                        </div>

                        <div className="my-5 d-flex" style={{gap: '2rem' }}>

                            <div style={{height:'173px', width:'158px', border:'1px solid #DFDFDF', borderRadius:'4%', display: 'flex', flexDirection:'column', alignItems: 'center' , padding:'20px 0px', backgroundColor: `${onHoverHome? '#C6D0E8': 'white'}` }} role="button" onClick={handleHouseSelect} onMouseEnter={()=> setOnHoverHome(true)} onMouseLeave={()=> setOnHoverHome(false)}>
                                <img src={Home} alt="home" style={{height:'50px', width:'50px'}}/>
                                <h5 className="my-3" style={{color:'black'}}>Full Home</h5>
                                <p  style={{fontSize: "12px", textAlign:'center', margin:'-9px 0px 0px 0px'}}>For complete house measurement</p>
                            </div>

                            <div style={{height:'173px', width:'158px', border:'1px solid #DFDFDF', borderRadius:'4%', display: 'flex', flexDirection:'column', alignItems: 'center' , padding:'20px 0px', backgroundColor: `${onHoverRoom? '#C6D0E8': 'white'}`}} role="button" onClick={handleRoomSelect} onMouseEnter={()=> setOnHoverRoom(true)} onMouseLeave={()=> setOnHoverRoom(false)}>
                                
                                <img src={Room} alt="room" style={{height:'50px', width:'50px'}}/>
                                <h5 className="my-3" style={{color:'black'}}>Roomwise</h5>
                                <p  style={{fontSize: "12px", textAlign:'center', margin:'-9px 17px 0px 24px' }}>For measuring a few rooms in the house</p>
                            </div>
                        </div>
                    </div>
                </div>
       

            </div>
        </div>

    </>
  )
}

export default MeasurmentHomeTypeMobile