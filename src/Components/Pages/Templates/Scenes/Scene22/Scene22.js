/* eslint-disable eqeqeq */
import React from "react";

import trash from "./../../../../Assets/images/templates/trash.svg";
import add from "./../../../../Assets/images/templates/add.svg";
import left from "./../../../../Assets/images/templates/left.png";
import right from "./../../../../Assets/images/templates/right.png";
import Slider from "react-slick";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DragResizeContainer from "react-drag-resize";
import { CommentTwoTone } from "@material-ui/icons";
import { useRouteMatch } from "react-router-dom";
import {
  apiPath,
  apigetUploads,
  apiUploadImage,
  apideleteMedia,
} from "./../../../../Utility/Utility";
import FilerobotImageEditor from "filerobot-image-editor";
import editing from "./../../../../Assets/images/templates/editing.png";
import check from "./../../../../Assets/images/templates/check.png";
import Sliders from "@material-ui/core/Slider";
import getCroppedImg from "../../../../Utility/cropImage";
import Cropper from "react-easy-crop";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

import Loader from "./../../../../Utility/Loader/Loader";
const SceneTwentyTwo = (props) => {
  const match = useRouteMatch("/template/:templateId/:id/:sceneId");
  const {
    params: { templateId },
  } = match;
  const {
    params: { sceneId },
  } = match;
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  const [userId, setUserId] = React.useState("");
  const [imageSrc, setImageSrc] = React.useState(null);
  const [editUrl, setEditUrl] = React.useState("");
  const [imgindex, setImgindex] = React.useState(null);
  const [show, toggle] = React.useState(false);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [rotation, setRotation] = React.useState(0);
  const [zoom, setZoom] = React.useState(1);
  const [zoomToggle, setZoomToggle] = React.useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
  const [croppedImage, setCroppedImage] = React.useState(null);

  const [mediaArray, setMediaArray] = React.useState(props.mediaArray);
  const [dragoverId, setDragoverId] = React.useState(0);
  const [content, setContent] = React.useState([]);
  const [counter, setCounter] = React.useState(content.length);
  const [state, setState] = React.useState({ nav1: null, nav2: null });
  const slider1 = React.useRef();
  const slider2 = React.useRef(); const [processing, setProcessing] = React.useState(false);
  const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  React.useEffect(() => {
    const tokens = localStorage.getItem('token');
    // if (cookies.get("token")) {
    if (tokens != null) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      setUserId(decoded.id);
    }
  }, [userId]);
  const showCroppedImage = React.useCallback(async () => {
    setProcessing(true);
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log(croppedImage);
      setCroppedImage(croppedImage);
      var croppedimg = "";
      axios({
        method: "get",
        url: croppedImage,
        responseType: "blob",
      }).then(function (response) {
        console.log(response.data);
        croppedimg = response.data;
        var formData = new FormData();

        formData.append("file", croppedimg, "scale-img.jpg");
        formData.append("userId", userId);
        formData.append("templateId", templateId);
        // API Call
        setProcessing(true);
        axios
          .post(`${apiUploadImage}`, formData)
          .then((response) => {
            setProcessing(false);
            let fileUrl = response.data.message
              .replace(/\\/g, "/")
              .substring("public".length);
            let imageUrl = fileUrl.replace("sets/", "");
            let updatedImage = imageUrl;
            let newArr = [...mediaArray]; // copying the old datas array
            newArr[imgindex] = {
              type: "img",
              url: updatedImage,
            };
            console.log(updatedImage);
            closeScale(50);
            setMediaArray(newArr);
            props.dropMedia(false, updatedImage, "img", imgindex, newArr);
          })
          .catch((error) => { });
      });
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);
  const onClose = React.useCallback(() => {
    setCroppedImage(null);
  }, []);
  //console.log(props.content)
  const config = {
    tools: [
      "adjust",
      "effects",
      "filters",
      "rotate",
      "crop",
      "resize",
      "image",
      "text",
    ],
    theme: {
      colors: {
        primaryBg: "#eee",
        primaryBgHover: "#637381",
        secondaryBg: "#777",
        secondaryBgHover: "#ee6352",
        text: "#F9FAFB",
        textHover: "#eee",
        textMute: "#aaaaaa",
        textWarn: "#f7931e",
        secondaryBgOpacity: "rgba(0, 0, 0, 0.75)",
        border: "#eee",
        borderLight: "#637381",
        tagsBackground: "#fb3640",
        buttonBackground: "#fb3640",
        hoverButtonBackground: "#E04241",
      },
    },
  };

  function filterBtnClick(scene, index) {
    setImgindex(index);
    setEditUrl(scene);
    toggle(true);
  }
  const closeScale = (index) => {
    setTimeout(function () {
      setImgindex(index);
    }, 100);
  };
  const setzoomToggle = () => {
    console.log("here");
    setTimeout(function () {
      setZoomToggle(!zoomToggle);
    }, 100);
  };

  const onComplete = function (newUrl) {
    let fileUrl = newUrl.message.replace(/\\/g, "/").substring("public".length);
    let imageUrl = fileUrl.replace("sets/", "");
    let updatedImage = imageUrl;
    let newArr = [...mediaArray]; // copying the old datas array
    newArr[imgindex] = {
      type: "img",
      url: updatedImage,
    };

    setMediaArray(newArr);
    props.dropMedia(false, updatedImage, "img", imgindex, newArr);
  };
  const ImageEditor = new FilerobotImageEditor(config, onComplete);
  function setshowbg(option, scene, type, titleColor, container) {
    props.showBg(option, type, scene, titleColor, container);
    setImageSrc(apiPath + scene);
    setImgindex(container);
    setZoomToggle(false);
    if (container != imgindex) {
      setZoom(1);
    }
  }
  function setsctiveFontFamily(option) {
    props.setActiveFontFamily(option);
  }
  const settings = {
    dots: true,
    speed: 1500,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    infinite: false,
    slidesToScroll: 1,
    swipe: false,
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
  const settings2 = {
    dots: true,
    speed: 1500,
    autoplaySpeed: 3500,
    slidesToShow: 2,
    infinite: false,
    slidesToScroll: 1,
    autoplay: true,

  };
  const addSection = () => {
    setCounter(counter + 1);
    let newArr = [...content]; // copying the old datas array
    newArr[counter] = {
      title: "Enter Title",
      text: "Enter Value",
    };

    props.getContent(newArr);
    setContent(newArr);
  };
  const deleteSection = (e) => {
    setCounter(counter - 1);
    content.splice(e, 1);
    props.getContent(content);
  };

  const updateFieldChanged = (index) => (e) => {
    let newArr = [...content]; // copying the old datas array
    const maxlimit = 14;
    let charc = e.target.value;
    if (e.target.value.length > maxlimit) {
      charc = e.target.value.substring(0, maxlimit);
      newArr[index] = {
        title: newArr[index].title,
        text: charc,
      };
      setContent(newArr);
      props.getContent(newArr);
    } else {
      newArr[index] = {
        title: newArr[index].title,
        text: e.target.value,
      };
      setContent(newArr);
      props.getContent(newArr);
    }
  };
  const updateTile = (index) => (e) => {
    // let newArr = [...content]; // copying the old datas array
    // newArr[index] = {
    //   title: e.target.value,
    //   text: newArr[index].text,
    // };
    // props.getContent(newArr);
    // setContent(newArr); // ??

    let newArr = [...content]; // copying the old datas array
    const maxlimit = 14;
    let charc = e.target.value;
    if (e.target.value.length > maxlimit) {
      charc = e.target.value.substring(0, maxlimit);
      newArr[index] = {
        title: charc,
        text: newArr[index].text,
      };
      setContent(newArr);
      props.getContent(newArr);
    } else {
      newArr[index] = {
        title: e.target.value,
        text: newArr[index].text,
      };
      props.getContent(newArr);
      setContent(newArr);
    }
  };
  React.useEffect(() => {
    setContent(props.content);

    setMediaArray(props.mediaArray);
    setCounter(props.content.length);
    if (props.data) {
      setContent(props.content);
      setCounter(props.content.length);
    }
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [props.content, props.fontFamily, props.data]);
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
    setDragoverId(0);
  };

  const { nav1, nav2 } = state;
  return (
    <section className="template-new-wrapper-scene1 section-18 section-22  scene-2 slider-section ">
      <Loader open={processing} />  <div className="d-flex">
        <div className="img-section">

          <div className="bg-section d-flex justify-end">
            <div class="text-wrapper  left-section-text">
              {typeof content != undefined && content.length
                ? content.map((data, index) => {
                  return (
                    <div className="listing-box" key={index}>
                      <div className="close-add-buttons">
                        {counter < 5 ? (
                          <img
                            src={add}
                            alt="Add Section"
                            onClick={addSection}
                          />
                        ) : null}
                        {counter > 1 ? (
                          <img
                            src={trash}
                            alt="Delete Section"
                            onClick={() => deleteSection(index)}
                          />
                        ) : null}
                      </div>
                      <h3 onClick={() => setsctiveFontFamily(true)}>
                        <input
                          type="text"
                          onChange={updateTile(index)}
                          value={data.title}
                          style={{
                            color: props.setTitleColor,
                            fontSize: props.data.titletextSize + "px",
                            fontWeight: props.data.titleFontWeight,
                            fontFamily: props.data.titleFontFamily,
                          }}
                          className={
                            "child-container form-control border  size-auto " +
                            props.setAlignment +
                            " " +
                            props.setTextTransform
                          }
                        />
                      </h3>
                      <div
                        className="title"
                        onClick={() => setsctiveFontFamily(false)}
                      >
                        <input
                          type="text"
                          onChange={updateFieldChanged(index)}
                          value={data.text}
                          style={{
                            color: props.setColor,
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
                        />
                      </div>
                    </div>
                  );
                })
                : null}
            </div>
            <div className="half-width">
              <Slider
                {...settings}
                asNavFor={nav2}
                ref={(slider) => (slider1.current = slider)}
              >
                {mediaArray.map((data, index) => {
                  return (
                    <div key={index}>
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
                          style={{
                            backgroundImage: "url(" + apiPath + data.url + ") ",
                          }}
                        >
                          {imgindex == index ? (
                            <div className="editbox right-scene">
                              <div className="buttonsection_zoom d-flex">
                                <div
                                  className="scale"
                                  onClick={() => setzoomToggle()}
                                >
                                  Scale
                                </div>
                                <div className="scale-edit">
                                  <img
                                    src={editing}
                                    alt="Thumbnail"
                                    className="img-fluid trash"
                                    onClick={() =>
                                      filterBtnClick(data.url, index)
                                    }
                                    data-tip=""
                                    data-for="edit"
                                  />
                                  <ReactTooltip
                                    backgroundColor="#ee6352"
                                    effect="solid"
                                    id="edit"
                                  >
                                    Edit
                                  </ReactTooltip>
                                </div>
                                <div className="scale-ok">
                                  <img
                                    src={check}
                                    alt="Thumbnail"
                                    className="img-fluid trash"
                                    onClick={() => showCroppedImage(data.url)}
                                    data-tip=""
                                    data-for="done"
                                  />
                                  <ReactTooltip
                                    backgroundColor="#3feab7"
                                    effect="solid"
                                    id="done"
                                  >
                                    Done
                                  </ReactTooltip>
                                </div>
                                <div
                                  className="scale-close"
                                  onClick={() => closeScale(50)}
                                >
                                  Close
                                </div>
                              </div>

                              {imgindex == index && zoomToggle ? (
                                <div className="slider-zoom">
                                  <Sliders
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e, zoom) => setZoom(zoom)}
                                  />
                                </div>
                              ) : null}

                              <Cropper
                                image={apiPath + data.url}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                aspect={16 / 9}
                                onCropChange={setCrop}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>

            </div>
            <div className="row justify-content-end nav-slider">
              <div className="col-sm-6">
                <Slider
                  asNavFor={nav1}
                  ref={(slider) => (slider2.current = slider)}
                  slidesToShow={2}
                  {...settings2}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  {mediaArray.map((data, index) => {
                    return (
                      <div key={index}>
                        <div className="slider-box-inner" style={{
                          backgroundImage: "url(" + apiPath + data.url + ") ",
                        }}>
                          {index == 0 ?
                            <div className="left">
                              <img src={left} alt="left" />
                            </div>
                            : <div className="right">
                              <img src={right} alt="right" />
                            </div>
                          }
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <FilerobotImageEditor
          show={show}
          config={config}
          src={apiPath + editUrl}
          onClose={() => {
            toggle(false);
          }}
          onComplete={onComplete}
        />
      </div>
    </section>
  );
};
export default SceneTwentyTwo;
