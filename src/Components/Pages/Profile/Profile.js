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
import reveo_TempLogo from "./../../Assets/images/templates/reveo_TempLogo.png";
import Editing from "./../../Assets/images/editing.png";
import {
  schemaFname,
  apiUpdateUser,
  apiUploadImage,
  apiPath,
} from "./../../Utility/Utility";
const Profile = () => {
  const [userId, setUserId] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [agencyname, setAgencyname] = React.useState("");
  const [agencylogo, setAgencylogo] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const [loginType, setLoginType] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [checkFirstname, setCheckFirstname] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);

  const [toggleImg, setToggleImg] = React.useState(false);

  const [userImg, setUserImg] = React.useState("");
  const cookies = new Cookies();

  React.useEffect(() => {
    const tokens = localStorage.getItem('token');
    // if (cookies.get("token")) {
    if (tokens != null) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      setUserId(decoded._id);
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

        if (decoded.profileImage.indexOf("template") != -1) {
          setProfileImage(apiPath + decoded.profileImage);
        } else {
          setProfileImage(decoded.profileImage);
        }

      }
      if (decoded.loginType) {
        setLoginType(decoded.loginType);
      }
    }
  }, [email]);

  function handleSubmit(imageUrl) {
    console.log(imageUrl)
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
        profileImage: imageUrl,
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
    ///console.log(e.target.files.length);
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
            // console.log(imageUrl)
            setUserImg(imageUrl);
            setToggleImg(!toggleImg)
            handleSubmit(imageUrl)
          })
          .catch((error) => { });
      }
    }
  }
  return (
    <div className="profile-page section">
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
                {toggleImg &&
                  <input
                    type="file"
                    name="Agency name"
                    onChange={(e) => setformImage(e, 1)}
                    className="form-control"
                    placeholder="User Img"
                  />
                }
                <div className="img">
                  {loginType != "" ? (
                    <img src={profileImage} alt="user" />
                  ) : profileImage ? (
                    <img src={profileImage} alt="user" />
                  ) : (
                    <img src={UserAvatar} alt="user" />
                  )}
                  {/* {profileImage == "" ? (
                    <img src={UserAvatar} alt="user" />
                  ) : (
                    <img src={apiPath + profileImage} alt="user" />
                  )} */}
                </div>
                <div className="edit">
                  {toggleImg == false ?
                    <div
                      style={{
                        color: "#333",
                        display: "block",
                        marginTop: "10px",
                      }}
                      onClick={(e) => setToggleImg(!toggleImg)}
                    >
                      Edit Photo
                    </div>
                    :
                    <div>
                      <div
                        style={{
                          color: "#333",
                          display: "block",
                          marginTop: "10px",
                        }}

                      >
                        Click on Photo
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className="userinfo-section">
                <h4>{firstName}</h4>
                <ul>
                  <li>
                    <span className="agency">Agency name</span>
                    <label>{website}</label>
                  </li>

                  <li>
                    <span className="agency">Email</span>
                    <label>{email}</label>
                  </li>
                  <li>
                    <span className="agency">Phone Number</span>
                    <label>{phone} </label>
                  </li>
                  <li>
                    <span className="agency">Website</span>
                    <label>{website}</label>
                  </li>
                  <li>
                    <span className="agency">Agency Logo</span>
                    {agencylogo ? (
                      <img
                        src={apiPath + agencylogo}
                        className="img-fluid"
                        alt="agency logo"
                      />
                    ) : (
                      <img
                        src={reveo_TempLogo}
                        className="img-fluid"
                        alt="agency logo"
                      />
                    )}

                  </li>
                  <li className="edit-profile"> <Link to="/edit-profile">
                    <img
                      src={Editing}
                      className="img-fluid"
                      alt="Edit Profile"
                    /></Link></li>
                </ul>
              </div>
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
    </div>
  );
};
export default Profile;
