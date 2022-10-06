import React, { useState, createContext } from 'react'
import NewMomMobilePage from './mobileViews/newMOM';
import MomZeroStateMobilePage from './mobileViews/momZeroState';
import MomMainSectionMobilePage from './mobileViews/MomMainSection';
import InnerMomPage from './mobileViews/InnerPageMom';
import "./Styles/mobile/mobile.css"
import { Route, Routes,useNavigate } from 'react-router-dom';
import {data} from "./components/utils";
export const momContext = createContext("context");

function MobileApp() {
  const [selectdate, setSelectdate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [emaillist, setEmaillist] = useState([]);
  const [emailvalue, setEmailvalue] = useState("");
  const [pointsdata, setPointsdata] = useState(null);
  const [MOMdata, setMOMdata] = useState([]);
  const [dateerror, setDateerror] = useState(false);
  const [categoryerror, setCategoryerror] = useState(false);
  const [pointserror, setPointserror] = useState(false);
  const [ pointsdetails,setPoinstdetails]=useState({})
  const [momdraftsdata,setMomdraftsdata]=useState([])
  const [momsentdata,setMomsentdata]=useState([])
  const [sharemom,setSharemom]= useState(false)
  const {access_token,BaseUrl,projectid } = data;
  const navigate = useNavigate();

  ///-----share condition with open newmom----///
 const handleSharedMOMdata=(value)=>{
  navigate("/newmom")
  setSharemom(value)
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
   ///------add the points with bullets point in field -----///
   let previousLength = 0;
   const handlePointsField = (event) => {
       const bullet = "\u2022";
       const newLength = event.target.value.length;
       const characterCode = event.target.value.substr(-1).charCodeAt(0);
   
       if (newLength > previousLength) {
           if (characterCode === 10) {
               event.target.value = `${event.target.value}${bullet} `;
           } else if (newLength === 1) {
               event.target.value = `${bullet} ${event.target.value}`;
           }
       }
       else{
         setPointsdata(event.target.value.split("\n"));
       }
       previousLength = newLength;
   }
   ///------navigate to MOM inner page -----///
  const naviagteInnerPage = (index,booleanValue) => {
    navigate("/mominnerpage");
    if(booleanValue){
      setPoinstdetails(momdraftsdata[index]) 
    }
    else{
      setPoinstdetails(momsentdata[index])
    }
  };
   
  ///---save the draft data----////
  const handleSaveDraftData = () => {
    console.log("sdfds")
    const bodyData = JSON.stringify({
      date: selectdate,
      category: category,
      location: location,
      projectId:projectid,
      title: title,
      // sharedWith:emaillist,
      points: pointsdata,
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
          navigate("/")
          setSelectdate("");
          setCategory("");
          setLocation("");
          setTitle("");
          setPointsdata([]);
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
  ///---post the data----//
  const handlePostData = () => {
    console.log("sdfds")
    const bodyData = JSON.stringify({
      date: selectdate,
      category: category,
      location: location,
      projectId:projectid,
      title: title,
      isDraft:false,
      // sharedWith:emaillist,
      points: pointsdata,
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
          navigate("/")
          setSelectdate("");
          setCategory("");
          setLocation("");
          setTitle("");
          setPointsdata([]);
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
     selectdate ? setDateerror(false):setDateerror(true)
     category ? setCategoryerror(false):setCategoryerror(true)
     pointsdata? setPointserror(false):setPointserror(true)
  };
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
          setPointserror,
          emaillist,
          setEmaillist,
          momdraftsdata,
          setMomdraftsdata,
          momsentdata,
          setMomsentdata,
          sharemom,
          setSharemom,
          handleSharedMOMdata,
          addEmail,removeEmail,handlePointsField,handleSubmitData,handleSaveDraftData
        }}
      >
       <Routes>
       <Route path='/' element={ <MomMainSectionMobilePage/> } />
       <Route path='/momzerostate' element={  <MomZeroStateMobilePage/> } />
       <Route path='/newmom' element={ <NewMomMobilePage/> } />
       <Route path='/mominnerpage' element={ <InnerMomPage/> } />
       </Routes>
      </momContext.Provider>
    </>
  )
}

export default MobileApp;