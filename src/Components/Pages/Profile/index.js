import React from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import SiteHeader from "../../Header/HeaderUser";
import Profile from './Profile';
import Footer from "../../Footer";
const ProfilePage = () => {
  return (
    <div>
      <SiteHeader nav="dark"></SiteHeader>
      <Profile/>
      <Footer></Footer>
    </div>
  );
};
export default ProfilePage;
