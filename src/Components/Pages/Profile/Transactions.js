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
import { Table } from "reactstrap";
import { apiGetUseripn } from "../../Utility/Utility";
import moment from "moment";
const Billings = () => {
  const [userId, setUserId] = React.useState("");
  const [data, setData] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  const [processing, setProcessing] = React.useState(true);
  React.useEffect(() => {
    // if (cookies.get("token")) {
    //   setUserToken(cookies.get("token"));
    //   const token = cookies.get("token");
    //   const decoded = jwt_decode(token);
    //   // console.log(decoded.id)
    //   setUserId(decoded.id);
    // }
    const tokens = localStorage.getItem('token');
    // if (cookies.get("token")) {
    if (tokens != null) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      setUserId(decoded.id);
     
    }
    if (userId) {
      axios
        .get(`${apiGetUseripn}?userId=${userId}`, {})
        .then(function (response) {
          setProcessing(false);
          console.log(response.data.data);
          setData(response.data.data);
        });
    }
  }, [userId]);
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
                <li>
                  <Link to="/change-password">Change password</Link>
                </li>
                <li>
                <Link to="/billing">Billing</Link>
                </li>
                <li className="active">
                  <Link to="/transactions">Transactions</Link>
                </li>
              </ul>
            </div>
            <div className="form-section container-full " style={{ 'maxWidth': '900px'}}>
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Plan</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0
                    ? data.map((template, index) => {
                        return (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{template.product_name}</td>
                            <td>{template.buyer_first_name +' '+ template.buyer_last_name}</td>
                            <td>{template.buyer_email}</td>
                            <td>${template.amount}</td>
                            <td>{moment(template.createdAt).format("ddd, MM Do YYYY")}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
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
export default Billings;
