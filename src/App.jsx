import React, { useState, createContext,useEffect } from "react";
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
  const [MOMdata, setMOMdata] = useState([]);
  const [selectedMOM, setSelectedMOM] = useState([]);
  const {access_token,BaseUrl,projectid } = data;
  const Momdata = data.MomContent;
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
	};
  ///------add the points in field -----///
  const handlePointsField = (e) => {
    setPointsdata(e.target.value.split("\n"));
  };
  ///got to mom inner page ----///
  const gotoInnerMom=(index)=>{
    console.log(MOMdata[index])
    setPoinstdetails(MOMdata[index])
    console.log(pointsdetails)
    navigate("/mominnerpage");
  }
  
  ////-----post the data ------///
  const handlePostData = () => {
    const bodyData = JSON.stringify({
      date: momdate,
      category: category,
      location: location,
      title: title,
      projectId:projectid,
      // sharedWith:emaillist,
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
          // setMOMdata(response.data.momData)
        }
        return response.json();
      })
      .then((data) => {
        // setMOMdata(data.momData)
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
    category ? setCategory(false): setCategory(true)
    pointsdata ? setPointserror(false): setPointserror(true);
  };
  return (
    <>
      <MomContext.Provider
        value={{
          MOMdata,
          setMOMdata,
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
          selectedMOM,
          setSelectedMOM,
          gotoInnerMom,
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
