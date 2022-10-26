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
import ProjectDetailsMobile from './ProjectDetailsMobile';
import HeaderNav from './LmsWebComponents/HeaderNav'


const ProjectDetailsWeb = (props) => {

    const [loading, setIsLoading] = useState(false);  //here
    const [isDesktop, setDesktop] = useState(window.innerWidth > 599);
  
    const updateMedia = () => {
        setDesktop(window.innerWidth > 800);
    };
  
    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    const navigate = useNavigate();

    const [radiobtnValue, setRadiobtnValue] = useState('1');

    const  id= localStorage.getItem('isfullHomeClicked')  === "yes" ? localStorage.getItem('houseId').toString() : localStorage.getItem('roomId').toString();

    const TotalPrice = localStorage.getItem('isRoomClicked') === "yes" ? localStorage.getItem('roomwiseTotalPrice') : localStorage.getItem('fullhomeTotalPrice') ;

    const handleChange = (e) => {
        setRadiobtnValue(e.target.value)
        localStorage.removeItem("date");
        setDate(null);
        setTimeRange(null);

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
            setError( {phoneNumberError:"phone Number must be at least 10 characters"});
            return;
        }

        else if( date === null && radiobtnValue !== '3'){
            setError({ dateError:"Date can not be null"});
            return;

        }

        else if( timeRange === null && radiobtnValue !== '3'){
            setError({ timeError:"Time Range can not be empty"});
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
        // console.log(res.data.data);
        setProjectDetailsId(res.data.data._id);
        localStorage.setItem("ProjectDetails", JSON.stringify(res.data.data));
        localStorage.setItem("projectDetailsId", res.data.data._id);
        navigate('/measurementcart');

        }).catch((err) => {

        console.log(err);
        setError(err);
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
    {isDesktop ? 
    <div>
        <HeaderNav style={{position:'fixed', top:'0'}}/>
        <div>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' , margin:'40px 147px'}}>
        <div style={{ marginRight:'115px'}}>

            <div style={{margin:'0px 24px'}}>
                <ul className="d-flex" style={{ listStyleType: 'none', }}>
                <div style={{ height: '25px', width: '25px', border: '1px solid #3B5998', borderRadius: '51%', padding: '0px 10px', backgroundColor:'#3B5998', color:'white', padding:'0px 4px', fontSize:'15px' }}> <MdDone/><p style={{ width: '105px', fontSize: '13px', margin: '15px -35px', color:'#3B5998' }}> Select work type</p></div>

                <img src={LineBlue} alt="line" className="mx-2" style={{width: '200px'}}/>

                <div style={{ height: '25px', width: '25px', border: '1px solid #3B5998', borderRadius: '51%', padding: '0px 7px', backgroundColor:'#C6D0E8', color:'#3B5998', fontSize:'15px' }}> 2 <p style={{ width: '100px', fontSize: '13px', margin: '15px -35px', color:'#3B5998' }}> Project Details</p></div>

                <img src={Line} alt="line" className="mx-2" style={{width: '200px'}}/>

                <div  style={{ height: '25px', width: '25px', border: '1px solid grey', borderRadius: '51%', padding: '0px 7px', fontSize:'15px' }}> 3 <p style={{ width: '100px', fontSize: '13px', margin: '15px -21px' }}> Payment </p></div>

                </ul>
            </div>

            <div className="container " style={{ height: "fit-content", width: "620px", border: "1px solid #DFDFDF", borderRadius:'8px', padding:"9px 20px", marginTop:'80px'}}>


                <p className="my-2" style={{ color: "black", fontSize: "16px" }}>
                Select Location & Time
                </p>
                <InputGroup className="mb-3 my-4">
                    <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" value={projectLocation} placeholder="Project address" onChange={(e)=> setProjectLocation(e.target.value)}  style={{ border:'1px solid #DFDFDF', height:'40px'}}/>
                </InputGroup>

                <div className="d-flex " style={{gap:'1rem'}}>
                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Default" aria-describedby="inputGroup-sizing-default" value={houseNumber} placeholder="House No" onChange={(e)=> setHouseNumber(e.target.value)}  style={{ border:'1px solid #DFDFDF', height:'40px'}}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Default" type="number" value={phoneNumber} aria-describedby="inputGroup-sizing-default" placeholder="Contact Number" onChange={(e)=> setPhoneNumber(e.target.value.slice(0, 10))}  style={{ border:'1px solid #DFDFDF', height:'40px'}}/>
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
                    <div className="my-4" style={{display:' flex', gap:'1rem'}}>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)}  style={{width:'70%', height:"40px", padding:'10px', borderRadius:'4px', border:"1px solid #DFDFDF"}} min={disablePastDate()}/>
                        {error !== null && <div style={{position:"absolute", color:"red", top:"33.3rem",fontSize:'12px'}}>{error.dateError}</div>}
                        
                        {/* <input type="time"/> */}
                        <select style={{width: "70%", height:"40px", padding:'8px', borderRadius:'4px', border:"1px solid #DFDFDF"}} onChange={handleTimeSelect}>
                            <option> Select Time </option>
                            <option value="09:00 AM - 11:00 AM"> 09:00 AM - 11:00 AM</option>
                            <option value="11:00 AM - 01:00 PM"> 11:00 AM - 01:00 PM</option>
                            <option value="01:00 PM - 03:00 PM"> 01:00 PM - 03:00 PM</option>
                            <option value="03:00 PM - 05:00 PM"> 03:00 PM - 05:00 PM</option>
                            <option value="05:00 PM - 07:00 PM"> 05:00 PM - 07:00 PM</option>

                        </select>
                        {error !== null && <div style={{position:"absolute", color:"red", top:"33.8rem",left:'47.8rem', fontSize:'12px'}}>{error.timeError}</div>}

                    </div>
                    :
                    <div className="my-3 d-flex" style={{ width:'100%', height:'70px', border: '1px solid #3B5998' , borderRadius:'10px', padding:'10px 11px', gap:'1rem'}}>
                        <img src={Call} alt=""/>
                        <p style={{color:'#3B5998'}} className="">We will call you within 24 hours to confirm date and time for measurement</p>
                    </div>
                    
                }
                <div className="d-flex my-2" style={{ gap: '8rem', height: '7vh' }}>
                    {loading ? <Spinner style={{height:'21px', width:'21px', position:'relative', margin: '12px 36px', color:"#3B5998"  }} animation="border" /> : 

                    <Button variant="primary" onClick={handleContinue} style={{backgroundColor: '#3B5998' , width:'110px', fontSize:'15px', fontWeight:'300'}} disabled={projectLocation.length< 1 || houseNumber.length< 1 || phoneNumber.length<1  }>Continue</Button>}
                    
                    <p style={loading ? {marginLeft:'2.5rem'} : {}}> {localStorage.getItem("isfullHomeClicked") === "yes" ? `${localStorage.getItem("houseArea")} sqft X ₹ 5 :`   : `${localStorage.getItem("roomNo")} Rooms X ₹ 750 per room`} <span style={{ fontSize: "25px", fontWeight: '500', color: 'black' }} className="mx-2 my-2">₹ {TotalPrice && (Intl.NumberFormat('en-IN').format(TotalPrice)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(TotalPrice) }/- </span></p>
                </div>

            </div>
        </div>
        </div>
        </div>
        </div> : <ProjectDetailsMobile/>}
    </>
  )
}

export default ProjectDetailsWeb