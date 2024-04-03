/* eslint-disable jsx-a11y/iframe-has-title */
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
import { apiAddipn } from "../../../Utility/Utility";
import { useHistory } from "react-router-dom";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
const ProductMonthly = (props) => {
  let history = useHistory();
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
  const cookies = new Cookies();
  const { buttonLabel, className } = props;
  React.useEffect(() => {
    const tokens = localStorage.getItem('token');
    // if (cookies.get("token")) {
    if (tokens != null) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      console.log(decoded);
      setUserId(decoded._id);
      const contentParts = decoded.firstName.split(" ");
      //console.log(contentParts);
      setUserPhone(decoded.phone);
      setUserFirstName(contentParts[0]);
      setUserLastName(contentParts[1]);

      if (decoded.billing_address_1) {
        setBilling_address_1(decoded.billing_address_1);
      }
      if (decoded.billing_address_2) {
        setBilling_address_2(decoded.billing_address_2);
      }
      if (decoded.billing_city) {
        setbilling_city(decoded.billing_city);
      }
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

      setUserEmail(decoded.email);
    }
  }, [userId]);
  const style = { "layout": "vertical" };


  const createOrder = (data, actions) => {
    return actions.subscription
      .create({
        plan_id: "P-3Y542598WP630220TMVMG36Q",
      });
  };

  function onApprove(data) {
    console.log(data)

    axios
      .post(apiAddipn, {
        transaction_id: data.orderID,
        tracking_id: data.subscriptionID,
        payment_processor: data.paymentSource,
        userId: userId,
        buyer_first_name: userFirstName,
        buyer_last_name: userLastName,
        product_id: '30167',
        product_name: "Reveo Professional - Monthly",
        buyer_email: userEmail,
        amount: "15",
        billing_address_1: billing_address_1,
        billing_address_2: billing_address_2,
        billing_state: billing_state,
        billing_zip: billing_zip,
        billing_country: billing_country,
        selectedplan: "2"
      })
      .then((orderData) => {
        console.log('orderData')
        console.log(orderData)
        history.push("/thankyou");
        // Your code here after capture the order
      });
  }
  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  // Custom component to wrap the PayPalButtons and show loading spinner
  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
      <>
        {(showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource={undefined}
          createSubscription={createOrder}
          onApprove={onApprove}
        />
      </>
    );
  }

  return (
    <div>
      <SiteHeader nav="dark"></SiteHeader>
      <Loader open={loader} />
      <div className="profile-page section">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center">
              <h2>Reveo Professional - Monthly</h2>
              <iframe
                src={`https://app.paykickstart.com/checkout-embed/c68ad928d005a04acba5d0cf41c0580e91243bd8?first_name=${userFirstName}
                &&last_name=${userLastName}
                &&email=${userEmail}
                &&billing_phone_number=${userPhone}
                &&billing_address_1=${billing_address_1}
                &&billing_address_2=${billing_address_2}
                &&billing_state=${billing_state}
                &&billing_zip=${billing_zip}
                &&billing_city=${billing_city}
                &&billing_country=${billing_country}
                &&shipping_address_1=${shipping_address_1}
                &&shipping_address_2=${shipping_address_2}
                &&shipping_city=${shipping_city}
                &&shipping_state=${shipping_state}
                &&shipping_zip=${shipping_zip}
                &&shipping_country=${shipping_country}
                `}
                width="100%"
                // scrolling="no"
                frameborder="0"
                style={{ height: "200vh" }}
              ></iframe>
              <script
                type="text/javascript"
                src="https://app.paykickstart.com/checkout/embed_forms/iframe.js"
              ></script>
            </div>
            <div style={{ maxWidth: "750px", minHeight: "200px", margin: "50px auto", width: "100%" }}>
              <PayPalScriptProvider options={{
                clientId: "AUjZJ3bbDomzvtUIUYWlFfhNBRRE4GYHalDqYV9S110dCGmB30xaz3IKvUJZ7_tP0ewc0QfEGPHxWnvU",
                components: "buttons",
                currency: "USD",
                intent: "subscription",
                vault: true,
              }}>
                <ButtonWrapper showSpinner={false} />
              </PayPalScriptProvider>

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
export default ProductMonthly;
