
import React, { useState, useNavigate} from "react";
import { useEffect } from "react";
import  WebMyReviewsSummary from "./LmsWebComponents/WebMyReviewsSummary";
import MobileMyReviewsSummary from './MobileMyReviewsSummary'
const MyReviewsComponent = () => {

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 767);
  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 767);
  };
   
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <>

      {isDesktop ? <WebMyReviewsSummary className="d-none d-md-block"/> :  <MobileMyReviewsSummary className="d-block d-md-none"/>}
  

    </>
  )
}

export default MyReviewsComponent