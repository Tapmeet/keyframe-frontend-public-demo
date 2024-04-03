import React from 'react'
import axios from "axios"
import { Redirect } from 'react-router-dom';
import Header from "./../../Header";
import Footer from "./../../Footer";
import { apiResetPassword, apiVerificationToken } from './../../Utility/Utility';
import forgotPassword from './../../Assets/images/signup/forgot-password-send.svg';
const TokenVerification = () => {
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const [showResend, setShowResend] = React.useState(false);
  const [redirectPath, setRedirectPath] = React.useState(false);
  let params = (new URL(document.location)).searchParams;
  let userEmail = params.get("useremail");
  let token = params.get("token");
  const [email, setEmail] = React.useState('');

  /**
   * Set Redirect after login 
   * @returns redirect url
   */
  function setRedirect() {
    setRedirectPath(true)
  }
  function renderRedirect() {
    if (redirectPath) {
      return <Redirect to={`/new-password/?token=${token}`} />
    }
  }
  React.useEffect(() => {
    if (!email) {
      setEmail(userEmail);
    }
    setLoader(true);
    //API Call For verification
    axios.get(apiVerificationToken + token).then((response) => {
      setSuccessMessage(response.data.message);
      setLoader(false);
      setLoader(false);
      setRedirect();

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
    setSuccessMessage('');
    setErrorMessage('');
    // API Call 
    axios.post(apiResetPassword, {
      email: email,
    }).then((response) => {
      setSuccessMessage(response.data.message);
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
            <h2 className="password-emailtitle">Reset your password</h2>
            <p className="lightblack password-email">
              Find out the agenda for all the rodeos throughout the country! Search for the ones you want to attend and click going.
          </p>
            <form className="signup" method="post">
              <div className="row form-group text-center btn-section">
                <div className="col-12 col-sm-12">
                  {showResend ? (<input type="submit" name="submit" onClick={handleSubmit} className="btn " value="Resend" />) : null}
                  {loader ? (<div><br /><i className="fas fa-spinner fa-pulse"></i></div>) : null}
                  {successMessage ? (<div className="alert alert-success alert-messages" role="alert">{successMessage}</div>) : null}
                  {errorMessage ? (
                    <div className="alert alert-danger alert-messages" role="alert">{errorMessage}</div>
                  ) : null}
                  {renderRedirect()}
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
export default TokenVerification