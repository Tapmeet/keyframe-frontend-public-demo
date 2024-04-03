import React from "react";
import img1 from "./../../Assets/images/homeV3/Icon1.png";
import img2 from "./../../Assets/images/homeV3/Icon2.png";
import img3 from "./../../Assets/images/homeV3/Icon3.png";

const SaleSection = () => {
  return (
    <section className="saleSection-wrapper section">
      <div className=" container text-center">
        <div className="row justify-content-center">
          <div className=" col-12">
            <h2 className="text-center">Drive sales and promote yourself </h2>
          </div>
        </div>
        <div className="row">
          <div className=" col-12 col-sm-4">
            <label>DRAG AND DROP </label>
            <div className="imgsect">
              <img src={img1} alt="icon1"></img>
            </div>
            <p>
              Quickly Create custom videos with intuitive templates <br/>and tools
            </p>
          </div>
          <div className=" col-12 col-sm-4">
            <label>IMPRESS YOUR AUDIENCE </label>
            <div className="imgsect">
              <img src={img2} alt="icon2"></img>
            </div>
            <p>
              Make a lasting impression with high-quality content for every
              sales stage
            </p>
          </div>
          <div className=" col-12 col-sm-4">
            <label>DRIVE TRAFFIC AND SALES </label>
            <div className="imgsect">
              <img src={img3} alt="icon3"></img>
            </div>
            <p>
              Eye catching content increases clicks and interest in you and your
              listings
            </p>
          </div>
        </div>
        <div style={{marginTop: '50px'}}>
        <a href="/login" className="btn-new">LEARN MORE ABOUT REVEO </a>
        </div>
      </div>
    </section>
  );
};
export default SaleSection;
