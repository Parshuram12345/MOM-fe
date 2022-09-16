import React, { useState } from "react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillDelete, AiOutlineShareAlt } from "react-icons/ai";
import { data } from "../../utils";
import "./MomSection.css";

function MomSection() {
  const [draftsflag, setDraftsflag] = useState(false)
  const [opendraftsbox, setOpendraftbox] = useState(false)
  const tableHeadings = data.tableHeadings;
  const Momdata = data.MomContent;
  const handleSharedDocs = (value) => {
    setDraftsflag(value)
  }
  const openShareDelete = () => {
    setOpendraftbox(!opendraftsbox)
  }
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
          <button className="mom-btn">Create a MOM</button>
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
              Momdata && Momdata.map(({ date, title, worktag, attendes, points }, index) => {
                return <tr key={index} className="table-row height-10">
                  <td className="date-cell text-align-center width-15 border-cells"><input className="checkbox-field" type="checkbox" />{date}</td>
                  <td className="border-cells">{title}</td>
                  <td className="border-cells">{worktag}</td>
                  <td className="border-cells">{attendes}</td>
                  <td className="points-cell border-cells">
                    <input type="text" className="points-field" value={points} />
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
      { opendraftsbox && <div className="d-flex-col share-del-wrapper position-absolute">
        <div> <AiOutlineShareAlt /> Share</div>
        {!draftsflag && <div>
          <AiFillDelete /> Delete</div>
        }
      </div>}
    </>
  );
}
export default MomSection;
