import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios"
import { schema, apiResetPassword } from './../../Utility/Utility';
import forgotPassword from './../../Assets/images/signup/forgot-password-send.svg';
const Reset = () => {
  const [email, setEmail] = React.useState('');
  const [checkEmail, setcheckEmail] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loader, setLoader] = React.useState(false);


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
   * Submit handler 
   * @param event use for prevent the default functionality of the event
   * @returns na
   */
  function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    const resultEmail = schema.validate({ email: email });
    if (resultEmail.error) {
      setcheckEmail(true);
      return false;
    }
    setLoader(true);

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
    <section className="section">
      <div className="container">
        <div className="inner-container text-center section">
          <img className="password-emailicon" src={forgotPassword} alt="Key Frame" />
          <h2 className="password-emailtitle">Reset your password</h2>
          <p className="lightblack password-email">
            Enter your email below to receive a new password
          </p>
          <form className="signup" method="post">
            <div className="row form-group">
              <div className="col-12 col-sm-12">
                <label className="text-left">Email</label>
                <input type="email" name="email" value={email} onChange={e => setUserEmail(e.currentTarget.value)} className="form-control" placeholder="Your email address" />
                <span className="error-message"> {checkEmail === true ? '*Enter valid email' : ''} </span>
              </div>
            </div>
            <div className="row form-group text-center btn-section">
              <div className="col-12 col-sm-12">
                <input type="submit" name="submit" onClick={handleSubmit} className="btn " value="Send me a new Password" />
                {loader ? (<div><br /><i className="fas fa-spinner fa-pulse"></i></div>) : null}

                {successMessage ? (<div className="alert alert-success alert-messages" role="alert">{successMessage}</div>) : null}
                {errorMessage ? (
                  <div className="alert alert-danger alert-messages" role="alert">{errorMessage}</div>
                ) : null}
              </div>
            </div>
            <div class="password-email-btn-back"><Link to="/login"> Go Back</Link></div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Reset