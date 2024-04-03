import React from "react";
import { Link } from "react-router-dom";
import icongreen from "./../../Assets/images/pricing/checkedgreen.png";
import iconred from "./../../Assets/images/pricing/checkedred.png";
import iconblack from "./../../Assets/images/pricing/checkedblack.png";
import SideShape3 from "./../../Assets/images/homeV3/SideShape2inverse.png";
import SideShape4 from "./../../Assets/images/homeV3/SideShape.png";
import Circle2 from "./../../Assets/images/homeV3/Circle2.png";
import HalfCircle from "./../../Assets/images/homeV3/HalfCircle.png";
import Triangle1 from "./../../Assets/images/homeV3/Triangle1.png";
import Circle1 from "./../../Assets/images/homeV3/Circle1.png";
import Circle3 from "./../../Assets/images/homeV3/Check-Circle.png";
import Circle4 from "./../../Assets/images/homeV3/white_circle.png";
import passicon from "./../../Assets/images/homeV3/lock.png";
import axios from "axios";
const Pricing = () => {
  const [toggle, setToggle] = React.useState(false);
  const settoggle = () => {
    console.log(toggle);
    setToggle(!toggle);
  };
  return (
    <div className="pricing-page pricingpage">
      <div className="container ">
        <div className="row ">
          <div className="col-12 text-center">
            <h2>Choose Your Plan </h2>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container ">
          <div className="col-12 text-center pricingarea">
            <h3>Pricing Packages</h3>
            <div className="d-flex">
              <label className={toggle ? "normal-switch" : "on-switch "}>
                Monthly
              </label>
              <label
                className={toggle ? "switch active" : "switch "}
                onClick={() => setToggle(!toggle)}
              >
                <span className="slider round"></span>
              </label>
              <label className={toggle ? "on-switch" : " normal-switch"}>
                Yearly
              </label>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-12">
              <div className="pricing-box">
                <h4>Free</h4>
                <div className="price-package">
                  $0/<span>month</span>
                </div>
                <label className="green">Features</label>
                <ul>
                  <li>
                    <img src={icongreen} alt="img1" />
                    Create unlimited free videos
                  </li>
                  <li>
                    <img src={icongreen} alt="img1" />
                    Individual user
                  </li>
                  <li>
                    <img src={icongreen} alt="img1" />
                    15 second videos
                  </li>
                  <li>
                    <img src={icongreen} alt="img1" />
                    1080 HD
                  </li>
                  <li>
                    <img src={icongreen} alt="img1" />
                    Listing templates only
                  </li>
                  <li>
                    <img src={icongreen} alt="img1" />
                    Limited fonts
                  </li>
                  <li>
                    <img src={icongreen} alt="img1" />
                    Download only
                  </li>
                  <li>
                    <img src={icongreen} alt="img1" />
                    Reveo watermark
                  </li>
                </ul>
                <div className="btn-section">
                  <a href="/free-plan" className="btn">
                    Try now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-12">
              <div className="pricing-box">
                {/* {toggle ? <div class="ribbon ribbon-top-right"><span>$30 DISCOUNT</span></div> : null} */}
                <h4>Professional</h4>
                <div className="price-package">
                  {!toggle ? (
                    <div>
                      $15/<span>month</span>
                    </div>
                  ) : (
                    <div>
                      $120/<span>year</span>
                    </div>
                  )}
                </div>
                <div className="annual">
                  or get three months free when billed annually at $120
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
                  <a href={!toggle ? "/product-monthly" : "/product-annual"} className="btn btn-red">
                    Get Plan
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-12">
              <div className="pricing-box">
                <h4>Team</h4>
                <div className="price-package">
                  {!toggle ? (
                    <div>
                      $30<span>/month</span>
                    </div>
                  ) : (
                    <div>
                      $300/<span>Year</span>
                    </div>
                  )}
                </div>
                <div className="annual">
                  with a minimum of 3 user and get two months free  when
                  billed annually at $300/user
                </div>
                <label className="black">Features</label>
                <ul>
                  <li>
                    <img src={iconblack} alt="img1" />
                    Minimum of 3 users, maximum of 10 users
                  </li>
                </ul>
                {/* <div className="btn-section">
                  <a href={!toggle ? "/team-monthly" : "/team-annual"} className="btn btn-black">
                    Get Plan{" "}
                  </a>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row pricing-wrapper">
            <div className="col-12 col-sm-6">
              <h5>Sharing </h5>
              <ul>
                <li>
                  Allow sharing or uploading directly to
                  <ul>
                    <li>YouTube </li>
                    <li>Twitter </li>
                    <li> Email </li>
                    <li> Zillow</li>
                    <li> Instagram</li>
                    <li> Direct Download</li>
                    <li>Realtor.com </li>
                    <li> TikTok</li>
                    <li> Facebook </li>
                    <li> Embed </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="col-12 col-sm-6">
              <h5>Features </h5>
              <ul>
                <li>
                  <p>
                    reveo allows real estate professionals to quickly and easily
                    create animated videos using existing footage and
                    photography. With a library of style-relevant, drag and drop
                    templates, users can build unique marketing tools to use
                    with their listing and on social media channels.
                  </p>
                </li>
                <li>
                  <p>
                    Customize the templates with your branding and personality
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <img src={SideShape3} alt="triangle" className="SideShape3 profile-bg" />
      <img src={SideShape4} alt="triangle" className="SideShape4 profile-bg" />
      <img src={Circle2} alt="triangle" className="Circle2 profile-bg" />
      <img src={HalfCircle} alt="triangle" className="HalfCircle profile-bg" />
      <img src={Triangle1} alt="triangle" className="triangle1 profile-bg" />
      <img src={Triangle1} alt="triangle" className="triangle2 profile-bg" />
      <img src={Circle1} alt="triangle" className="Circle1 profile-bg" />
      <img src={Circle3} alt="triangle" className="Circle3 profile-bg" />
      <img src={Circle4} alt="triangle" className="Circle4 profile-bg" />
    </div>
  );
};
export default Pricing;
