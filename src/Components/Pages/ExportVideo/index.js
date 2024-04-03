import React from "react";
import SiteHeader from "./../../Header/HeaderUser";
import Footer from "../../Footer";
import axios from "axios";
import { useRouteMatch, Link } from "react-router-dom";
import download from "downloadjs";
import Player from "../Templates/Player/Createtemplate";
import { useHistory } from "react-router-dom";
import CountdownTimer from "react-component-countdown-timer";
import UserAvatar from "./../../Assets/images/User/Header/default.png";
import SideShape3 from "./../../Assets/images/homeV3/SideShape3.png";
import SideShape4 from "./../../Assets/images/homeV3/SideShape2inverse.png";
import Circle2 from "./../../Assets/images/homeV3/Circle2.png";
import HalfCircle from "./../../Assets/images/homeV3/HalfCircle.png";
import Triangle1 from "./../../Assets/images/homeV3/Triangle1.png";
import Circle1 from "./../../Assets/images/homeV3/Circle1.png";
import reveo_TempLogo from "./../../Assets/images/templates/reveo_TempLogo.png";
import "react-component-countdown-timer/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  apiPreviewVideo,
  apiMergeVideo,
  apigetAdminTemplate,
  apiPath,
} from "./../../Utility/Utility";
const ExportVideo = (props) => {
  const [templateData, setTemplateData] = React.useState("");
  const [loaderCheck, setLoaderCheck] = React.useState(true);
  const [videoSuccess, setVideoSuccess] = React.useState(false);
  const [videoError, setVideoError] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("");
  const [blocks, setBlocks] = React.useState("");
  const [time, setTime] = React.useState("");
  const match = useRouteMatch("/export-video/:templateId/download");
  const {
    params: { templateId },
  } = match;
  let history = useHistory();
  // function videosMerged(data) {
  //   axios
  //     .post(apiMergeVideo, {
  //       videos: data,
  //       templateId: templateId,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       setLoaderCheck(false);
  //       if (response.data.message == "successfull") {
  //         setVideoUrl(response.data.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  function videoExport() {
    axios
      .post(apiPreviewVideo, {
        templateId: templateId,
      })
      .then((response) => {
        console.log(response);
        setLoaderCheck(false);
        if (response.data.message == "successfull") {
          setVideoUrl(response.data.data);
          history.push("/share/" + response.data.uploadData._id);
          //videosMerged(response.data.data);
          setVideoError(false)
        } else {
          setVideoError(true)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  var i = 1;
  React.useEffect(() => {
    setVideoError(false)
    if (templateData == "") {
      axios
        .get(`${apigetAdminTemplate}` + "?templateId=" + templateId, {})
        .then(function (response) {
          console.log(response.data.data[0].blocks);
          setTemplateData(response.data.data);
          setBlocks(response.data.data[0].blocks);
          if (response.data.data[0].blocks.length > 0) {
            const sceneLength = parseInt(response.data.data[0].blocks.length);

            let scenetimer = 60 * sceneLength;

            move(scenetimer * 10);
            console.log(scenetimer * 10);
            setTime(scenetimer);
          }
          if (i == 1) {
             videoExport(); 
            i++;
          }
        });
    }
  }, [templateData]);
  function downloadVideo() {
    download(apiPath + videoUrl);
  }
  var i = 0;
  function move(sceneLength) {
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var width = 0;
      var id = setInterval(frame, sceneLength);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
          elem.innerHTML = width + "%";
        }
      }
    }
  }
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,

  };
  return (
    <section className="home-wrapper">
      <SiteHeader />
      {/* <div className="inner-box-area">
        <div className="container">
          <div className="row export-video">
            <div className="col-sm-8 col-12">
              <div className="section">
                {videoUrl ? (
                  <div>
                    <video
                      key={videoUrl}
                      className="video-container video-container-overlay"
                      autoPlay={true}
                      controls={true}
                      loop=""
                      muted={true}
                    >
                      <source type="video/mp4" src={apiPath + videoUrl} />
                    </video>
                  </div>
                ) : templateData != "" ? (
                  // <img
                  //   className="img-fluid"
                  //   src={apiPath + templateData[0].templateImage}
                  //   alt="Template Preview"
                  // />
                  blocks ? (
                    <div>
                      <Player blocks={blocks} />
                    </div>
                  ) : null
                ) : null}
              </div>
            </div>
            <div className="col-sm-4 col-12">
              <div className="section ">
                {loaderCheck ? (
                  <div className=" text-center">
                    <h3>Your Video is Rendering...</h3>
                    <div className="loader-wrapper">
                      <div>Please Wait </div>
                      <div className="loader">Loading...</div>
                      <div id="myProgress">
                        <div id="myBar">0%</div>
                      </div>

                      {/* {time > 0 ? (
                        <CountdownTimer
                          count={time}
                          border
                          showTitle
                          size={12}
                          hideDay
                          hideHours
                          noPoints
                        />
                      ) : null} */}
      {/* </div>
                  </div>
                ) : (
                  <div className="loader-wrapper text-left">
                    <h3>Download your video</h3>
                    <p>
                      Free exports can be downloaded and shared as often as you
                      like.
                    </p>
                    <button
                      class="exportbtn"
                      // href={apiPath + videoUrl}
                      // target="_blank"
                      // download
                      onClick={downloadVideo}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 22 20"
                      >
                        <path
                          fill="currentColor"
                          d="M14 14v-4h2v6H0v-6h2v4h12zM3 7h4V1c0-.552.448-1 1-1s1 .448 1 1v6h4l-5 5-5-5z"
                        ></path>
                      </svg>
                      <span>Download video</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div> 
      </div> */}
      <div className="profile-page section">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center">
              <h2>Export Video</h2>
            </div>
            <div className="col-12">
              <div className="profile-box">
                <div className="userimg-section">
                  <div className="userinfo-section">
                    <div className=" export-video text-center">
                      <h3>Your Video is Rendering...</h3>
                      <div className="loader-wrapper">
                        {!videoError ?
                          <div>

                            <div className="container">
                              <Slider {...settings}>
                                <div>Please wait for some time ...</div>
                                <div>
                                  Create and download unlimited HD 1080p videos in
                                  mp4.
                                </div>
                                <div>
                                  Easy one click share on social platforms.
                                </div>
                                <div>
                                  Customised videos according to your needs.
                                </div>
                                <div>
                                  Choose from various varieties of templates.
                                </div>
                                <div>
                                  We will notfify you once the video is created
                                </div>
                              </Slider>
                            </div>
                          </div>
                          : null}
                        {!videoError ?
                          <div className="loader">Loading...</div>
                          : null}
                        {!videoError ?
                          <div id="myProgress">
                            <div id="myBar">0%</div>
                          </div>
                          : null}

                        {/* {time > 0 ? (
                        <CountdownTimer
                          count={time}
                          border
                          showTitle
                          size={12}
                          hideDay
                          hideHours
                          noPoints
                        />
                      ) : null} */}
                        {videoError ?
                          <div className="alert alert-danger" style={{ marginTop: '20px' }} role="alert">
                            Error! error in video export. Please update the scenes and try again
                          </div>
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src={SideShape3}
            alt="triangle"
            className="SideShape3 profile-bg"
          />
          <img
            src={SideShape4}
            alt="triangle"
            className="SideShape4 profile-bg"
          />
          <img src={Circle2} alt="triangle" className="Circle2 profile-bg" />
          <img
            src={HalfCircle}
            alt="triangle"
            className="HalfCircle profile-bg"
          />
          <img
            src={Triangle1}
            alt="triangle"
            className="triangle1 profile-bg"
          />
          <img
            src={Triangle1}
            alt="triangle"
            className="triangle2 profile-bg"
          />
          <img src={Circle1} alt="triangle" className="Circle1 profile-bg" />
        </div>
      </div>

      <Footer />
    </section>
  );
};
export default ExportVideo;
