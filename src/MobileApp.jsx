import React, { useState, createContext } from "react";
import axios from "axios";
import NewMomMobilePage from "./mobileViews/newMOM";
import MomZeroStateMobilePage from "./mobileViews/momZeroState";
import MomMainSectionMobilePage from "./mobileViews/MomMainSection";
import InnerMomPage from "./mobileViews/InnerPageMom";
import "./Styles/mobile/mobile.css";
import { Route, Routes, useNavigate } from "react-router-dom";
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
  const [clientname, setclientname] = useState("");
  const { access_token, BaseUrl, projectid } = data;
  const navigate = useNavigate();

  ///-----share condition with open newmom----///
  const handleSharedMOMdata = (value) => {
    navigate("/newmom");
    setSharemom(value);
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
  const bullet = "\u2022";
  const handlePointsField = (event) => {
    let value = event.target.value;
    if (pointsdata?.length < 1) {
      setPointsdata(`${bullet}`);
    } else {
      setPointsdata(value);
    }
  };
  ///----update the point state in array string with key enter'----///
  const handlePointsTextArea = (e) => {
    if (!pointsdata?.split("\n").includes("\u2022")) {
      if (e.key === "Enter") {
        // setPointsdata(`${pointsdata}${"\n\u2022"}`);
        setPointsdata(`${pointsdata}${"\u2022"}`);
      }
    }
  };
  ///------navigate to MOM inner page -----///
  const naviagteInnerPage = (id) => {
    navigate(`/mominnerpage/${id}`);
  };
  
  ///---edit the draft data -----////
  const handleEditDraftdata = (id) => {
    setUpdatedraftsusingId(id);
    navigate(`/newmom/${id}`);
  };

  ///---save the draft data----////
  const handleSaveDraftData = () => {
    if (selectdate && category && pointsdata) {
      const bodyData = JSON.stringify({
        id: updatedraftusingId && updatedraftusingId,
        date: selectdate,
        category: category,
        location: location,
        projectId: projectid,
        title: title,
        // sharedWith:emaillist,
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
            navigate("/");
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
  const handleSubmitData = () => {
    const bodyData = JSON.stringify({
      id: updatedraftusingId && updatedraftusingId,
      date: selectdate,
      category: category,
      location: location,
      projectId: projectid,
      title: title,
      isDraft: false,
      // sharedWith:emaillist,
      points:
        pointsdata &&
        pointsdata.trim().split("\u2022").filter((emptystr) => emptystr !== ""),
    });

    if (selectdate && category && pointsdata) {
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
            navigate("/");
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
  let emailconvertArr = [];
  useEffect(() => {
    ///---get client id project----///
    getClientProject()
      .then((res) => {
        setRoomName(res.data.projects[0].rooms);
        setclientname(res.data.projects[0].clientId.name);
        emailconvertArr.push(res.data.projects[0].clientId.email);
        setEmaillist(emailconvertArr);
      })
      .catch((error) => {
        console.error(error);
      });
   
  }, []);
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
          roomName,
          clientname,
          setRoomName,
          setEmailValid,
          getClientProject,
          handleSharedMOMdata,
          addEmail,
          removeEmail,
          handlePointsField,
          handlePointsTextArea,
          handleEditDraftdata,
          handleSubmitData,
          handleSaveDraftData,
        }}
      >
        <Routes>
          <Route exact path="/" element={<MomMainSectionMobilePage />} />
          <Route path="/momzerostate" element={<MomZeroStateMobilePage />} />
          <Route path="/newmom" element={<NewMomMobilePage />} />
          <Route path="/newmom/:id" element={<NewMomMobilePage />} />
          <Route path="/mominnerpage/:id" element={<InnerMomPage />} />
        </Routes>
      </momContext.Provider>
    </>
  );
}

export default MobileApp;
