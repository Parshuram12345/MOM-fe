import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Modal } from "react-bootstrap";
import { MdStar } from 'react-icons/md';
import { MdOutlineReport } from 'react-icons/md'
import { useSelector } from 'react-redux';
import axios from 'axios';


const ReviewsCard = () => {
  const profile = useSelector(state => state.addToCartReducer.profileData);

  const [isClickedReply, setIsClickedReply] = useState(false);
  const [replyString, setReplyString] = useState("");

  const [isReplied, setIsReplied] = useState(false);

  const [isReported, setIsReported] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const [reviewArray, setReviewArray] = useState([]);

  const [reportString, setReportString] = useState("");
  const [Index, setIndex] = useState(-1);
  const [isPosted, setIsPosted] = useState(false)


  useEffect(() => {

    console.log("useEffect has called");

    async function fetchreview() {

      const response = await fetch(`https://home-api.idesign.market/api/review/${profile[0]?.data?.data?._id}`, {
        method: 'GET',

        headers: {
          'Content-Type': 'application/json',
        },

      });

      const json = await response.json();
      setReviewArray(json);
      console.log(reviewArray);

      for (let i = 0; i < reviewArray.length; i++) {

        console.log(Object.keys(reviewArray[i].reply).length);

      }
    }
    fetchreview();

  }, [profile, isPosted])

  const handlePost = async (reviewId, designerId) => {

    const response = await axios.put(`https://home-api.idesign.market/api/review/reply-to-review?id=${reviewId}&replyBy=${designerId}&replyByName=${profile[0]?.data?.data?.companyName}`, {
      text: replyString

    }).then((res) => {

      console.log(res)
      setIsPosted(true)
      setIndex(-1)

    }).catch((err) => {

      console.log(err)
    })


    setIsReplied(true);
    setIsClickedReply(false);

  }

  const handleReplyClick = (index) => {
    console.log("handle Reply Click")
    setIsClickedReply(true)
    setIndex(index)
  }

  const handleCancel = () => {
    setIsClickedReply(false)
    setIndex(-1)
  }

  const openReportModal = () => {
    setModalShow(true)
  }

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

  return (
    <>

      {reviewArray.length !== 0 && reviewArray.map((review, index) => {

        return (
          <div style={{ padding: '30px', height: "fit-content" }}>


            <div className="d-flex" style={{ height: "30%", width: "100%" }}>
              <div style={{ height: '30px', width: '30px', borderRadius: '50%', backgroundColor: '#BAA763', fontWeight: 'bold', color: 'white', padding: '2px 10px' }} >{review?.name?.charAt(0)}</div>

              <div className="reviewer d-flex">
                <div className="reviewer-name-section">

                  <div className="reviewer-name mx-3" style={{ fontWeight: "bold", fontSize: '1.2rem' }}>{review?.name}</div>
                  <div className="mx-3" style={{ color: 'grey', fontSize: '0.9rem' }}> Designer <span className='mx-1'>{convertDate(review?.date)}</span></div>

                </div>

                <div className="reviewer-rating" style={{ height: '30px', width: 'fit-content', padding: '3px 9px', borderRadius: '0.4rem', backgroundColor: '#d9d9d9' }}> <MdStar style={{ color: "#49B7CF" }} /> <span style={{ color: "#49B7CF" }}>{review.rating}</span></div>

                <div className="report-reviewer" style={{ position: 'relative', left: '47rem', color: 'grey', fontSize: '0.8rem' }} role="button" onClick={openReportModal}><MdOutlineReport className="mx-1" style={{ fontSize: '1rem' }} />Report</div>

              </div>

            </div>

            <div className="review-content" style={{ height: " 50%", width: "100%", marginTop: '25px', color: 'grey' }}>
              <p>{review.review}</p>
            </div>

            {(isClickedReply &&  Index === index) ?

              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Write your review..." name="reply" onChange={handleChange} required />
                </Form.Group>

                <div className="d-flex" style={{ gap: '1rem' }}>
                  <div role="button" style={{ color: '#3B5998', fontSize: '0.9rem', fontWeight: 'bold', }} onClick={() => handlePost(review._id, review.designerId)}>Post</div>
                  <div role="button" style={{ color: '#3B5998', fontSize: '0.9rem', fontWeight: 'bold' }} onClick={handleCancel}>Cancel</div>
                </div>

              </Form> : ""}

            {(!review.reply && Index !== index) ?

              <div className="reply-button" style={{ height: " 20%", width: "100%", }}>
                <div role="button" style={{ color: '#3B5998', fontSize: '0.9rem', fontWeight: 'bold' }} onClick={() => handleReplyClick(index)}> Reply</div>
              </div>

              : Index !== index ?
              <div className="mx-5" style={{ width: '100%' }}>
                <div className="d-flex" style={{ height: "30%", width: "100%" }}>
                  <div style={{ height: '30px', width: '30px', borderRadius: '50%', backgroundColor: '#6ABA63', fontWeight: 'bold', color: 'white', padding: '2px 10px' }} > {review?.reply?.replyByName?.charAt(0)} </div>

                  <div className="replier">
                    <div className="replier-name mx-3" style={{ fontWeight: "bold" }}>{review?.reply?.replyByName}</div>
                    <div className="replier-detail mx-3" style={{ fontSize: "12px", color: 'grey' }}>Interior Designer</div>

                  </div>
                </div>
                <p className="mx-5">{review?.reply?.text}</p>

              </div>:""}

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

export default ReviewsCard