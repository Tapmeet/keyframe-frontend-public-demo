/* eslint-disable no-lone-blocks */
/* eslint-disable eqeqeq */
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import DragResizeContainer from "react-drag-resize";
import HOC from "./HOC";
import $ from "jquery";
import { apiPath } from "../../../Utility/Utility";
const PlayerSceneFourtySeven = (props) => {
  //console.log(props);
  const [sceneIndex, setSceneIndex] = React.useState(props.index);
  const [sceneActive, setSceneActive] = React.useState(false);
  const [activeClass, setActiveClass] = React.useState(false);
  const [timer, setTimer] = React.useState(props.timer);
  const [sceneTime, setSceneTime] = React.useState(props.data.time);
  const [mediaArray, setMediaArray] = React.useState(props.data.media);
  var textArrays = props.data.textArray;
  const [mediaArray1, setMediaArray1] = React.useState([]);
  const [mediaArray2, setMediaArray2] = React.useState([]);
  function setshowbg(option, scene, type, titleColor, index, textIndex) {
    props.showBg(option, type, scene, titleColor, index, textIndex);
  }
  const settings = {
    arrows: false,
    infiniteLoop: false,
    autoPlay: true,
    interval: 2000,
    transitionTime: 1000,
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    swipeable: true,
    stopOnHover: true,
    showThumbs: false,
  };
  const settings2 = {
    arrows: false,
    infiniteLoop: false,
    autoPlay: true,
    interval: 3000,
    transitionTime: 1000,
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    swipeable: true,
    stopOnHover: true,
    showThumbs: false,
  };

  React.useEffect(() => {
    // props.data.media.map((data, index) => {
    //   {
    //     index <= 1
    //       ? setMediaArray1((media) => [...media, data])
    //       : setMediaArray2((media) => [...media, data]);
    //   }
    //   textArrays = props.data.textArray;
    // });
    // if (props.data) {
    //   props.data.media.map((data, index) => {
    //     {
    //       index <= 1
    //         ? setMediaArray1((media) => [...media, data])
    //         : setMediaArray2((media) => [...media, data]);
    //     }
    //   });
    // }
    var timeout, activeClassTimer, animation1, animation2;

    clearTimeout(timeout, activeClassTimer, animation1, animation2);
    if (props.index == 0) {
      setSceneActive(true);
      activeClassTimer = setTimeout(function () {
        setActiveClass(true);
      }, 100);
      animation1 = setTimeout(function () {
      //  $(".player-slider-1").addClass("animation");
        setTimeout(function () {
         // $(".player-slider-1").removeClass("animation");
        }, 2500);
      }, 500);
      animation2 = setTimeout(function () {
        $(".player-slider-2").addClass("animation");
        setTimeout(function () {
          $(".player-slider-2").removeClass("animation");
        }, 2500);
      }, 3200);
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
        animation1 = setTimeout(function () {
          $(".player-slider-1").addClass("animation");
          // setTimeout(function () {
          //   $(".player-slider-1").removeClass("animation");
          // }, 2500);
        }, 100);
        animation2 = setTimeout(function () {
          $(".player-slider-2").addClass("animation");
          setTimeout(function () {
            $(".player-slider-2").removeClass("animation");
          }, 2500);
        }, 3200);
        setTimeout(function () {
          setActiveClass(false);
          clearTimeout(timeout);
        }, parseFloat(props.time) * 1000 + 105);
      }, parseFloat(props.timer) * 1000);
    }
  }, [textArrays]);
  textArrays.map((data, index) => {
    window["layout" + index] = [
      {
        key: "test" + index,
        x: data.x,
        y: data.y,
        width: data.boxWidth,
        height: data.boxHeight,
        zIndex: 1,
      },
    ];
    window["canResizable" + index] = (isResize) => {
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
    window["onLayoutChange" + index] = (e, index) => {
      let newArr = [...textArrays]; // copying the old datas array
      newArr[index] = {
        text: newArr[index].text,
        fontSize: newArr[index].fontSize,
        fontFamily: newArr[index].fontFamily,
        fontWeight: newArr[index].fontWeight,
        fontLineHeight: newArr[index].fontLineHeight,
        fontAlignment: newArr[index].fontAlignment,
        fontColor: newArr[index].fontColor,
        fontCapitalize: newArr[index].fontCapitalize,
        x: e[0].x,
        y: e[0].y,
        boxWidth: e[0].width,
        boxHeight: e[0].height,
      };
      // props.getContent(newArr);
      textArrays = newArr;
    };
  });
  function getcontent(e, index) {
    let newArr = [...textArrays]; // copying the old datas array
    newArr[index] = {
      text: e.target.value,
      fontSize: newArr[index].fontSize,
      fontFamily: newArr[index].fontFamily,
      fontWeight: newArr[index].fontWeight,
      fontLineHeight: newArr[index].fontLineHeight,
      fontAlignment: newArr[index].fontAlignment,
      fontColor: newArr[index].fontColor,
      fontCapitalize: newArr[index].fontCapitalize,
      x: newArr[index].x,
      y: newArr[index].y,
      boxWidth: newArr[index].boxWidth,
      boxHeight: newArr[index].boxHeight,
    };
    //  props.getContent(newArr);
  }
  return (
    <HOC>
      {sceneActive ? (
        <section
          className={
            activeClass
              ? " playerui-wrapper active slider-section section4 scene-10 scene-47"
              : " playerui-wrapper   slider-section section4 scene-10 scene-10 scene-47"
          }
        >
          <div className="d-flex">
            <div className="img-section d-flex">
              <div className="half-width player-slider-1 animation">
                {textArrays.map((data, index) => {
                  return index == 0 ? (
                    <DragResizeContainer
                      className="resize-container"
                      resizeProps={{
                        minWidth: 100,
                        minHeight: 70,
                        enable: global.canResizable0(50),
                      }}
                      onClick={() =>
                        setshowbg(false, "", "", false, index, index)
                      }
                      layout={global.layout0}
                      onLayoutChange={(e) => global.onLayoutChange0(e, 0)}
                      dragProps={{ disabled: false }}
                      scale={1}
                    >
                      {global.layout0.map((single) => {
                        return (
                          <textarea
                            key={single.key}
                            style={{
                              "font-size": data.fontSize + "px",
                              color: data.fontColor,
                              "line-height": data.fontLineHeight,
                              fontWeight: data.fontWeight,
                              fontFamily: data.fontFamily,
                            }}
                            className={
                              "child-container form-control border  size-auto " +
                              data.fontAlignment +
                              " " +
                              data.fontCapitalize
                            }
                            onChange={(e) => getcontent(e, index)}
                            value={data.text}
                          ></textarea>
                        );
                      })}
                    </DragResizeContainer>
                  ) : null;
                })}
                <div className="bg-section">
                  <div>
                    <div className="slider-box half-height">
                      <div
                        onClick={() =>
                          setshowbg(
                            true,
                            mediaArray[0].url,
                            mediaArray[0].type,
                            false,
                            0
                          )
                        }
                        className="bg box-1"
                        style={{
                          "backgroundImage":
                            "url(" + apiPath + mediaArray[0].url + ") ",
                        }}
                      ></div>
                    </div>
                    <div className="slider-box half-height">
                      <div
                        onClick={() =>
                          setshowbg(
                            true,
                            mediaArray[1].url,
                            mediaArray[1].type,
                            false,
                            1
                          )
                        }
                        className="bg box-1"
                        style={{
                          "backgroundImage":
                            "url(" + apiPath + mediaArray[1].url + ") ",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="half-width player-slider-2">
                <div className="bg-section">
                  <div>
                    <div className="slider-box">
                      <div
                        onClick={() =>
                          setshowbg(
                            true,
                            mediaArray[2].url,
                            mediaArray[2].type,
                            false,
                            2
                          )
                        }
                        className="bg box-1"
                        style={{
                          "backgroundImage":
                            "url(" + apiPath + mediaArray[2].url + ") ",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </HOC>
  );
};
export default PlayerSceneFourtySeven;
