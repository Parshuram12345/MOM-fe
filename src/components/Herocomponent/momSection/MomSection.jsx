import React, { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillDelete, AiOutlineShareAlt } from "react-icons/ai";
import { data } from "../../utils";
import "./MomSection.css";

function MomSection() {
  const [draftsflag, setDraftsflag] = useState(false)
  const [opendraftsbox, setOpendraftbox] = useState(false)
  const { tableHeadings, access_token } = data;
  const [momdata,setMomdata]=useState([])
  const Momdata = data.MomContent;
  const handleSharedDocs = (value) => {
    setDraftsflag(value)
  }
  const openShareDelete = () => {
    setOpendraftbox(!opendraftsbox)
  }
  async function getApiData() {
     axios.get('https://pmt.idesign.market/api/mom/getMOM', {
      headers: {
        'Authorization':access_token
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
  },[])
  console.log(momdata)
  return (
    <>
      <div className="d-flex-col width-75 margin-left-3">
        <div className="momHead-wrapper d-flex justify-between align-center">
          <div className="d-flex width-50 align-center justify-between">
            <div className="mom-head font-w-500">Minutes of Meetings</div>
            <div className="ui fluid category search">
              <div className="ui icon input">
                <input className="prompt" id="search-bar" type="text" placeholder="Search" />
                <i className="search icon"></i>
              </div>
              <div className="results"></div>
            </div>
          </div>
          <Link to="/newmom">
            <button className="mom-btn">Create a MOM</button>
          </Link>
        </div>
        <div className="d-flex width-15 justify-between">
          <div className={!draftsflag ? "drafts-tab" : "sents-tab"} onClick={() => handleSharedDocs(false)}>Drafts</div>
          <div className={draftsflag ? "drafts-tab" : "sents-tab"} onClick={() => handleSharedDocs(true)}>Sents</div>
        </div>
        <div className="ui divider"></div>
        <table className="content-table">
          <thead>
            <tr>
              {
                tableHeadings && tableHeadings.map((elem) => <th className={elem === "Date" ? "text-align-center" : "text-align-left"}>{elem}</th>)
              }
            </tr>
          </thead>
          <tbody className="table-body position-relative">
            {
              Momdata && Momdata.map(({ date, title, worktag,category, points }, index) => {
                return <tr key={index} className="table-row height-10">
                  <td className="date-cell text-align-center width-15 border-cells"><input className="checkbox-field" type="checkbox" />{date}</td>
                  <td className="border-cells">{title}</td>
                  <td className="border-cells">{worktag}</td>
                  <td className="border-cells">{category}</td>
                  <td className="points-cell border-cells">
                    <input type="text" className="points-field" defaultValue={points} />
                    <span className="threedots" onClick={() => openShareDelete()}>
                      <BsThreeDotsVertical />
                    </span>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
      {opendraftsbox && <div className="d-flex-col share-del-wrapper position-absolute">
        <div> <AiOutlineShareAlt /> Share</div>
        {!draftsflag && <div>
          <AiFillDelete /> Delete</div>
        }
      </div>}
    </>
  );
}
export default MomSection;
