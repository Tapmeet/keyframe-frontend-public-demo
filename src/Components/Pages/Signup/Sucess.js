import React from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../../Header/Header";
import Loader from "../../Utility/Loader/Loader";
import Footer from "../../Footer";
import SideShape3 from "./../../Assets/images/homeV3/SideShape3.png";
import SideShape4 from "./../../Assets/images/homeV3/SideShape2inverse.png";
import Circle2 from "./../../Assets/images/homeV3/Circle2.png";
import HalfCircle from "./../../Assets/images/homeV3/HalfCircle.png";
import Triangle1 from "./../../Assets/images/homeV3/Triangle1.png";
import Circle1 from "./../../Assets/images/homeV3/Circle1.png";
import reveo_TempLogo from "./../../Assets/images/templates/reveo_TempLogo.png";
import axios from "axios";

import {
  apiGetTemplateCategories,
  apiGetTemplateCategory,
  apiPath,
} from "../../Utility/Utility";
import { useRouteMatch } from "react-router-dom";
const SuccessPageSignup = () => {
  return (
    <section className="home-wrapper success">
        <SiteHeader />
      <div className="inner-box-area">
        {/* <div className="container">
          <div className="row new-home-inner">
            <div className="col-12 col-sm-12">
              <h2 className="text-center">Success! Video successfully uploaded</h2>
              {/* <InfoSection /> */}
            {/* </div>
          </div> 
        </div> */}
        <div className="profile-page section" style={{paddingTop:120}}>
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center">
              <h2>Success!</h2>
            </div>
            <div className="col-12">
              <div className="profile-box">
                <div className="userimg-section">
                  <div className="userinfo-section">
                    <div className=" export-video text-center">
                      <h3>Account has been created successfully</h3>
                      <div className="loader-wrapper">
                        <div>Verification Email has been sent to your email id. Please confirm email before proceed.</div>
                        <Link to='/login' className="btn small-btn">Login</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src={SideShape3}
            alt="triangle"
            className="SideShape3 profile-bg"
          />
          <img
            src={SideShape4}
            alt="triangle"
            className="SideShape4 profile-bg"
          />
          <img src={Circle2} alt="triangle" className="Circle2 profile-bg" />
          <img
            src={HalfCircle}
            alt="triangle"
            className="HalfCircle profile-bg"
          />
          <img
            src={Triangle1}
            alt="triangle"
            className="triangle1 profile-bg"
          />
          <img
            src={Triangle1}
            alt="triangle"
            className="triangle2 profile-bg"
          />
          <img src={Circle1} alt="triangle" className="Circle1 profile-bg" />
        </div>
      </div>
      </div>
      <Footer />
    </section>
  );
};
export default SuccessPageSignup;
