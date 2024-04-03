import React from "react";
import play from "./../../Assets/images/home/home-play-video.svg";
import arrow from "./../../Assets/images/home/double-down-arrow.svg";
const BannerHome = () => {
  return (
    <section className="section banner-section bg">
      <div className="container">
      <div className="col-sm-6 col-12">
        <div className="home-video">
            <h2>Professional real estate videos in minutes </h2>
            <p>
              Elevate your property listing with a library of easy to use,
              attention grabbing, drag and drop templates.
            </p>
            <label>SIGN UP FOR YOUR FREE ACCOUNT </label>
            <div>
              <a href="/signup" className="btn-new black-btn">
                GET STARTED NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BannerHome;
