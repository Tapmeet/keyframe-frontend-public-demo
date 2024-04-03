/* eslint-disable eqeqeq */
import React from "react";
import Scenes from "./../../../../Assets/images/templates/img11.png";
import Scene2 from "./../../../../Assets/images/templates/img12.png";
import Scene3 from "./../../../../Assets/images/templates/img13.png";
import Scene4 from "./../../../../Assets/images/templates/img14.png";
import axios from "axios";
import trash from "./../../../../Assets/images/templates/trash.svg";
import add from "./../../../../Assets/images/templates/add.svg";
import Slider from "react-slick";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DragResizeContainer from "react-drag-resize";
import { CommentTwoTone } from "@material-ui/icons";
import { apiPath, apieditVideos } from "../../../../Utility/Utility";
import { VideoEditor } from "video-editor";
import { useRouteMatch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import Loader from "./../../../../Utility/Loader/Loader";
const SceneTweleve = (props) => {
  const match = useRouteMatch("/template/:templateId/12/:sceneId");
  const {
    params: { templateId },
  } = match;
  const {
    params: { sceneId },
  } = match;
  const [mediaArray, setMediaArray] = React.useState(props.mediaArray);
 const [dragoverId, setDragoverId] = React.useState(0);
  const [transformX, setTransformX] = React.useState(0);
  const [content, setContent] = React.useState(props.content);
  const [transformY, setTransformY] = React.useState(0);
  const [width, setWidth] = React.useState(350);
  const [height, setHeight] = React.useState(100);
  const [videoEdit, setVideoEdit] = React.useState({});
  const [state, setState] = React.useState({ nav1: null, nav2: null });
  const slider1 = React.useRef();
  const slider2 = React.useRef();const [processing, setProcessing] = React.useState(false);
  const [editActive, setEditActive] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  const [videoActive, setVideoActive] = React.useState(false);
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
    console.log(scene);
    props.showBg(option, type, scene, false, container);
  }

  const showEditor = () => {
    setEditActive(!editActive);
  };
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
    if (props.mediaArray["0"].type == "video") {
      setVideoActive(true);
    } else {
      setVideoActive(false);
    }
    if (props.data) {
    //  console.log(props.data);
      setWidth(props.data.boxwidth);
      setHeight(props.data.boxheight);
      setTransformX(props.data.x);
      setTransformY(props.data.y);
      setContent(props.data.content);
    }
    setContent(props.content);
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
    const tokens = localStorage.getItem('token');
    // if (cookies.get("token")) {
    if (tokens != null) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      //setUserId(decoded.id);
      setUserId(decoded.id);
    }
  }, [props.content]);

  function getcontent(e) {
    setContent(e.target.value);
    props.getContent(e.target.value);
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
   // console.log(e);
    let imgUrl = e.dataTransfer.getData("img");
   // console.log(imgUrl);
    if (imgUrl == "") {
      setVideoActive(true);
      imgUrl = e.dataTransfer.getData("video");
      console.log(imgUrl);
      props.dropMedia(false, imgUrl, "video", 0);
      let newArr = [...mediaArray]; // copying the old datas array
      newArr[index] = {
        type: "video",
        url: imgUrl,
      };
      setMediaArray(newArr);
    } else {
      //console.log("here");
      setVideoActive(false);
     // console.log(imgUrl);
      props.dropMedia(false, imgUrl, "img", 0);
      let newArr = [...mediaArray]; // copying the old datas array
      newArr[index] = {
        type: "img",
        url: imgUrl,
      };
      setMediaArray(newArr);
    }
    setDragoverId(0);
  };
  const updateVideo = (evt) => {
    console.log(evt);
    setVideoEdit(evt);
  };

  const saveVideo = () => {
    console.log(mediaArray[0].url);
    axios
      .post(`${apieditVideos}`, {
        path: mediaArray[0].url,
        userId: userId,
        sceneData: videoEdit,
        templateId: templateId,
      })
      .then(function (response) {
       // console.log(response.data.message);
        props.dropMedia(false, response.data.message, "video", 0);
        let newArr = [...mediaArray]; // copying the old datas array
        newArr[0] = {
          type: "video",
          url: response.data.message,
        };
        setMediaArray(newArr);
      });
  };
  const { nav1, nav2 } = state;
  return (
    <section className="template-new-wrapper-scene1 slider-section  section-6">
       <Loader open={processing} />  <div className="d-flex">
        <div className="img-section">
 
          <div className={videoActive ? "bg-sections video-section" : "bg-section"}>
            {mediaArray.map((data, index) => {
              //console.log(data);
              return (
                <div key={index} className="bg-inner">
                  {videoActive ? (
                    <div className="slider-box">
                      <div
                        onClick={() =>
                          setshowbg(true, data.url, data.type, false, index)
                        }
                        onDragEnter={(e) => handleDrag(e, index + 1)}
                        onDragLeave={(e) => removeDrag()}
                        onDragOver={(e) => handleDrop(e)}
                        onDrop={(e) => handleDropComplete(e, index)}
                        className={
                          dragoverId == index + 1
                            ? "bg box-1 opacity"
                            : "bg box-1 "
                        }
                        // style={{
                        //   backgroundImage: "url(" + apiPath + data.url + ") ",
                        // }}
                      >
                        {editActive ? (
                          <VideoEditor
                            src={apiPath + data.url}
                            preload={true}
                            muted={true}
                            onUpdate={updateVideo}
                          />
                        ) : (
                          <video
                            key={apiPath + data.url}
                            className="video-container "
                            autoPlay={true}
                            controls={true}
                            muted={true}
                          >
                            <source type="video/mp4" src={apiPath + data.url} />
                          </video>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="slider-box">
                      <div
                        onClick={() =>
                          setshowbg(true, data.url, data.type, false, index)
                        }
                        onDragEnter={(e) => handleDrag(e, index + 1)}
                        onDragLeave={(e) => removeDrag()}
                        onDragOver={(e) => handleDrop(e)}
                        onDrop={(e) => handleDropComplete(e, index)}
                        className={
                          dragoverId == index + 1 ? "bg box-1 opacity" : "bg box-1 "
                        }
                        style={{
                          backgroundImage: "url(" + apiPath + data.url + ") ",
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
            {videoActive ? (
              <div className="row justify-content-center nav-slider">
                <div className="col-sm-6">
                  <div className="row form-group text-center btn-section justify-content-between m-bottom">
                    <input
                      type="submit"
                      name="submit"
                      onClick={showEditor}
                      className="btn "
                      value="Edit"
                    />
                    {editActive ? (
                      <input
                        type="submit"
                        name="submit"
                        onClick={saveVideo}
                        className="btn "
                        value="Save"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
export default SceneTweleve;
