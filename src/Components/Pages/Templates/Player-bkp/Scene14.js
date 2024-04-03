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
const PlayerSceneFourteen = (props) => {
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
              ? " playerui-wrapper active slider-section   section-five section-six section-14"
              : " playerui-wrapper  slider-section    section-five section-six section-14"
          }
        >
          <div className="d-flex">
            <div className="img-section">
              <div className="content-part">
                {layout.map((single) => {
                  return (
                    <textarea
                      contenteditable="true"
                      //onClick={() => setshowbg(false, "", "", false)}
                      key={single.key}
                      style={{
                        "font-size": props.data.textSize + "px",
                        color: props.data.textColor,
                        "line-height": props.data.textlineHeight,
                        fontFamily: props.data.fontFamily,
                        fontWeight: props.data.fontWeight,
                      }}
                      className={
                        "child-container form-control editable-div  size-auto " +
                        props.setAlignment +
                        " " +
                        props.setTextTransform
                      }
                     // onChange={getcontent}
                      value={content}
                    >
                      {content}
                    </textarea>
                  );
                })}
              </div>
              <div className="bg-section">
                {mediaArray.map((data, index) => {
                  return (
                    <div key={index}>
                      <div className="slider-box">
                        <div
                          // onClick={() =>
                          //   setshowbg(true, data.url, data.type, false, index)
                          // }
                          // onDragOver={(e) => handleDrop(e)}
                          // onDrop={(e) => handleDropComplete(e, index)}
                          className="bg box-1"
                          style={{
                            "background-image":
                              "url(" + apiPath + data.url + ") ",
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </HOC>
  );
};
export default PlayerSceneFourteen;
