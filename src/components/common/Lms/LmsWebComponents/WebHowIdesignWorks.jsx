import React from "react";
import HeaderNav from "./HeaderNav";
import SideBarWeb from "./SideBarWeb";
import press1 from "../../Images/idesignPress1.svg";
import press2 from "../../Images/idesignPress2.svg";
import press3 from "../../Images/idesignPress3.svg";

const WebHowIdesignWorks = () => {
    return (
        <div style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <HeaderNav />
            <div style={{ height: "90vh" }} className="d-flex">
                <SideBarWeb />
                <div style={{ width: "78vw", padding: "16px" }} className="d-flex">
                    <div style={{ backgroundColor: "#FFFFFF", padding: "16px" }}>
                        <div style={{ fontSize: "20px", marginBottom: "16px", fontWeight: "600" }}>How iDesign Works</div>
                        <div style={{ fontSize: "14px" }}>
                            It’s actually very simple and since you are reading this, then it means you have created your Listing Profile. Thank you!
                            Once you create a profile, iDesign makes your listing visible to the homeowners who come on our website seeking Design Professionals. If you are a premium user we try and make your profile more visible to ensure more client queries for you.<br/><br/>
                            Pro Tip 1: Add your best projects to your profile to make the Listing more attractive. Visit your profile to add projects.<br/><br/>
                            iDesign, help you create a steady and stable sales pipeline. We not only generate targeted and verified leads, but also do an initial introduction to the homeowners on your behalf! This way you and/or your team take it up from the point of meeting, thereby saving time and effort spent on presales activities.<br/><br/>

                            We celebrate Design at iDesign. Use our free tools and community features to connect with more designers and make your work more efficient!
                        </div>
                    </div>
                    <div style={{ marginLeft: "16px" }}>
                        <div><img style={{ width: "328px", height: "150px" }} src={press1} /></div>
                        <div><img style={{ width: "328px", height: "164px" }} src={press2} /></div>
                        <div><img style={{ width: "328px", height: "149px" }} src={press3} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebHowIdesignWorks;
