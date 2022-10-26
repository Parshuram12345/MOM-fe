import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from 'react-date-picker';
import LineBlue from './Images/LineBlue.svg'
import Line from './Images/Line.svg'
import Call from './Images/Call.svg'
import Dropdown from 'react-bootstrap/Dropdown';
import {MdSchedule} from "react-icons/md"
import {MdDone} from "react-icons/md"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
import LandingMobHeader from '../3dComponents/LandingMobHeader';


const ProjectDetailsMobile = (props) => {

    const navigate = useNavigate();
    const [loading, setIsLoading] = useState(false);  //here

    const [radiobtnValue, setRadiobtnValue] = useState('1');

    const  id= localStorage.getItem('isfullHomeClicked')  === "yes" ? localStorage.getItem('houseId').toString() : localStorage.getItem('roomId').toString();

    const TotalPrice = localStorage.getItem('isRoomClicked') === "yes" ? localStorage.getItem('roomwiseTotalPrice') : localStorage.getItem('fullhomeTotalPrice') ;


    const handleChange = (e) => {
        setRadiobtnValue(e.target.value)
        localStorage.removeItem("date");
        setDate(null)

    }

    const [projectLocation, setProjectLocation] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [date, setDate] = useState(null);
    const [timeRange, setTimeRange] = useState(null);

    const handleTimeSelect = (eventKey) => {
        setTimeRange(eventKey.target.value)
        // console.log(typeof(eventKey.target.value));
        // console.log(date)
    }

    const authtoken = localStorage.getItem('token');

    const [projectDetailsId, setProjectDetailsId] = useState("");
    const [error, setError] = useState({phoneNumberError: "", dateError: "", timeError: "",})


    const handleContinue = async() => {

        if(phoneNumber.length < 10){
            setError({phoneNumberError: "Phone number must be at least 10 characters"});
            return;
        }
        else if( date === null  && radiobtnValue !== '3'){
            setError({dateError: "Date cannot be null"});
            return;
        }
        else if( timeRange === null && radiobtnValue !== '3'){
            setError({ timeError:"time can not be empty"});
            return;

        }

        let value  = parseInt(radiobtnValue);
        setIsLoading(true);  //here


        const response = await axios.post('https://pro-api.idesign.market/user/addLocationAndTime',

        {
            id: id,
            projectLocation : projectLocation ,
            houseNumber : houseNumber,
            phoneNumber : phoneNumber ,
            isConfirmDate : value,
            Date : radiobtnValue !== '3' ? date : "10-september-2022"
        },

        {
            headers: {

            authorization: `Bearer ${authtoken}`,

            },
        }

        ).then((res) => {

        setIsLoading(false);

        // console.log(res);
        setProjectDetailsId(res.data.data._id);
        localStorage.setItem("ProjectDetails", JSON.stringify(res.data.data));
        localStorage.setItem("projectDetailsId", res.data.data._id);
        navigate('/measurementcart');

        }).catch((err) => {

        console.log(err)
        })


    }

    const disablePastDate = () => {
        const today = new Date();
        let day = today.getDate() ;

        if (day < 10) {
            day = day.toString();
            day = "0" + day;
        }
        let month = today.getMonth() + 1 ; 
        if( month < 10){
            month = month.toString();
            month = "0" + month;
        }
        const yyyy = today.getFullYear();
        return yyyy + "-" + month + "-" + day
    };

  return (

    <>
    <div>
        <LandingMobHeader/>

        <div className="container my-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem', position:'relative', top:'20px'  }}>

            <div style={{margin:'-30px 0px'}}>
                <ul className="d-flex" style={{ listStyleType: 'none', }}>
                <div style={{ height:'25px', width:'25px', border: '1px solid #3B5998', borderRadius: '51%', backgroundColor:'#3B5998', color:'white', padding:'0px 4px' }}> <MdDone/><p style={{ width: '105px', fontSize: '13px', margin: '15px -35px', color:'#3B5998' }}> Select work type</p></div>

                <img src={LineBlue} alt="line" className="mx-2" style={{width:'30%'}}/>

                <div style={{ height:'25px', width:'25px', border: '1px solid #3B5998', borderRadius: '51%', padding: '0px 7px', backgroundColor:'#C6D0E8', color:'#3B5998' }}> 2 <p style={{ width: '100px', fontSize: '13px', margin: '15px -35px', color:'#3B5998' }}> Project Details</p></div>

                <img src={Line} alt="line" className="mx-2" style={{width:'30%'}}/>

                <div style={{ height:'25px', width:'25px', border: '1px solid grey', borderRadius: '51%', padding: '0px 7px' }}> 3 <p style={{  fontSize: '13px', margin: '15px -21px' }}> Payment </p></div>

                </ul>
            </div>

            <div className="container my-4" style={{ height: "fit-content", width: "360px", border: "1px solid #DFDFDF", borderRadius:'8px', padding:'7px 16px'}}>

                <p className="my-3" style={{ color: "black", fontSize: "16px" }}>
                Select Location & Time
                </p>
                <InputGroup className="mb-3">
                    <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" value={projectLocation}  placeholder="Project address" onChange={(e)=> setProjectLocation(e.target.value)} style={{ border:'1px solid #DFDFDF', height:'40px'}}/>
                </InputGroup>

                <div className="d-flex " style={{gap:'1rem'}}>
                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" value={houseNumber} placeholder="House No" onChange={(e)=> setHouseNumber(e.target.value)} style={{ border:'1px solid #DFDFDF', height:'40px'}}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Default" type="number" value={phoneNumber} aria-describedby="inputGroup-sizing-default" placeholder="Contact Number" onChange={(e)=> setPhoneNumber(e.target.value.slice(0, 10))} style={{ border:'1px solid #DFDFDF', height:'40px'}}/>
                        {error !== null && <div style={{position:"absolute", color:"red", top:"41px", fontSize:'12px'}}>{error.phoneNumberError}</div>}
                    
                    </InputGroup>
                </div>

                <p className="my-3" style={{color:'black'}}> Is the date & time is confirm? </p>

                <div className="d-flex" style={{gap:'2rem'}}>

                    <div className="d-flex"><Form.Check type="radio" aria-label="radio 1" onChange={handleChange} value="1" checked={radiobtnValue === '1'}/> Yes</div>
                    <div className="d-flex"><Form.Check type="radio" aria-label="radio 1" onChange={handleChange} value="3" checked={radiobtnValue === '3'}/> No</div>
                    <div className="d-flex"><Form.Check type="radio" aria-label="radio 1" onChange={handleChange} value="2" checked={radiobtnValue === '2'}/> I have tentative date</div>

                </div>

                { radiobtnValue ==='1' || radiobtnValue ==='2'?
                    // <DatePicker onChange={onChange} value={value}/>
                    <div className="my-4" style={{}}>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)}  style={{width:'98%', height:"40px", padding:'10px', borderRadius:'4px', border:"1px solid #DFDFDF"}} min={disablePastDate()} placeholder="select date"/>
                        {error !== null && <div style={{marginLeft:'10px', color:"red", fontSize:'12px'}}>{error.dateError}</div>}
                        
                        {/* <input type="time"/> */}
                        <select style={{width: "98%" , height:"40px", padding:'10px', borderRadius:'4px', border:"1px solid #DFDFDF", marginTop:'10px'}} onChange={handleTimeSelect}>
                            <option> Select Time </option>
                            <option value="09:00 AM - 11:00 AM"> 09:00 AM - 11:00 AM</option>
                            <option value="11:00 AM - 01:00 PM"> 11:00 AM - 01:00 PM</option>
                            <option value="01:00 PM - 03:00 PM"> 01:00 PM - 03:00 PM</option>
                            <option value="03:00 PM - 05:00 PM"> 03:00 PM - 05:00 PM</option>
                            <option value="05:00 PM - 07:00 PM"> 05:00 PM - 07:00 PM</option>

                        </select>
                        {error !== null && <div style={{position:"absolute", color:"red", top:"29.1rem", fontSize:'12px'}}>{error.timeError}</div>}

                    </div>
                    :
                    <div className="my-3 d-flex" style={{ width:'100%', border: '1px solid #3B5998' , borderRadius:'10px', padding:'10px 10px', gap:'1rem'}}>
                        <img src={Call} alt=""/>
                        <p style={{color:'#3B5998'}} className="my-2">We will call you within 24 hours to confirm date and time for measurement</p>
                    </div>
                    
                }
                <div className="d-flex" style={{ height: '7vh', width:'100%', marginTop: '80px'}}>
                    <p> <span style={{fontSize:'13px'}}> {localStorage.getItem("isfullHomeClicked") === "yes" ? `${localStorage.getItem("houseArea")} sqft X ₹ 5 :`   : `${localStorage.getItem("roomNo")} Rooms X ₹ 750 per room `}</span>: <span style={{ fontSize: "25px", fontWeight: '500', color: '#3B5998' }} className="mx-2 my-2">₹ {TotalPrice && (Intl.NumberFormat('en-IN').format(TotalPrice)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(TotalPrice) }/- </span></p>
                </div>

            </div>
            
            <div style={{ width:'100%', margin:'-90px'}}>
                {loading ? <Spinner style={{height:'21px', width:'21px', position:'absolute', margin: '1.9rem 10rem'}} animation="border" variant="light"/> : null}

                <Button variant="primary" className="my-4" onClick={handleContinue} style={loading? {color: '#1266f1', width:'100%', backgroundColor:'#3B5998', fontSize:'20px', fontWeight:'300'}: {color: 'white', width:'100%',  backgroundColor:'#3B5998', fontSize:'20px', fontWeight:'300'}} disabled={projectLocation.length< 1 || houseNumber.length< 1 || phoneNumber.length<1  }>Continue</Button>
            </div>

        </div>
        </div>
    </>
  )
}

export default ProjectDetailsMobile