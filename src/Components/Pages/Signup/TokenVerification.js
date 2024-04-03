/* eslint-disable no-unused-vars */
import React from 'react'
import axios from "axios"
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from "./../../Header";
import Footer from "./../../Footer";
import { apiVerificationEmailResend, apiVerificationEmail } from './../../Utility/Utility';
import forgotPassword from './../../Assets/images/signup/forgot-password-send.svg';
const EmailVerification = () => {
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const [showResend, setShowResend] = React.useState(false);
  const [redirectPath, setRedirectPath] = React.useState(false);
  const [hideResend, setHideResend] = React.useState(false);
  let params = (new URL(document.location)).searchParams;
  let userEmail = params.get("useremail");
  let token = params.get("token");
  const [email, setEmail] = React.useState('');


  React.useEffect(() => {
    if (!email) {
      setEmail(userEmail);
    }
    setLoader(true);
    //API Call For verification
    axios.get(apiVerificationEmail + token).then((response) => {
      setSuccessMessage(response.data.message);
      setLoader(false);
      console.log(response);
    }).catch((error) => {
      setErrorMessage(error.response.data.message);
      setLoader(false);
      setShowResend(true);
    });
  }, [email, token, userEmail]);


  /**
   * Submit handler 
   * @param event use for prevent the default functionality of the event
   * @returns na
   */
  function handleSubmit(event) {
    event.preventDefault();
    setHideResend(false);
    setSuccessMessage('');
    setErrorMessage('');
    // API Call 
    axios.post(apiVerificationEmailResend, {
      email: email,
    }).then((response) => {
      setSuccessMessage(response.data.message);
      setHideResend(true);
      setShowResend(false);
      setLoader(false);
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
            <h2 className="password-emailtitle">Email verification</h2>
            <p className="lightblack password-email">
             Congratulations! You're now part of a growing team of real estate professionals making amazing videos with Reveo! Go nuts with it!
          </p>

            <form className="signup" method="post">
              <div className="row form-group text-center btn-section">
                <div className="col-12 col-sm-12">
                  {showResend ? (<input type="submit" name="submit" onClick={handleSubmit} className="btn " value="Resend" />) : null}
                  {loader ? (<div><br /><i className="fas fa-spinner fa-pulse"></i></div>) : null}
                  {successMessage ? (<div> {hideResend ? null : <Link to='/login' className="btn" >Login</Link>}<div className="alert alert-success alert-messages" role="alert">{successMessage}</div>
                    </div>
                  ) : null}
                  {errorMessage ? (
                    <div className="alert alert-danger alert-messages" role="alert">{errorMessage}</div>
                  ) : null}
                </div>
              </div>

            </form>
          </div>
        </div>
      </section>
      <Footer hide="nav" />
    </div>
  );
}
export default EmailVerification