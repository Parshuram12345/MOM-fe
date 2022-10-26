import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Line from './Images/Line.svg'
import Cut from './Images/Cut.png'
import axios from 'axios';
import ProjectDetailsMobile from "./ProjectDetailsMobile";
import {  Modal } from "react-bootstrap";
import LandingMobHeader from '../3dComponents/LandingMobHeader';

const MeasurmentRoomwiseMobile = (props) => {

  const [loading, setIsLoading] = useState(false);  //here

  const [roomDetails, setRoomDetails] = useState([
    {
      // index: 0,
      room: "Living/Dining",
      noOfRooms: 0,
    },
    {
      // index: 1,
      room: "Bedroom",
      noOfRooms: 0,
    },
    {
      // index: 2,
      room: "Bathroom",
      noOfRooms: 0,
    },
    {
      // index: 3,
      room: "Kitchen",
      noOfRooms: 0,
    },
  ]);

  const authtoken = localStorage.getItem('token');
  const id  = localStorage.getItem("roomWiseId");

  const navigate = useNavigate();
  const [noOfRooms, setNoOfRooms] = useState(0);
  
  const [intialInput, setIntialInput] = useState({room:"", noOfRooms: 0})
  const [error, seError] = useState({Inputerror: ""})
  const [error2, setError2] = useState({roomNameError: ""})
  const [error3, setError3] = useState({roomNoError: ""})
  
  const [isExtraRoom, setIsExtraRoom] = useState(false)

  const extraRoomsInput = (event) => {
    const { name, value } = event.target;
    setIntialInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    console.log(intialInput);
  };

  const addRoom = () => {
    if(roomDetails.length >= 10){
      // console.log("room no can not be more than 5")
      setError3({roomNoError:"you can not add more than 10 rooms"})
      return
    }
    setIsExtraRoom(true);
  };

  const handleChange = (e, index)=> {
    console.log("handle change", index, e.target.value)
    let newArr = roomDetails;
    newArr[index].room = e.target.value;
    setRoomDetails(newArr);

  }

  const removeInput = (index)=>{
    let newArr = roomDetails;
    newArr = newArr.filter((obj) =>{
      if(roomDetails[index] !== obj){
        return obj
      }
    })

    setRoomDetails(newArr);
  }

  const [totalRooms, setTotalRooms] = useState(null);
  const handleExtraRooms = () => {

    if(intialInput.room.length < 1){
      seError({Inputerror:'room input cannot be blank'});
      return;
    }

    setRoomDetails((prev) => {
      return [...prev, {room: intialInput.room, noOfRooms: intialInput.noOfRooms}];
    });
    seError({Inputerror:''});
    setIsExtraRoom(false);
  }

  const handlePlus = (index) => {
    // console.log(element.index);
    // console.log(allRooms[element.index].noOfRooms);

    let newArr = roomDetails;
    if(totalRooms <= 18){
      newArr[index].noOfRooms = newArr[index].noOfRooms + 1;
      setRoomDetails(newArr);
    }

    let count= 0;
    for (let i = 0; i < roomDetails.length; i++) {
      count = count + roomDetails[i].noOfRooms;
    }

    if(count < 20) {
      setTotalRooms(count);
    }
  };

  const handleNegative = (index) => {
    let newArr = roomDetails;
    if( newArr[index].noOfRooms> 0){
      
      newArr[index].noOfRooms = newArr[index].noOfRooms - 1;
    }
    setRoomDetails(newArr);
    // console.log(roomDetails);

    let count= 0;
    for (let i = 0; i < roomDetails.length; i++) {
      count = count + roomDetails[i].noOfRooms;
    }
    setTotalRooms(count);

  }

  const [isContinueClicked, setIsContinueClicked] = useState(false);

  const [roomId, setRoomId] = useState("");

  let roomwiseInfo;

  // useEffect(()=>{

  //   if(localStorage.getItem("roomwiseDetails")){
  //     roomwiseInfo =  JSON.parse(localStorage.getItem("roomwiseDetails"));
  //     console.log(roomwiseInfo);

  //     setRoomDetails(roomwiseInfo.rooms);

  //     let count= 0;
  //     for (let i = 0; i < roomwiseInfo.rooms.length; i++) {
  //       count = count + roomwiseInfo.rooms[i].noOfRooms;
  //     }
  //     setTotalRooms(count);
  // }

  // }, [])

  const handleContinue = async() => {

    setIsLoading(true);  //here

    // checking for a duplicate name of rooms
    const newArr = roomDetails.map((curElem) =>{
      return curElem.room
    })

    const seen = new Set();
    const duplicate  = newArr.filter((obj) =>{
      if(seen.size === seen.add(obj).size){
        return obj
      }
    })
    if(duplicate.length >0){
      setError2({roomNameError:'room name cannot be same'});
      setIsLoading(false);
      return
    }

    const response = await axios.post('https://pro-api.idesign.market/user/addRooms',

      {
        id: id,
        data: roomDetails
      },

      {
        headers: {

          authorization: `Bearer ${authtoken}`,

        },
      }

    ).then((res) => {

      setIsLoading(false);
      // console.log(res);
      setRoomId(res.data.data._id);
      let roomNo = 0;
      for(let i= 0; i< res.data.data.rooms.length; i++) {
        roomNo = roomNo + res.data.data.rooms[i].noOfRooms
      }

      localStorage.setItem('roomNo', roomNo)
      localStorage.setItem("roomwiseDetails", JSON.stringify(res.data.data));

      localStorage.setItem("roomId", res.data.data._id);
      localStorage.setItem("roomwiseTotalPrice", res.data.data.totalPrice);
      localStorage.setItem("isRoomClicked", "yes");
      localStorage.setItem("isfullHomeClicked", "no");
      navigate("/measurementpage/projectlocation");


    }).catch((err) => {

      console.log(err)
    })

    setIsContinueClicked(true);

  };
  return (
    <>
     <Modal className="addProjectModalPopup" centered show={isExtraRoom}  onHide={() => {setIsExtraRoom(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>Room Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form >
                <div style={{ margin: "16px 0" }}>
                  <div style={{ marginBottom: "8px" }}>Room name</div>
                    <div>
                    <Form.Control
                        className="w-100"
                        style={{ fontSize: "15px", fontWeight: "400" }}
                        name="room"
                        type="text"
                        placeholder="Type room name"  value={intialInput.room} onChange={extraRoomsInput}/>
                    </div>
                    {error.Inputerror.length > 1 && <p style={{color: 'red', fontSize:'12px', margin:'4px'}}>{error.Inputerror}</p>}

                  </div>
                  
                <div style={{ margin: "0 0 16px 0" }}>
                    <div  role="button" style={{ width: "100%", border: "none", backgroundColor: "#3B5998", color: "#FFFFFF", padding: "8px 156px", borderRadius: "8px" }} 
                    onClick={handleExtraRooms} >Confirm</div>
                </div>

              </Form>
            </Modal.Body>
        </Modal>

    <LandingMobHeader/>
    <div className="container my-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', height: '100vh', position:'absolute',top:'100px'}}>

        <div style={{margin:'-30px 0px'}}>
            <ul className="d-flex" style={{ listStyleType: 'none', }}>
                <div  style={{height:'30px', width:'30px', border:'1px solid grey', borderRadius:'51%', padding:'0px 10px', backgroundColor:'#C6D0E8', color:'#3B5998'}}> 1 <p style={{ fontSize:'13px', margin:'15px -35px', color:'#3B5998', width:'105px' }}> Select work type</p></div>
                <img src={Line} alt="line" className="mx-2" style={{width:'26%'}}/>

                <div  style={{height:'30px', width:'30px', border:'1px solid grey', borderRadius:'51%', padding:'0px 10px'}}> 2 <p style={{ fontSize:'13px', margin:'15px -35px', width:'105px'}}> Project Details</p></div>
                <img src={Line} alt="line" className="mx-2" style={{width:'26%'}}/>

                <div  style={{height:'30px', width:'30px', border:'1px solid grey', borderRadius:'51%', padding:'0px 10px'}}> 3 <p style={{ fontSize:'13px', margin:'15px -21px'}}> Payment </p></div>

            </ul>
        </div>
        <div
          className="container my-5"
          style={{
            height: "fit-content",
            width: "350px",
            border: "1px solid #DFDFDF",
            borderRadius: "8px",
            margin:'1px', padding:"12px", 
          }}
        >
          <p className=" my-2" style={{ color: "black", fontSize: "16px" }}>
            Select Rooms
          </p>

          {roomDetails.map((element, index) => {
            return (
              <div className="d-flex" style={{ gap: `${index < 4 ? "1rem" : "0rem"}` }} key={index}>
                <input
                  className= {`my-2 ${element.noOfRooms >0 ? "roominput": ""}`}
                  style={{
                    width: "50%",
                    height: "40px",
                    border: "1px solid #DFDFDF",
                    color: element.noOfRooms<=0 ? "#838383": "black",
                    padding: "5px 5px",
                    borderRadius:'4px'
                  }}
                  placeholder = {element.room}
                  onChange={(e) => handleChange(e,index)}
                />
                {index >= 4 && <img src={Cut} alt="cut" role="button" style={{height:'18px', width:'18px', margin:'20px -1px 0px 0px', position:'relative', right:'2.1rem'}}  onClick={()=> removeInput(index)}/>}
                  {/* {element.room}
                </input> */}

                <div
                  style={{ height: "30px" }}
                >
                  <div
                    className=" d-flex"
                    style={{
                      backgroundColor: "#e5e4e4",
                      border: "1px solid #DFDFDF",
                      borderRadius:'4px',
                      marginTop:'7px'
                    }}
                  >
                    <div
                      role = "button"
                      style={{
                        backgroundColor: "rgb(240 240 240)",
                        // border: "1px solid #DFDFDF",
                        color: "#A7A7A7",
                        width:'41px',
                        padding:'6px 14px'
                      }} onClick = {()=> handleNegative(index)}
                    >
                      -
                    </div>

                    <div
                      style={{
                        width: "48px",
                        backgroundColor: "white",
                        textAlign: "center",
                        padding: "7px 0rem",
                      }}
                    >
                      {element.noOfRooms}
                    </div>

                    <div
                      role = "button"
                      style={{
                        backgroundColor: "rgb(240 240 240)",
                        // border: "1px solid #DFDFDF",
                        color: "#3B5998",
                        width:'41px',
                        padding:'6px 14px'
                      }}
                      onClick={() => handlePlus(index)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            );
          })}


          <div
            className="d-flex"
            role="button"
            style={{ color: "#3B5998" , gap:"8px", width:'40%'}}
            onClick={addRoom}
          >
            <p style={{fontSize:'37px'}}>+</p>
            <p style={{marginTop:'19px', fontSize:'19px'}}>Add room</p>

          </div>

          <div clasName="" style={{ fontSize: "17px"}}>
            <span style={{ color: "#F84E29",}}>**</span> The minimum charge for
            roomwise measurment is ₹1500/-
          </div>
          {error2.roomNameError.length > 1 && <p style={{color: 'red', fontSize:'16px', margin:'4px'}}>{error2.roomNameError}</p>}
          {error3.roomNoError.length > 1 && <p style={{color: 'red', fontSize:'16px', margin:'4px'}}>{error3.roomNoError}</p>}

          <div className="d-flex" style={{ height: "7vh", marginTop: "120px"}}>

            <p>
              <span>{totalRooms || 0} <span>X ₹ 750 per room:</span> </span> 
              <span
                style={{ fontSize: "25px", fontWeight: "bold", color: "#3B5998", margin:'0px 5px' }}
              >
              
                ₹ {  (Intl.NumberFormat('en-IN').format(totalRooms * 750)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(totalRooms * 750) }  /-
              </span>
            </p>
          </div>

        </div>
      
        <div  style={{ width:'100%', margin:'-70px'}}> 
            {loading ? <Spinner style={{height:'21px', width:'21px', position:'absolute', margin: '0.5rem 10rem'}} animation="border" variant="light"/> : null}

            <Button variant="primary" onClick={handleContinue} disabled={ (totalRooms * 750) < 1500} style={loading? {color: '#1266f1', width:'100%', fontSize:'20px', fontWeight:'300', marginBottom: '20px', backgroundColor: '#3B5998'  }: {color: 'white', width:'100%', fontSize:'20px', fontWeight:'300', marginBottom: '20px', backgroundColor: '#3B5998'  }}> Continue</Button>
        </div>

      </div>
      
    </>
  );
};

export default MeasurmentRoomwiseMobile;