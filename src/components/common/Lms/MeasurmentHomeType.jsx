import React,{ useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom'
import HeaderNav from './LmsWebComponents/HeaderNav'
import Line from './Images/Line.svg'
import Home from './Images/Home.svg'
import Room from './Images/Room.svg'
import MeasurmentFullHomeWeb from './MeasurmentFullHomeWeb'
import MeasurmentRoomwiseWeb from './MeasurmentRoomwiseWeb'
import axios from 'axios';
import MeasurmentHomeTypeMobile from './MeasurmentHomeTypeMobile';

const MeasurmentHomeType = () => {


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


        navigate('/measurementpage/fullhome');
        // setIsHouseSelect(true);
        // console.log(data.data);
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
            setRoomWiseId(res.data.data._id)
            localStorage.setItem('roomWiseId', res.data.data._id );

        }).catch((err) =>{

            console.log(err)
        })

        navigate('/measurementpage/roomwsie');

        // console.log(response);
        // setIsRoomSelect(true)
        
    }

  return (
    <>
        {isDesktop ? <div>
            <HeaderNav/>

                
            
                <div className="container my-4" style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>

                    <div className="my-3" style={{width: '39rem'}}>
                        <ul className="d-flex" style={{listStyleType: 'none', }}>
                        <div style={{ height: '25px', width: '25px', border: '1px solid #3B5998', borderRadius: '51%', padding: '0px 8px', backgroundColor:'#C6D0E8', color:'#3B5998', fontSize:'15px' }}> 1 <p style={{ width: '105px', fontSize: '13px', margin: '12px -35px', color:'#3B5998' }}> Select work type</p></div>

                            <img src={Line} alt="line" className="mx-2" style={{width: '200px'}}/>

                            <div  style={{height:'25px', width:'25px', border:'1px solid grey', borderRadius:'51%', padding:'0px 7px', fontSize:'15px'}}> 2 <p style={{width:'100px', fontSize:'13px', margin:'12px -35px'}}> Project Details</p></div>
                            <img src={Line} alt="line" className="mx-2" style={{width: '200px'}}/>

                            <div  style={{height:'25px', width:'25px', border:'1px solid grey', borderRadius:'51%', padding:'0px 7px', fontSize:'15px'}}> 3 <p style={{width:'100px', fontSize:'13px', margin:'12px -21px'}}> Payment </p></div>

                        </ul>
                    </div>


                    <div className="mx-5" style={{padding:'20px 0px'}}>
                    
                        <div className="my-5" style={{color:'black', fontSize:'20px', marginRight:'30px'}}>
                            <div>Do you require a full house to be measured or just a few rooms ?</div>
                        </div>

                        <div className="my-5 d-flex" style={{gap: '5rem' , padding: '0px 18px'}}>

                            <div style={{height:'14rem', width:'14rem', border:'1px solid #DFDFDF', borderRadius:'4%', display: 'flex', flexDirection:'column', alignItems: 'center' , padding:'20px 0px', backgroundColor: `${onHoverHome? '#C6D0E8': 'white'}`, border: `${onHoverHome? '1px solid #3B5998' :' 1px solid #DFDFDF'}`}} role="button" onClick={handleHouseSelect} onMouseEnter={()=> setOnHoverHome(true)} onMouseLeave={()=> setOnHoverHome(false)}>

                                <img src={Home} alt="home" style={{height:'64px', width:'64px', marginTop:'20px'}}/>
                                <h5 style={{color:'black', fontSize:'18px', marginTop:'2rem', marginBottom:'20px'}}>Full Home</h5>
                                <p style={{fontSize: "14px", textAlign:'center', margin:'-14px 0px 0px 0px', lineHeight:'18px'}}>For complete house measurement</p>
                            </div>

                            <div style={{height:'14rem', width:'14rem', border:'1px solid #DFDFDF', borderRadius:'4%', display: 'flex', flexDirection:'column', alignItems: 'center' , padding:'20px 0px', backgroundColor: `${onHoverRoom? '#C6D0E8': 'white'}` ,border: `${onHoverRoom? '1px solid #3B5998' :' 1px solid #DFDFDF'}`}} role="button" onClick={handleRoomSelect}  onMouseEnter={()=> setOnHoverRoom(true)} onMouseLeave={()=> setOnHoverRoom(false)}>
                                
                                <img src={Room} alt="room" style={{height:'64px', width:'64px', marginRight:'11px', marginTop:'20px'}}/>
                                <h5 style={{color:'black', fontSize:'18px', marginTop:'2rem', marginBottom:'20px'}}>Roomwise</h5>
                                <p  style={{fontSize: "14px", textAlign:'center', margin:'-14px 19px 0px 24px', lineHeight:'18px'}}>For measuring a few rooms in the house</p>
                            </div>
                        </div>
                    </div>
                </div>

                
        

        </div>: <MeasurmentHomeTypeMobile/>}

    </>
  )
}

export default MeasurmentHomeType