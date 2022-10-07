import React, { useState, createContext } from "react";
import axios from "axios";
import { Route, Routes, useNavigate,useParams } from "react-router-dom";
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
  // const [bulletPoints, setBulletPoints] = useState("");
  // const [editPointsdata, seteditPointsdata] = useState("");
  const [dateerror, setDateerror] = useState(false);
  const [categoryerror, setCategoryerror] = useState(false);
  const [pointserror, setPointserror] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [pointsdetails, setPoinstdetails] = useState({});
  const [draftsflag, setDraftsflag] = useState(false);
  const [sentflag, setSentflag] = useState(false);
  const [momDraftsdata, setMomDraftsdata] = useState([]);
  const [momSentdata, setMomSentdata] = useState([]);
  const [shareMom, setShareMom] = useState(false);
  const [roomName, setRoomName] = useState([]);
  const [bulletPoints, setBulletPoints] = useState("");

  const { access_token, BaseUrl, projectid } = data;
  const navigate = useNavigate();
  ///-----share condition with open newmom----///
  const handleShareMOM = (value) => {
    navigate("/newmom");
    setShareMom(value);
  };
  ///------Edit the draft data and post it-----///
  const handleEditDraft = (index) => {
    navigate("/newmom");
    setCategory(momDraftsdata[index]?.category);
    setMomdate(
      `${momDraftsdata[index]?.date?.substring(8, 10)}-${momDraftsdata[
        index
      ]?.date?.substring(5, 7)}-${momDraftsdata[index]?.date?.substring(0, 4)}`
    );
    setLocation(momDraftsdata[index]?.location);
    setTitle(momDraftsdata[index]?.title);
    setBulletPoints(momDraftsdata[index]?.points);
    console.warn(momDraftsdata[index]?.points);
    ///---if points are present -----////
    //  if(momDraftsdata[index]?.points){
    //   let newPointShow =[]
    //   for(let i=0;i<momDraftsdata[index]?.points.length;i++){
    //          newPointShow.push(momDraftsdata[index]?.points[i]);
    //   }
    //   console.log(newPointShow)
    //   // setBulletPoints(newPointShow)
    //   console.log(bulletPoints)
    //   // newPointShow=[];
    // }
  };
  ///-----remove the email----///
  const removeEmail = (indexToRemove) => {
    setEmaillist([...emaillist.filter((_, index) => index !== indexToRemove)]);
  };
  ///----add the email---///
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
  const handlePointsField = (event) => {
    let value = event.target.value;
        if (bulletPoints.length < 1) {
          const bullet = "\u2022";
          setBulletPoints(`${bullet}`);
        } else {
          setBulletPoints(value);
        }
  };

  // console.log(bulletPoints.split("\u2022"));
  ///----update the point state in array string with key enter'----///
  const handlePointsTextArea = (e) => {
    if (!bulletPoints.split("\u2022").includes("\n")) {
      if (e.key === "Enter") {
        // setBulletPoints(`${bulletPoints}${"\n\u2022"}`);
        setBulletPoints(`${bulletPoints}${"\n\u2022"}`);
      }
    }
  };
  console.log(bulletPoints)
  ///got to mom inner page ----///
  const gotoInnerMom = (id, booleanValue) => {
    navigate(`/mominnerpage/:${id}`)
    const filterdata = momDraftsdata.filter(({_id})=> _id===id)
    console.log(filterdata)
    if (booleanValue) {
      // setPoinstdetails(momDraftsdata[index]);
    } else {
      // setPoinstdetails(momSentdata[index]);
    }
    console.log(pointsdetails);
    navigate("/mominnerpage");
  };

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
  let emailconvertArr = [];
  useEffect(() => {
    getClientProject()
      .then((res) => {
        setRoomName(res.data.projects[0].rooms);
        emailconvertArr.push(res.data.projects[0].clientId.email);
        setEmaillist(emailconvertArr);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //---save the data as Draft---///
  const handleSaveDraft = () => {
    if (shareMom) {
      setShareMom(false);
    }
    const bodyData = JSON.stringify({
      date: momdate,
      category: category,
      location: location,
      title: title,
      projectId: projectid,
      sharedWith: emaillist,
      points: bulletPoints,
    });
    if (momdate && category && bulletPoints) {
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
    } else {
      momdate ? setDateerror(false) : setDateerror(true);
      category ? setCategoryerror(false) : setCategoryerror(true);
      bulletPoints ? setPointserror(false) : setPointserror(true);
    }
  };
  ////-----post the with submit btn data ------///
  const handlePostData = () => {
    const bodyData = JSON.stringify({
      date: momdate,
      category: category,
      location: location,
      title: title,
      isDraft: false,
      projectId: projectid,
      sharedWith: emaillist,
      points: bulletPoints,
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
  };
  const handleSubmitData = () => {
    if (shareMom) {
      setShareMom(false);
    }
    if (momdate && category && bulletPoints) {
      handlePostData();
      setDateerror(false);
      setCategoryerror(false);
      setPointserror(false);
    }
    momdate ? setDateerror(false) : setDateerror(true);
    category ? setCategoryerror(false) : setCategoryerror(true);
    bulletPoints ? setPointserror(false) : setPointserror(true);
  };
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
          draftsflag,
          setDraftsflag,
          sentflag,
          setSentflag,
          shareMom,
          setShareMom,
          emailValid,
          roomName,
          setRoomName,
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
        }}
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/mominnerpage/" element={<InnerPage />} />
          <Route path="/momzerostate" element={<MomZeroStatePage />} />
          <Route path="/newmom" element={<NewMomPage />} />
        </Routes>
      </MomContext.Provider>
    </>
  );
}
export default App;
