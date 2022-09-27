import React, { useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./Styles/index.css";
import Home from "./views/Home";
import MomZeroStatePage from "./views/momZeroState";
import NewMomPage from "./views/newMOM";
import InnerPage from "./views/InnerPageMOM";
import {data} from "./components/utils"
export const MomContext = createContext("context");
function App() {
  const [momdate ,setMomdate]= useState()
  const [category, setCategory] = useState();
  const [location, setLocation] = useState();
  const [title, setTitle] = useState();
  const [emaillist, setEmaillist] = useState([
    "dikshant@gmail.com",
    "prsaini@gmail.com",
  ]);
  const [emailvalue, setEmailvalue] = useState();
  const [pointsdata, setPointsdata] = useState(null);
  const [dateerror, setDateerror] = useState(false);
  const [categoryerror, setCategoryerror] = useState(false);
  const [pointserror, setPointserror] = useState(false);
  const { MomContent, access_token, pointsData } = data;
  
  ///-----remove the email----///
  const removeEmail = indexToRemove => {
		setEmaillist([...emaillist.filter((_, index) => index !== indexToRemove)]);
	};

  ///----add the email---///
	const addEmail = event => {
		if (event.target.value !== "") {
			setEmaillist([...emaillist, event.target.value]);
			event.target.value = "";
		}
	};
  ///---convert date in readable format ---///
  function dateFormater(newdate) {
    // setMomdate(newdate)
    console.log("dateformat")
    const todaydate = `${newdate.getDate()}-${newdate.getMonth()+1}-${newdate.getFullYear()}`
    setMomdate(todaydate)
    console.log(momdate,typeof momdate)
  }
 
  ///------add the points in field -----///
  const handlePointsField = (e) => {
    setPointsdata(e.target.value.split("\n"));
  };
  const handlePostData = () => {
    const bodyData = JSON.stringify({
      date: momdate,
      category: category,
      location: location,
      title: title,
      // sharedWith:emaillist,
      points: pointsdata,
    });

    fetch("https://pmt.idesign.market/api/mom/addEditMOM", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: bodyData,
    })
      .then((response) => {
        if (response.ok) {
          setMomdate("");
          setCategory("");
          setLocation("");
          setTitle("");
          setPointsdata(null);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmitData = () => {
    if (momdate && category && pointsdata) {
      handlePostData();
      setDateerror(false);
      setCategoryerror(false);
      setPointserror(false);
    }
    // else{
    if (!momdate) {
      setDateerror(true);
      // setErrormsg({dateflag:true})
    }
    if (!category) {
      // setErrormsg({categoryflag:true})
      setCategoryerror(true);
    }
    if (!pointsdata) {
      console.log("pointsdata", pointsdata);
      setPointserror(true);
    }
    // }
  };
  return (
    <>
      <MomContext.Provider
        value={{
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
          pointsdata,
          setPointsdata,
          dateerror,
          setDateerror,
          categoryerror,
          setCategoryerror,
          pointserror,
          setPointserror,
          dateFormater,
          addEmail,removeEmail,handlePointsField,handleSubmitData
        }}
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/mominnerpage" element={<InnerPage />} />
          <Route path="/momzerostate" element={<MomZeroStatePage />} />
          <Route path="/newmom" element={<NewMomPage />} />
        </Routes>
      </MomContext.Provider>
    </>
  );
}
export default App;
