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
const EditProfile = () => {
  const [userId, setUserId] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [agencyname, setAgencyname] = React.useState("");
  const [agencylogo, setAgencylogo] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const [checkFirstname, setCheckFirstname] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
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
      setEmail(decoded.email);
      setFirstName(decoded.firstName);
      setPhone(decoded.phone);
      if (decoded.website) {
        setWebsite(decoded.website);
      }
      if (decoded.agencyname) {
        setAgencyname(decoded.agencyname);
      }
      if (decoded.agencylogo) {
        setAgencylogo(decoded.agencylogo);
      }
      if (decoded.profileImage) {
        setUserImg(decoded.profileImage);
      }
      if (decoded.loginType) {
        setLoginType(decoded.loginType);
      }
    }
  }, [email]);
  /**
   * Submit handler
   * @param event use for prevent the default functionality of the event
   * @returns na
   */
  function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    const resultFname = schemaFname.validate({ firstname: firstName });

    if (resultFname.error) {
      setCheckFirstname(true);
      return false;
    }
    setProcessing(true);
    // API Call
    axios
      .put(apiUpdateUser + userId, {
        firstName: firstName,
        phone: phone,
        agencyname: agencyname,
        agencylogo: agencylogo,
        id: userId,
        website: website,
        profileImage: userImg,
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
                <li className="active">
                  <Link to="/profile/">Profile</Link>
                </li>
                <li>
                  <Link to="/upgrade-plan">Change Plan</Link>
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
            <div className="col-12">
              <div className="profile-box">
                <div className="userimg-section">
                  <input
                    type="file"
                    name="Agency name"
                    onChange={(e) => setformImage(e, 1)}
                    className="form-control"
                    placeholder="User Img"
                  />
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
                        <label>Name</label>
                        <img src={avatar} alt="Name" />
                        <input
                          type="text"
                          name="Name"
                          value={firstName}
                          onChange={(e) => setfirstName(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Name"
                        />
                        <span className="error-message">
                          {checkFirstname === true ? "*Enter First name" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Agency name</label>
                        <img src={avatar} alt="Agency name" />
                        <input
                          type="text"
                          name="Agency name"
                          value={agencyname}
                          onChange={(e) => setAgencyname(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Enter Agency name"
                        />
                        <span className="error-message">
                          {/* {checkPassword === true ? "*Enter password" : ""} */}
                        </span>
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Email</label>
                        <img src={emailicon} alt="email" />
                        <input
                          type="text"
                          name="Email"
                          value={email}
                          // onChange={(e) => setpassword(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Email"
                          readOnly
                        />
                        <span className="error-message">
                          {/* {checkPassword === true ? "*Enter password" : ""} */}
                        </span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Phone Number</label>
                        <img src={phoneicon} alt="email" />
                        <input
                          type="text"
                          name="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Enter Phone Number"
                        />
                        <span className="error-message">
                          {/* {checkPassword === true ? "*Enter password" : ""} */}
                        </span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-12 col-sm-12">
                        <label>Website</label>
                        <img src={passicon} alt="email" />
                        <input
                          type="text"
                          name="Website"
                          value={website}
                          onChange={(e) => setWebsite(e.currentTarget.value)}
                          className="form-control"
                          placeholder="Enter Website"
                        />
                        <span className="error-message">
                          {/* {checkPassword === true ? "*Enter password" : ""} */}
                        </span>
                      </div>
                    </div>
                    <div className="row form-group">
                      {agencylogo ? (
                        <img
                          src={apiPath + agencylogo}
                          className="img-fluid"
                          alt="agency logo"
                        />
                      ) : null}
                      <div className="col-12 col-sm-12">
                        <label>Agency Logo</label>
                        <img src={passicon} alt="email" />
                        <input
                          type="file"
                          name="Agency name"
                          onChange={(e) => setformImage(e, 0)}
                          className="form-control"
                          placeholder="Agency Logo"
                          style={{ height: "90px", paddingTop: "43px" }}
                        />
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
export default EditProfile;
