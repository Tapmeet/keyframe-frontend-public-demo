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
import { LinkedinShareButton } from "react-share";
const LinkedinShare = (props) => {
  const match = useRouteMatch("/share/:videoId/");
  const {
    params: { videoId },
  } = match;
  const [videoUrl, setVideoUrl] = React.useState("");
  const [videoDate, setVideoDate] = React.useState("");
  const [videoTitle, setVideoTitle] = React.useState("");
  const [content, setContent] = React.useState(props.content);
  const [copied, setCopied] = React.useState(false);
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
              <h4>Share to Linkedin</h4>
              
              <textarea className="form-control" onChange={getcontent} value={content}></textarea>
              {content}
              <LinkedinShareButton
                url={"https://reveo.io/play/?id=" + videoId}
                summary={content}
                type="video/mp4"
                className="btn twitter-btn primary-btn"
              >
                Share
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LinkedinShare;
