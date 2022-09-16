import React from "react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { data } from "../../utils";
import "./MomSection.css";


function MomSection() {
  const tableHeadings = data.tableHeadings;
  const Momdata = data.MomContent;

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
          <div className="drafts-tab">Drafts</div>
          <div className="sents-tab">Sents</div>
        </div>
        <div className="ui divider"></div>
        <table className="content-table">
          <thead>
            <tr>
              {
                tableHeadings && tableHeadings.map((elem) => <th className={ elem==="Date"? "text-align-center":"text-align-left"}>{elem}</th>)
              }
            </tr>
          </thead>
          <tbody className="table-body">
            {
              Momdata && Momdata.map(({ id,date, title, worktag, attendes, points }) => {
                return <tr key={id} className="table-row height-10">
                  <td className="date-cell text-align-center width-15 border-cells"><input className="checkbox-field" type="checkbox" />{date}</td>
                  <td className="border-cells">{title}</td>
                  <td className="border-cells">{worktag}</td>
                  <td className="border-cells">{attendes}</td>
                  <td className="points-cell border-cells">{points}
                    <span className="threedots">
                    <BsThreeDotsVertical/>
                    </span>
                    </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
export default MomSection;
