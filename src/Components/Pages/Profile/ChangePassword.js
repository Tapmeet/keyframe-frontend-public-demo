/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import SiteHeader from "../../Header/HeaderUser";
import { Redirect, Link } from "react-router-dom";
import Footer from "../../Footer";
import passicon from "./../../Assets/images/homeV3/lock.png";
import SideShape3 from "./../../Assets/images/homeV3/SideShape3.png";
import SideShape4 from "./../../Assets/images/homeV3/SideShape2inverse.png";
import Circle2 from "./../../Assets/images/homeV3/Circle2.png";
import HalfCircle from "./../../Assets/images/homeV3/HalfCircle.png";
import Triangle1 from "./../../Assets/images/homeV3/Triangle1.png";
import Circle1 from "./../../Assets/images/homeV3/Circle1.png";
import {
  schemaCpass,
  schemaPassword,
  apiUpdateUser,
} from "./../../Utility/Utility";

const ChangePassword = () => {
  const [password, setPassword] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [newpassword, setNewPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");

  const [checkPassword, setcheckPassword] = React.useState(false);

  const [checknewPassword, setChecknewPassword] = React.useState(false);
  const [checkcPassword, setcheckCPassword] = React.useState(false);
  const [checkconfirmPassword, setcheckConfirmPassword] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  React.useEffect(() => {
    const tokens = localStorage.getItem('token');
    // if (cookies.get("token")) {
    if (tokens != null) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      setUserId(decoded.id);
     
      setEmail(decoded.email);
    }
  }, [email]);

  function setpassword(evt) {
    if (evt === "") {
      setcheckPassword(true);
    } else {
      setcheckPassword(false);
    }
    setPassword(evt);
  }

  function setnewPassword(evt) {
    if (evt === "") {
      setChecknewPassword(true);
    } else {
      setChecknewPassword(false);
    }
    setNewPassword(evt);
  }
  function setcpassword(evt) {
    if (evt === "") {
      setcheckCPassword(true);
    } else {
      setcheckCPassword(false);
    }
    setCPassword(evt);
  }

  /**
   * Submit handler
   * @param event use for prevent the default functionality of the event
   * @returns na
   */
  function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const resultPass = schemaPassword.validate({ password: newpassword });
    const resultCpass = schemaPassword.validate({ password: cpassword });
    const resultconfirmCpass = schemaCpass.validate({
      password: newpassword,
      confirmpassword: cpassword,
    });

    if (password === "") {
      setcheckPassword(true);
      return false;
    } else {
      setcheckPassword(false);
    }

    if (resultPass.error) {
      setChecknewPassword(true);
      return false;
    }
    console.log(resultconfirmCpass);
    if (resultCpass.error) {
      setcheckCPassword(true);
      return false;
    }

    if (resultconfirmCpass.error) {
      setcheckCPassword(true);
      return false;
    }

    setLoader(true);
    // API Call
    axios
      .put(apiUpdateUser + userId, {
        email: email,
        password: password,
        newPassword: newpassword,
      })
      .then((response) => {
        // console.log(response);
        setLoader(false);
        if (response.data.message == "Invalid current password") {
          setErrorMessage(response.data.message);
        } else {
          setSuccessMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
        setLoader(false);
      });
  }
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
                <li>
                  <Link to="/upgrade-plan/">Change Plan</Link>
                </li>
                <li className="active">
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
            <div className="form-section container-full ">
              <form className="signup form-signup">
                <div className="row form-group">
                  <div className="col-12 col-sm-12">
                    <label>Old Password</label>
                    <img src={passicon} alt="email" />
                    <input
                      type="password"
                      name="oldpassword"
                      value={password}
                      onChange={(e) => setpassword(e.currentTarget.value)}
                      className="form-control"
                      placeholder="*********************"
                    />
                    <span className="error-message">
                      {checkPassword === true ? "*Enter password" : ""}
                    </span>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-12 col-sm-12">
                    <label>New Password</label>
                    <img src={passicon} alt="email" />
                    <input
                      type="password"
                      name="newpassword"
                      value={newpassword}
                      onChange={(e) => setnewPassword(e.currentTarget.value)}
                      className="form-control"
                      placeholder="*********************"
                    />
                    <span className="error-message">
                      {checknewPassword === true
                        ? "*Enter New password/ Min 9 character long"
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-12 col-sm-12">
                    <label>Confirm Password</label>
                    <img src={passicon} alt="email" />
                    <input
                      type="password"
                      name="confirmpassword"
                      value={cpassword}
                      onChange={(e) => setcpassword(e.currentTarget.value)}
                      className="form-control"
                      placeholder="*********************"
                    />
                    <span className="error-message">
                      {checkcPassword === true
                        ? "*Confirm password does't match"
                        : ""}
                    </span>
                  </div>
                </div>

                <div className="row form-group text-center btn-section justify-content-center m-bottom">
                  <div className="col-12 col-sm-5">
                    <input
                      type="submit"
                      name="submit"
                      onClick={handleSubmit}
                      className="btn "
                      value="Save"
                    />
                    {loader ? (
                      <div>
                        <br />
                        <i className="fas fa-spinner fa-pulse"></i>
                      </div>
                    ) : null}

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
export default ChangePassword;
