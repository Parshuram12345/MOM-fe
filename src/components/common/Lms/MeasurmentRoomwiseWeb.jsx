import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Line from './Images/Line.svg'
import ProjectDetailsWeb from "./ProjectDetailsWeb";
import axios from 'axios';
import {  Modal } from "react-bootstrap";
import MeasurmentRoomwiseMobile from "./MeasurmentRoomwiseMobile";
import HeaderNav from './LmsWebComponents/HeaderNav'

const MeasurmentRoomwiseWeb = (props) => {

  const [isDesktop, setDesktop] = useState(window.innerWidth > 599);
  const [loading, setLoading] = useState(false);  //here
  
  const updateMedia = () => {
      setDesktop(window.innerWidth > 800);
  };

  useEffect(() => {
      window.addEventListener("resize", updateMedia);
      return () => window.removeEventListener("resize", updateMedia);
  });

  
  const navigate = useNavigate();

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


  const [noOfRooms, setNoOfRooms] = useState(0);
  const [intialInput, setIntialInput] = useState({room:"", noOfRooms: 0})
  const [error, seError] = useState({Inputerror: ""})
  const [isExtraRoom, setIsExtraRoom] = useState(false)

  const extraRoomsInput = (event) => {
    const { name, value } = event.target;
    setIntialInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

  };
  const [extraRooms, setExtraRooms] = useState([]);
  const addRoom = () => {
    setIsExtraRoom(true);
    
  };
  console.log(roomDetails);
  const [totalRooms, setTotalRooms] = useState(null);

  const handleExtraRooms = () => {
    if(intialInput.room.length < 1){
      seError({Inputerror:'room input cannot be blank'});
      return;
    }

    setRoomDetails((prev) => {
      return [...prev, {room: intialInput.room, noOfRooms: intialInput.noOfRooms}];
    });

    setIsExtraRoom(false);

  }

  const [FinalTootalRooms, setFinalTootalRooms]= useState(0)
  const handlePlus = (index) => {
    // console.log(allRooms[element.index].noOfRooms);

    let newArr = roomDetails;
    if(FinalTootalRooms <= 18){
      newArr[index].noOfRooms = newArr[index].noOfRooms + 1;
    setRoomDetails(newArr);

    }
    // console.log(roomDetails);

    let count= 0;
    for (let i = 0; i < roomDetails.length; i++) {
      count = count + roomDetails[i].noOfRooms;
    }
    if(count < 20) {
      setFinalTootalRooms(count);
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
    setFinalTootalRooms(count);

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
  //     setFinalTootalRooms(count);
  //   }
  //   else{
  //     setFinalTootalRooms(0);
  //   }
   
  // }, [])

  const handleContinue = async() => {
    
    setLoading(true);  //here

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

      setLoading(false);
      // console.log(res.data.data);
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
                    <div  role="button" style={{ width: "100%", border: "none", backgroundColor: "#3B5998", color: "#FFFFFF", padding: "8px 187px", borderRadius: "8px" }} 
                    onClick={handleExtraRooms} >Confirm</div>
                </div>

              </Form>
            </Modal.Body>
      </Modal>

  {isDesktop ? 
    <div>
      <HeaderNav/>
      <div style={{height:'90vh', overflow:'scroll'}}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', margin:'40px 113px' }}>

          <div style={{width: '39rem'}}>
            <ul className="d-flex" style={{ listStyleType: 'none', }}>
              <div style={{ height: '25px', width: '25px', border: '1px solid #3B5998', borderRadius: '51%', padding: '0px 8px', backgroundColor:'#C6D0E8', color:'#3B5998', fontSize:'15px' }}> 1 <p style={{ width: '105px', fontSize: '13px', margin: '15px -35px', color:'#3B5998' }}> Select work type</p></div>
              <img src={Line} alt="line" className="mx-2" style={{width:"200px"}}/>

              <div style={{ height: '25px', width: '25px', border: '1px solid grey', borderRadius: '51%', padding: '0px 7px', fontSize:'15px' }}> 2 <p style={{ width: '100px', fontSize: '13px', margin: '15px -35px' }}> Project Details</p></div>
              <img src={Line} alt="line" className="mx-2" style={{width:"200px"}}/>

              <div style={{ height: '25px', width: '25px', border: '1px solid grey', borderRadius: '51%', padding: '0px 7px', fontSize:'15px' }}> 3 <p style={{ width: '100px', fontSize: '13px', margin: '15px -21px' }}> Payment </p></div>

            </ul>
          </div>

        <div
          className=""
          style={{
            height: "fit-content",
            width: "620px",
            border: "1px solid #DFDFDF",
            borderRadius: "8px",
            marginTop:'33px',
            marginRight: '54px',
            padding:'9px 20px'
          }}
        >
          <p className="mx-2 my-2" style={{ color: "black", fontSize: "16px" }}>
            Select Rooms
          </p>

          {roomDetails.map((element, index) => {
            return (
              <div className="d-flex" style={{ gap: "4rem" }} key={index}>
                <div
                  className="my-2"
                  style={{
                    width: "60%",
                    height: "40px",
                    border: "1px solid #DFDFDF",
                    color: element.noOfRooms<=0 ? "#838383": "black",
                    padding: "7px",
                    borderRadius: "4px"
                  }}
                >
                  {element.room}
                </div>

                <div
                  style={{ height: "30px" }}
                >
                  <div
                    className="my-1 d-flex"
                    style={{
                      backgroundColor: "#e5e4e4",
                      border: "1px solid #DFDFDF",
                      borderRadius:'4px'
                    }}
                  >
                    <div
                      role="button"
                      style={{
                        backgroundColor: "rgb(240 240 240)",
                        borderRight: "1px solid #DFDFDF",
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
                      role="button"
                      style={{
                        backgroundColor: "rgb(240 240 240)",
                        borderLeft: "1px solid #DFDFDF",
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
            style={{ color: "#3B5998" , width: "20%", marginTop:'5px'}}
            onClick={addRoom}
          >
            <p style={{ fontSize:'30px', margin:'-11px 4px'}}>+</p>
            <p>Add Room</p>
          </div>

          <div clasName="my-3">
            <span style={{ color: "#F84E29" }}>**</span> The minimum charge for
            roomwise measurment is ₹1500/-
          </div>

          <div className="d-flex my-4" style={{ gap: "8rem", height: "7vh" }}>

          {loading ? <Spinner style={{height:'21px', width:'21px',  margin: '12px 36px', color:"#3B5998" }} animation="border" /> :

            <Button variant="primary" style={{backgroundColor: '#3B5998' , width:'110px', fontSize:'15px', fontWeight:'300'}} onClick={handleContinue} disabled={ (FinalTootalRooms * 750) < 1500}>
              Continue
            </Button>}
            <p >
              <span>{FinalTootalRooms ? FinalTootalRooms : 0} Rooms</span> X ₹ 750 per room:{" "}
              <span
                style={{ fontSize: "25px", fontWeight: "500", color: "black", marginLeft: '10px'}}
              >
                {" "}
                {  (Intl.NumberFormat('en-IN').format(FinalTootalRooms * 750)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(FinalTootalRooms * 750) } /-
              </span>
            </p>
          </div>
        </div>
      </div>
      </div>
      </div> : <MeasurmentRoomwiseMobile/>}
    </>
  );
};

export default MeasurmentRoomwiseWeb;