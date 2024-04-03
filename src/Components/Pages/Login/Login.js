import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

import {
  schema,
  schemaPassword,
  apiLogin,
  apiSocialLogin,
} from "./../../Utility/Utility";
import jwt_decode from "jwt-decode";
import logo from "./../../Assets/images/homeV3/FooterLogo.png";
import emailicon from "./../../Assets/images/homeV3/email.png";
import passicon from "./../../Assets/images/homeV3/lock.png";
import facebook from "./../../Assets/images/homeV3/facebook.png";
import google from "./../../Assets/images/homeV3/google.png";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
//import { GoogleLogin } from "react-google-login";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [checkEmail, setcheckEmail] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [checkPassword, setcheckPassword] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [redirectPath, setRedirectPath] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  /**
   * Set Email
   * @param {string} evt get the value of the field.
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
   * @param  {string} evt get the value of the field.
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
   * Set Redirect after login
   * @returns redirect url
   */
  function setRedirect() {
    setRedirectPath(true);
  }
  function renderRedirect() {
    if (redirectPath) {
      return <Redirect to="/home" />;
    }
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
    const resultEmail = schema.validate({ email: email });
    const resultpassword = schemaPassword.validate({ password: password });

    if (resultEmail.error) {
      setcheckEmail(true);
      return false;
    }

    if (resultpassword.error) {
      setcheckPassword(true);
      return false;
    }
    setLoader(true);
    // API Call
    axios
      .post(apiLogin, {
        email: email,
        password: password,
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
        const cookies = new Cookies();
        cookies.set("token", response.data.token, { path: "/" });
        cookies.set("userRole", response.data.user.userRole, { path: "/" });

        localStorage.setItem('token', response.data.token);
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

          localStorage.setItem('token', response.data.token);
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
  //const responseGoogle = (response) => {
  // console.log(response);
  // if (response != "") {
  //   axios
  //     .post(apiSocialLogin, {
  //       email: response.profileObj.email,
  //       socialLoginId: response.googleId,
  //       loginType: 'google',
  //       password: "reveoSocialUser",
  //       firstName: response.profileObj.name,
  //       profileImage: response.profileObj.imageUrl,
  //     })
  //     .then((response) => {
  //       setSuccessMessage(response.data.message);
  //       const cookies = new Cookies();
  //       cookies.set("token", response.data.token, { path: "/" });
  //       cookies.set("userRole", response.data.user.userRole, { path: "/" });
  //       setLoader(false);
  //       setRedirect();
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setErrorMessage(error.response.data.message);
  //       setLoader(false);
  //     });
  // }
  //};
  const responseGoogle = (response) => {
    if (!response.error) {
      console.log(response);
      var token = response.credential;
      if (token) {
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

              localStorage.setItem('token', response.data.token);
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
    }
  };
  return (
    <div className="container-full ">
      <div className="row">
        <div className="col-sm-5 col-12 text-center section signupleft signup">
          <Link to={`/`} className="link">
            <img src={logo} alt="Reveo" />
          </Link>
          <h3>Don't have an account?</h3>
          <p>Create a FREE account with your personal details. </p>
          <div>
            <a href="/signup" className="btn">
              Sign Up Now
            </a>
          </div>
        </div>
        <div className="col-sm-7 col-12 text-center section signup signupRight">
          <h2>Login to Reveo</h2>
          <form className="signup form-signup">
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
                //placeholder="Email"
                />
                <span className="error-message">
                  {checkEmail === true ? "*Enter valid email" : ""}
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
                    ? "*Enter password / must be 8 character long"
                    : ""}
                </span>
              </div>
            </div>
            <div className="row d-flex justify-content-between">
              <div className="col-sm-6 col-12 text-left">
                <label>
                  <input type="checkbox"></input>Remember Me
                </label>
              </div>
              <div className="col-sm-6 col-12 text-right">
                <Link to={`/reset-password`} className="link">
                  Forget password?
                </Link>
              </div>
            </div>
            <div className="row form-group text-center btn-section justify-content-center m-bottom">
              <div className="col-12 col-sm-5">
                <input
                  type="submit"
                  name="submit"
                  onClick={handleSubmit}
                  className="btn "
                  value="Login"
                /></div>
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
                {renderRedirect()}
              </div>
            </div>
          </form>
          <div className="seperator">
            <p>or Sign in with</p>
            <div className="d-flex justify-content-center">
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
                clientId="489158189543-kphbcnfatec5b2upnec41gb1rsvfml6g.apps.googleusercontent.com"
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
export default Login;
