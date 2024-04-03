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
const PlayerSceneThirtyFour = (props) => {

  const [sceneIndex, setSceneIndex] = React.useState(props.index);
  const [sceneActive, setSceneActive] = React.useState(false);
  const [activeClass, setActiveClass] = React.useState(false);
  const [timer, setTimer] = React.useState(props.timer);
  const [sceneTime, setSceneTime] = React.useState(props.data.time);
  const [mediaArray, setMediaArray] = React.useState(props.data.media);
  const [transformX, setTransformX] = React.useState(0);
  const [content, setContent] = React.useState(props.data.content);
  const [transformY, setTransformY] = React.useState(0);
  const [width, setWidth] = React.useState(350);
  const [height, setHeight] = React.useState(100);
  const layout = [
    {
      key: "test",
      x: transformX,
      y: transformY,
      width: width,
      height: height,
      zIndex: 1,
    },
  ];
  const canResizable = (isResize) => {
    return {
      top: isResize,
      right: isResize,
      bottom: isResize,
      left: isResize,
      topRight: isResize,
      bottomRight: isResize,
      bottomLeft: isResize,
      topLeft: isResize,
    };
  };

  const settings = {
    dots: true,
    speed: 1000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    cssEase: "linear",
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
    if (props.data) {
      setMediaArray(props.data.media);
      //console.log(props.data.content);
      setWidth(props.data.boxwidth);
      setHeight(props.data.boxheight);
      setTransformX(props.data.x);
      setTransformY(props.data.y);
      setContent(props.data.content);
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
              ? " playerui-wrapper active slider-section scene-2  section-six scene-34 scene-16 section-18 scene-19  scene-32"
              : " playerui-wrapper  slider-section scene-2 section-six scene-34 scene-16 section-18 scene-19  scene-32 "
          }
        >
          <div className="d-flex">
            <div className="img-section d-flex justify-content-between">
              <div className="bg-section d-flex justify-end">
                <div className="content-part">
                  <div
                    className="bg box-1"
                    style={{
                      "background-image":
                        "url(" + apiPath + mediaArray[1].url + ") ",
                    }}
                  ></div>
                  {layout.map((single) => {
                    return (
                      <textarea
                        key={single.key}
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
                    );
                  })}
                </div>
                {mediaArray.map((data, index) => {
                  return index == 0 ? (
                    <div key={index}>
                      <div className="slider-box">
                        <div
                          className="bg box-1"
                          style={{
                            "background-image":
                              "url(" + apiPath + data.url + ") ",
                          }}
                        ></div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </HOC>
  );
};
export default PlayerSceneThirtyFour;
