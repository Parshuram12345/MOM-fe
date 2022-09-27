import React, { useState, createContext } from 'react'
import NewMomMobilePage from './mobileViews/newMOM';
import MomZeroStateMobilePage from './mobileViews/momZeroState';
import MomMainSectionMobilePage from './mobileViews/MomMainSection';
import InnerMomPage from './mobileViews/InnerPageMom';
import "./Styles/mobile/mobile.css"
import { Route, Routes } from 'react-router-dom';
import {data} from "./components/utils";
export const momContext = createContext("context");

function MobileApp() {
  const [selectdate, setSelectdate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [emaillist, setEmaillist] = useState([
    "Praveervilla@gmail.com",
  ]);
  const [emailvalue, setEmailvalue] = useState("");
  const [pointsdata, setPointsdata] = useState(null);
  const [dateerror, setDateerror] = useState(false);
  const [categoryerror, setCategoryerror] = useState(false);
  const [pointserror, setPointserror] = useState(false);
  const { MomContent, access_token, pointsData } = data;
  ///---convert date in readable format ---///
  function dateFormater(newdate) {
    console.log("dateformat")
    const todaydate = `${newdate.getDate()}-${newdate.getMonth()+1}-${newdate.getFullYear()}`
    setSelectdate(todaydate)
    console.log(selectdate,typeof selectdate)
  }
   
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
  ///------add the points in field -----///
  const handlePointsField = (e) => {
    setPointsdata(e.target.value.split("\n"));
  };
  ////---fix error ---///

  // if (selectdate)setDateerror(false)
  // if (category)setCategoryerror(false)
  // if (pointsdata) setPointserror(false)
  const handlePostData = () => {
    console.log("sdfds")
    const bodyData = JSON.stringify({
      date: selectdate,
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
          setSelectdate("");
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
    console.log("vb", category);

    if (selectdate && category && pointsdata) {
      handlePostData();
      setDateerror(false);
      setCategoryerror(false);
      setPointserror(false);
    }
    else{
    // if (!selectdate) {
    //   setDateerror(true);
    // }
     selectdate ? setDateerror(false):setDateerror(true)
     category ? setCategoryerror(false):setCategoryerror(true)
     pointsdata? setPointserror(false):setPointserror(true)
    }
  };
  return (
    <>
    <momContext.Provider
        value={{
          selectdate,
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
          dateFormater,addEmail,removeEmail,handlePointsField,handleSubmitData
        }}
      >
       <Routes>
       <Route path='/' element={  <MomZeroStateMobilePage/> } />
       <Route path='/mom' element={ <MomMainSectionMobilePage/> } />
       <Route path='/newmom' element={ <NewMomMobilePage/> } />
       <Route path='/mominner' element={ <InnerMomPage/> } />
       </Routes>
      </momContext.Provider>
    </>
  )
}

export default MobileApp;