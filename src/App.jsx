import React, { useState, createContext} from "react";
import { Route, Routes,useNavigate } from "react-router-dom";
import "./Styles/index.css";
import Home from "./views/Home";
import MomZeroStatePage from "./views/momZeroState";
import NewMomPage from "./views/newMOM";
import InnerPage from "./views/InnerPageMOM";
import {data} from "./components/utils"
export const MomContext = createContext("context");
function App() {
  const [momdate ,setMomdate]= useState("")
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [emaillist, setEmaillist] = useState([]);
  const [emailvalue, setEmailvalue] = useState();
  const [pointsdata, setPointsdata] = useState(null);
  const [dateerror, setDateerror] = useState(false);
  const [categoryerror, setCategoryerror] = useState(false);
  const [pointserror, setPointserror] = useState(false);
  const [pointsdetails,setPoinstdetails]=useState({})
  const [draftsflag, setDraftsflag] = useState(false);
  const [sentflag, setSentflag] = useState(false);
  const [momDraftsdata,setMomDraftsdata]=useState([])
  const [momSentdata,setMomSentdata]=useState([])
  const {access_token,BaseUrl,projectid } = data;
  console.log(pointsdetails)
  const navigate = useNavigate();
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
	}
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
    previousLength = newLength;
    setPointsdata(event.target.value.split("\n"));
}
  ///got to mom inner page ----///
  const gotoInnerMom=(index,booleanValue)=>{
    if(booleanValue){
      setPoinstdetails(momDraftsdata[index]) 
    }
    else{
      setPoinstdetails(momSentdata[index])
    }
    console.log(pointsdetails)
    navigate("/mominnerpage");
  }
  
  //---save the data as Draft---///
  const handleSaveDraft=()=>{
    const bodyData = JSON.stringify({
      date: momdate,
      category: category,
      location: location,
      title: title,
      projectId:projectid,
      sharedWith:emaillist,
      points: pointsdata,
    });
    if (momdate && category && pointsdata) {
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
          navigate("/")
          setMomdate("");
          setCategory("");
          setLocation(""); 
          setTitle("");
          setPointsdata([]);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    }
    else{
      momdate ? setDateerror(false): setDateerror(true);
      category ? setCategoryerror(false): setCategoryerror(true)
      pointsdata ? setPointserror(false): setPointserror(true);
    }

  }
  ////-----post the with submit btn data ------///
  const handlePostData = () => {
    const bodyData = JSON.stringify({
      date: momdate,
      category: category,
      location: location,
      title: title,
      isDraft:false,
      projectId:projectid,
      sharedWith:emaillist,
      points: pointsdata,
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
          navigate("/")
          setMomdate("");
          setCategory("");
          setLocation(""); 
          setTitle("");
          setPointsdata([]);
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
    if (momdate && category && pointsdata) {
      handlePostData();
      setDateerror(false);
      setCategoryerror(false);
      setPointserror(false);
    }
    momdate ? setDateerror(false): setDateerror(true);
    category ? setCategoryerror(false): setCategoryerror(true)
    pointsdata ? setPointserror(false): setPointserror(true);
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
          pointsdata,
          setPointsdata,
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
          gotoInnerMom,
          handleSaveDraft,
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
