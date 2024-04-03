import React from 'react'
import axios from "axios"
import { Link } from "react-router-dom";
import Header from "./../../Header";
import Footer from "./../../Footer";
import { apiSetPassword, schemaPassword, schemaCpass } from './../../Utility/Utility';
import forgotPassword from './../../Assets/images/signup/forgot-password-send.svg';
const ResetNewPassword = () => {
  const [password, setPassword] = React.useState('');
  const [checkPassword, setcheckPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [checkConfirmPassword, setcheckConfirmPassword] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  let params = (new URL(document.location)).searchParams;
  let token = params.get("token")
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
   * Submit handler 
   * @param event use for prevent the default functionality of the event
   * @returns na
   */

  function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const resultpassword = schemaPassword.validate({ password: password });
    const resultconfirmpassword = schemaCpass.validate({ password: password, confirmpassword: confirmPassword });
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
    axios.post(`${apiSetPassword}${token}`, {
      password: password,
      confirmPassword: confirmPassword,
    }).then((response) => {
      setSuccessMessage(response.data.message);
      setLoader(false);
      setPassword('');
      setConfirmPassword('');
      setShowLogin(true);
    }).catch((error) => {
      setErrorMessage(error.response.data.message);
      setLoader(false);
    });
  }
  return (
    <div><Header hide="nav" />
      <section className="section">
        <div className="container">
          <div className="inner-container text-center section">
            <img className="password-emailicon" src={forgotPassword} alt="Key Frame" />
            <h2 className="password-emailtitle">Enter new password</h2>
            <p className="lightblack password-email">
              Enter your new password and confirm password.
          </p>
            <form className="signup" method="post">
              <div className="row form-group">
                <div className="col-12 col-sm-12">
                  <input type="password" name="password" value={password} onChange={e => setUserPassword(e.currentTarget.value)} className="form-control" placeholder="Password" />
                  <span className="error-message"> {checkPassword ? '*Password must be at least 8 characters long' : ''} </span>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-12 col-sm-12">
                  <input type="password" name="cpassword" value={confirmPassword} onChange={e => setUserConfirmpassword(e.currentTarget.value)} className="form-control" placeholder="Confirm Password" />
                  <span className="error-message"> {checkConfirmPassword ? '*Password does not matched' : ''} </span>
                </div>
              </div>
              <div className="row form-group text-center btn-section">
                <div className="col-12 col-sm-12">
                  <input type="submit" name="submit" onClick={handleSubmit} className="btn " value="Submit" />
                  {loader ? (<div><br /><i className="fas fa-spinner fa-pulse"></i></div>) : null}
                  {successMessage ? (<div className="alert alert-success alert-messages" role="alert">{successMessage}</div>) : null}
                  {errorMessage ? (
                    <div className="alert alert-danger alert-messages" role="alert">{errorMessage}</div>
                  ) : null}
                </div>
              </div>
              {showLogin ? (
                <div className="row">
                  <div className="col-12">
                    <p className="lightblack">
                      Login to access your account.
                </p>
                    <Link to={`/login`} className="link">Login</Link>
                  </div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </section>
      <Footer  hide="nav" />
    </div>
  );
}
export default ResetNewPassword