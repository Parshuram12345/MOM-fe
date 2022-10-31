import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./Styles/index.css";
import "./App.css";
import Home from "./views/Home";
import MomZeroStatePage from "./views/momZeroState";
import NewMomPage from "./views/newMOM";
import InnerPage from "./views/InnerPageMOM";
import { data } from "./components/utils";

export const MomContext = createContext("context");
function App() {
  const [momdate, setMomdate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [emaillist, setEmaillist] = useState([]);
  const [emailvalue, setEmailvalue] = useState();
  const [clientEmail, setClientEmail] = useState("");
  const [dateerror, setDateerror] = useState(false);
  const [categoryerror, setCategoryerror] = useState(false);
  const [pointserror, setPointserror] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [pointsdetails, setPointsdetails] = useState({});
  const [draftsflag, setDraftsflag] = useState(false);
  const [sentflag, setSentflag] = useState(false);
  const [momDraftsdata, setMomDraftsdata] = useState([]);
  const [momSentdata, setMomSentdata] = useState([]);
  const [shareMom, setShareMom] = useState(false);
  const [roomName, setRoomName] = useState([]);
  const [updatedraftId, setUpdatedraftId] = useState("");
  const [bulletPoints, setBulletPoints] = useState("");
  const [newDraftUnread, setNewDraftUnread] = useState(false);
  const [newSentUnread, setNewSentUnread] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [designerEmail, setDesignEmail] = useState("");
  const { access_token, BaseUrl, userId, monthList } = data;
  const { projectId, id } = useParams;
  const navigate = useNavigate();
  ///---navigate to home page -----///
  const navigateHome = (projectId) => {
    setShareMom(false)
    navigate(`/${projectId}`);
  };
 
   ///----date not select greater than current date-----////
   function maxDateCurrent(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    const todayupdate = yyyy + '-' + mm + '-' + dd;
    return todayupdate
  }
  
  ///-----share condition in draft threedots open mom with same id----///
  const handleShareMOM = (value, projectId,id) => {
    setShareMom(value);
    navigate(`/newmom/${projectId}/${id}`);
  };
  ///------Edit the draft data and post it-----///
  const handleEditDraft = (projectId,id) => {
    setNewDraftUnread(true);
    setUpdatedraftId(id);
    navigate(`/newmom/${projectId}/${id}`);
  };
  ///-----remove the email----///
  const removeEmail = (indexToRemove) => {
    setEmaillist([...emaillist.filter((_, index) => index !== indexToRemove)]);
  };
  ///----add the email with validation---///
  const addEmail = (event) => {
    console.log(event.target.value);
    let regex = "^(.+)@(.+)$";
    let mailformat = /^\w+([\.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (event.target.value !== "") {
      if (event.target.value.match(mailformat) || event.target.value.match(regex)) {
        setEmaillist([...emaillist, event.target.value]);
        event.target.value = "";
        setEmailValid(false);
      } else {
        setEmailValid(true);
      }
    }
  };

  ///----open share modal code--////
  const openshareMomModal = (value,projectId,id) => {
    if (value) {
      navigate(`/${projectId}/${id}`)
      setOpenShareModal(value);
    } else {
      setShareEmail("")
      setOpenShareModal(value);
    }
  }
  ///---set state of email -----///
  const shareEmailFormat = (event) => {
    setShareEmail(event.target.value);
  };
 
  ///---remove the zero the when month number is less than 10-----///
  const makeMonthFormat=(str)=>{
       if(str.charAt(0)==0){
           return monthList[str.charAt(1)]
          }
          else{
          return monthList[str]
       }
  }
  ///--share the particular MOM -----///
  async function shareMOMApi(projectId,shareBodyData) {
    fetch("https://email-api.idesign.market/api/mom/send-mom-pdf", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: shareBodyData,
    })
      .then((response) => {
        return response.json()
      })
      .then((data)=>{
        if (data.status === 200) {
          navigate(`/${projectId}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ///---get api form single mom data ----///
  async function getSingleMOMApiData(id) {
    return await axios.get(`${BaseUrl}/api/mom/getMOM?id=${id}`, {
      headers: {
        Authorization: access_token,
      },
    });
  }
  
  ///--- added the new share mom email in already shared email----///
async function saveSharedEmailApi(alreadySharedEmail,sharedemail,projectId,id){
  let allemailarray  = [...alreadySharedEmail,sharedemail]
  const bodydata = JSON.stringify({
    id:id,
    projectId:projectId,
    sharedWith:[...new Set(allemailarray)]
  })
  await fetch(`${BaseUrl}/api/mom/addEditMOM/`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token,
    },
    body: bodydata
  })
  .then((response)=>{
    window.location.reload(false)
    return response.json()
  })
  .then((data)=>{
     console.log(data)
  })
  .catch((err)=>{
    console.log(err)
  })
}

  ///---share MOM with email----///
  const sharedMOMWithEmail = (projectId,id) => {
    let regex = "^(.+)@(.+)$";
    let mailformat = /^\w+([\.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (shareEmail.match(mailformat) || shareEmail.match(regex)) {
      setEmailCheck(false);
      setOpenShareModal(false);
      setShareEmail("")
      getSingleMOMApiData(id)
        .then((res) => {
          if (res.status === 200) {
            let responseWithId = res?.data?.momData[0];
            console.log(responseWithId)
            saveSharedEmailApi(responseWithId.sharedWith,shareEmail,projectId,id)
            const shareBodyData = JSON.stringify({
              id: id,
              replyToEmail: designerEmail,
              date: `${responseWithId?.date?.substring(8, 10)} ${
                makeMonthFormat(responseWithId?.date?.substring(5, 7))
              } ${responseWithId?.date?.substring(0, 4)}`,
              category: responseWithId?.category,
              location: responseWithId?.location,
              title: responseWithId?.title,
              email: [shareEmail],
              companyName: companyName,
              points: responseWithId?.points,
            });
            shareMOMApi(projectId,shareBodyData);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      setEmailCheck(true);
    }
  };
  ///------add the points with bullets point in field -----///
  ///----update the point state in array string with key enter'----///
  let previouslength = 0;
  const handlePointsTextArea = (e) => {
    const bullet = "\u2022";
    const newlength = e.target.value.length;
    const AsciiValue = e.target.value.substr(-1).charCodeAt(0);

    if (AsciiValue === 8226 && bullet !== e.target.value) {
      e.target.value = e.target.value.slice(0, -1);
    } else if (bullet === e.target.value) {
      e.target.value = "";
      setBulletPoints("");
    }
    if (newlength > previouslength) {
      if (AsciiValue === 10) {
        e.target.value = `${e.target.value}${bullet} `;
      } else if (newlength === 1) {
        e.target.value = `${bullet} ${e.target.value}`;
      }
      setBulletPoints(e.target.value);
    }
    previouslength = newlength;
  };

  ///got to mom inner page ----///
  const gotoInnerMom = (projectId,id) => {
    console.log("innerpage")
    if (!draftsflag) {
      setNewDraftUnread(true);
    } else {
      setNewSentUnread(true);
    }
    navigate(`/mominnerpage/${projectId}/${id}`);
  };

  ///---get client project ---////
  async function getClientProject(projectId) {
    return await axios.get(
      `${BaseUrl}/api/projects/getProjects?projectId=${projectId}`,
      {
        headers: {
          Authorization: access_token,
        }
      }
    );
  }

  //---save the data as Draft---///
  const handleSaveDraft = (projectId, id) => {
    // console.log("save as draft")
    if (shareMom) {
      setShareMom(false);
    }
    if (momdate && category && bulletPoints) {
      const bodyData = JSON.stringify({
        id: (updatedraftId && updatedraftId) || (id && id),
        date: momdate,
        category: category,
        location: location,
        title: title,
        projectId: projectId,
        sharedWith: [...new Set(emaillist)],
        points:
          bulletPoints &&
          bulletPoints
            .trim()
            .split("\u2022")
            .filter((emptystr) => emptystr !== "" && emptystr !== " \n"),
      });
      fetch(`${BaseUrl}/api/mom/addEditMOM/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: bodyData,
      })
        .then((response) => {
          if (response.ok) {
            setDateerror(false);
            setCategoryerror(false);
            setPointserror(false);
            navigate(`/${projectId}`);
            setMomdate("");
            setCategory("");
            setLocation("");
            setTitle("");
            setBulletPoints("");
          }
          return response.json()
        })
        .then((data) => {
          // console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    momdate ? setDateerror(false) : setDateerror(true);
    category ? setCategoryerror(false) : setCategoryerror(true);
    bulletPoints ? setPointserror(false) : setPointserror(true);
  };


  ////-----post the with submit btn data ------///
  const handleSubmitData = (projectId, id) => {
    if (shareMom) {
      setShareMom(false)
    }
    if (momdate && category && bulletPoints) {
      const bodyData = JSON.stringify({
        id: updatedraftId && updatedraftId,
        date: momdate,
        category: category,
        location: location,
        title: title,
        isDraft: false,
        projectId: projectId,
        sharedWith: [...new Set(emaillist)],
        points:
          bulletPoints &&
          bulletPoints
            .trim()
            .split("\u2022")
            .filter((emptystr) => emptystr !== "" && emptystr !== " \n"),
      });

      fetch(`${BaseUrl}/api/mom/addEditMOM/`, {
        method: "post",
        headers: {
          "Access-Control-Allow-Methods":"*",
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: bodyData,
      })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
          if(data){
              const shareBodyData = JSON.stringify({
                date: `${momdate.substring(8, 10)} ${
                  monthList[momdate.substring(5, 7)]
                } ${momdate.substring(0, 4)}`,
                id: data._id,
                replyToEmail: designerEmail,
                category: category,
                location: location,
                title: title,
                email: [...new Set(emaillist)],
                companyName: companyName,
                points:
                  bulletPoints &&
                  bulletPoints
                    .trim()
                    .split("\u2022")
                    .filter((emptystr) => emptystr !== "" && emptystr !== " \n" ),
              });
              shareMOMApi(projectId,shareBodyData)
              navigate(`/${projectId}`);
              setMomdate("");
              setCategory("");
              setLocation("");
              setTitle("");
              setBulletPoints("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setDateerror(false);
      setCategoryerror(false);
      setPointserror(false);
    }
    momdate ? setDateerror(false) : setDateerror(true);
    category ? setCategoryerror(false) : setCategoryerror(true);
    bulletPoints ? setPointserror(false) : setPointserror(true);
  };
  ////-----get user id from get profile -----////
  async function getUserId() {
    return await axios.get(`https://pro-api.idesign.market/user/profile`, {
      headers: {
        Authorization: `bearer ${access_token}`,
      },
    });
  }

  // let bullet= ".\u2022";
  useEffect(() => {
    getUserId()
      .then((response) => {
        setDesignEmail(response.data.data.email);
        setCompanyName(response.data.data.companyName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <MomContext.Provider
        value={{
          momDraftsdata,
          setMomDraftsdata,
          momSentdata,
          setMomSentdata,
          momdate,
          setMomdate,
          category,
          setCategory,
          location,
          setLocation,
          title,
          setTitle,
          emaillist,
          setEmaillist,
          emailvalue,
          setEmailvalue,
          bulletPoints,
          setBulletPoints,
          dateerror,
          setDateerror,
          categoryerror,
          setCategoryerror,
          pointserror,
          setPointserror,
          pointsdetails,
          setPointsdetails,
          draftsflag,
          setDraftsflag,
          sentflag,
          setSentflag,
          shareMom,
          setShareMom,
          emailValid,
          roomName,
          setRoomName,
          clientEmail,
          setClientEmail,
          openShareModal,
          setOpenShareModal,
          openshareMomModal,
          newDraftUnread,
          newSentUnread,
          shareEmail,
          emailCheck,
          shareEmailFormat,
          sharedMOMWithEmail,
          shareEmailFormat,
          handleShareMOM,
          gotoInnerMom,
          handleSaveDraft,
          handleEditDraft,
          addEmail,
          removeEmail,
          getClientProject,
          handlePointsTextArea,
          handleSubmitData,
          bulletPoints,
          navigateHome,
          getSingleMOMApiData,
          // navigateNewMOM
          makeMonthFormat,
          maxDateCurrent,
          saveSharedEmailApi
        }}
      >
        <Routes>
          <Route exact path="/:projectId" element={<Home />} />
          <Route path="/:projectId/:id" element={<Home />} />
          <Route path="/mominnerpage/:projectId/:id" element={<InnerPage />} />
          <Route
            path="/momzerostate/:projectId"
            element={<MomZeroStatePage />}
          />
          <Route path="/newmom/:projectId" element={<NewMomPage />} />
          <Route path="/newmom/:projectId/:id" element={<NewMomPage />} />
        </Routes>
      </MomContext.Provider>
    </>
  );
}
export default App;
