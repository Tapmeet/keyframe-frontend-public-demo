import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import {
  schema,
  schemaFname,
  schemaLname,
  schemaPassword,
  schemaCpass,
  schemaPhone,
  apiRegister,
  apiLogin,
  apiSocialLogin,
} from "./../../Utility/Utility";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
//import { GoogleLogin } from "react-google-login";
import logo from "./../../Assets/images/homeV3/FooterLogo.png";
import emailicon from "./../../Assets/images/homeV3/email.png";
import passicon from "./../../Assets/images/homeV3/lock.png";
import avatar from "./../../Assets/images/homeV3/avatar.png";
import phones from "./../../Assets/images/homeV3/phone.png";
import facebook from "./../../Assets/images/homeV3/facebook.png";
import google from "./../../Assets/images/homeV3/google.png";
const Signup = () => {
  let history = useHistory();
  const [firstName, setFname] = React.useState("");
  const [checkFname, setcheckFname] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [checkEmail, setcheckEmail] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [checkPhone, setCheckPhone] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [checkPassword, setcheckPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [checkConfirmPassword, setcheckConfirmPassword] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [redirectPath, setRedirectPath] = React.useState(false);

  /**
   * Set First Name
   * @param evt get the value of the field.
   * @returns na
   */
  function setUserFname(evt) {
    if (evt === "") {
      setcheckFname(true);
    } else {
      setcheckFname(false);
    }
    setFname(evt);
  }

  /**
   * Set Email
   * @param evt get the value of the field.
   * @returns na
   */
  function setUserEmail(evt) {
    if (evt === "") {
      setcheckEmail(true);
    } else {
      setcheckEmail(false);
    }
    setEmail(evt);
  }
  /**
   * Set Password
   * @param evt get the value of the field.
   * @returns na
   */
  function setUserPassword(evt) {
    if (evt === "") {
      setcheckPassword(true);
    } else {
      setcheckPassword(false);
    }
    setPassword(evt);
  }
  /**
   * Set Confirm Password
   * @param evt get the value of the field.
   * @returns na
   */
  function setUserConfirmpassword(evt) {
    if (evt === "") {
      setcheckConfirmPassword(true);
    } else {
      setcheckConfirmPassword(false);
    }
    setConfirmPassword(evt);
  }
  /**
   * Set Phone Number
   * @param evt get the value of the field.
   * @returns na
   */
  function setUserPhone(evt) {
    if (evt === "") {
      setCheckPhone(true);
    } else {
      setCheckPhone(false);
    }
    setPhone(evt);
  }

  /**
   * Set Redirect after login
   * @returns redirect url
   */
  function setRedirect() {
    setRedirectPath(true);
  }
  function renderRedirect() {
    if (redirectPath) {
      return <Redirect to="/free-plan" />;
    }
  }
  /**
   * Submit handler
   * @param event use for prevent the default functionality of the event
   * @returns na
   */
  function handleSubmit(event) {
    console.log("here");
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    const resultFname = schemaFname.validate({ firstname: firstName });
    const resultEmail = schema.validate({ email: email });
    const resultpassword = schemaPassword.validate({ password: password });
    const resultconfirmpassword = schemaCpass.validate({
      password: password,
      confirmpassword: confirmPassword,
    });
    const resultphone = schemaPhone.validate({ phone: phone });

    if (resultFname.error) {
      setcheckFname(true);
      return false;
    }

    if (resultEmail.error) {
      setcheckEmail(true);
      return false;
    }
    // if (resultphone.error) {
    //   setCheckPhone(true);
    //   return false;
    // }
    if (resultpassword.error) {
      setcheckPassword(true);
      return false;
    }
    if (resultconfirmpassword.error) {
      setcheckConfirmPassword(true);
      return false;
    }
    setLoader(true);

    // API Call
    axios
      .post(apiRegister, {
        firstName: firstName,
        password: password,
        confirmPassword: confirmPassword,
        email: email,
        phone: phone,
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoader(false);
        history.push('/signup-success')
        // API Call
        // axios.post(apiLogin, {
        //   email: email,
        //   password: password,
        // }).then((response) => {
        //   setSuccessMessage(response.data.message);
        //   // const cookies = new Cookies();
        //   // cookies.set('token', response.data.token, { path: '/' });
        //   // cookies.set('userRole', response.data.user.userRole, { path: '/' });
        //   // setLoader(false);
        //   // setRedirect();
        //   // window.location.reload();
        // }).catch((error) => {
        //   setErrorMessage(error.response.data.message);
        //   setLoader(false);
        // });
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setLoader(false);
      });
  }
  const responseFacebook = (response) => {
    console.log(response);
    if (response != "") {
      axios
        .post(apiSocialLogin, {
          email: response.email,
          socialLoginId: response.id,
          loginType: response.graphDomain,
          password: "reveoSocialUser",
          firstName: response.name,
          profileImage: response.picture.data.url,
        })
        .then((response) => {
          setSuccessMessage(response.data.message);
          const cookies = new Cookies();
          cookies.set("token", response.data.token, { path: "/" });
          cookies.set("userRole", response.data.user.userRole, { path: "/" });
          setLoader(false);
          setRedirect();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.response.data.message);
          setLoader(false);
        });
    }
  };
  const responseGoogle = (response) => {
    if (!response.error) {
      console.log(response.credential);
      var token = response.credential;
      var decoded = jwt_decode(token);
      console.log(decoded.email);
      if (decoded) {
        axios
          .post(apiSocialLogin, {
            email: decoded.email,
            socialLoginId: decoded.sub,
            loginType: "google",
            password: "reveoSocialUser",
            firstName: decoded.given_name + ' ' + decoded.family_name,
            profileImage: decoded.picture
          })
          .then((response) => {
            setSuccessMessage(response.data.message);
            const cookies = new Cookies();
            cookies.set("token", response.data.token, { path: "/" });
            cookies.set("userRole", response.data.user.userRole, { path: "/" });
            setLoader(false);
            setRedirect();
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage(error.response.data.message);
            setLoader(false);
          });
      }
    }
  };
  return (
    <div className="container-full ">
      <div className="row">
        <div
          className="col-sm-5 col-12 text-center section signupleft signup"
          style={{ paddingLeft: "120px", paddingRight: "120px" }}
        >
          <div className="inner">
            <Link to={`/`} className="link">
              <img src={logo} alt="Reveo" />
            </Link>
            <h3>Already have an account?</h3>
            <p>
              Welcome back! Come in and create your <br /> next video.
            </p>
            <div>
              <a href="/login" className="btn">
                Sign In
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-7 col-12 text-center section signup signupRight">
          <h2>Create a free account today</h2>
          <form className="signup form-signup">
            <div className="row form-group first-row">
              <div className="col-12 col-sm-12">
                <label>Full name</label>
                <img src={avatar} alt="email" />
                <input
                  type="text"
                  name="firstname"
                  value={firstName}
                  onChange={(e) => setUserFname(e.currentTarget.value)}
                  className="form-control"
                // placeholder="Full name"
                />
                <span className="error-message">
                  {checkFname === true ? "*Enter first name" : ""}
                </span>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-12 col-sm-12">
                <label>Email</label>
                <img src={emailicon} alt="email" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setUserEmail(e.currentTarget.value)}
                  className="form-control"
                // placeholder="Email"
                />
                <span className="error-message">
                  {checkEmail === true ? "*Enter valid email" : ""}{" "}
                </span>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-12 col-sm-12">
                {/* <label>Phone</label> */}
                {/* <img src={phones} alt="phone" /> */}
                {/* <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setUserPhone(e.currentTarget.value)}
                  className="form-control"
                  // placeholder="Phone"
                /> */}
                <PhoneInput
                  placeholder="Enter phone number"
                  value={phone}
                  country="US"
                  defaultCountry="US"
                  onChange={setUserPhone}
                />
                <span className="error-message">
                  {" "}
                  {checkPhone === true ? "*Enter phone number" : ""}{" "}
                </span>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-12 col-sm-12">
                <label>Password</label>
                <img src={passicon} alt="email" />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setUserPassword(e.currentTarget.value)}
                  className="form-control"
                // placeholder="Password"
                />
                <span className="error-message">
                  {" "}
                  {checkPassword
                    ? "*Password must be at least 8 characters long"
                    : ""}{" "}
                </span>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-12 col-sm-12">
                <label>Confirm Password</label>
                <img src={passicon} alt="email" />
                <input
                  type="password"
                  name="cpassword"
                  value={confirmPassword}
                  onChange={(e) =>
                    setUserConfirmpassword(e.currentTarget.value)
                  }
                  className="form-control"
                // placeholder="Confirm Password"
                />
                <span className="error-message">
                  {" "}
                  {checkConfirmPassword ? "*Password does not matched" : ""}
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
                  value="Register"
                />
              </div>
              <div className="col-12 col-sm-12">
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
            {/* <div className="row">
              <div className="col-12">
                <p className="lightblack">
                  Already have account?
                  <Link to={`/login`} className="link">
                    {" "}
                    Signin
                  </Link>
                </p>
               
              </div>
            </div> */}
            {renderRedirect()}
          </form>
          <div className="seperator">
            <p>or Sign up with</p>
            <div className="d-flex justify-content-center align-items-center">
              <FacebookLogin
                appId="3556199961292523"
                //autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={(renderProps) => (
                  <button className="loginSocial" onClick={renderProps.onClick}>
                    <img src={facebook} alt="facebook" />
                  </button>
                )}
              />
              {/* <GoogleLogin
                clientId="649503784608-c0con30on2tq55lq4mlot8su0i6c4ne3.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button
                    className="loginSocial"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <img src={google} alt="google" />
                  </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              /> */}
              <GoogleOAuthProvider clientId="649503784608-c0con30on2tq55lq4mlot8su0i6c4ne3.apps.googleusercontent.com">
                <div>
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      responseGoogle(credentialResponse)
                     // console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div>
              </GoogleOAuthProvider>
            </div>
            <div className="copy-right">
              <label>Jumping Rock Media, LLC &copy; 2021</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
