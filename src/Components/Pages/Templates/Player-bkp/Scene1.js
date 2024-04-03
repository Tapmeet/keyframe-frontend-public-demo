import React from "react";
import DragResizeContainer from "react-drag-resize";
import HOC from "./HOC";
import { apiPath } from "./../../../Utility/Utility";
const PlayerSceneOne = (props) => {
  const [mediaArray, setMediaArray] = React.useState(props.data.media);
  const [sceneIndex, setSceneIndex] = React.useState(props.index);
  const [sceneActive, setSceneActive] = React.useState(false);
  const [activeClass, setActiveClass] = React.useState(false);
  const [timer, setTimer] = React.useState(props.timer);
  const [sceneTime, setSceneTime] = React.useState(props.data.time);
  // const [activeScene, setActiveScene] = React.useState(false);
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
  const onLayoutChange = (e) => {
    //console.log(e[0])
    setTransformX(e[0].x);
    setTransformY(e[0].y);
    setWidth(e[0].width);
    setHeight(e[0].height);
    let newObj = {
      boxwidth: e[0].width,
      boxheight: e[0].height,
      x: e[0].x,
      y: e[0].y,
    };
    props.getTextAreaData(newObj);
  };
  function setshowbg(option, scene, type, titleColor, container) {
    props.showBg(option, type, scene, false, container);
  }
  React.useEffect(() => {
    if (props.data) {
      //console.log(props.data);
      setMediaArray(props.data.media);
      setWidth(props.data.boxwidth);
      setHeight(props.data.boxheight);
      setTransformX(props.data.x);
      setTransformY(props.data.y);
      setContent(props.data.content);
    }
    setSceneIndex(props.index);
    setTimer(props.timer);

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
              ? " playerui-wrapper  playerscene1 active scene1 "
              : " playerui-wrapper  playerscene1 scene1  "
          }
        >
          {typeof mediaArray != undefined ? (
            <div className="d-flex">
              <div className="img-section">
                {props.data ? (
                  <DragResizeContainer
                    className="resize-container"
                    resizeProps={{
                      minWidth: 100,
                      minHeight: 70,
                      enable: canResizable(50),
                    }}
                    layout={layout}
                    onLayoutChange={onLayoutChange}
                    dragProps={{ disabled: true }}
                    scale={1}
                  >
                    {layout.map((single) => {
                      return (
                        <textarea
                          key={single.key}
                          style={{
                            "fontSize": props.data.textSize + "px",
                            color: props.data.textColor,
                            "lineHeight": props.data.textlineHeight,
                            "fontFamily":props.data.fontFamily,
                            "fontWeight":props.data.fontWeight
                          }}
                          className={
                            "child-container sceneUi form-control border  size-auto " +
                            props.data.textAligmnet +
                            " " +
                            props.data.textTransform
                          }
                          readOnly={true}
                          defaultValue={content}
                        >
                          
                        </textarea>
                      );
                    })}
                  </DragResizeContainer>
                ) : null}

                <div className="bg-section">
                  {mediaArray.map((data, index) => {
                    return (
                      <div
                      key={index}
                        className="bg box-1"
                        style={{ backgroundImage: "url(" +apiPath + data.url + ") " }}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </HOC>
  );
};
export default PlayerSceneOne;
