/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import $ from "jquery";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "./../../Assets/images/home/listings/listings1.jpg";
import video1 from "./../../Assets/images/home/listings/diverse-workplace-scenes.mp4";
import update from "./../../Assets/images/templates/update.png";
import close from "./../../Assets/images/home/close.svg";
import { apigetVideo, apiPath } from "../../Utility/Utility";
import moment from "moment";
import { useRouteMatch } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import download from "downloadjs";
import { EmailShareButton } from "react-share";
import { apiSendEmail } from "../../Utility/Utility";

const EmailShare = (props) => {
  const match = useRouteMatch("/share/:videoId/");
  const tokens = localStorage.getItem('token');
  const {
    params: { videoId },
  } = match;
  const [videoUrl, setVideoUrl] = React.useState("");
  const [videoDate, setVideoDate] = React.useState("");
  const [videoTitle, setVideoTitle] = React.useState("");
  const [content, setContent] = React.useState(props.content);
  const [subject, setSubject] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  React.useEffect(() => {

    axios
      .get(`${apigetVideo}` + "?videoId=" + videoId, {})
      .then(function (response) {
        console.log(response);
        setVideoUrl(response.data.data.path);
        setVideoDate(response.data.data.updatedAt);
        setVideoTitle(response.data.data.videoTitle);
      });
  }, []);
  function downloadVideo() {
    download(apiPath + videoUrl);
  }
  function getcontent(e) {
    let charc = e.target.value;
    setContent(charc);
  }
  function validateMultipleEmails(emailInput) {
    // Get value on emails input as a string
    var emails = emailInput;

    // Split string by comma into an array
    emails = emails.split(",");

    var valid = true;
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var invalidEmails = [];

    for (var i = 0; i < emails.length; i++) {
      // Trim whitespaces from email address
      emails[i] = emails[i].trim();

      // Check email against our regex to determine if email is valid
      if (emails[i] == "" || !regex.test(emails[i])) {
        invalidEmails.push(emails[i]);
      }
    }


    if (invalidEmails != 0) {
      return false
    }

  }
  const sendEmail = (event) => {

    const decoded = jwt_decode(tokens);
    event.preventDefault();
    if (subject == '') {
      return false;
    }
    validateMultipleEmails(subject)
    var emails = subject.split(",");
    setLoader(true);
    setSuccessMessage("");
    axios
      .post(apiSendEmail, {
        email: decoded.firstName,
        sentoEmail: emails,
        url: "https://reveo.io/play/?id=" + videoId,
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setLoader(false);

        setTimeout(function () { setSuccessMessage(''); setSubject('') }, 6000);
      })
      .catch((error) => {
        console.log(error);

      });
  }
  return (
    <section className=" slider-section bg">
      <div className="containers home-new">
        <div className="profile-page section video-page">
          <div className="form-section container-full ">
            <video
              key={videoUrl}
              className="video-container video-container-overlay"
              autoPlay={false}
              controls={true}
              loop=""
              style={{ height: "250px" }}
            // muted={true}
            >
              <source type="video/mp4" src={apiPath + videoUrl} />
            </video>
            <div className="seprator-section d-flex">
              <div className="video-title">
                <h4>{videoTitle}</h4>
                <span>{moment(videoDate).format("dddd, MMMM Do YYYY")}</span>
              </div>
              <div className="toolbar-item small-toolbar-divider s-sharing-button ControlButton-module_wrap__3qoLv ControlButton-module_toolbar__1zm-G BaseControlButton-module_wrap__2n2U6">
                <button
                  //to={"/share/" + videoId}
                  onClick={downloadVideo}
                  className="ControlButton-module_ button __1rkdm BaseControlButton-module_button__1w6h2"
                >
                  <span className="Icon-module_defaultFill__3lKgW Icon-module_icon__3ohIJ Icon-module_medium__2TcqB">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                    >
                      <title>Download</title>
                      <path d="M5 2.004v1H3v18h18v-18h-2v-1h3v20H2v-20h3zM12.5 2v12.296l3.146-3.146.707.708L12 16.21l-4.354-4.353.707-.708 3.147 3.147V2h1z"></path>
                    </svg>
                  </span>
                  <span className="s-control-button-text ControlButton-module_string__33biH ControlButton-module_iconOnLeft__hCFAt BodySmall-module_bodySmall__P_dXD Typography-module_primary__38_yj">
                    Download
                  </span>
                </button>
              </div>
            </div>
            <div className="seprator-section ">
              <h4>Share to Email</h4>
              <label>To</label>
              <input type="email" value={subject} className="form-control" onChange={e => setSubject(e.target.value)} />
              <button onClick={sendEmail}
                className="btn twitter-btn primary-btn emailshare"
              >
                Share
              </button>

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default EmailShare;
