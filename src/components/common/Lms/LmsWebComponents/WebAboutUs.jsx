import React from "react";
import HeaderNav from "./HeaderNav";
import SideBarWeb from "./SideBarWeb";
import press1 from "../../Images/idesignPress1.svg";
import press2 from "../../Images/idesignPress2.svg";
import press3 from "../../Images/idesignPress3.svg";

const WebAboutUs = () => {
    return (
        <div style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <HeaderNav />
            <div style={{ height: "90vh" }} className="d-flex">
                <SideBarWeb />
                <div style={{ width: "78vw", padding: "16px" }} className="d-flex">
                    <div style={{ backgroundColor: "#FFFFFF", padding: "16px" }}>
                        <div style={{ fontSize: "20px", marginBottom: "16px", fontWeight: "600" }}>About iDesign</div>
                        <div style={{ fontSize: "14px" }}>
                            iDesign is a tech platform providing SaaS, Design Tools and an online marketplace dedicated to Interior Design community.
                            The marketplace assists homeowners connect with Interior Designers and Architects. With simple design tools, such as Quotation tool, Timeline feature or Schedule meeting we try and assist a better collaboration between Homeowners and Design Professionals.<br /><br />
                            Creating a listing at iDesign will help you create a healthy and steady sales pipeline. We not only generate targeted leads, but also do an initial introduction to the homeowners on your behalf. This way you and/or your sales team take it up from the point of meeting, thereby saving time and effort spent on presales activities.
                            There are several other features at iDesign which assist Design Professionals in better managing their projects. Stay Tuned!<br /><br />

                            iDesign.Market is founded by Ashish and Sunil. We look forward to any feedback from you at ashish@idesign.market or sunil@idesign.market

                        </div>
                    </div>
                    <div style={{marginLeft: "16px"}}>
                        <div><img style={{ width: "328px", height: "150px" }} src={press1} /></div>
                        <div><img style={{ width: "328px", height: "164px" }} src={press2} /></div>
                        <div><img style={{ width: "328px", height: "149px" }} src={press3} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebAboutUs;
