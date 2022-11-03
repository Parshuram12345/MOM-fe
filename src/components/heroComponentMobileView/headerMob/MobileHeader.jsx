import React, { useEffect, useContext,useState } from 'react';
import { allImagesList } from './../../utils/images';
import { AiFillCaretDown } from "react-icons/ai";
import { momContext } from "./../../../MobileApp";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../../utils"

function MobileHeader() {
  const { projectId, id } = useParams();
  const navigate = useNavigate()
  const [diffDay,setDiffDay]=useState()
  const [diffHour,setDiffHour]=useState()
  const { backArrow, fullDots } = allImagesList;
  const { access_token, BaseUrl } = data;
  const {
    getClientProject,
    navigateHome,
    designerName,
    setDesignerName,
    designerLocation,
    setDesignerLocation,
    designerStatus,
    setDesignerStatus,
  } = useContext(momContext);

  ///status code convert to in 1,2,3 in unReadable format-----///
  const handleStatusCode = (e) => {
    let statusCode;
    switch (e) {
      case "Active":
        return statusCode = 1;
      case "Inactive":
        return statusCode = 2;
      case "Completed":
        return statusCode = 3;
    }
  }

  ///status convert to in 1,2,3 in readable format-----///
  const handleStatusCodeReadableFormat = (status) => {
    let statusCode;
    switch (status) {
      case 1:
        statusCode = "Active";
        break;
      case 2:
        statusCode = "Inactive";
        break;
      case 3:
        statusCode = "Completed";
        break;
    }
    return statusCode
  }
  const handleUpdateStatus = async (projectId) => {
    console.log(handleStatusCode(designerStatus))
    const bodydata = JSON.stringify({
      status: handleStatusCode(designerStatus),
      id: projectId
    })
    await fetch(`${BaseUrl}/api/projects/addEditProject`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: bodydata
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })

  }
  useEffect(()=>{
     ///---update the status----///
     handleUpdateStatus(projectId)
  },[designerStatus])
  useEffect(() => {
    //---get client name from client data----///
    getClientProject(projectId)
      .then((res) => {
        const updatedUnix = new Date(res.data.projects[0]?.updatedAt).getTime();
        const currentUnix = new Date().getTime();
        setDiffDay( Math.floor((currentUnix - updatedUnix) / 1000 / 60 / 60 / 24))
        setDiffHour( Math.floor((currentUnix - updatedUnix) / 1000 / 60 / 60))
        setDesignerStatus(handleStatusCodeReadableFormat(res.data.projects[0].status));
        setDesignerName(res.data.projects[0].name)
        setDesignerLocation(res.data.projects[0].location)
       
      })
      .catch((error) => {
        console.error(error);
      });
    
  },[])
  return (
    <div style={{ padding: "10px" }} className='d-flex justify-between align-center'>
      <div onClick={() => navigateHome(projectId)}>
        <img src={backArrow} alt="back-arrow" />
      </div>
      <div style={{ marginLeft: "12px" }} className='d-flex- justify-between align-center'>
        <div style={{fontSize:"16px"}} className='font-weight-500 color-text-000000'>{designerName}</div>
        <span className='small-font-12'>{designerLocation}</span>
        <img style={{ margin: "0 5px" }} src={fullDots} alt="full-dots" />
        <span className="position-relative">
          <select value={handleStatusCode(designerStatus)} onChange={(e) => setDesignerStatus(e.target.value)} className="border-df bg-color-fa border-radius-4 small-font-12">
            <option value="1">Active</option>
            <option value="2">Inactive</option>
            <option value="3">Completed</option>
          </select>
          <AiFillCaretDown
            style={{ background: "#FAFAFA", top: "2px", width:"12%",right:"4px" }}
            className="position-absolute right-3  color-text-888888"
          />
        </span>
        <span style={{ marginLeft: "12px" }} className='small-font-12'>{diffDay > 1 ? `${diffDay}d ago` : `${diffHour}h ago`}</span>
      </div>
    </div>
  )
}

export default MobileHeader;