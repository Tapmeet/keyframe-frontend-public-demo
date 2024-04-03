import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import close from "./../../Assets/images/home/close.svg";
import { apiGetTemplateCategories, apiPath } from "./.././../Utility/Utility";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import $ from "jquery";
const TemplateSection = () => {
  const [data, setData] = React.useState([]);
  const [inHover, setHover] = React.useState("");
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [popUpVideo, setpopUpVideo] = React.useState("");
  const [popUpVideoTitle, setpopUpVideoTitle] = React.useState("");
  const [popUpVideoPoster, setpopUpVideoPoster] = React.useState("");
  const [popUpVideoEditUrl, setpopUpVideoEditUrl] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("1");
  React.useEffect(() => {
    axios.get(`${apiGetTemplateCategories}`, {}).then(function (response) {
      console.log(response.data.templates);
      setData(response.data.templates);
    });
  }, []);
  var figure = $(".slider-inner");
  var vid = figure.find("video");
  function hoverVideo(index, id) {
    console.log(index)
    figure = $("#" + id);
    vid = figure.find("video");
    vid[0].play();
    setHover(index);
  }

  function hideVideo(index, id) {
    figure = $("#" + id);
    vid = figure.find("video");
    vid[0].pause();
    vid[0].currentTime = 0;
    setHover("");
  }
  function showPopup(videoUrl, videoPoster, videoTitle, videoEditUrl) {
    setShowOverlay(true);
    setpopUpVideo(videoUrl);
    setpopUpVideoPoster(videoPoster);
    setpopUpVideoTitle(videoTitle);
    setpopUpVideoEditUrl(videoEditUrl);
  }

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <section className="templateSection-wrapper section">
      <div className=" container text-center">
        <h2>Wide variety of templates </h2>
        <div>
          {/* <Nav tabs>
            {data.map((template, indexes) => {
              return (
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab == indexes + 1 })}
                    onClick={() => {
                      toggle(indexes + 1);
                    }}
                  >
                    {template.title}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav> */}
          <div
            className="tab-content slider-section"
            style={{ marginTop: "20px" }}
          >
            <div className="row">
              {data.map((template, indexes) => {
                return template.template.map((template, index) => {
                  return index <= 2 ? (
                    <div key={index} className="col-12 col-sm-4">
                      <div className="slider-box">
                        <div
                          className="slider-inner"
                          onMouseEnter={(e) =>
                            hoverVideo(template._id, "video-" + index + template._id)
                          }
                          onMouseLeave={(e) =>
                            hideVideo(template._id, "video-" + index + template._id)
                          }
                          id={"video-" + index + template._id}
                        >
                          <div
                            style={{
                              backgroundImage:
                                "url(" +
                                apiPath +
                                template.templateImage +
                                ") ",
                              minHeight: "208px",
                            }}
                            className="bg"
                          ></div>
                          {/* <img
                                src={apiPath + template.templateImage}
                                alt="img1"
                                className="img-fluid"
                              /> */}
                          <video
                            data-v-0e9efc56=""
                            muted="muted"
                            autoPlay={inHover === template._id ? true : false}
                            loop="loop"
                            src={apiPath + template.templatePreview}
                            preload="metadata"
                            className="AppThumbnailVideo__Video"
                            hidden={inHover === template._id ? false : "hidden"}
                          ></video>
                          <div className="flex justify-content-center">
                            <button
                              className="btn"
                              onClick={(e) =>
                                showPopup(
                                  apiPath + template.templatePreview,
                                  apiPath + template.templateImage,
                                  template.title,
                                  "/create-template/" + template._id
                                )
                              }
                            >
                              Preview
                            </button>
                            {/* <Link
                                  to={"/create-template/" + template._id}
                                  className="edit btn"
                                >
                                  Use Template
                                </Link> */}
                          </div>
                        </div>
                        <h5>{template.title}</h5>
                      </div>
                    </div>
                  ) : null;
                });
              })}
            </div>
          </div>
          <div className="btns-template" style={{ marginTop: "70px" }}>
            <a href="/login" className="btn-new">
              See all templates
            </a>
          </div>
        </div>
      </div>
      {showOverlay ? (
        <div
          className={showOverlay ? "modal-section loaded" : "modal-section "}
        >
          <button
            aria-label="Close"
            onClick={(e) => setShowOverlay(false)}
            className="TemplateModal__Close"
          >
            <img src={close} alt="close" />
          </button>
          <div className="TemplateModal__Wrap">
            <div className="container">
              <div className="TemplateModal__Content row">
                <div className="TemplateModal__Preview col-sm-6 col-12">
                  <div className="AppVideoPlayer">
                    <video
                      preload="metadata"
                      src={popUpVideo}
                      poster={popUpVideoPoster}
                      controls="controls"
                      autoplay="autoplay"
                      disablepictureinpicture=""
                      border="0"
                      controlslist="nodownload nofullscreen noremoteplayback"
                      className="AppVideoPlayer__Video"
                    ></video>
                  </div>
                </div>
                <div className="TemplateModal__Description col-sm-6 col-12">
                  <div className="TemplateModal__Section">
                    <h2>{popUpVideoTitle}</h2>
                    <p>The right shape for:</p>
                    <ul className="TemplateModal__Platforms">
                      <li>Social Media</li>
                      <li>Your website</li>
                    </ul>
                  </div>
                  <div className="TemplateModal__Section">
                    {/* <p className="TemplateModal__Cta">
                      <a
                        href={popUpVideoEditUrl}
                        className="AppButton -default -secondary btn"
                      >
                        Edit this video
                      </a>
                    </p> */}
                    <div></div>
                    <p className="TemplateModal__DescriptionAspectRatio">
                      {" "}
                      16:9 @ 1920 × 1080 pixels{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};
export default TemplateSection;
