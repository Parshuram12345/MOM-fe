import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import { MdExpandMore } from "react-icons/md";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Line from './Images/Line.svg'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import ProjectDetailsMobile from "./ProjectDetailsMobile";
import axios from 'axios';
import LandingMobHeader from '../3dComponents/LandingMobHeader';

const MeasurmentFullHomeMobile = (props) => {

  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);  //here

  const [houseType, setHouseType] = useState("");
  const [houseArea, setHouseArea] = useState("");

  const handleChange = (eventKey) => {
    setHouseType(eventKey);
  }

  const handleHouseAreaChange = (e) => {

    setHouseArea(e.target.value.slice(0, 5))
  }

  const [isContinueClicked, setIsContinueClicked] = useState(false);
  const [houseId, setHouseId] = useState("");

  const authtoken = localStorage.getItem("token");

  const id = localStorage.getItem("fullHomeId");
  const handleContinue = async () => {
    setIsLoading(true);  //here

    const response = await axios.post('https://pro-api.idesign.market/user/addHouseDetails',
      {
        id: id,
        houseType: houseType,
        houseArea: houseArea,
      },

      {
        headers: {

          authorization: `Bearer ${authtoken}`,

        },
      }

    ).then((res) => {

      setIsLoading(false);
      // console.log(res);
      setHouseId(res.data.data._id);
      localStorage.setItem("houseArea", res?.data?.data?.houseArea);
      localStorage.setItem("FullhomeDetail", JSON.stringify(res.data.data));
      localStorage.setItem("houseId", res.data.data._id);
      localStorage.setItem("fullhomeTotalPrice", res.data.data.totalPrice);
      localStorage.setItem("isfullHomeClicked", "yes");
      localStorage.setItem("isRoomClicked", "no");
      navigate("/measurementpage/projectlocation");

    }).catch((err) => {

      console.log(err)
    })

    setIsContinueClicked(true);
  };

  return (
    <>

      <LandingMobHeader />

      <div className="container my-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem', position: 'relative', top: '20px' }}>

        <div style={{ margin: '-30px 0px' }}>
          <ul className="d-flex" style={{ listStyleType: 'none', }}>
            <div style={{ height: '25px', width: '25px', border: '1px solid grey', borderRadius: '51%', padding: '0px 8px', backgroundColor: '#C6D0E8', color: '#3B5998' }}> 1 <p style={{ fontSize: '13px', width: '105px', margin: '12px -35px', color: '#3B5998' }}> Select work type</p></div>
            <img src={Line} alt="line" className="mx-2" style={{ width: '30%' }} />

            <div style={{ height: '25px', width: '25px', border: '1px solid grey', borderRadius: '51%', padding: '0px 7px' }}> 2 <p style={{ fontSize: '13px', width: '105px', margin: '12px -35px' }}> Project Details</p></div>
            <img src={Line} alt="line" className="mx-2" style={{ width: '30%' }} />

            <div style={{ height: '25px', width: '25px', border: '1px solid grey', borderRadius: '51%', padding: '0px 7px' }}> 3 <p style={{ fontSize: '13px', margin: '12px -21px' }}> Payment </p></div>

          </ul>
        </div>

        <div className="mx-5 my-4" style={{ height: '520px', width: '360px', border: '1px solid #DFDFDF', borderRadius: '8px', padding: '7px 2px' }}>
          <div>
            <p className="mx-3" style={{ color: 'black', fontSize: '16px', marginTop: "15px", marginBottom:'13px' }}>Select house type</p>

            <Dropdown onSelect={handleChange}>

              <Dropdown.Toggle variant="success" as="button" id="dropdown-basic" style={{ backgroundColor: 'white', color: 'black', border: '1px solid #DFDFDF', display: 'flex', gap: '12rem', alignItems: 'center', padding: '6px 27px', borderRadius: '4px' }}>
                <p className="my-1"> {houseType || `Select`}</p>
                <MdExpandMore />
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: '90%', margin: '0rem 2.1rem' }} >

                <Dropdown.Item eventKey="1 BHK" >1 BHK </Dropdown.Item>
                <Dropdown.Item eventKey="2 BHK" >2 BHK </Dropdown.Item>
                <Dropdown.Item eventKey="3 BHK" >3 BHK </Dropdown.Item>
                <Dropdown.Item eventKey="4 BHK" >4 BHK </Dropdown.Item>
                <Dropdown.Item eventKey="5 BHK" >5 BHK </Dropdown.Item>
                <Dropdown.Item eventKey="6 BHK" >6 BHK </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>

          </div>

          <div className="mx-2 my-4" style={{ width: '90%' }}>

            <p className="mx-1" style={{ color: 'black', fontSize: '16px', marginBottom:'13px' }}>Approximate area of house</p>

            <InputGroup size="lg" style={{ display: 'flex' }}>
              <Form.Control
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm" onChange={handleHouseAreaChange} type="number" value={houseArea}
              />
              <InputGroup.Text id="inputGroup-sizing-lg" style={{ backgroundColor: '#DFDFDF' }}>sqft</InputGroup.Text>

            </InputGroup>

          </div>

          <div className="" style={{ height: '0vh', width: '100%', fontSize: '16px', padding: '65px 2px 0px 7px' }}>

            <p style={{ marginTop: '-67px' }}>The final payment may vary depending on the actual carpet area measured</p>

          </div>

          <div style={{ height: '7vh', width: '100%', fontWeight: 'bold', color: 'black', padding: '80px 2px 0px 7px' }}>

            <p style={{ marginTop: '-80px' }}><span style={{ color: '#F84E29' }}> **</span>The minimum charge for  full house measurment is ₹1500/-</p>

          </div>

          <div className="d-flex" style={{ marginTop: '80px', height: '7vh', padding: '0px 8px' }}>
            <p><span>{houseArea || 0}</span> <span style={{fontSize: '13px'}}>sqft X 5 ₹ per sqft: </span> <span style={{ fontSize: "25px", fontWeight: '500', color: "#3B5998", marginLeft:'10px'}} > ₹ {(Intl.NumberFormat('en-IN').format((parseInt(houseArea) * 5))) === 'NaN' ? 0 : Intl.NumberFormat('en-IN').format((parseInt(houseArea) * 5))}/- </span></p>
          </div>

        </div>

        <div style={{ width: '100%', margin: '-63px' }}>
          {loading ? <Spinner style={{ height: '21px', width: '21px', position: 'absolute', margin: '0.5rem 10rem' }} animation="border" variant="light" /> : null}

          <Button variant="primary" style={loading ? { color: '#1266f1', width: '100%', backgroundColor: '#3B5998', fontSize:'20px', fontWeight:'300', marginBottom:'20px' } : { color: 'white', width: '100%', backgroundColor: '#3B5998', fontSize:'20px', fontWeight:'300', marginBottom:'20px' }} onClick={handleContinue} disabled={(parseInt(houseArea) * 5) < 1500 || !houseArea || !houseType} >Continue</Button>
        </div>


      </div>

    </>
  )
}

export default MeasurmentFullHomeMobile