import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Modal, ProgressBar } from "react-bootstrap";
import { MdStar } from 'react-icons/md';
import { MdOutlineReport } from 'react-icons/md'
import { useSelector } from 'react-redux';
import axios from 'axios';
import sstar from "../../../OrderHistory/Images/star.svg"
import yellow from '../../../OrderHistory/Images/yellowstar.svg'
import Dropdown from 'react-bootstrap/Dropdown';
import three from "../../../Lms/Images/threeDots.svg";
import pencil from "../../../Lms/Images/pencil.svg";
import del from "../../../Lms/Images/delete.svg";



const ReviewMob = () => {
    const profile = useSelector(state => state.addToCartReducer?.profileData);

    const [isClickedReply, setIsClickedReply] = useState(false);
    const [replyString, setReplyString] = useState("");

    const [isReplied, setIsReplied] = useState(false);

    const [isReported, setIsReported] = useState(false);

    const [modalShow, setModalShow] = useState(false);

    const [reviewArray, setReviewArray] = useState([]);
    const [isDeleted, setDeleted] = useState(false);

    const [isEdit, setEdit] = useState(false);
    const [valM, setValM] = useState("");
    const [val, setVal] = useState(valM && valM);
    const [reportString, setReportString] = useState("");

    let rating_1 = 0;
    let rating_2 = 0;
    let rating_3 = 0;
    let rating_4 = 0;
    let rating_5 = 0;

    // const profileData = useSelector((state ) => state.addToCartReducer.profileData);

    console.log(profile);
    console.log(isEdit)

    useEffect(() => {

        // console.log(profileData);

        async function fetchreview() {

            const response = await fetch(`https://home-api.idesign.market/api/review/${profile[0]?.data?.data?._id}`, {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json',
                },

            });

            const json = await response.json();
            setReviewArray(json);
            console.log(json);

            for (let i = 0; i < reviewArray.length; i++) {

                console.log(Object.keys(reviewArray[i].reply).length);

            }


        }
        fetchreview();

    }, [profile, isDeleted])

    for (let i = 0; i < reviewArray.length; i++) {

        if (reviewArray[i].rating === 1) {
            rating_1++;


        }
        if (reviewArray[i].rating === 2) {
            rating_2++;

        }
        if (reviewArray[i].rating === 3) {
            rating_3++;

        }
        if (reviewArray[i].rating === 4) {
            rating_4++;

        }
        if (reviewArray[i].rating === 5) {
            rating_5++;

        }
    }
    console.log(rating_1, rating_2, rating_3, rating_4, rating_5)

    const handlePost = async (reviewId, designerId) => {

        // console.log(replyString);

        const response = await axios.put(`https://home-api.idesign.market/api/review/reply-to-review?id=${reviewId}&replyBy=${designerId}&replyByName=${profile[0]?.data?.data?.companyName}`, {
            text: replyString

        }).then((res) => {

            console.log(res)
            window.location.reload()

        }).catch((err) => {

            console.log(err)
        })

        const json = await response.json();

        // console.log(json);

        setIsReplied(true);
        setIsClickedReply(false);

    }

    const openReportModal = () => {
        setModalShow(true)
    }

    const deleteReview = async (index) => {
        console.log(index)
        let id;
        for (let i = 0; i < reviewArray.length; i++) {
            if (i === index) {
                id = reviewArray[i]._id;
            }
        }
        console.log(id)
        const response = await axios.put(`https://home-api.idesign.market/api/review/delete-reply/${id}`, {
        }).then((res) => {

            console.log(res)
            setDeleted(true)

        }).catch((err) => {

            console.log(err)
        })

        console.log(response);
        setModalShow(false)

    }
    console.log(val)
    const handleReport = async (reportId, designerId) => {

        const response = await axios.put(`https://home-api.idesign.market/api/review/report-review?id=${reportId}&reportedBy=${designerId}&reportedByName=${profile[0]?.data?.data?.companyName}`, {
            text: reportString

        }).then((res) => {

            console.log(res)

        }).catch((err) => {

            console.log(err)
        })

        console.log(response);
        setModalShow(false)

    }

    const convertDate = (date) => {
        const dateObject = new Date(date);

        let day = dateObject.getDate().toString();
        if (day.length < 2) {
            day = "0" + day;
        }
        let month = (dateObject.getMonth() + 1).toString();
        if (month.length < 2) {
            month = "0" + month;
        }
        const year = dateObject.getFullYear().toString();
        const actualdate = day + "-" + month + "-" + year;

        return actualdate;
    }

    const handleChange = (e) => {
        setReplyString(e.target.value);
    }

    const handlePostChange = (e) => {

        setReportString(e.target.value);
    }
    const EditReply = (elm) => {
        setEdit(true)
        console.log(elm)
        setValM(elm)


        console.log(valM)
    }

    const handleChangee = (e) => {
        setValM(e.target.value)
    }

    const reviewEdit = async (index) => {
        console.log(index)
        let id;
        for (let i = 0; i < reviewArray.length; i++) {
            if (i === index) {
                id = reviewArray[i]._id;
            }
        }
        console.log(id)

        const response = await axios.put(`https://home-api.idesign.market/api/review/edit-reply/:${id}`, {
            text: valM

        }).then((res) => {

            console.log(res)
            setEdit(false);

        }).catch((err) => {

            console.log(err)
        })

    }


    return (
        <>
            <div className='mt-4'>
                <div className='d-flex w-100 justify-content-between' style={{ paddingTop: '3rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                    <div className="d-flex flex-column w-10" >
                        <p className='mb-0' style={{ fontSize: "18px", fontWeight: "400", }}> {(rating_1 +
                            rating_2 + rating_3 + rating_4 + rating_5) / 5}</p>
                        <span style={{ fontSize: "12px", fontWeight: "400", color: "#1A1A1A" }}>Out of 5 star</span>
                    </div>
                    <div className='d-flex flex-column align-items-center justify-content-center ms-3 mt-2 mb-2' style={{ width: "80%", borderBottom: "0.5px solid #DFDFDF;" }}>
                        <div className="w-100 d-flex">
                            <label htmlFor="" style={{
                                fontWeight: '400',
                                fontSize: '10px',
                                color: '#8C8C8C',
                                fontSize: '11px',
                                color: '#8C8C8C',
                                marginTop: '-5px'
                            }}> 5</label>
                            <ProgressBar variant="success" now={`${rating_5}%`} className="mb-3 mx-2" style={{ width: "90%", height: "0.3rem", color: "#84D9A2" }} />
                            <label htmlFor="" style={{
                                fontWeight: '400',
                                fontSize: '10px',
                                color: '#8C8C8C',
                                fontSize: '11px',
                                color: '#8C8C8C',
                                marginTop: '-5px'
                            }}>  {rating_1}</label>
                        </div>
                        <div className="w-100 d-flex">
                            <label htmlFor="" style={{
                                fontWeight: '400',
                                fontSize: '10px',
                                color: '#8C8C8C',
                                fontSize: '11px',
                                color: '#8C8C8C',
                                marginTop: '-5px'
                            }}> 4</label>
                            <ProgressBar variant="info" now={`${rating_4}%`} className="mb-3 mx-2" style={{ width: "90%", height: "0.3rem" }} />
                            <label htmlFor="" style={{
                                fontWeight: '400',
                                fontSize: '10px',
                                color: '#8C8C8C',
                                fontSize: '11px',
                                color: '#8C8C8C',
                                marginTop: '-5px'
                            }}>  {rating_4}</label>
                        </div>
                        <div className="w-100 d-flex">
                            <label htmlFor="" style={{
                                fontWeight: '400',
                                fontSize: '10px',
                                color: '#8C8C8C',
                                fontSize: '11px',
                                color: '#8C8C8C',
                                marginTop: '-5px'
                            }}> 3</label>
                            <ProgressBar variant="warning" now={`${rating_3}%`} className="mb-3 mx-2" style={{ width: "90%", height: "0.3rem" }} />
                            <label htmlFor="" style={{
                                fontWeight: '400',
                                fontSize: '10px',
                                color: '#8C8C8C',
                                fontSize: '11px',
                                color: '#8C8C8C',
                                marginTop: '-5px'
                            }}> {rating_3}</label>
                        </div>
                        <div className="w-100 d-flex">
                            <label htmlFor="" style={{
                                fontWeight: '400',
                                fontSize: '10px',
                                color: '#8C8C8C',
                                fontSize: '11px',
                                color: '#8C8C8C',
                                marginTop: '-5px'
                            }}> 2</label>
                            <ProgressBar variant="success" now={`${rating_2}%`} className="mb-3 mx-2" style={{ width: "90%", height: "0.3rem" }} />
                            <label htmlFor="" style={{
                                fontWeight: '400',
                                fontSize: '10px',
                                color: '#8C8C8C',
                                fontSize: '11px',
                                color: '#8C8C8C',
                                marginTop: '-5px'
                            }}>{rating_2}</label>
                        </div>
                        <div className="w-100 d-flex">
                            <label htmlFor="" style={{
                                fontWeight: '400',
                                fontSize: '10px',
                                color: '#8C8C8C',
                                fontSize: '11px',
                                color: '#8C8C8C',
                                marginTop: '-5px'
                            }}> 1</label>
                            <ProgressBar variant="danger" now={`${rating_1}%`} className="mb-3 mx-2" style={{ width: "90%", height: "0.3rem" }} />
                            <label htmlFor="" style={{
                                fontWeight: '400',
                                fontSize: '10px',
                                color: '#8C8C8C',
                                fontSize: '11px',
                                color: '#8C8C8C',
                                marginTop: '-5px'
                            }}>{rating_1}</label>
                        </div>
                    </div>
                </div>
            </div>
            {reviewArray.length !== 0 && reviewArray.map((review, index) => {

                return (

                    <div style={{ height: "fit-content", marginTop: '1rem', marginLeft: '1rem' }}>



                        <div className='w-100'>
                            <div className="d-flex" style={{ height: "100%", width: "100%", marginTop: '2rem' }}>

                                <div style={{ height: '30px', width: '30px', borderRadius: '50%', backgroundColor: '#BAA763', fontWeight: 'bold', color: 'white', padding: '2px 10px' }} >{review?.userId?.name?.charAt(0)}</div>

                                <div className="reviewer d-flex w-100">
                                    <div className="reviewer-name-section w-100">

                                        <div className="reviewer-name mx-2" style={{ fontWeight: "bold", fontSize: '1.2rem' }}>{review.userId.name}</div>
                                        <div className="mx-2" style={{ color: 'grey', fontSize: '0.9rem' }}>
                                            <div className=' d-flex mb-1' >
                                                <img src={review.rating >= 1 ? yellow : sstar} style={{ width: '12px' }} />
                                                <img src={review.rating >= 2 ? yellow : sstar} style={{ width: '12px' }} />
                                                <img src={review.rating >= 3 ? yellow : sstar} style={{ width: '12px' }} />
                                                <img src={review.rating >= 4 ? yellow : sstar} style={{ width: '12px' }} />
                                                <img src={review.rating >= 5 ? yellow : sstar} style={{ width: '12px' }} />
                                                <div className='mx-1 mb-2' style={{ fontSize: '12px', marginTop: '9px' }}>{convertDate(review.date)}</div>
                                            </div>

                                        </div>

                                    </div>

                                    {/* <div className="reviewer-rating" style={{ height: '30px', width: '55px', padding: '3px 9px', borderRadius: '0.4rem', backgroundColor: '#d9d9d9' }}> <MdStar style={{ color: "#49B7CF" }} /> <span style={{ color: "#49B7CF" }}>{review.rating}</span></div> */}
                                    <Dropdown style={{ backgroundColor: 'none', border: 'none' }}>
                                        <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: '#ffffff', boxShadow: 'none', borderColor: "none", border: "none" }}>
                                            <img src={three} />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item>
                                                <div className="report-reviewer" style={{ color: '#575757', fontSize: '14px', display: 'flex', justifyContent: 'flexStart', marginRight: '5px' }} role="button" onClick={openReportModal}><MdOutlineReport className="my-1" style={{ fontSize: '1rem', marginRight: '5px' }} />Report</div>
                                            </Dropdown.Item>


                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>

                            </div>
                        </div>

                        <div className="review-content" style={{ height: " 50%", width: "100%", marginTop: '10px', color: 'grey' }}>

                            <div style={{fontSize:'14px'}}>{review.review}</div>
                        </div>

                        {!isClickedReply && !review.reply ?

                            <div className="reply-button" style={{ height: " 20%", width: "100%", }}>
                                <div role="button" style={{ color: '#3B5998', fontSize: '0.9rem', fontWeight: 'bold',marginTop:'10px' }} onClick={() => setIsClickedReply(true)}> Reply</div>
                            </div>

                            : isClickedReply && !review.reply ?

                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Write your review..." name="reply" onChange={handleChange} required />
                                    </Form.Group>

                                    <div className="d-flex" style={{ gap: '1rem' }}>
                                        <div role="button" style={{ color: '#3B5998', fontSize: '0.9rem', fontWeight: 'bold', }} onClick={() => handlePost(review._id, review.designerId)}>Post</div>
                                        <div role="button" style={{ color: '#3B5998', fontSize: '0.9rem', fontWeight: 'bold' }} onClick={() => setIsClickedReply(false)}>Cancel</div>
                                    </div>

                                </Form>

                                : review.reply ?
                                    <div className="mx-3 mt-3" style={{ width: '100%' }}>
                                        <div className="d-flex" style={{ height: "30%", width: "98%" }}>
                                            <div style={{ height: '30px', width: '30px', borderRadius: '50%', backgroundColor: '#6ABA63', fontWeight: 'bold', color: 'white', padding: '2px 10px' }} > {review?.reply?.replyByName?.charAt(0)} </div>

                                            <div className="replier">
                                                <div className="replier-name mx-3" style={{ fontWeight: "bold", fontSize: "12px" }}>{review.reply.replyByName}</div>
                                                <div className="replier-detail mx-3" style={{ fontSize: "12px", color: 'grey' }}>Interior Designer</div>

                                            </div>
                                            <div style={{ marginLeft: 'auto' }}>
                                                <Dropdown style={{ backgroundColor: 'none', border: 'none', margin: 'auto' }}>
                                                    <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: '#ffffff', boxShadow: 'none', position: 'relative', right: '10px', border: "none", borderColor: "none" }}>
                                                        <img src={three} />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>
                                                            <div className='d-flex' style={{ justifyContent: 'flexStart' }}>
                                                                <img src={pencil} style={{ marginRight: '10px' }} />
                                                                <div onClick={() => EditReply(review.reply.text)}> Edit </div>

                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item style={{ textAlign: 'center' }}>

                                                            <div className='d-flex' style={{ justifyContent: 'flexStart' }}>
                                                                {/* <img src={del} role="button" onClick={(index) => deleteReview(index)} /> */}
                                                                <img src={del} style={{ marginRight: '10px' }} />
                                                                <div role="button" style={{color: '#FB5622' }} onClick={() => deleteReview(index)}>Delete</div>

                                                            </div>
                                                        </Dropdown.Item>

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                        {isEdit === true ? <><div style={{}}>
                                            <input value={valM} onChange={handleChangee} />
                                            <button style={{ color: '#ffffff', borderRadius: '4px', background: '#3B5998', marginLeft: '10px', width: '25%', border: '1px solid white' }} onClick={() => reviewEdit(index)}>Post</button>
                                        </div></> : <p className="mx-5" style={{ fontSize: '12px' }}>{review.reply.text}</p>}


                                    </div>
                                    : " "}

                        <Modal className="addProjectModalPopup" centered show={modalShow} onHide={() => { setModalShow(false) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Write a reason</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <Form >
                                    <div style={{ margin: "16px 0" }}>
                                        <div>
                                            <textarea
                                                className="w-100 h-50"
                                                style={{ fontSize: "15px", fontWeight: "400", padding: '10px' }}
                                                name="name"
                                                rows="10"
                                                type="text"
                                                placeholder="Write here..." onChange={handlePostChange} required />
                                        </div>
                                    </div>
                                    <div style={{ margin: "0 0 16px 0" }}>
                                        <div role="button" style={{ width: "100%", border: "none", backgroundColor: "#176091", color: "#FFFFFF", padding: "8px 16px", borderRadius: "8px", textAlign: 'center' }} onClick={() => handleReport(review._id, review.designerId)}> Submit </div>
                                    </div>
                                </Form>

                            </Modal.Body>
                        </Modal>
                    </div>

                )
            })}
        </>
    )
}

export default ReviewMob