import React, { useState } from "react";
import { Container } from "reactstrap";
import logo from "./../Assets/images/header/logo.svg";

import UserIcon from "./../Assets/images/User/Header/menu-item.svg";
import Loader from "./../Utility/Loader/Loader";
import UserAvatar from "./../Assets/images/User/Header/default.png";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { apiPath } from "./../Utility/Utility";
import FontPicker from "font-picker-react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
const SiteHeader = (props) => {
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  const [userName, setUserName] = React.useState("");
  const [redirectPath, setRedirectPath] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [loginType, setLoginType] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");
  const [activeFontFamily, setActiveFontFamily] = React.useState('Raleway');

  React.useEffect(() => {
    const tokens = localStorage.getItem('token');
    console.log(tokens)
    if (tokens != null) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      // console.log(decoded);
      setUserName(decoded.firstName);
      if (decoded.loginType) {
        setLoginType(decoded.loginType);
      }
      if (decoded.profileImage) {
        setProfileImage(decoded.profileImage);
      }
    } else {
      setRedirect();
    }
    setTimeout(function () {
      setActiveFontFamily(props.fontFamily)
    }, 600);
  }, [userToken, cookies, props.fontFamily]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function setRedirect() {
    setRedirectPath(true);
  }
  function renderRedirect() {
    if (redirectPath) {
      return <Redirect to="/login" />;
    }
  }
  /**
   * Logout Function
   * @desc Remove user data from cookies
   * @returns na
   */
  function logOut() {
    cookies.get("token");
    cookies.remove("token");
    localStorage.removeItem('token');
    setProcessing(true);
    setTimeout(function () {
      setProcessing(false);
      setRedirect();
      //window.location.reload();
    }, 1000);
  }

  return (
    <header className="header loggedin">
      <Loader open={processing} />
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
          <div className="logo-section">
            <Link to="/home">
              <img src={logo} alt="Key Frame" />
            </Link>
          </div>
          {props.hide != "nav" ? (
            <div className="login-section loggedin">
              <div>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret>
                    <span>{userName}</span>
                    <div className="userimgs">
                      {loginType != "" ? (
                        <img src={profileImage} alt="user" />
                      ) : profileImage ? (
                        <img src={apiPath + profileImage} alt="user" />
                      ) : (
                        <img src={UserAvatar} alt="user" />
                      )}
                    </div>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link to="/my-videos">
                        <img src={UserIcon} alt="Videos" /> Exported Videos
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/profile/">
                        {" "}
                        <img src={UserIcon} alt="settings" /> My Settings
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/team/">
                        {" "}
                        <img src={UserIcon} alt="settings" /> Team
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={logOut}>
                      <img src={UserIcon} alt="Logout" /> Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {renderRedirect()}
      <div style={{ display: "none" }}>
        {activeFontFamily ? (
          <FontPicker
            activeFontFamily={activeFontFamily}
            families={
              "Raleway, Arimo, Lato, Montserrat,Merriweather, Noto Serif, Oswald, Roboto, Josefin Sans, Barlow, Open Sans , Poppins, Hurricane, Inspiration, Cairo, Saira Condensed, Asap"
            }
            apiKey="AIzaSyDaztQYmJQDMP2mVUtrHIq4XRBpLEr0dzk"

          />
        ) : null}
      </div>
    </header>
  );
};
export default SiteHeader;
