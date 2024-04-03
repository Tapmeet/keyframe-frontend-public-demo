import React from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import SiteHeader from "../../Header/HeaderUser";
import { Link } from "react-router-dom";
import Footer from "../../Footer";
import passicon from "./../../Assets/images/homeV3/lock.png";
import icongreen from "./../../Assets/images/pricing/checkedgreen.png";
import iconred from "./../../Assets/images/pricing/checkedred.png";
import iconblack from "./../../Assets/images/pricing/checkedblack.png";
import SideShape3 from "./../../Assets/images/homeV3/SideShape3.png";
import SideShape4 from "./../../Assets/images/homeV3/SideShape2inverse.png";
import Circle2 from "./../../Assets/images/homeV3/Circle2.png";
import Circle1 from "./../../Assets/images/homeV3/Circle1.png";
import HalfCircle from "./../../Assets/images/homeV3/HalfCircle.png";
import Triangle1 from "./../../Assets/images/homeV3/Triangle1.png";
const UpgradePlan = () => {
  return (
    <div>
      <SiteHeader nav="dark"></SiteHeader>
      <div className="profile-page section">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center">
              <h2>Account</h2>
              <ul className="filter-btn">
                <li>
                  <Link to="/profile/">Profile</Link>
                </li>
                <li className="active">
                  <Link to="/upgrade-plan/">Change Plan</Link>
                </li>
                <li>
                  <Link to="/change-password">Change password</Link>
                </li>
                <li>
                <Link to="/billing">Billing</Link>
              </li>
              <li>
              <Link to="/transactions">Transactions</Link>
              </li>
              </ul>
            </div>
            <div className="container-full pricing-page ">
              <div className="row">
                <div className="col-sm-4 col-12">
                  <div className="pricing-box">
                    <h4>Professional</h4>
                    <div className="price-package">
                      $30/<span>month</span>
                    </div>
                    <div className="annual">
                      or get 3 months free at $270 when billed annually
                    </div>
                    <label className="red">Features</label>
                    <ul>
                      <li>
                        <img src={iconred} alt="img1" />
                        Individual user
                      </li>
                      <li>
                        <img src={iconred} alt="img1" />
                        Unlimited monthly downloads
                      </li>
                      <li>
                        <img src={iconred} alt="img1" />
                        Listing templates
                      </li>
                      <li>
                        <img src={iconred} alt="img1" />
                        Open House Templates
                      </li>
                      <li>
                        <img src={iconred} alt="img1" />
                        'Sold' Announcement Templates
                      </li>
                      <li>
                        <img src={iconred} alt="img1" />
                        Agent profile templates
                      </li>
                      <li>
                        <img src={iconred} alt="img1" />
                        Community Profile Templates
                      </li>
                      <li>
                        <img src={iconred} alt="img1" />
                        Social media sharing
                      </li>
                    </ul>
                    <div className="btn-section">
                      <a href={"/product-monthly"} className="btn btn-red">
                        Upgrade Plan
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 col-12">
                  <div className="pricing-box">
                    <h4>Team</h4>
                    <div className="price-package">
                      $20/<span>month</span>
                    </div>
                    <div className="annual">
                      Each user is $20/month or get 3 months free at $180/user
                      when billed annually
                    </div>
                    <label className="black">Features</label>
                    <ul>
                      <li>
                        <img src={iconblack} alt="img1" />
                        Minimum of 3 users, maximum of 10 users
                      </li>
                    </ul>
                    <div className="btn-section">
                      <a href="#" className="btn btn-black">
                        Upgrade Plan
                      </a>
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
        <img src={Circle1} alt="triangle" className="Circle1 profile-bg" />
        <img src={Circle2} alt="triangle" className="Circle2 profile-bg" />
        <img
          src={HalfCircle}
          alt="triangle"
          className="HalfCircle profile-bg"
        />
        <img src={Triangle1} alt="triangle" className="triangle1 profile-bg" />
        <img src={Triangle1} alt="triangle" className="triangle2 profile-bg" />
      </div>
      <Footer></Footer>
    </div>
  );
};
export default UpgradePlan;
