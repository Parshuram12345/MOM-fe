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
  const [updatedraftId,setUpdatedraftId]=useState("")
  const [bulletPoints, setBulletPoints] = useState("");
  const [ newDraftUnread,setNewDraftUnread]=useState(false)
  const [ newSentUnread,setNewSentUnread]=useState(false)
  // const [readonlyTextarea,setReadonlyTextarea]=useState(false)
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
//  const [bulletstate,setBulletstate]=useState(false)
  ///------add the points with bullets point in field -----///
  const bullet = "\u2022";
  const handlePointsField = (event) => {
    let value = event.target.value;
    //  console.log(bulletPoints.length,bulletPoints)
      if (bulletPoints.length < 1) {
        setBulletPoints(`${bullet}`);
      } else {
        setBulletPoints(value);
      }
  }
  const handleEnterkey=(e)=>{
  //   if(e.key ="Enter" && !bulletPoints.split("\u2022").slice(-1)[0]===""  )
  //   {
  //     e.preventDefault();
  //   }
     
  }
  ///----update the point state in array string with key enter'----///
  const handlePointsTextArea = (e) => {
    if (!bulletPoints.split("\n").includes("\u2022")) {
      // setReadonlyTextarea(false)
      // if(bulletPoints.split("\u2022").lastIndexOf("\n\n") !===-1){
        // setReadonlyTextarea(true)
        // e.preventDefault()
      // }
      // else{
        // setReadonlyTextarea(false)
      // }
      if (e.key === "Enter") {
        // setBulletPoints(`${bulletPoints}${"\n\u2022"}`);
        setBulletPoints(`${bulletPoints}${"\u2022"}`);
      }
    }
  }
  // console.log(bulletPoints.split("\u2022"))
  // console.log(bulletPoints.split("\u2022").slice(-1)[0]==="")
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
      `https://pmt.idesign.market/api/projects/getProjects?projectId=${projectid}`,
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
      points: bulletPoints && bulletPoints.split("\n").filter((emptystr)=>emptystr!==""),
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
        points: bulletPoints && bulletPoints.split("\n").filter((emptystr)=>emptystr!==""),
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
          handlePointsField,
          handlePointsTextArea,
          handleSubmitData,
          bulletPoints,
          handleEnterkey
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
