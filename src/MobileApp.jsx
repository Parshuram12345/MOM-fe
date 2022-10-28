import React, { useState, createContext } from "react";
import axios from "axios";
import NewMomMobilePage from "./mobileViews/newMOM";
import MomZeroStateMobilePage from "./mobileViews/momZeroState";
import MomMainSectionMobilePage from "./mobileViews/MomMainSection";
import InnerMomPage from "./mobileViews/InnerPageMom";
import "./Styles/mobile/mobile.css";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { data } from "./components/utils";
import { useEffect } from "react";
export const momContext = createContext("context");

function MobileApp() {
  const [selectdate, setSelectdate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [emaillist, setEmaillist] = useState([]);
  const [emailvalue, setEmailvalue] = useState("");
  const [pointsdata, setPointsdata] = useState("");
  const [dateerror, setDateerror] = useState(false);
  const [categoryerror, setCategoryerror] = useState(false);
  const [pointserror, setPointserror] = useState(false);
  const [pointsdetails, setPointsdetails] = useState({});
  const [momdraftsdata, setMomdraftsdata] = useState([]);
  const [momsentdata, setMomsentdata] = useState([]);
  const [sharemom, setSharemom] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [roomName, setRoomName] = useState([]);
  const [updatedraftusingId, setUpdatedraftsusingId] = useState("");
  const [clientName, setClientName] = useState("");
  const [companyName,setCompanyName]=useState("");
  const [designerEmail,setDesignEmail]=useState("")
  const [openShareModal,setOpenShareModal]=useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const {access_token, BaseUrl,monthList} = data;
  const navigate = useNavigate();
  const {projectId}=useParams()
  ///-----share condition with open newmom----///
  const handleSharedMOMdata = (projectId,value,id) => {
    setSharemom(value);
    navigate(`/newmom/${projectId}/${id}`);
  };
  ///-----remove the email----///
  const removeEmail = (indexToRemove) => {
    setEmaillist([...emaillist.filter((_, index) => index !== indexToRemove)]);
  };

  ///----add the email with validation---///
  const addEmail = (event) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (event.target.value !== "") {
      if (event.target.value.match(mailformat)) {
        setEmaillist([...emaillist, event.target.value]);
        event.target.value = "";
        setEmailValid(false);
      } else {
        setEmailValid(true);
      }
    }
  };
  ///------add the points with bullets point in field -----///
  ///----update the point state in array string with key enter'----///
  let previouslength = 0;
  const handlePointsTextArea = (e) => {
    const bullet = "\u2022";
    const newlength = e.target.value.length;
    const AsciiValue= e.target.value.substr(-1).charCodeAt(0);
    
    if(AsciiValue===8226 && bullet !==e.target.value){
     e.target.value = e.target.value.slice(0,-1)
    }
    else if(bullet ===e.target.value){
           e.target.value=""
           setPointsdata("")
    }
    if(newlength>previouslength){
      if(AsciiValue===10){
        e.target.value = `${e.target.value}${bullet} `;
     }
     else if( newlength===1){
       e.target.value = `${bullet} ${e.target.value}`;
     }
     setPointsdata(e.target.value)
   }
   previouslength =newlength;
  }
  ///---- got to home page ----///
  const navigateHome=(projectId)=>{
    navigate(`/${projectId}`)
  }

  ///------navigate to MOM inner page -----///
  const naviagteInnerPage = (projectId,id) => {
    navigate(`/mominnerpage/${projectId}/${id}`);
  };
  
  ///---edit the draft data -----////
  const handleEditDraftdata = (projectId,id) => {
    setUpdatedraftsusingId(id);
    navigate(`/newmom/${projectId}/${id}`);
  };

   ///----open share modal code--////
   const openSharePopUp = (value,projectId,id) => {
    if(value){
      setOpenShareModal(value);
      navigate(`/${projectId}/${id}`)
    }
    else{
      setOpenShareModal(value);
      navigate(`/${projectId}`)
    }
  };

  async function shareMOMApi(shareBodyData){
    fetch("https://email-api.idesign.market/api/mom/send-mom-pdf", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: shareBodyData,
    })
    .then((res)=>{
      if(res.status===200){
        navigate(`/${projectId}`)
      }
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  ///---share MOM with email----///
  const sharedMOMWithEmail = (projectId,id) => {
    let mailformat =/^\w+([\.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (shareEmail.match(mailformat)) {
      setEmailValid(false);
      setOpenShareModal(false)
      // setShareEmail("");
      getSingleMomApiData(id)
      .then((res)=>{
        if(res.status===200){
          let responseWithId = res?.data?.momData[0];
          console.log(responseWithId)
          const shareBodyData = JSON.stringify({
            id:id,
            replyToEmail: designerEmail,
            date:`${responseWithId?.date?.substring(8, 10)} ${monthList[responseWithId?.date?.substring(5,7)]} ${responseWithId?.date?.substring(0, 4)}`,
            category: responseWithId?.category,
            location: responseWithId?.location,
            title: responseWithId?.title,
            email: [shareEmail],
            companyName:companyName,
            points:responseWithId?.points,
          });
          shareMOMApi(shareBodyData)
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    } else {
      setEmailValid(true);
    }
  };

  ///---save the draft data----////
  const handleSaveDraftData = (projectId,id) => {
    if (selectdate && category && pointsdata) {
      const bodyData = JSON.stringify({
        id: updatedraftusingId && updatedraftusingId || id && id,
        date: selectdate,
        category: category,
        location: location,
        projectId: projectId,
        title: title,
        sharedWith:emaillist,
        points:
          pointsdata &&
          pointsdata.trim().split("\u2022").filter((emptystr) => emptystr !== ""),
      });
      fetch(`${BaseUrl}/api/mom/addEditMOM`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: bodyData,
      })
        .then((response) => {
          if (response.ok) {
            navigate(`/${projectId}`);
            setSelectdate("");
            setCategory("");
            setLocation("");
            setTitle("");
            setPointsdata("");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
      setDateerror(false);
      setCategoryerror(false);
      setPointserror(false);
    }
    selectdate ? setDateerror(false) : setDateerror(true);
    category ? setCategoryerror(false) : setCategoryerror(true);
    pointsdata ? setPointserror(false) : setPointserror(true);
  };
  ///---post the data----//
  const handleSubmitData = (projectId,id) => {
    const bodyData = JSON.stringify({
      id: updatedraftusingId && updatedraftusingId,
      date: selectdate,
      category: category,
      location: location,
      projectId: projectId,
      title: title,
      isDraft: false,
      sharedWith:emaillist,
      points:
        pointsdata &&
        pointsdata.trim().split("\u2022").filter((emptystr) => emptystr !== ""),
    });

    const shareBodyData = JSON.stringify({
      date:`${selectdate.substring(8, 10)} ${monthList[selectdate.substring(5,7)]} ${selectdate.substring(0, 4)}`,
      id:id,
      replyToEmail: designerEmail,
      category: category,
      location: location,
      title: title,
      email: emaillist,
      companyName:companyName,
      points:
      pointsdata &&
      pointsdata
      .trim()
      .split("\u2022")
      .filter((emptystr) => emptystr !== ""),
    });

    if (selectdate && category && pointsdata) {
      ///----share the mom with email ------////
      shareMOMApi(shareBodyData)
      ///--save the mom data ----///
      fetch(`${BaseUrl}/api/mom/addEditMOM`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: bodyData,
      })
        .then((response) => {
          if (response.ok) {
            navigate(`/${projectId}`);
            setSelectdate("");
            setCategory("");
            setLocation("");
            setTitle("");
            setPointsdata("");
          }
          return response.json();
        })
        .then((data) => {
          // console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
      setDateerror(false);
      setCategoryerror(false);
      setPointserror(false);
    }
    selectdate ? setDateerror(false) : setDateerror(true);
    category ? setCategoryerror(false) : setCategoryerror(true);
    pointsdata ? setPointserror(false) : setPointserror(true);
  };
  ///---get client project ---////
  async function getClientProject(projectId) {
    return await axios.get(
      `https://pmt.idesign.market/api/projects/getProjects?projectId=${projectId}`,
      {
        headers: {
          Authorization: access_token,
        },
      }
    );
  }
   ///---play with error ----///
   if (selectdate && dateerror) {
    setDateerror(false);
  }
  if (category && categoryerror) {
    setCategoryerror(false);
  }
  if (pointsdata && pointserror) {
    setPointserror(false);
  }
 
   ////-----get user id from get profile -----////
   async function getUserId() {
    return await axios.get(`https://pro-api.idesign.market/user/profile`, {
      headers: {
        Authorization:  `bearer ${access_token}`,
      },
    })
  }
 
  ////-----get api data -----///
  async function getSingleMomApiData(id) {
    return axios.get(`${BaseUrl}/api/mom/getMOM?id=${id}`, {
      headers: {
        Authorization: access_token,
      },
    });
  }


  useEffect(()=>{
    getUserId()
    .then((response)=>{
      setDesignEmail(response.data.data.email)
      setCompanyName(response.data.data.companyName)
     })
     .catch((err)=>{
       console.log(err)
     })
   },[])

  return (
    <>
      <momContext.Provider
        value={{
          selectdate,
          setSelectdate,
          category,
          setCategory,
          location,
          setLocation,
          title,
          setTitle,
          emailvalue,
          setEmailvalue,
          pointsdata,
          setPointsdata,
          dateerror,
          setDateerror,
          categoryerror,
          setCategoryerror,
          pointserror,
          naviagteInnerPage,
          pointsdetails,
          setPointsdetails,
          setPointserror,
          emaillist,
          setEmaillist,
          momdraftsdata,
          setMomdraftsdata,
          momsentdata,
          setMomsentdata,
          sharemom,
          setSharemom,
          emailValid,
          setEmailValid,
          roomName,
          setRoomName,
          clientName,
          setClientName,
          setEmailValid,
          getClientProject,
          handleSharedMOMdata,
          addEmail,
          removeEmail,
          handlePointsTextArea,
          handleEditDraftdata,
          handleSubmitData,
          handleSaveDraftData,
          navigateHome,
          getSingleMomApiData,
          setOpenShareModal,
          shareEmail,
          setShareEmail,
          openShareModal,
          sharedMOMWithEmail,
          openSharePopUp
        }}
      >
        <Routes>
          <Route exact path="/:projectId" element={<MomMainSectionMobilePage />} />
          <Route exact path="/:projectId/:id" element={<MomMainSectionMobilePage />} />
          <Route path="/momzerostate" element={<MomZeroStateMobilePage />} />
          <Route path="/newmom/:projectId" element={<NewMomMobilePage />} />
          <Route path="/newmom/:projectId/:id" element={<NewMomMobilePage />} />
          <Route path="/mominnerpage/:projectId/:id" element={<InnerMomPage />} />
        </Routes>
      </momContext.Provider>
    </>
  );
}

export default MobileApp;
