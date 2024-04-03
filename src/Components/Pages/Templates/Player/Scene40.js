/* eslint-disable eqeqeq */
import React from "react";
import Slider from "react-slick";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DragResizeContainer from "react-drag-resize";
import { CommentTwoTone } from "@material-ui/icons";
import { apiPath } from "../../../Utility/Utility";
import HOC from "./HOC";
const PlayerSceneFourty = (props) => {
  const [sceneIndex, setSceneIndex] = React.useState(props.index);
  const [sceneActive, setSceneActive] = React.useState(false);
  const [activeClass, setActiveClass] = React.useState(false);
  const [timer, setTimer] = React.useState(props.timer);
  const [sceneTime, setSceneTime] = React.useState(props.data.time);
  const [mediaArray, setMediaArray] = React.useState(props.data.media);
  const [transformX, setTransformX] = React.useState(0);
  const [transformY, setTransformY] = React.useState(0);
  const [content, setContent] = React.useState([]);
  const [counter, setCounter] = React.useState(props.data.content.length);
  const settings = {
    dots: true,
    speed: 1000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  React.useEffect(() => {
    console.log(props.data)
    setContent(props.data.content);
    setMediaArray(props.data.media);
    setCounter(props.data.content.length);
    if (props.data) {
      setContent(props.data.content);
      setCounter(props.data.content.length);
    }
    var timeout, activeClassTimer;
    clearTimeout(timeout);
    clearTimeout(activeClassTimer);
    if (props.index == 0) {
      setSceneActive(true);
      activeClassTimer = setTimeout(function () {
        setActiveClass(true);
      }, 100);
      timeout = setTimeout(function () {
        setActiveClass(false);
        clearTimeout(timeout);
      }, parseFloat(props.time) * 1000);
    } else {
      timeout = setTimeout(function () {
        setSceneActive(true);
        activeClassTimer = setTimeout(function () {
          setActiveClass(true);
        }, 100);
        setTimeout(function () {
          setActiveClass(false);
          clearTimeout(timeout);
        }, parseFloat(props.time) * 1000 + 105);
      }, parseFloat(props.timer) * 1000);
    }
  }, []);
  return (
    <HOC>
      {sceneActive ? (
        <section
          className={
            activeClass
              ? " playerui-wrapper active slider-section section-18 section-22 scene-40  scene-2"
              : "playerui-wrapper  slider-section section-18 section-22 scene-2 scene-40"
          }
        >
          <div className="d-flex">
            <div className="img-section d-flex justify-content-between">
              <div className="bg-section d-flex justify-end">
                <div class="text-wrapper  left-section-text">
                  <textarea
                      style={{
                        color: props.data.textColor,
                        fontSize: props.data.textSize + "px",
                        fontWeight: props.data.fontWeight,
                        fontFamily: props.data.fontFamily,
                      }}
                    className={
                      "child-container form-control border  size-auto " +
                      props.setAlignment +
                      " " +
                      props.setTextTransform
                    }
                    value={content}
                  ></textarea>
                </div>
                <div className="half-width">
                  <Slider {...settings}>
                    <div>
                      <div className="slider-box">
                        <div
                          className="bg box-1"
                          style={{
                            "background-image":
                              "url(" + apiPath + mediaArray[0].url + ") ",
                          }}
                        ></div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </HOC>
  );
};
export default PlayerSceneFourty;
