/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { apiPath, apiCheckPlan, apiUpdateUser } from "./.././../Utility/Utility";
import commingsoon from "./../../Assets/images/home/ComingSoon.png"
import moment from 'moment';
const FeaturedSection = (props) => {
  const [data, setData] = React.useState([]);
  const [inHover, setHover] = React.useState("");
  const [userPlan, setUserPlan] = React.useState("");
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [popUpVideo, setpopUpVideo] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [popUpVideoTitle, setpopUpVideoTitle] = React.useState("");
  const [popUpVideoPoster, setpopUpVideoPoster] = React.useState("");
  const [popUpVideoEditUrl, setpopUpVideoEditUrl] = React.useState("");
  const [modal3, setModal3] = React.useState(false);
  const [userData, setUserData] = React.useState("");

  const [userCreated, setUserCreated] = React.useState("");
  const [userVideos, setUserVideos] = React.useState("");
  const toggle3 = () => {
    setModal3(!modal3);
  }
  const [modal4, setModal4] = React.useState(false);
  const toggle4 = () => setModal4(!modal4);
  const [userToken, setUserToken] = React.useState("");
  const [planexpiryCheck, setpPlanexpiryCheck] = React.useState(true);
  const { buttonLabel, className } = props;
  const [category, setCategory] = React.useState(props.category);
  const cookies = new Cookies();
  React.useEffect(() => {
    if (props.templatedata) {
      if (props.category == true) {
        setData(props.templatedata.template);
        setCategory(props.category);

      } else {
        setData(props.templatedata);
        setCategory(props.category);
      }
    }
    if (data == "") {
      const tokens = localStorage.getItem('token');
      setUserToken(tokens);
      //setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);

      setUserEmail(decoded.email);
      getPlan(decoded.email);

      axios
        .get(`${apiUpdateUser}` + "/" + decoded._id, {})
        .then(function (response) {
          //console.log(response.data.user)
          setUserData(response.data.user)
          var date2 = new Date();
          var startDate = moment(response.data.user.createdAt).format('YYYY-MM-DD');
          var endDate = moment(date2).format('YYYY-MM-DD');
          const returndate = moment(new Date(response.data.user.createdAt));
          const currentdate = moment(new Date());
          var days_diff = currentdate.diff(returndate, 'days');
          setUserCreated(days_diff)
          setUserVideos(response.data.user.video_count)
        })
    }
  }, []);
  const getPlan = (email) => {
    axios
      .get(`${apiCheckPlan}` + "?email=" + email, {})
      .then(function (response) {
        // console.log(response);
        console.log(response.data.user);
        setUserPlan(response.data.user);
        if (response.data.user == 2 || response.data.user == 4) {
          var date = new Date(response.data.planDate);
          date.setDate(date.getDate() + 30);
          var today = new Date();
          today.setHours(0, 0, 0, 0);
          date.setHours(0, 0, 0, 0);
          if (date >= today) {
            setpPlanexpiryCheck(false);
          } else {
            setpPlanexpiryCheck(true);
          }
        } else {
          var date = new Date(response.data.planDate);
          date.setDate(date.getDate() + 365);
          console.log(date);
          var today = new Date();
          today.setHours(0, 0, 0, 0);
          date.setHours(0, 0, 0, 0);
          if (date >= today) {
            setpPlanexpiryCheck(false);
          } else {
            setpPlanexpiryCheck(true);
          }
        }
      });
  };
  var figure = $(".slider-inner");
  var vid = figure.find("video");
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    infinite: false,
    slidesToScroll: 1,

    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  async function hoverVideo(index, id) {
    console.log(index)
    console.log('index')
    figure = $("#" + id);
    vid = figure.find("video");
    try {
      await vid[0].play();

    } catch (err) {
      console.log("Failed to play, error: " + err);
    }
    //vid[0].play();
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
    console.log("here");
    setShowOverlay(true);
    setpopUpVideo(videoUrl);
    setpopUpVideoPoster(videoPoster);
    setpopUpVideoTitle(videoTitle);
    setpopUpVideoEditUrl(videoEditUrl);
  }

  return data && category ? (
    <section className=" slider-section bg">
      <div className="containers home-new">
        <div className="row">
          {data.length > 0 ? data.map((template, index) => {
            return (
              <div key={index} className="col-12 col-sm-4">
                <div className="slider-box">
                  <div
                    className="slider-inner"
                    onMouseEnter={(e) =>
                      hoverVideo(index, "video-" + index + template._id)

                    }
                    onMouseLeave={(e) =>
                      hideVideo(index, "video-" + index + template._id)
                    }
                    id={"video-" + index + template._id}
                  >
                    <div
                      style={{
                        backgroundImage:
                          "url(" + apiPath + template.templateImage + ") ",
                        minHeight: "155px",
                      }}
                      className="bg"
                    ></div>
                    {/* <img src={apiPath + template.templateImage} alt="img1" /> */}
                    <video
                      data-v-0e9efc56=""
                      muted="muted"
                      autoPlay={inHover === index ? true : false}
                      loop="loop"
                      src={apiPath + template.templatePreview}
                      preload="metadata"
                      className="AppThumbnailVideo__Video"
                      hidden={inHover === index ? false : "hidden"}
                    ></video>
                    <div className="flex">
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
                      {(userCreated >= 30 || userVideos > 2) && (userPlan == 1) ? (
                        <button className="btn" onClick={(e) => toggle3()}>
                          Use Template
                        </button>

                      ) : (
                        <Link
                          to={"/create-template/" + template._id}
                          className="edit btn"
                        >
                          Use Template
                        </Link>
                      )}
                    </div>
                  </div>
                  {/* <h5>{template.title}</h5> */}
                </div>
              </div>
            );
          })
            :
            <div className="coming-soon">
              <img className="img-responsive home" src={commingsoon} alt="comingsoon" />
              <h3 style={{ marginTop: 15 }}>Coming Soon</h3>
            </div>
          }

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
                      <li>YouTube</li>
                      <li>Your website</li>
                    </ul>
                  </div>
                  <div className="TemplateModal__Section">
                    <p className="TemplateModal__Cta">
                      {userCreated >= 30 || userVideos > 2 && userPlan == 1 ?
                        <a
                          href="#"
                          className="AppButton -default -secondary btn"
                          onClick={toggle3}
                        >
                          Edit this videos
                        </a>
                        :
                        <a
                          href={popUpVideoEditUrl}
                          className="AppButton -default -secondary btn"
                        >
                          Edit this videoss
                        </a>
                      }
                    </p>
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
      <Modal
        isOpen={modal3}
        toggle={toggle3}
        className={className + " modal-custom"}
      >
        <ModalHeader toggle={toggle3}>Try Our Free Plan </ModalHeader>
        <ModalBody>
          <img src={update} alt="Upgrade" style={{ marginBottom: "10px" }} />
          <p>
            You are currenly not have any plan plan.
            <br />
            You can try our free plan to start using scenes. <br />
            We also have <b>2 Premium plans</b> that fulfill your needs.
          </p>
        </ModalBody>
        <ModalFooter>
          <div className="container">
            <div className="row modal-block justify-content-center">
              <div className="col-12 col-sm-6">
                <Link className="btn" to="/free-plan">
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={modal4}
        toggle={toggle4}
        className={className + " modal-custom"}
      >
        <ModalHeader toggle={toggle4}>Your Plan is expired </ModalHeader>
        <ModalBody>
          <img src={update} alt="Upgrade" style={{ marginBottom: "10px" }} />
          <p>
            Your curren plan is expired.
            <br />
            You can try our free plan to start using scenes. <br />
            We also have <b>2 Premium plans</b> that fulfill your needs.
          </p>
        </ModalBody>
        <ModalFooter>
          <div className="container">
            <div className="row modal-block justify-content-center">
              <div className="col-12 col-sm-6">
                <Link className="btn" to="/pricing">
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </section>
  ) : (
    data.map((template, index) => {
      return (
        <div key={index} className="col-12 col-sm-4 here">
          <div className="slider-box">
            <div
              className="slider-inner hereer"
              onMouseEnter={(e) =>
                hoverVideo(index, "video-" + index + template._id)
              }
              onMouseLeave={(e) =>
                hideVideo(index, "video-" + index + template._id)
              }
              id={"video-" + index + template._id}
            >
              <div
                style={{
                  backgroundImage:
                    "url(" + apiPath + template.templateImage + ") ",
                  minHeight: "152px",
                }}
                className="bg"
              ></div>
              {/* <img src={apiPath + template.templateImage} alt="img1" /> */}
              <video
                data-v-0e9efc56=""
                muted="muted"
                autoPlay={inHover === index ? true : false}
                loop="loop"
                src={apiPath + template.templatePreview}
                preload="metadata"
                className="AppThumbnailVideo__Video"
                hidden={inHover === index ? false : "hidden"}
              ></video>
              <div className="flex">
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
                {(userCreated >= 30 || userVideos > 2) && (userPlan == 1) ? (
                  <button className="btn" onClick={(e) => toggle3()}>
                    Use Template
                  </button>

                ) : (
                  <Link
                    to={"/create-template/" + template._id}
                    className="edit btn"
                  >
                    Use Template
                  </Link>
                )}
              </div>
            </div>
            {/* <h5>{template.title}</h5> */}
          </div>
          {index == 0 ? (
            showOverlay ? (
              <div
                className={
                  showOverlay ? "modal-section loaded" : "modal-section "
                }
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
                            <li>YouTube</li>
                            <li>Your website</li>
                          </ul>
                        </div>
                        <div className="TemplateModal__Section">
                          <p className="TemplateModal__Cta">
                            {userCreated >= 30 || userVideos > 2 && userPlan == 1 ?
                              <a
                                href="#"
                                className="AppButton -default -secondary btn"
                                onClick={toggle3}
                              >
                                Edit this videos
                              </a>
                              :
                              <a
                                href={popUpVideoEditUrl}
                                className="AppButton -default -secondary btn"
                              >
                                Edit this videoss
                              </a>
                            }
                          </p>
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
            ) : null
          ) : null}
          {index == 0 ?
            <div>
              <Modal
                isOpen={modal3}
                toggle={toggle3}
                className={className + " modal-custom"}
              >
                <ModalHeader toggle={toggle3}>Free Plan Used </ModalHeader>
                <ModalBody>
                  <img src={update} alt="Upgrade" style={{ marginBottom: "10px" }} />
                  <p>
                    You are currenly have free plan. and you<br /> are only allowed to create 2 free videos
                    <br />
                    You can upgrade your plan to start using scenes. <br />
                    We  have <b>2 Premium plans</b> that fulfill your needs.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <div className="container">
                    <div className="row modal-block justify-content-center">
                      <div className="col-12 col-sm-6">
                        <Link className="btn" to="/pricing">
                          Upgrade
                        </Link>
                      </div>
                    </div>
                  </div>
                </ModalFooter>
              </Modal>
              <Modal
                isOpen={modal4}
                toggle={toggle4}
                className={className + " modal-custom"}
              >
                <ModalHeader toggle={toggle4}>Your Plan is expired </ModalHeader>
                <ModalBody>
                  <img src={update} alt="Upgrade" style={{ marginBottom: "10px" }} />
                  <p>
                    Your curren plan is expired.
                    <br />
                    You can upgrade your plan to start using scenes.  <br />
                    We also have <b>2 Premium plans</b> that fulfill your needs.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <div className="container">
                    <div className="row modal-block justify-content-center">
                      <div className="col-12 col-sm-6">
                        <Link className="btn" to="/pricing">
                          Upgrade
                        </Link>
                      </div>
                    </div>
                  </div>
                </ModalFooter>
              </Modal>
            </div>
            : null}
        </div>
      );
    })
  );
};
export default FeaturedSection;
