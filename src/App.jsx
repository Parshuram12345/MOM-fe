import React, { useState, createContext } from "react";
import axios from "axios";
import { Route, Routes, useNavigate} from "react-router-dom";
import "./Styles/index.css";
import Home from "./views/Home";
import MomZeroStatePage from "./views/momZeroState";
import NewMomPage from "./views/newMOM";
import InnerPage from "./views/InnerPageMOM";
import { data } from "./components/utils";
import { useEffect } from "react";
export const MomContext = createContext("context");
function App() {
  const [momdate, setMomdate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [emaillist, setEmaillist] = useState([]);
  const [emailvalue, setEmailvalue] = useState();
  const [clientName, setclientName] = useState("");
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
  const [updatedraftId,setUpdatedraftId]=useState("");
  const [bulletPoints, setBulletPoints] = useState("");
  const [ newDraftUnread,setNewDraftUnread]=useState(false)
  const [ newSentUnread,setNewSentUnread]=useState(false)
  const { access_token, BaseUrl, projectid } = data;
  const navigate = useNavigate();
  
  ///-----share condition with open newmom----///
  const handleShareMOM = (value) => {
    navigate("/newmom");
    setShareMom(value);
  };
  ///------Edit the draft data and post it-----///
  const handleEditDraft = (id) => {
    setNewDraftUnread(true)
    setUpdatedraftId(id)
    navigate(`/newmom/${id}`);
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
            setBulletPoints("")
     }
     if(newlength>previouslength){
       if(AsciiValue===10){
         e.target.value = `${e.target.value}${bullet} `;
      }
      else if( newlength===1){
        e.target.value = `${bullet} ${e.target.value}`;
      }
      setBulletPoints(e.target.value)
    }
    previouslength =newlength;
 }

  ///got to mom inner page ----///
  const gotoInnerMom = (id) => {
    if(!draftsflag){
      setNewDraftUnread(true)
    }
    else{
      setNewSentUnread(true)
    }
    navigate(`/mominnerpage/${id}`)
  }

  ///---get client project ---////
  async function getClientProject() {
    return await axios.get(
      `${BaseUrl}/api/projects/getProjects?projectId=${projectid}`,
      {
        headers: {
          Authorization: access_token,
        },
      }
    );
  }
  //---save the data as Draft---///
  const handleSaveDraft = () => {
    if (shareMom) {
      setShareMom(false)
    }
    if (momdate && category && bulletPoints) {
    const bodyData = JSON.stringify({
      id:updatedraftId && updatedraftId,
      date: momdate,
      category: category,
      location: location,
      title: title,
      projectId: projectid,
      // sharedWith: emaillist,
      points: bulletPoints && bulletPoints.trim().split("\u2022").filter((emptystr)=>emptystr!==""),
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
            navigate("/");
            setMomdate("");
            setCategory("");
            setLocation("");
            setTitle("");
            setBulletPoints("");
          }
        })
        .then((data) => {
          console.log(data);
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
  const handleSubmitData = () => {
    console.log(bulletPoints.split("\u2022"))
    if (shareMom) {
      setShareMom(false);
    }
    if (momdate && category && bulletPoints) {
    const bodyData = JSON.stringify({
        id: updatedraftId && updatedraftId,
        date: momdate,
        category: category,
        location: location,
        title: title,
        isDraft: false,
        projectId: projectid,
        // sharedWith: emaillist,
        points: bulletPoints && bulletPoints.trim().split("\u2022").filter((emptystr)=>emptystr!==""),
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
            navigate("/");
            setMomdate("");
            setCategory("");
            setLocation(""); 
            setTitle("");
            setBulletPoints("");
          }
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
    momdate ? setDateerror(false) : setDateerror(true);
    category ? setCategoryerror(false) : setCategoryerror(true);
    bulletPoints ? setPointserror(false) : setPointserror(true);
  };

  ///get client project data ----///
  let emailconvertArr = [];
  useEffect(() => {
    getClientProject()
      .then((res) => {
        setRoomName(res.data.projects[0].rooms);
        setclientName(res.data.projects[0].clientId.name);
        emailconvertArr.push(res.data.projects[0].clientId.email);
        setEmaillist(emailconvertArr);
      })
      .catch((error) => {
        console.error(error);
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
          clientName,
          newDraftUnread,
          newSentUnread,
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
        }}
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/mominnerpage/:id" element={<InnerPage />} />
          <Route path="/momzerostate" element={<MomZeroStatePage />} />
          <Route path="/newmom/" element={<NewMomPage />} />
          <Route path="/newmom/:id" element={<NewMomPage />} />
        </Routes>
      </MomContext.Provider>
    </>
  );
}
export default App;
