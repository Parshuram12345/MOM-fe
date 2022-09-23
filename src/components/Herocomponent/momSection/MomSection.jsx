import React, { useState, useEffect } from "react";
import axios from "axios"
import { Link,useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillDelete, AiOutlineShareAlt } from "react-icons/ai";
import { data } from "../../utils";
import "./MomSection.css";
// import { pointsData } from "../../utils/StaticData/MomContent";

function MomSection() {
  const [draftsflag, setDraftsflag] = useState(false)
  const [opendraftsbox, setOpendraftbox] = useState(false)
  const [momdata,setMomdata]=useState([])
  const [points3dots,setPoints3dots]=useState([])
  const { tableHeadings, access_token,pointsData } = data;
  const navigate = useNavigate()
  const Momdata = data.MomContent;
  ///----sharedocs -----
  const handleSharedDocs = (value) => {
    setDraftsflag(value)
  }
  ///----opensharebox-----///
  const openShareDelete = () => {
    setOpendraftbox(!opendraftsbox)
  }
  ///----add three dots after limit out ----///
  function add3Dots(){
    let dots = "...";
    // let newpointsArr=[];
  let limit =30;
  for (let i=0;i<pointsData.length;i++){
    console.log(pointsData[i])
    if(pointsData[i].length >limit)
    {
      // you can also use substr instead of substring
      setPoints3dots(pointsData[i].substring(0,limit) + dots);
    }
  }
}
  const navigateInnerPage =()=>{
       navigate("/mominnerpage")
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
    add3Dots()
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
            <button className="mom-btn border-radius-4">Create a MOM</button>
          </Link>
        </div>
        <div className="d-flex width-15 justify-between">
          <div className={!draftsflag ? "drafts-tab" : "sents-tab"} onClick={() => handleSharedDocs(false)}>Drafts</div>
          <div className={draftsflag ? "drafts-tab" : "sents-tab"} onClick={() => handleSharedDocs(true)}>Sents</div>
        </div>
        {/* <div className="ui divider"></div> */}
        <hr/>
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
              Momdata && Momdata.map(({ date, title, worktag,attendes, points }, index) => {
                return <tr key={index}
                 onClick={()=>navigateInnerPage()}
                  className="table-row height-10 border-radius-4">
                  <td className="date-cell text-align-center width-15 border-cells border-radius-left-cells"><input className="checkbox-field" type="checkbox" />{date}</td>
                  <td className="border-cells">{title}</td>
                  <td className="border-cells">{worktag}</td>
                  <td className="border-cells">{attendes}</td>
                  <td className="points-cell border-cells border-radius-right-cells">
                  <td className="points-field d-flex align-center">{points3dots}
                    <span className="threedots" onClick={() => openShareDelete()}>
                      <BsThreeDotsVertical />
                    </span>
                  </td>
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
