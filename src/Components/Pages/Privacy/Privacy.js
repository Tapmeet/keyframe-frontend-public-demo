import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios"
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { schema, schemaFname, apiRegister, schemaSubject, schemaHelp, schemaMessage, apiSupportTicket } from '../../Utility/Utility';
import UserIcon from './../../Assets/images/signup/support-book.svg';
const Privacy = () => {
  const [firstName, setFname] = React.useState('');
  const [checkFname, setcheckFname] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [checkEmail, setcheckEmail] = React.useState(false);

  const [subject, setSubject] = React.useState('');
  const [checkSubject, setcheckSubject] = React.useState(false);

  const [help, setHelp] = React.useState('');
  const [checkHelp, setcheckHelp] = React.useState(false);

  const [message, setMessage] = React.useState('');
  const [checkMessage, setcheckMessage] = React.useState(false);

  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
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

  function setUserHelp(evt) {
    if (evt === "") {
      setcheckHelp(true);
    } else {
      setcheckHelp(false);
    }
    setHelp(evt);
  }

  function setUserSubject(evt) {
    if (evt === "") {
      setcheckSubject(true);
    } else {
      setcheckSubject(false);
    }
    setSubject(evt);
  }

  function setUserMessage(evt) {
    if (evt === "") {
      setcheckMessage(true);
    } else {
      setcheckMessage(false);
    }
    setMessage(evt);
  }
function resetForm(){
  setFname('');
  setEmail('');
  setSubject('');
  setMessage('');
  setHelp('');
}

  /**
   * Submit handler 
   * @param event use for prevent the default functionality of the event
   * @returns na
   */
  function handleSubmit(event) {
    console.log('here');
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    const resultFname = schemaFname.validate({ firstname: firstName });
    const resultEmail = schema.validate({ email: email });

    const resultSubject = schemaSubject.validate({ subject: subject });
    const resultHelp = schemaHelp.validate({ help: help });
    const resultMessage = schemaMessage.validate({ message: message });

    if (resultFname.error) {
      setcheckFname(true);
      return false;
    }
    if (resultEmail.error) {
      setcheckEmail(true);
      return false;
    }
    if (resultSubject.error) {
      setcheckSubject(true);
      return false;
    }

    if (resultHelp.error) {
      setcheckHelp(true);
      return false;
    }

    if (resultMessage.error) {
      setcheckMessage(true);
      return false;
    }
    setLoader(true);

    // API Call 
    axios.post(apiSupportTicket, {
      fullname: firstName,
      email: email,
      subject: subject,
      help: help,
      message:message
    }).then((response) => {
      setSuccessMessage(response.data.message);
      setLoader(false);
      resetForm()
    }).catch((error) => {
      setErrorMessage(error.response.data.message);
      setLoader(false);
    });
  }
  return (
    <section className="section">
      <div className="container">
        <div className="inner-container text-center signup ">
          <img src={UserIcon} alt="Key Frame" />
          <h2>Privacy Policy</h2>
          
          <form className="signup supportform">
            <div className="row form-group first-row">
              <div className="col-12 col-sm-12">
                <label> Full Name <span>*</span></label>
                <input type="text" name="firstname" value={firstName} onChange={e => setUserFname(e.currentTarget.value)} className="form-control" placeholder="Full name" />
                <span className="error-message"> {checkFname === true ? '*Enter first name' : ''} </span>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-12 col-sm-12">
                <label> Your email address <span>*</span></label>
                <input type="email" name="email" value={email} onChange={e => setUserEmail(e.currentTarget.value)} className="form-control" placeholder="Email" />
                <span className="error-message"> {checkEmail === true ? '*Enter valid email' : ''} </span>
              </div>
            </div>
            <div className="row form-group first-row">
              <div className="col-12 col-sm-12">
                <label> Subject <span>*</span></label>
                <input type="text" name="subject" value={subject} onChange={e => setUserSubject(e.currentTarget.value)} className="form-control" placeholder="Subject" />
                <span className="error-message"> {checkSubject === true ? '*Enter Subject' : ''} </span>
              </div>
            </div>
            <div className="row form-group first-row">
              <div className="col-12 col-sm-12">
                <label> What can we help you with? <span>*</span></label>
                <input type="text" name="help" value={help} onChange={e => setUserHelp(e.currentTarget.value)} className="form-control" placeholder="" />
                <span className="error-message"> {checkHelp === true ? '*What can we help you with?' : ''} </span>
              </div>
            </div>
            <div className="row form-group first-row">
              <div className="col-12 col-sm-12">
                <label> Message<span>*</span></label>
                <textarea className="form-control" value={message} onChange={e => setUserMessage(e.currentTarget.value)}></textarea>
                <span className="error-message"> {checkMessage === true ? '*Enter your message' : ''} </span>
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
          </form>
        </div>
      </div>
    </section>
  );
}
export default Privacy