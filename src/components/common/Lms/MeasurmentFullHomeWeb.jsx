import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import { MdExpandMore } from "react-icons/md";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Line from './Images/Line.svg'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import ProjectDetailsWeb from "./ProjectDetailsWeb";
import axios from 'axios';
import MeasurmentFullHomeMobile from './MeasurmentFullHomeMobile';
import HeaderNav from './LmsWebComponents/HeaderNav'

const MeasurmentFullHomeWeb = (props) => {

  const [loading, setIsLoading] = useState(false);  //here
  const [isDesktop, setDesktop] = useState(window.innerWidth > 599);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const [houseType, setHouseType] = useState("");
  const [houseArea, setHouseArea] = useState("");

  const navigate = useNavigate();

  const handleChange = (eventKey) => {

    setHouseType(eventKey);
  }

  const handleHouseAreaChange = (e) => {

    setHouseArea(e.target.value.slice(0, 5));

  }

  const [isContinueClicked, setIsContinueClicked] = useState(false);
  const [houseId, setHouseId] = useState("");

  const authtoken = localStorage.getItem("token");

  const id = localStorage.getItem("fullHomeId");

  let houseDetails;

  useEffect(() => {

    houseDetails = JSON.parse(localStorage.getItem("FullhomeDetail"));
    // console.log(houseDetails);

  }, [])

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
      // console.log(res.data.data);
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
      {isDesktop ?
        <div>
          <HeaderNav />


          <div style={{ height: '90vh', overflow: 'scroll' }}>

            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem', margin: '40px 113px' }}>

              <div style={{ width: '39rem' }}>
                <ul className="d-flex" style={{ listStyleType: 'none', }}>
                  <div style={{ height: '25px', width: '25px', border: '1px solid #3B5998', borderRadius: '51%', padding: '0px 8px', backgroundColor: '#C6D0E8', color: '#3B5998', fontSize:'15px' }}> 1 <p style={{ width: '105px', fontSize: '13px', margin: '15px -35px', color: '#3B5998' }}> Select work type</p></div>
                  <img src={Line} alt="line" className="mx-2" style={{ width: "200px" }} />

                  <div style={{ height: '25px', width: '25px', border: '1px solid grey', borderRadius: '51%', padding: '0px 7px', fontSize:'15px' }}> 2 <p style={{ width: '100px', fontSize: '13px', margin: '15px -35px' }}> Project Details</p></div>
                  <img src={Line} alt="line" className="mx-2" style={{ width: "200px" }} />

                  <div style={{ height: '25px', width: '25px', border: '1px solid grey', borderRadius: '51%', padding: '0px 7px', fontSize:'15px' }}> 3 <p style={{ width: '100px', fontSize: '13px', margin: '15px -21px' }}> Payment </p></div>

                </ul>
              </div>

              <div className="" style={{ height: '380px', width: '620px', border: '1px solid #DFDFDF', borderRadius: '8px', padding: '17px 11px', marginLeft: '-50px' }}>
                <div>
                  <p className="mx-3" style={{ color: 'black', fontSize: '16px' , marginBottom:'13px'}}>Select house type</p>

                  <Dropdown onSelect={handleChange}>

                    <Dropdown.Toggle variant="success" as="button" id="dropdown-basic" style={{ backgroundColor: 'white', color: 'black', border: '1px solid #DFDFDF', display: 'flex', gap: '14rem', alignItems: 'center', padding: '5px 17px', borderRadius: '4px' }}>
                      <p className="my-1"> {houseType || `Select`}</p>
                      <MdExpandMore />
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: '56%', margin: '0rem 16.2rem' }} >

                      <Dropdown.Item eventKey="1 BHK" >1 BHK </Dropdown.Item>
                      <Dropdown.Item eventKey="2 BHK" >2 BHK </Dropdown.Item>
                      <Dropdown.Item eventKey="3 BHK" >3 BHK </Dropdown.Item>
                      <Dropdown.Item eventKey="4 BHK" >4 BHK </Dropdown.Item>
                      <Dropdown.Item eventKey="5 BHK" >5 BHK </Dropdown.Item>
                      <Dropdown.Item eventKey="6 BHK" >6 BHK </Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown>

                </div>

                <div className="mx-2 my-4" style={{ width: '54%' }}>

                  <p className="mx-1" style={{ color: 'black', fontSize: '16px', marginBottom:'13px' }}>Approximate area of house</p>

                  <InputGroup size="lg" style={{ display: 'flex' }}  >
                    <Form.Control
                      aria-label="Large"
                      aria-describedby="inputGroup-sizing-sm" onChange={handleHouseAreaChange} type="number"  value={houseArea}
                    />
                    <InputGroup.Text id="inputGroup-sizing-lg" style={{ backgroundColor: '#DFDFDF' }}>sqft</InputGroup.Text>

                  </InputGroup>

                </div>

                <div className="" style={{ height: '0vh', width: '100%', fontSize: '16px', padding:'54px 0px 0px 7px'}}>

                  <p style={{ marginTop: '-67px' }}>The final payment may vary depending on the actual carpet area measured</p>

                </div>

                <div style={{ height: '7vh', width: '100%', fontWeight: 'bold', color: 'black',  padding:'54px 0px 0px 7px'}}>

                  <p style={{ marginTop: '-80px' }}><span style={{ color: '#F84E29' }}> **</span>The minimum charge for  full house measurment is ₹1500/-</p>

                </div>

                <div className="d-flex" style={{ gap: '8rem', height: '7vh', padding: '0px 8px', marginTop:"-20px" }}>
                  {loading ? <Spinner style={{ height: '21px', width: '21px', position: 'relative', margin: '12px 36px', color:"#3B5998" }} animation="border"/> :

                    <Button as="button" variant="primary" onClick={handleContinue} style={{ backgroundColor: '#3B5998', width:'110px', fontSize:'15px', fontWeight:'300' }} disabled={(parseInt(houseArea) * 5) < 1500 || !houseArea || !houseType}>Continue</Button>}

                  <p style={loading ? { marginLeft: '2.5rem' } : {marginLeft: '-1.5rem'}}><span>{houseArea || 0}</span> sqft X 5 ₹ per sqft: <span style={{ fontSize: "25px", fontWeight: '500', color: 'black', marginLeft: '10px' }} > ₹ {(Intl.NumberFormat('en-IN').format((parseInt(houseArea) * 5))) === 'NaN' ? 0 : Intl.NumberFormat('en-IN').format((parseInt(houseArea) * 5))}/- </span></p>
                </div>

              </div>

            </div>
          </div>
        </div> : <MeasurmentFullHomeMobile />}

      {/* <ProjectDetailsWeb totalPrice={parseInt(houseArea) * 5} id ={houseId}/> */}


    </>
  )
}

export default MeasurmentFullHomeWeb