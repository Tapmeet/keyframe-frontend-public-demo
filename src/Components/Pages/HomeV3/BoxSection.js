import React from "react";
import img3 from "./../../Assets/images/homeV3/Video4.png";
import img4 from "./../../Assets/images/homeV3/Video5.png";
const BoxSection = () => {
  return (
    <section className="box-wrapper-new section">
      <div className=" container ">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6 col-12" style={{paddingLeft: '100px'}}>
            <h3>
            Use your existing listing photos and video
            </h3>
            <label>WITH OUR EVER-GROWING LIBRARY OF TEMPLATES </label>
            <p>Each property is unique and our templates are designed to showcase every type and  style</p>
          </div>
          <div className="col-sm-6 col-12" style={{paddingLeft: '100px'}}>
          <img src={img3} alt="icon3"></img>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
        <div className="col-sm-6 col-12" style={{paddingLeft: '100px'}}>
          <img src={img4} alt="icon3"></img>
          </div>
          <div className="col-sm-6 col-12" style={{paddingLeft: '100px'}}>
            <h3>
            Quick and easy customization tools are simple to us 
            </h3>
            <label>IMAGINE IT. CREATE IT. POST IT.  </label>
            <p>Make each video your own with intuitive color, font, and design tools. Add your headshot and logo to raise brand awareness  </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};
export default BoxSection;
