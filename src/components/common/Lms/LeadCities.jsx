import React from "react";

export default function LeadCities() {
  return (
    <div className="leadCity-container">
      <div className="heading">
        <h5>
          Select the cities in which you want to <br /> have leads <span>( Select Max 2 options )</span>
        </h5>
        
      </div>

      <div className="cities c">
        <button className="city">Delhi, Gurugram, Noida</button>
        <button className="city">Faridabad</button>
        <button className="city">Ghaziabad</button>
        <button className="city">Bengaluru</button>
        <button className="city">Pune</button>
        <button className="city">Mumbai Area</button>
        <button className="city">Hyderabad Area</button>
        <button className="city">Chandigarh, Mohali, Panchkula</button>
        <button className="city">Jaipur</button>
        <button className="city">Lucknow</button>
        <button className="city">Indore</button>
        <button className="city">Ahemdabad</button>
        <button className="city">Chennai</button>
        <button className="city">Kolkata Area</button>
        
      </div>
    </div>
  );
}
