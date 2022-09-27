import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineDelete} from "react-icons/ai";
import {HiOutlineShare} from "react-icons/hi"
import { FaGreaterThan } from "react-icons/fa";
import { data } from "../../utils";
import "./MomSection.css";
import { MomContext } from "../../../App.jsx";
// import { pointsData } from "../../utils/StaticData/MomContent";

function MomSection() {
  const { gotoInnerMom, draftsflag, setDraftsflag, sentflag, setSentflag } =
    useContext(MomContext);
  // const [draftsflag, setDraftsflag] = useState(false);
  // const [sentflag, setSentflag] = useState(false);
  const [opendraftsbox, setOpendraftbox] = useState(false);
  const [momdata, setMomdata] = useState([]);
  // const [points3dots, setPoints3dots] = useState([]);
  const [users, setUsers] = useState([]);
  const { access_token, pointsData } = data;

  const Momdata = data.MomContent;
  ///----draftsdocs -----
  const handleSharedDocs = () => {
    setDraftsflag(false);
    setSentflag(true);
  };
  ///=----sentdocs----////
  const handleSentDocs = () => {
    setDraftsflag(true);
    setSentflag(false);
  };
  ///----opensharebox-----///
  const openShareDelete = () => {
    setOpendraftbox(!opendraftsbox);
  };
  ///----add three dots after limit out ----///
  function add3Dots(pointslist) {
    // console.log(pointslist)
    let dots = "...";
    let limit = 30;
    if (pointslist[0].length > limit) {
      //   // you can also use substr instead of substring
      return pointslist[0].substring(0, limit) + dots;
    } else {
      return pointslist[0];
    }
  }
  ///-----all checkbox ----///
  ///---checkbox functionlality---///
  const handleSelectAll = (e) => {
    const { checked } = e.target;
    const check = document.getElementsByName("datacheck");
    if (checked) {
      for (let i = 0; i < check.length; i++) {
        check[i].checked = true;
      }
    } else {
      for (let i = 0; i < check.length; i++) {
        check[i].checked = false;
      }
    }
  };

  async function getApiData() {
    axios
      .get("https://pmt.idesign.market/api/mom/getMOM", {
        headers: {
          Authorization: access_token,
        },
      })
      .then((res) => {
        console.log(res.data.momData);
        setMomdata(res.data.momData);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  ///----api fetch data-----
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <>
      <div className="d-flex-col width-75 margin-left-3">
        <div className="d-flex align-center justify-between width-15 divider-margin">
          <div className="small-font-10 color-text-888888">
            Ashok rathi residence
          </div>
          <span className="d-flex align-center color-text-888888 small-font-10">
            <FaGreaterThan />
          </span>
          <div className="color-text font-weight-500 small-font-10">MOM</div>
        </div>
        <div className="momHead-wrapper d-flex justify-between align-center">
          <div className="d-flex width-60 align-center justify-between">
            <div className="mom-head font-w-500">Minutes of Meetings</div>
            <div className="ui fluid category search">
              <div className="ui icon input">
                <input
                  style={{ borderRadius: "4px" }}
                  className="prompt"
                  id="search-bar"
                  type="text"
                  placeholder="Search"
                />
                <i className="search icon"></i>
              </div>
              <div className="results"></div>
            </div>
          </div>
          <Link to="/newmom">
            <button className="mom-btn border-radius-4">Create a MOM</button>
          </Link>
        </div>
        <div className="d-flex width-15 justify-between">
          <div
            className={`font-weight-500 ${
              !draftsflag ? "drafts-tab" : "sents-tab"
            }`}
            onClick={() => handleSharedDocs()}
          >
            Drafts
          </div>
          <div
            className={`font-weight-500 ${
              draftsflag ? "drafts-tab" : "sents-tab"
            }`}
            onClick={() => handleSentDocs()}
          >
            Sent
          </div>
        </div>
        <div style={{ marginTop: "0%" }} className="ui divider"></div>
        <table className="content-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="allselect"
                  onClick={(e) => handleSelectAll(e)}
                />
              </th>
              <th className="table-heading text-align-left">Date</th>
              <th className="table-heading text-align-left">Title</th>
              <th className="table-heading text-align-left">Worktag</th>
              {draftsflag && (
                <th className="table-heading text-align-left">Attendes</th>
              )}
              <th className="table-heading text-align-left">Points</th>
            </tr>
          </thead>
          <tbody className="table-body position-relative">
            {Momdata &&
              Momdata.map(
                ({ date, title, worktag, attendes, points }, index) => {
                  return (
                    <tr
                      key={index}
                      className="table-row height-7 border-radius-4 font-weight-400 color-text-000000"
                    >
                      <td className="checkbox-cell width-4 border-cells border-radius-left-cells">
                        <input
                          className="checkbox-field"
                          type="checkbox"
                          name="datacheck"
                          value={`name${index}`}
                        />
                      </td>
                      <td
                        className="border-cells"
                        onClick={() => gotoInnerMom(index)}
                      >
                        {date}
                      </td>
                      <td
                        className="border-cells"
                        onClick={() => gotoInnerMom(index)}
                      >
                        {title}
                      </td>
                      <td
                        className="border-cells"
                        onClick={() => gotoInnerMom(index)}
                      >
                        {worktag}
                      </td>
                      {draftsflag && (
                        <td className="border-cells">{attendes}</td>
                      )}
                      <td
                        className={`width-23 ${ !sentflag ? "points-cell border-cells border-radius-right-cells":"border-cells"}`}
                        onClick={() => gotoInnerMom(index)}
                      >
                        {add3Dots(points)}
                      </td>
                      { !draftsflag && 
                      <td
                        className="threedots points-cell border-cells border-radius-right-cells"
                        onClick={() => openShareDelete()}
                      >
                        <BsThreeDotsVertical />
                      </td>}
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
      {opendraftsbox && (
        <div className="d-flex-col share-del-wrapper width-6 position-absolute">
          <div className="d-flex justify-evenly">
          <span className="d-flex share-icon align-center">
              <HiOutlineShare />
            </span> Share
          </div>
          {!draftsflag && (
            <div className="d-flex justify-evenly">
              <span className="d-flex share-icon align-center">
              <AiOutlineDelete />
              </span> 
               Delete
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default MomSection;
