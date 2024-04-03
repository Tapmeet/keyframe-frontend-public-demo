/* eslint-disable eqeqeq */
import React from "react";
import Scenes from "./../../../../Assets/images/templates/img11.png";
import Scene2 from "./../../../../Assets/images/templates/img12.png";
import Scene3 from "./../../../../Assets/images/templates/img13.png";
import Scene4 from "./../../../../Assets/images/templates/img14.png";

import trash from "./../../../../Assets/images/templates/trash.svg";
import add from "./../../../../Assets/images/templates/add.svg";
import Slider from "react-slick";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DragResizeContainer from "react-drag-resize";
import { CommentTwoTone } from "@material-ui/icons";
import { apiPath } from "../../../../Utility/Utility";
import Loader from "./../../../../Utility/Loader/Loader";
const SceneTwentyOne = (props) => {
  const [textShow, setTextShow] = React.useState(false);
  const [mediaArray, setMediaArray] = React.useState(props.mediaArray);
  const [dragoverId, setDragoverId] = React.useState(0);
  const [transformX, setTransformX] = React.useState(0);
  const [content, setContent] = React.useState(props.content);
  const [transformY, setTransformY] = React.useState(0);
  const [width, setWidth] = React.useState(350);
  const [height, setHeight] = React.useState(100);
  const [state, setState] = React.useState({ nav1: null, nav2: null });
  const slider1 = React.useRef();
  const slider2 = React.useRef(); const [processing, setProcessing] = React.useState(false);
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
  function setshowbg(option, scene, type, titleColor, container, textshows) {
    if (textshows) {
      setTextShow(true)
    }
    else {
      setTextShow(false)
    }
    props.showBg(option, type, scene, false, container);
  }

  const settings = {
    dots: false,
    arrows: false,
    speed: 1500,
    autoplaySpeed: 3000,
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
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
    setMediaArray(props.mediaArray);
    if (props.data) {
      console.log(props.data);
      setWidth(props.data.boxwidth);
      setHeight(props.data.boxheight);
      setTransformX(props.data.x);
      setTransformY(props.data.y);
      //setContent(props.data.content)
    }
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
    setContent(props.content);
  }, [props.content, props.fontFamily, props.data]);

  function getcontent(e) {
    const maxlimit = 70;
    let charc = e.target.value;
    if (e.target.value.length > maxlimit) {
      // if too long...trim it!
      charc = e.target.value.substring(0, maxlimit);
      setContent(charc);
      props.getContent(charc);
    } else {
      setContent(charc);
      props.getContent(charc);
    }
  }
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrag = (e, id) => {
    console.log(id);
    setDragoverId(id);
  };
  const removeDrag = (e, id) => {
    setDragoverId(0);
  };
  const endDrag = (e, id) => {
    setDragoverId(0);
  };

  const handleDropComplete = (e, index) => {
    let imgUrl = e.dataTransfer.getData("img");
    props.dropMedia(false, imgUrl, "img", index);
    let newArr = [...mediaArray]; // copying the old datas array
    newArr[index] = {
      type: "img",
      url: imgUrl,
    };
    setMediaArray(newArr);
  };

  const { nav1, nav2 } = state;
  return (
    <section className="template-new-wrapper-scene1 scene-2 scene-16 section-18 scene-19 scene-21 slider-section">
      <Loader open={processing} /><div className="d-flex">
        <div className="img-section d-flex justify-content-between">
          <div className="bg-section d-flex justify-end">
            <div class="text-wrapper  left-section-text">
              {layout.map((single) => {
                return (
                  <textarea
                    key={single.key}
                    style={{
                      "font-size": props.settextSize + "px",
                      color: props.setColor,
                      "line-height": props.setTextLineHeight,
                      fontFamily: props.data.fontFamily,
                      fontWeight: props.data.fontWeight,
                    }}
                    onClick={() => setshowbg(false, '', '', false, '', true)}
                    className={
                      "child-container form-control border  size-auto " +
                      props.setAlignment +
                      " " +
                      props.setTextTransform
                    }
                    onChange={getcontent}
                    value={content}
                  ></textarea>
                );
              })}
            </div>
          </div>

        </div>
      </div>
      {textShow && content.length >= 50 ? <div class={content.length >= 70 ? "char-counter  red" : "char-counter "}>  {70 - content.length} </div> : null}

    </section>
  );
};
export default SceneTwentyOne;
