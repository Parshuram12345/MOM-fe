import React from "react";
import { data } from "../../utils";
import "./MomSection.css";


function MomSection() {
  const dotsArray = Array.from({ length: 3 })
  const tableHeadings = data.tableHeadings;
  const Momdata = data.MomContent;

  return (
    <div>
      <div className="d-flex-col">
        <div className="d-flex justify-between align-center w-75 m-auto-2">
          <div className="d-flex width-60 align-center justify-evenly">
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
        <div className="tab-wrapper d-flex justify-evenly">
          <div className="drafts-tab">Drafts</div>
          <div className="sents-tab">Sents</div>
        </div>
        <div className="ui divider"></div>
        <table className="content-table m-left-9">
          <thead>
            <tr>
              {
                tableHeadings && tableHeadings.map((elem) => <th className="text-align-left">{elem}</th>)
              }
            </tr>
          </thead>
          <tbody className="table-body">
            {
              Momdata && Momdata.map(({ id,date, title, worktag, attendes, points }) => {
                return <tr key={id} className="table-row height-10">
                  <td><input className="checkbox-field" type="checkbox" />{date}</td>
                  <td>{title}</td>
                  <td>{worktag}</td>
                  <td>{attendes}</td>
                  <td className="points-head d-flex">{points}
                    <div className="d-flex-col align-center justify-center m-auto">
                      {
                        dotsArray && dotsArray.map((index) => <div key={index} className="dots"></div>)
                      }
                    </div></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default MomSection;
