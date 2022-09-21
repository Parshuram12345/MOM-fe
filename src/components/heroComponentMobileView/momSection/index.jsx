import React, { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { CgChevronDoubleRightO } from 'react-icons/cg';
// import { AiFillDelete, AiOutlineShareAlt } from "react-icons/ai";
import { data } from "../../utils";
import "./momSection.css";

function MomSection() {
    const [draftsflag, setDraftsflag] = useState(false)
    // const [opendraftsbox, setOpendraftbox] = useState(false)
    const {access_token } = data;
    const [momdata, setMomdata] = useState([])
    const Momdata = data.MomContent;
    const handleSharedDocs = (value) => {
        setDraftsflag(value)
    }
    // const openShareDelete = () => {
    //     setOpendraftbox(!opendraftsbox)
    // }
    async function getApiData() {
        axios.get('https://pmt.idesign.market/api/mom/getMOM', {
            headers: {
                'Authorization': access_token
            }
        })
            .then((res) => {
                console.log(res.data.momData)
                setMomdata(res.data.momData)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    useEffect(() => {
        getApiData()
    }, [])
    console.log(momdata)
    return (
        <>
            <div className="padding-3 d-flex-col justify-around height-80">
                <div className="d-flex justify-between align-center divider-margin">
                    <div className="doublevector-icon"><CgChevronDoubleRightO /></div>
                    <div className="divider-bar">|</div>
                    <div className="mom-head font-w-500">Minutes of Meetings</div>
                    <i className="search icon"></i>
                    <Link to="/newmom">
                        <div className="edit-icon"><FaRegEdit /></div>
                    </Link>
                </div>
                <div className="d-flex width-40 justify-between divider-margin">
                    <div className={!draftsflag ? "drafts-tab" : "sents-tab"} onClick={() => handleSharedDocs(false)}>Drafts</div>
                    <div className={draftsflag ? "drafts-tab" : "sents-tab"} onClick={() => handleSharedDocs(true)}>Sent</div>
                </div>
                <hr/>
                <div className="momdata-wrapper d-flex-col divider-margin">
                {   Momdata && Momdata.map(({ date, title, worktag, points }, index) => {
                return <div key={index} className="mom-field border-df border-radius-5 divider-margin">
                    <div className="d-flex justify-around align-center padding-3">
                        <input type="checkbox" />
                        <div className="font-size-16 font-weight-500">{title}</div>
                        <div className="mom-layout color-text border-radius-25">#{worktag}</div>
                      <BsThreeDotsVertical />
                    </div>
                    <div className="mom-points text-align-justify">
                    {points}
                    </div>
                    <div className="d-flex justify-between align-center padding-3">
                    <div>{date}</div>
                    <div className="d-flex justify-between align-center width-20"><div className="as-on color-text border-radius-25">AS</div><div className="as-on color-text border-radius-25">ON</div></div>
                    </div>
                </div>
                })
            }
                </div>
            </div>
        </>
    );
}
export default MomSection;
