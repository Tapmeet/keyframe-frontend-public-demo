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
const FeaturedSection = (props) => {
  const match = useRouteMatch("/share/:videoId/");
  const {
    params: { videoId },
  } = match;
  const [videoUrl, setVideoUrl] = React.useState("");
  const [videoDate, setVideoDate] = React.useState("");
  const [videoTitle, setVideoTitle] = React.useState("");
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
            <div className="seprator-section d-flex">
              <div style={{ width: "100%" }}>
                <div className="social-link">
                  <h4>Share a link to your video page</h4>
                </div>
                <div className="social-linkinput">
                  <span>Your shareable video page link</span>
                  <div className="d-flex">
                    <div className="border-section">
                      <span className="Icon-module_defaultFill__3lKgW Icon-module_icon__3ohIJ Icon-module_medium__2TcqB">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                        >
                          <title>Copy link</title>
                          <path d="M2.976 14.452L8.63 8.888a2.976 2.976 0 014.067-.102l.141.135 2.153 2.186-.712.702-2.154-2.186a1.976 1.976 0 00-2.667-.137l-.126.114-5.653 5.565a1.977 1.977 0 00-.136 2.669l.114.126 2.18 2.214a1.977 1.977 0 002.669.137l.126-.114 2.826-2.782.702.712-2.826 2.783a2.977 2.977 0 01-4.068.1l-.141-.134-2.18-2.214a2.977 2.977 0 01-.103-4.068l.135-.142L8.63 8.888l-5.653 5.564zm8.865-8.726l2.826-2.783a2.977 2.977 0 014.068-.101l.141.135 2.18 2.214a2.977 2.977 0 01.103 4.068l-.135.142-5.653 5.564a2.976 2.976 0 01-4.066.102l-.142-.135-1.408-1.428.712-.702 1.409 1.428a1.976 1.976 0 002.667.137l.126-.114 5.653-5.565a1.977 1.977 0 00.136-2.669l-.114-.126-2.18-2.214a1.977 1.977 0 00-2.669-.137l-.126.114-2.826 2.782-.702-.712 2.826-2.783-2.826 2.783z"></path>
                        </svg>
                      </span>
                      <div class="between-seprator"></div>
                      <input
                        type="text"
                        readOnly
                        value={"https://reveo.io/play/?id=" + videoId}
                      />
                    </div>
                    <div>
                      <a
                        href={"https://reveo.io/play/?id=" + videoId}
                        target="_blank"
                        text={"https://reveo.io/play/?id=" + videoId}
                        onCopy={() => setCopied(true)}
                      >
                        <button className="btn">
                          {copied ? (
                            <span>
                              Copied
                            </span>
                          ) : (
                            " Click to open"
                          )}
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturedSection;
