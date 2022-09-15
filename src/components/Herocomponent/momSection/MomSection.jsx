import React from "react";
import "./MomSection.css";

function MomSection() {
  const data = [
    {
      date: "14 may 2022",
      title: "Discuss Furniture layout",
      worktag: "Layout",
      attendes: "Amrit Sunari,Dikshant Negi",
      points: "It is a long established fact that a reader will be directed.."
    },
    {
      date: "16 july 2022",
      title: "Discuss Furniture layout",
      worktag: "Layout",
      attendes: "Amrit Sunari,Dikshant Negi",
      points: "It is a long established fact that a reader will be directed.."
    },
    {
      date: "10 may 2022",
      title: "Discuss Furniture layout",
      worktag: "Layout",
      attendes: "Amrit Sunari,Dikshant Negi",
      points: "It is a long established fact that a reader will be directed.."
    },
    {
      date: "11 Apr 2022",
      title: "Discuss Furniture layout",
      worktag: "Layout",
      attendes: "Amrit Sunari,Dikshant Negi",
      points: "It is a long established fact that a reader will be directed.."
    }
  ]
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
        <table className="m-left-9">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Worktag</th>
              <th>Attendes</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.map(({ date, title, worktag, attendes, points }) => {
                return <tr className="table-row">
                  <td>
                  <input type="checkbox"/>  {date}</td>
                  <td>{title}</td>
                  <td>{worktag}</td>
                  <td>{attendes}</td>
                  <td>{points}</td>
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
