import React, {useEffect, useState} from 'react'
import axios from 'axios';
import HeaderNav from './LmsWebComponents/HeaderNav'
import SideBarWeb from './LmsWebComponents/SideBarWeb'
import {useNavigate} from 'react-router-dom'
// import goBack from "./Images/gobackicon.svg";
import CartItem from './Images/CartItem.svg'
import Button from 'react-bootstrap/Button';

import { useSelector, useDispatch} from "react-redux";
import gstDoc from "../Images/gstDocument.svg";
import { faDotCircle, faFile, faInfoCircle, faPencilAlt, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import location from './Images/location.svg';
import smallHouse from './Images/smallHouse.svg';
import smallCalender from './Images/smallCalender.svg';
import Sign from './Images/Sign.svg';
import { Form, Modal } from "react-bootstrap";

import { createOrder } from "../Apis";
import { RAZOR_PAY_KEY } from "../Config";
import { addPurchasedLeads, fetchProfileData, sendInvoice, setGstDetails } from "./Actions";

const MeasurmentMobileCart = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const profileInfo = useSelector((state) => state.addToCartReducer.profileData);

    const initialGstData = {
       companyName: profileInfo[0]?.data?.data?.companyName,
       gstNum: profileInfo[0]?.data?.data?.gstNumber,
     };
   
    const [gstData, setGstData] = useState(initialGstData);

    const authtoken = localStorage.getItem("token");
    const [isHome , setIsHome] = useState('true'); 

    const [cartItemArray, setCartItemArray] = useState([]);
    const [isAddedGst, setIsAddedGst] = useState(false);
    const [allCartInfo, setAllCartInfo] = useState();


    const gstDataInputHandler = (event) => {
        const { name, value } = event.target;
        setGstData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });

        // console.log(gstData);
    };

    const [msg, setMsg] = useState("")

    useEffect(() => {
        
        async function fetch() {
            
            const response = await axios.get('https://pro-api.idesign.market/user/getUserMeasurements', 
            {
                headers: {

                    authorization: `Bearer ${authtoken}`,

                },
            }
        
            ). then( (res) => {

                // console.log(res.data.data);
                setAllCartInfo(res.data.data);
                setCartItemArray(res.data.data.data);
                setMsg("")

            }).catch((err) =>{

                console.log(err)
            })
        
        }
        fetch();
    }, [msg])

    const handleContinue = () => {

    }
    const goBackHome = () => {
        navigate("/lead");
    };

    const dateConverter = (date) =>{

        if(date === null){
            return "No dates Selected";
            
        }
        const dateObject = new Date(date);
        const allMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        let day = dateObject.getDate();
        const month = dateObject.getMonth();
        const year = dateObject.getFullYear();

        if(day.length <2){
            day = "0"+ day;
        }
        const actualdate = day + "-" + allMonths[month] + "-" + year;

        return actualdate;

    }

    const [gstFilled, setGstFilled] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
        
    const handleGstInfo =() => {

        setIsAddedGst(false);
        // dispatch(setGstData(authtoken, gstData.gstNum, gstData.companyName ));
        setGstFilled(true);
        setIsChecked(true);
    }

    const handleHalf = async (index, number) => {
 
        const id  = cartItemArray[index]._id;
        // console.log(number);
        
        const response = await axios.post("https://pro-api.idesign.market/user/toggleMeasurementPrice", 
        {
    
          id: id,
          priceToPay: number,
        },
        {
          headers: {
            authorization: `Bearer ${authtoken}`,
          },
        }  
        ).then((res)=>{
          console.log(res.data.data);
          setAllCartInfo(res.data.data)
          setCartItemArray(res?.data?.data?.data);
    
        }).catch((err)=>{
          console.log(err);
        })
        
      };
    

    const [pay, setPay] = useState("full");

    const handleRadio = (event) => {
  
        setPay(event.target.value)
    }
  

    const handleRemove = async (index) => {

        const id = cartItemArray[index]._id;

        const response = await axios.post('https://pro-api.idesign.market/user/removeMeasurementsFromCart',

        {
            id: id,
        },

        {
            headers: {

            authorization: `Bearer ${authtoken}`,

            },
        }

        ).then((res) => {

        // console.log(res);
        setMsg(res?.data?.data?.message)
  
        }).catch((err) => {

        console.log(err)
        })

    }

    const placeOrderOnRazorpay = async () => {
        const amount = pay === "full" ? allCartInfo?.grandTotal : (allCartInfo?.grandTotal/2) ;
        
        const res = await createOrder({ amount: parseFloat(amount.toFixed(2)) });
    
        if (res?.statusCode !== 200) {
        //   console.log(res?.message);
          return;
        }
    
        const option = {
          description: "iDesign payment",
          currency: "INR",
          key: RAZOR_PAY_KEY,
          amount: allCartInfo?.grandTotal,
          name: "iDesign.market pvt. ltd.",
          order_id: res?.data?.id,
          handler: paymentHandler.bind(this, amount),
          prefill: {
            name: profileInfo[0]?.data?.data?.companyName,
            email: profileInfo[0]?.data?.data?.email,
            contact: profileInfo[0]?.data?.data?.phoneNumber,
          },
          notes: {
            address: `Payment for cart`,
          },
          theme: {
            color: "#61dafb",
          },
        };
    
        try {
          const paymentObject = new window.Razorpay(option);
          paymentObject.open();
        } catch (err) {
          console.log(err?.message);
        }
    };

    
    const measurementArr = cartItemArray.map((curElem) => {
        return curElem._id;
    });

    const paymentHandler = async (amount, response) => {
        // console.log(response);
        const data = {
          pricePaid: amount,
          razorPaymentId: response?.razorpay_payment_id,
          razorOrderId: response?.razorpay_order_id,
          razorSignature: response?.razorpay_signature,
        };
        const measurementArr = cartItemArray.map((curElem) => {
            return {
              id: curElem._id,
              orderStatus: curElem.orderStatus,
              paymentStatus: curElem.paymentStatus,
              pricePaid: curElem.priceToPay === 2 ? curElem.totalPrice/2 : curElem.totalPrice,
              razorOrderId: response?.razorpay_order_id,
              razorPaymentId: response?.razorpay_payment_id,
              razorSignature: response?.razorpay_signature,
            };
          });
      

        if(response){

                const response  = await axios.post("https://pro-api.idesign.market/user/placeMeasurementOrder", {
                //   id: item._id,
                //   orderStatus: 1,
                //   paymentStatus: 2,
                //   pricePaid: amount,
                //   razorOrderId: response?.razorpay_order_id,
                //   razorPaymentId: response?.razorpay_payment_id,
                //   razorSignature: response?.razorpay_signature,
                //   date: new Date()

                data: measurementArr
                }).then((res)=>{
                //   console.log(res);
                  navigate("/measurementfinal")

                }).catch((err) => {
                  console.log(err);
                })
              
        }
      };

  return (
    <>
        <Modal className="addProjectModalPopup" centered show={isAddedGst} onHide={() => { setIsAddedGst(false) }}>
            <Modal.Header closeButton>
                <Modal.Title>GST Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form >
                <div style={{ margin: "16px 0" }}>
                    <div style={{ marginBottom: "8px" }}>Company Name</div>
                    <div>
                    <Form.Control
                        className="w-100"
                        style={{ fontSize: "15px", fontWeight: "400" }}

                        name="companyName"
                        type="text"
                        placeholder="Type Company Name"  value={gstData.companyName} onChange={gstDataInputHandler}/>
                    </div>
                </div>
                <div style={{ margin: "0 0 16px 0" }}>
                    <div style={{ marginBottom: "8px" }}>Registration Number</div>
                    <div>
                    <Form.Control
                        className="w-100"
                        style={{ fontSize: "15px", fontWeight: "400" }}
                        
                        name="gstNum"
                        type="text"
                        placeholder="Enter Registration Number" value={gstData.gstNum} onChange={gstDataInputHandler}
                    />
                    </div>
                </div>
                <div style={{ margin: "0 0 16px 0" }}>
                <div  role="button" style={{ width: "100%", border: "none", backgroundColor: "#3B5998", color: "#FFFFFF", padding: "8px 131px", borderRadius: "8px" }} 
                    onClick={handleGstInfo} disabled={gstData?.companyName?.length <1 && gstData?.gstNum?.length< 1}>Confirm</div>
                </div>

                </Form>
            </Modal.Body>
        </Modal>

              <div style={{ background: "White", display: "flex", paddingBottom: "40px" }}>
                    
                    <div className="cart" style={{width:'100%', height:'100%'}}>
                        <div className="webMyCart-header" style={{height:'50px', borderBottom:'1px solid #DFDFDF', padding:'10px'}}>
                            <div style={{ fontSize: "20px" }} role="button" onClick={goBackHome}>
                                My Cart ({cartItemArray.length})
                            </div>
                        </div>

                        <div className="d-flex" style={{width: '100%', height:'54px', border: '1px solid #DFDFDF', position:"fixed", bottom:"0px", zIndex:"1"}}>
                            <div style={{width: '50%' , padding:"9px 40px", fontSize:"24px", color:'black', background:"#f6f6f6"}}>₹ {pay === "full" ? (Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal) : (Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal/2) }</div>
                            
                            <div  role="button" style={{width: '50%' ,backgroundColor:"#3B5998", color:"white", padding:"15px 44px"}} onClick={placeOrderOnRazorpay}>Place Order</div>
                        </div>

                        <div style={{ width:'100%',}} className="my-2">


                            <div className="my-3" style={{height:"fit-content", border:'1px solid #DFDFDF', padding:'5px 10px'}}>

                                <div className="d-flex " style={{marginBottom:'15px'}}>
                                    <p style={{fontWeight:'bolder'}}> Price Details</p>
                                </div>
                                <div className="d-flex justify-content-between" style={{marginBottom:'10px'}}>
                                    <p> Item Price({cartItemArray.length})</p>
                                    <p className="fw-bolder">₹ {pay === "full" ? (Intl.NumberFormat('en-IN').format(allCartInfo?.totalPrice)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.totalPrice) : (Intl.NumberFormat('en-IN').format(allCartInfo?.totalPrice/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.totalPrice/2)}</p>
                                </div>
                                <div className="d-flex justify-content-between" style={{marginBottom:'10px'}}>
                                    <p> Discount</p>
                                    <p className="fw-bolder">₹ {pay === "full" ? (Intl.NumberFormat('en-IN').format(allCartInfo?.discount)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.discount) : (Intl.NumberFormat('en-IN').format(allCartInfo?.discount/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.discount/2)}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p> GST - 18%</p> 
                                    <p className="fw-bolder">₹ {pay === "full" ? (Intl.NumberFormat('en-IN').format(allCartInfo?.gst)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.gst) : (Intl.NumberFormat('en-IN').format(allCartInfo?.gst/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.gst/2)}</p>
                                </div>

                                <hr/>
                                <div  className="d-flex justify-content-between">
                                    <p> Grand Total</p> 
                                    <p className="fw-bolder">₹ {pay === "full" ? (Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal) : (Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal/2) }</p>
                                </div>
                            </div>

                            <div style={{height:'fit-content', padding:'12px 20px', border: '1px solid #DFDFDF' }} role="button" onClick={() =>setIsAddedGst(true)}>

                                <div className="d-flex">
                                    <Form.Check aria-label="option 1" checked={isChecked}/>
                                    <div>
                                        I have a GST number{" "}
                                        <span style={{ color: "#888888" }}>(Optional)</span>
                                    </div>

                                </div>
                                

                                {gstFilled ? (

                                    <div className="w-100 p-2 mt-2 d-flex justify-content-between" style={{ backgroundColor: "#F6F6F6" }}>
                                    <div className="d-flex">
                                        <div className="gstIcon-container">
                                        <img src={gstDoc} />
                                        </div>
                                        <div>
                                        <div style={{ fontSize: "10px" }}>{gstData.companyName}</div>
                                        <div style={{ fontSize: "10px", color: "#000000" }}>{gstData.gstNum}</div>
                                        </div>
                                    </div>
                                    <div
                                        className="d-flex align-items-center"
                                        onClick={() => {
                                        setIsAddedGst(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPencilAlt} color="#A7A7A7" />
                                    </div>
                                    </div>
                                ) : null}
                            </div>

                            {/* <div className="sections" style={{ padding: "12px 18px 16px 18px", border: "1px solid #DFDFDF", marginTop:'10px', borderRadius:'8px' }}>
                                <div className="d-flex flex-column align-items-center" >
                                    <div className='d-flex w-100' style={{ borderBottom: "1px solid #DFDFDF" }}>
                                        <input type="radio" value="full" checked={pay === "full"} onChange={handleRadio} /><p className='my-2 px-2 d-flex justify-content-between  w-100' style={{ fontWeight: "400", fontSize: "16px", color: "black" }}> Pay in full<span className='float-end'>₹ {(Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal)}</span></p>
                                    </div>
                                    <div className='d-flex w-100'>
                                        <input type="radio" value="half" checked={pay === "half"} onChange={handleRadio} /><p className='my-2 px-2 d-flex justify-content-between  w-100' style={{ fontWeight: "400", fontSize: "16px", color: "black" }}>Pay 50% later <span className='float-end'>₹ {(Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(allCartInfo?.grandTotal/2)}</span></p>
                                    </div>
                                </div>
                    
                            </div> */}

                        </div>

                        <div style={{ width:'100%', height:'100vh', overflow:'scroll'}}>
                            
                            { cartItemArray.map((element, index) =>{

                                return(
                                    <div key={element._id} style={{ marginTop:'10px'}}>
                                        {element.rooms.length === 0 ?
 
                                        <div className="d-flex" style={{ width:'100%', height:'fit-content', border: '1px solid #DFDFDF', padding:'15px 1px', borderRadius:'7px'}}>
                                            
                                            <div style={{ backgroundColor: '#C6D1D9',   margin: '1px 6px', borderRadius: '3px', height: 'fit-content'}}>
                                                <img src={CartItem} style={{width:'75%', margin: '18px 9px'}}/>
                                            </div>

                                            <div style={{width:'100%', padding: '0px 14px'}}>
                                                
                                                <div className="d-flex" style={{gap:'2rem'}}> 
                                                    <b style={{fontSize: '22px'}}>Measurement </b>
                                                    <b className="font-weight-bold" style={{fontSize:'1.4rem'}}>₹ {element.priceToPay === 1 ? (Intl.NumberFormat('en-IN').format(element.totalPrice)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(element.totalPrice) : (Intl.NumberFormat('en-IN').format(element.totalPrice/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(element.totalPrice/2) }</b>

                                                </div>
                                                <div className="d-flex" style={{gap:"6px", marginBottom:'8px'}}>
                                                    <img src={location} style={{}}/> 
                                                    <p>{element.houseNumber}</p>
                                                    <p>{element.projectLocation} </p>
                                                </div>   

                                                <div className="d-flex" style={{gap:"6px", marginBottom:'8px'}}>

                                                    <img src={smallCalender} />
                                                    <div className="mx-2" style={{marginTop:'0px'}}> {element.isConfirmDate !== 3 ? dateConverter(element.Date): "No dates selected"}</div>
                                                    <p>{element?.createdAt ? new Date(element?.createdAt).toLocaleTimeString().replace(/\:\d+\s/, " "): "No dates selected"}</p>

                                                </div>

                                                <div className="d-flex" style={{marginBottom:'8px'}}>
                                                    
                                                    <p><img src={smallHouse} style={{ marginTop: '-5px'}}/> <span>{element.houseType}</span> </p>
                                                    <div className="mx-3" style={{height:'26px', width:'93px', backgroundColor:'#F0F0F0', padding: '1px 8px', borderRadius:'4px'}}> Full Home</div>
                                        
                                                </div>
                                                <div className="d-flex" style={{gap:'0.6rem'}}> 
      
                                                    <div role="button" style={{width: '121px', height: '31px', border: element.priceToPay === 1  ? '1px solid #3B5998' : '', borderRadius: '48px', fontSize:'13px', padding:'4px 10px'}} onClick={() => handleHalf(index, 1)}><img src={Sign} alt="s" /> Full Payment</div>

                                                    <div role="button" style={{width: '121px', height: '31px', backgroundColor: element.priceToPay === 1  ? '#F0F0F0': 'white', borderRadius: '48px', fontSize:'13px', padding:'4px 10px' , border: element.priceToPay === 2  ? '1px solid #3B5998' : ''}}  onClick={() => handleHalf(index, 2)}>50% Payment</div>

                                                </div>

                                                <div style={{width: '77px', margin:'6px 0px',  padding:'1px 9px', borderRadius:'4px', textAlign:'center'}} onClick={() => handleRemove(index)} role="button"> Remove</div>

                                            </div>
                                            
                                        </div>
                                 
                                        :
                                        <div className="d-flex" style={{ width:'100%', height:'fit-content', border: '1px solid #DFDFDF', padding:'15px 1px', borderRadius:'7px'}}>
                                            
                                            <div style={{ backgroundColor: '#C6D1D9',   margin: '1px 6px', borderRadius: '3px',  height: 'fit-content'}}>
                                                <img src={CartItem} style={{width:'75%', margin: '18px 9px'}}/>
                                            </div>
                                            
                                            <div style={{width:'100%', padding: '0 14px'}}>
                                                <div className="d-flex" style={{gap:'2rem'}}> 

                                                  <b style={{fontSize: '22px'}}>Measurement </b>
                                                  <b className="font-weight-bold" style={{fontSize:'1.4rem'}}>₹ {element.priceToPay === 1 ?(Intl.NumberFormat('en-IN').format(element.totalPrice)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(element.totalPrice) : (Intl.NumberFormat('en-IN').format(element.totalPrice/2)) === 'NaN' ?0: Intl.NumberFormat('en-IN').format(element.totalPrice/2) }</b>
                
                                                </div>
                                                <div className="d-flex" style={{gap:"6px", marginBottom:'8px'}}>
                                                    <img src={location} /> 
                                                    <p>{element.houseNumber}</p>
                                                    <p>{element.projectLocation} </p>
                                                    
                                                </div>   

                                                <div className="d-flex" style={{gap:"6px", marginBottom:'8px'}}>

                                                    <img src={smallCalender} />
                                                    <div className="mx-2" style={{marginTop:'0px'}}> {element.isConfirmDate !== 3 ? dateConverter(element.Date): "No dates selected"}</div>
                                                    <p>{element?.createdAt ? new Date(element?.createdAt).toLocaleTimeString().replace(/\:\d+\s/, " "): "No dates selected"}</p>
                                                </div>
                                                <div className="d-flex" style={{flexWrap: 'wrap', gap:'2px', columnGap:'10px', rowGap:'5px'}}>
                                                    { element.rooms.map((room)=> {
                                                        if(room.noOfRooms>0) {
                                                         return(
                                                            <div className="" style={{height:'26px', width:'fit-content', backgroundColor:'#F0F0F0', padding: '1px 8px', borderRadius:'4px'}}>
                                                            {room.room}({room.noOfRooms})
                                                            </div>
                                                        )}
                                                    })}
                                                </div>

                                                <div className="d-flex" style={{gap:'0.6rem', marginTop:'12px'}}> 
      
                                                <div role="button" style={{width: '121px', height: '31px', border: element.priceToPay === 1  ? '1px solid #3B5998' : '', borderRadius: '48px', fontSize:'13px', padding:'4px 10px'}}  onClick={() => handleHalf(index, 1)}><img src={Sign} alt="s"/> Full Payment</div>

                                                <div role="button" style={{width: '121px', height: '31px', backgroundColor: element.priceToPay === 1 ? '#F0F0F0': 'white', borderRadius: '48px', fontSize:'13px', padding:'4px 10px' , border: element.priceToPay === 2  ? '1px solid #3B5998' : ''}}  onClick={() => handleHalf(index, 2)}>50% Payment</div>

                                                </div>

                                                <div style={{width: '77px', margin:'6px 0px', padding:'1px 9px', borderRadius:'4px', textAlign: 'center'}} onClick={() => handleRemove(index)} role="button"> Remove</div>

                                            </div>
                                            {/* <div className="mx-3" style={{width:'15%'}}>
                                                <div role="button" className="my-3 mx-2"  onClick={()=> handleRemove(index)}> Remove</div>
                                            </div> */}
                                        </div>}
                                    </div>
                                )
                            })}
                        </div>

                    </div>
              </div>
    </>
  )
}

export default MeasurmentMobileCart