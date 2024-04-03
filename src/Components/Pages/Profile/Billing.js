/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import UserAvatar from "./../../Assets/images/User/Header/default.png";
import SideShape3 from "./../../Assets/images/homeV3/SideShape3.png";
import SideShape4 from "./../../Assets/images/homeV3/SideShape2inverse.png";
import Circle2 from "./../../Assets/images/homeV3/Circle2.png";
import HalfCircle from "./../../Assets/images/homeV3/HalfCircle.png";
import Triangle1 from "./../../Assets/images/homeV3/Triangle1.png";
import Circle1 from "./../../Assets/images/homeV3/Circle1.png";
import passicon from "./../../Assets/images/homeV3/lock.png";
import avatar from "./../../Assets/images/homeV3/avatar.png";
import phoneicon from "./../../Assets/images/homeV3/phone.png";
import emailicon from "./../../Assets/images/homeV3/email.png";
import Loader from "./../../Utility/Loader/Loader";
import SiteHeader from "../../Header/HeaderUser";
import Footer from "../../Footer";
import {
  schemaFname,
  apiUpdateUser,
  apiUploadImage,
  apiPath,
} from "./../../Utility/Utility";
const shipping = () => {
  const [userId, setUserId] = React.useState("");
  const [billing_address_1, setBilling_address_1] = React.useState("");
  const [billing_address_2, setBilling_address_2] = React.useState("");
  const [billing_state, setbilling_state] = React.useState("");
  const [billing_city, setbilling_city] = React.useState("");
  const [billing_zip, setbilling_zip] = React.useState("");
  const [billing_country, setbilling_country] = React.useState("");

  const [shipping_address_1, setshipping_address_1] = React.useState("");
  const [shipping_address_2, setshipping_address_2] = React.useState("");
  const [shipping_city, setshipping_city] = React.useState("");
  const [shipping_state, setshipping_state] = React.useState("");
  const [shipping_zip, setshipping_zip] = React.useState("");
  const [shipping_country, setShipping_country] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [userImg, setUserImg] = React.useState("");
  const [loginType, setLoginType] = React.useState("");
  function setfirstName(evt) {
    if (evt === "") {
      setCheckFirstname(true);
    } else {
      setCheckFirstname(false);
    }
    setFirstName(evt);
  }
  const cookies = new Cookies();
  React.useEffect(() => {
    const tokens = localStorage.getItem('token');
    // if (cookies.get("token")) {
    if (tokens != null) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      setUserId(decoded.id);
      setBilling_address_1(decoded.billing_address_1);
      setBilling_address_2(decoded.billing_address_2);
      setbilling_state(decoded.billing_state);
      if (decoded.billing_zip) {
        setbilling_zip(decoded.billing_zip);
      }
      if (decoded.billing_country) {
        setbilling_country(decoded.billing_country);
      }
      if (decoded.billing_city) {
        setbilling_city(decoded.billing_city);
      }
  
      if (decoded.shipping_address_1) {
        setshipping_address_1(decoded.shipping_address_1);
      }
      if (decoded.shipping_address_2) {
        setshipping_address_2(decoded.shipping_address_2);
      }
      if (decoded.shipping_city) {
        setshipping_city(decoded.shipping_city);
      }
      if (decoded.shipping_state) {
        setshipping_state(decoded.shipping_state);
      }
      if (decoded.shipping_zip) {
        setshipping_zip(decoded.shipping_zip);
      }
      if (decoded.shipping_country) {
        setShipping_country(decoded.shipping_country);
      }
      if (decoded.profileImage) {
        setUserImg(decoded.profileImage);
      }
      if (decoded.loginType) {
        setLoginType(decoded.loginType);
      }
    }
  }, [userId]);
  /**
   * Submit handler
   * @param event use for prevent the default functionality of the event
   * @returns na
   */
  function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    setProcessing(true);
    // API Call
    axios
      .put(apiUpdateUser + userId, {
        id: userId,
        billing_address_1: billing_address_1,
        billing_address_2: billing_address_2,
        billing_state: billing_state,
        billing_zip: billing_zip,
        billing_city: billing_city,
        billing_country: billing_country,
        shipping_address_1: shipping_address_1,
        shipping_address_2: shipping_address_2,
        shipping_city: shipping_city,
        shipping_state: shipping_state,
        shipping_zip: shipping_zip,
        shipping_country: shipping_country,
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
        const cookies = new Cookies();
        cookies.set("token", response.data.token, { path: "/" });
        cookies.set("userRole", response.data.userRole, { path: "/" });
        setProcessing(false);
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
        setProcessing(false);
      });
  }
  function setformImage(e, img) {
    console.log(e.target.files.length);
    for (var i = 0; i < e.target.files.length; i++) {
      var parts = e.target.files[i].type.split("/");
      var result = parts[0];
      if (result == "image") {
        const data = new FormData();
        data.append("file", e.target.files[i]);
        data.append("userId", userId);
        data.append("noUpload", true);
        setProcessing(true);
        axios
          .post(`${apiUploadImage}`, data)
          .then((response) => {
            setProcessing(false);
            let fileUrl = response.data.message
              .replace(/\\/g, "/")
              .substring("public".length);
            let imageUrl = fileUrl.replace("sets/", "");
            let updatedImage = imageUrl;
            if (img === 0) {
              setAgencylogo(imageUrl);
            } else {
              setUserImg(imageUrl);
            }
          })
          .catch((error) => {});
      }
    }
  }
  return (
    <div>
      <SiteHeader nav="dark"></SiteHeader>

      <div className="profile-page section">
        <Loader open={processing} />
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center">
              <h2>Account</h2>
              <ul className="filter-btn">
                <li>
                  <Link to="/profile/">Profile</Link>
                </li>
                <li>
                  <Link to="/upgrade-plan">Change Plan</Link>
                </li>
                <li>
                  <Link to="/change-password">Change password</Link>
                </li>
                <li className="active">
                  <Link to="/billing">Billing</Link>
                </li>
                <li>
                  <Link to="/transactions">Transactions</Link>
                </li>
              </ul>
            </div>
            <div className="col-12">
              <div className="profile-box">
                <div className="userimg-section">
  
                  <div className="img">
                    {loginType != "" ? (
                      <img src={userImg} alt="user" />
                    ) : userImg ? (
                      <img src={apiPath + userImg} alt="user" />
                    ) : (
                      <img src={UserAvatar} alt="user" />
                    )}
                    {/* {userImg == "" ? (
                      <img src={UserAvatar} alt="user" />
                    ) : (
                      <img src={apiPath + userImg} alt="user" />
                    )} */}
                  </div>
                </div>
                <div className="userinfo-section form-section container-full  ">
                  <form className="signup form-signup">
                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Address 1</label>
                        <img src={avatar} alt="Name" />
                        <input
                          type="text"
                          name="Name"
                          value={billing_address_1}
                          onChange={(e) => setBilling_address_1(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Billing address1"
                        />

                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Address 2</label>
                        <img src={avatar} alt="Name" />
                        <input
                          type="text"
                          name="Agency name"
                          value={billing_address_2}
                          onChange={(e) => setBilling_address_2(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Enter Billing address2"
                        />
                        <span className="error-message">
                          {/* {checkPassword === true ? "*Enter password" : ""} */}
                        </span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>City</label>
                        <img src={avatar} alt="Name" />
                        <input
                          type="text"
                          name="Agency name"
                          value={billing_city}
                          onChange={(e) => setbilling_city(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Enter  City"
                        />
                        <span className="error-message">
                          {/* {checkPassword === true ? "*Enter password" : ""} */}
                        </span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>State</label>
                        <img src={avatar} alt="Name" />
                        <input
                          type="text"
                          name="Agency name"
                          value={billing_state}
                          onChange={(e) => setbilling_state(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Enter  State"
                        />
                        <span className="error-message">
                          {/* {checkPassword === true ? "*Enter password" : ""} */}
                        </span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Zip</label>
                        <img src={phoneicon} alt="email" />
                        <input
                          type="text"
                          name="Phone Number"
                          value={billing_zip}
                          onChange={(e) => setbilling_zip(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Enter Billing Zip"
                        />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Country</label>
                        <img src={passicon} alt="email" />
                        <input
                          type="text"
                          name="billing_country"
                          value={billing_country}
                          onChange={(e) => setbilling_country(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Billing Country"
                        />

                      </div>
                    </div>
 



                    {/* <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Shipping address 1</label>
                        <img src={avatar} alt="Name" />
                        <input
                          type="text"
                          name="Name"
                          value={shipping_address_1}
                          onChange={(e) => setshipping_address_1(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Shipping address1"
                        />

                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Shipping address 2</label>
                        <img src={avatar} alt="Name" />
                        <input
                          type="text"
                          name="Agency name"
                          value={shipping_address_2}
                          onChange={(e) => setshipping_address_2(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Enter Shipping address2"
                        />
                        <span className="error-message">
                          {/* {checkPassword === true ? "*Enter password" : ""} 
                        </span>
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Shipping State</label>
                        <img src={avatar} alt="Name" />
                        <input
                          type="text"
                          name="Agency name"
                          value={shipping_state}
                          onChange={(e) => setshipping_state(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Enter Shipping State"
                        />
                        <span className="error-message">
                          {/* {checkPassword === true ? "*Enter password" : ""} 
                        </span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Shipping Zip</label>
                        <img src={phoneicon} alt="email" />
                        <input
                          type="text"
                          name="Phone Number"
                          value={shipping_zip}
                          onChange={(e) => setshipping_zip(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Enter Shipping Zip"
                        />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Shipping Country</label>
                        <img src={passicon} alt="email" />
                        <input
                          type="text"
                          name="shipping_country"
                          value={shipping_country}
                          onChange={(e) => setshipping_country(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Shipping Country"
                        />

                      </div>
                    </div> */}
                    <div className="row form-group text-center btn-section justify-content-center m-bottom">
                      <div className="col-12 col-sm-5">
                        <input
                          type="submit"
                          name="submit"
                          onClick={handleSubmit}
                          className="btn "
                          value="Save"
                        />
                      </div>
                      <div className="col-12 col-sm-12">
                        {successMessage ? (
                          <div
                            className="alert alert-success alert-messages"
                            role="alert"
                          >
                            {successMessage}
                          </div>
                        ) : null}
                        {errorMessage ? (
                          <div
                            className="alert alert-danger alert-messages"
                            role="alert"
                          >
                            {errorMessage}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </form>
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
        <img src={Triangle1} alt="triangle" className="triangle1 profile-bg" />
        <img src={Triangle1} alt="triangle" className="triangle2 profile-bg" />
        <img src={Circle1} alt="triangle" className="Circle1 profile-bg" />
      </div>
      <Footer></Footer>
    </div>
  );
};
export default shipping;
