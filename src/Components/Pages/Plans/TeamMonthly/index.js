/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import SiteHeader from "../../../Header/HeaderUser";
import { Redirect, Link } from "react-router-dom";
import Footer from "../../../Footer";
import passicon from "./../../../Assets/images/homeV3/lock.png";
import SideShape3 from "./../../../Assets/images/homeV3/SideShape3.png";
import SideShape4 from "./../../../Assets/images/homeV3/SideShape2inverse.png";
import Circle2 from "./../../../Assets/images/homeV3/Circle2.png";
import HalfCircle from "./../../../Assets/images/homeV3/HalfCircle.png";
import Triangle1 from "./../../../Assets/images/homeV3/Triangle1.png";
import Circle1 from "./../../../Assets/images/homeV3/Circle1.png";
import emailicon from "./../../../Assets/images/homeV3/loupe.png";
import UserAvatar from "./../../../Assets/images/User/Header/default.png";
import Loader from "../../../Utility/Loader/Loader";
import ReactDOM from "react-dom";
import {
  apiPath,
  apigetTeamMember,
  apiaddTeamMember,
  apideleteTeamMember,
  apiSearchTeamMember,
  schema,
  apiInviteteamMember,
} from "../../../Utility/Utility";

const TeamMonthly = (props) => {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [userId, setUserId] = React.useState("");
  const [userFirstName, setUserFirstName] = React.useState("");
  const [userLastName, setUserLastName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userPhone, setUserPhone] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorMessage2, setErrorMessage2] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  React.useEffect(() => {
    if (cookies.get("token")) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(token);
      console.log(decoded);
      setUserId(decoded._id);
      const contentParts = decoded.firstName.split(" ");
      console.log(contentParts);
      setUserPhone(decoded.phone);
      setUserFirstName(contentParts[0]);
      setUserLastName(contentParts[1]);
      setUserEmail(decoded.email);
    }
  }, [userId]);

  return (
    <div>
      <SiteHeader nav="dark"></SiteHeader>
      <Loader open={loader} />
      <div className="profile-page section">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center">
              <h2>Reveo Team - Monthly</h2>
              <iframe
                src={`https://app.paykickstart.com/checkout-embed/7a34cec8251b776cdabbd6a129a4748f0c6edb2c?first_name=${userFirstName}&&last_name=${userLastName}&&email=${userEmail}&&billing_phone_number=${userPhone}`}
                width="100%"
                // scrolling="no"
                frameborder="0"
                style={{ height: "280vh" }}
              ></iframe>
              <script
                type="text/javascript"
                src="https://app.paykickstart.com/checkout/embed_forms/iframe.js"
              ></script>
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
export default TeamMonthly;
