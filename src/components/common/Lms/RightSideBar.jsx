import React from 'react'
import { useNavigate } from 'react-router-dom'

const RightSideBar = () => {

  const benefits = [
    {
      no: 1,
      data: "Detailed measurement done by professionals.",
    },
    {
      no: 2,
      data: "Get high quality on-site pictures.",
    },
    {
      no: 3,
      data: "As Built Drawings made on ACAD",
    },
    {
      no: 4,
      data: "Access measurements on cloud from anywhere",
    },
  ];

const navigate = useNavigate()
  return (
    <>
      <div className="side_landing d-flex flex-column">
        <div className="side_content">
          <button className="dis_prem" onClick={() => navigate("/plans")}>Upgrade to premium</button>
        </div>
        
        <div className="side_benefitsd-flex flex-column mt-2">
          <h3 className="img_lan_header mb-3 mt-5">Benefits</h3>
          {benefits.map((item, index) => (
            <div className="benefit1 d-flex" key={index}>
              <p className="bno1" style={{marginBottom:'20px'}}>{item.no}</p>
              <p className="bnoContent" style={{marginBottom:'20px'}}>{item.data}</p>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default RightSideBar