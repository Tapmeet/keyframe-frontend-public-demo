/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import DragResizeContainer from "react-drag-resize";
import { useRouteMatch } from "react-router-dom";
import {
  apiPath,
  apigetUploads,
  apiUploadImage,
  apideleteMedia,
} from "../../../../Utility/Utility";
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
import Loader from "../../../../Utility/Loader/Loader";
const SceneSeventyThree = (props) => {
  const match = useRouteMatch("/template/:templateId/:id/:sceneId");
  const {
    params: { templateId },
  } = match;
  const {
    params: { sceneId },
  } = match;
  const [textShow, setTextShow] = React.useState(false);
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
  var textArrays = props.textArray;
  const [showSlider, setshowSlider] = React.useState(true);
  const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const [processing, setProcessing] = React.useState(false);
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
  function setshowbg(option, scene, type, titleColor, index, textIndex, textshows) {

    if (textshows) {
      setTextShow(true)
    }
    else {
      setTextShow(false)
    }
    props.showBg(option, type, scene, titleColor, index, textIndex);
    setImageSrc(apiPath + scene);
    setImgindex(index);
    setZoomToggle(false);
    if (index != imgindex) {
      setZoom(1);
    }
  }
  const settings = {
    arrows: false,
    infiniteLoop: true,
    autoPlay: true,
    interval: 5000,
    transitionTime: 2000,
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    swipeable: true,
    stopOnHover: true,
    showThumbs: false,
  };
  const settings2 = {
    arrows: false,
    infiniteLoop: true,
    autoPlay: true,
    interval: 6500,
    transitionTime: 2000,
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    swipeable: true,
    stopOnHover: true,
    showThumbs: false,
  };

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
      props.getContent(newArr);
      textArrays = newArr;
    };
  });
  function getcontent(e, index) {
    let newArr = [...textArrays]; // copying the old datas array
    const maxlimit = 60;
    let charc = e.target.value;
    if (e.target.value.length > maxlimit) {
      charc = e.target.value.substring(0, maxlimit);
      newArr[index] = {
        text: charc,
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
      props.getContent(newArr);
    } else {
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
      props.getContent(newArr);
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
    if (index >= 0 && index <= 3) {
      setshowSlider(false);
      let imgUrl = e.dataTransfer.getData("img");
      props.dropMedia(false, imgUrl, "img", index);
      let newArr = [...mediaArray]; // copying the old datas array
      newArr[index] = {
        type: "img",
        url: imgUrl,
      };
      setMediaArray(newArr);
      setDragoverId(0);
      // newArr.map((data, index) => {
      //   {
      //     index <= 1
      //       ? setMediaArray1((media2) => [...media2, data])
      //       : index > 1 && index <= 3
      //       ? setMediaArray2((media3) => [...media3, data])
      //       : null;
      //   }
      //   if (index == 3) {
      //     setshowSlider(true);
      //   }
      // });
    }
    //console.log(index)
  };
  return (
    <section className="template-new-wrapper-scene1 slider-section scene-47 scene-10 scene-67 ">
      <div className="d-flex">
        <div className="img-section d-flex">
          <div className="half-width">
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
                    onDragEnter={(e) => handleDrag(e, 3)}
                    onDragLeave={(e) => removeDrag()}
                    onDragOver={(e) => handleDrop(e)}
                    onDrop={(e) => handleDropComplete(e, 2)}
                    className={
                      dragoverId == 3 ? "bg box-1 opacity" : "bg box-1 "
                    }
                    style={{
                      backgroundImage:
                        "url(" + apiPath + mediaArray[2].url + ") ",
                    }}
                  >
                    {imgindex == 2 ? (
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
                                filterBtnClick(mediaArray[2].url, 2)
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
                              onClick={() =>
                                showCroppedImage(mediaArray[2].url)
                              }
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

                        {imgindex == 2 && zoomToggle ? (
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
                          image={apiPath + mediaArray[2].url}
                          crop={crop}
                          rotation={rotation}
                          zoom={zoom}
                          aspect={8 / 9}
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
            </div>
          </div>
          <div className="half-width">
            {textArrays.map((data, index) => {
              return index == 0 ? (
                <textarea
                  style={{
                    "font-size": data.fontSize + "px",
                    color: data.fontColor,
                    "line-height": data.fontLineHeight,
                    fontWeight: data.fontWeight,
                    fontFamily: data.fontFamily,
                  }}
                  onClick={() => setshowbg(false, "", "", false, 15, index, true)}
                  // onClick={() => setshowbg(false, "", "", false,"")}
                  className={
                    "child-container form-control border  size-auto " +
                    data.fontAlignment +
                    " " +
                    data.fontCapitalize
                  }
                  onChange={(e) => getcontent(e, index)}
                  value={data.text}
                ></textarea>
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
                    onDragEnter={(e) => handleDrag(e, 1)}
                    onDragLeave={(e) => removeDrag()}
                    onDragOver={(e) => handleDrop(e)}
                    onDrop={(e) => handleDropComplete(e, 0)}
                    className={
                      dragoverId == 1 ? "bg box-1 opacity" : "bg box-1 "
                    }
                    style={{
                      backgroundImage:
                        "url(" + apiPath + mediaArray[0].url + ") ",
                    }}
                  >
                    {imgindex == 0 ? (
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
                                filterBtnClick(mediaArray[0].url, 0)
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
                              onClick={() =>
                                showCroppedImage(mediaArray[0].url)
                              }
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

                        {imgindex == 0 && zoomToggle ? (
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
                          image={apiPath + mediaArray[0].url}
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
                <div className="slider-box half-height bottom">
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
                    onDragEnter={(e) => handleDrag(e, 2)}
                    onDragLeave={(e) => removeDrag()}
                    onDragOver={(e) => handleDrop(e)}
                    onDrop={(e) => handleDropComplete(e, 1)}
                    className={
                      dragoverId == 2 ? "bg box-1 opacity" : "bg box-1 "
                    }
                    style={{
                      backgroundImage:
                        "url(" + apiPath + mediaArray[1].url + ") ",
                    }}
                  >
                    {imgindex == 1 ? (
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
                                filterBtnClick(mediaArray[1].url, 1)
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
                              onClick={() =>
                                showCroppedImage(mediaArray[1].url)
                              }
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

                        {imgindex == 1 && zoomToggle ? (
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
                          image={apiPath + mediaArray[1].url}
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
      {textShow && textArrays[0].text.length >= 40 ? <div class={textArrays[0].text.length >= 60 ? "char-counter  red" : "char-counter "}>  {60 - textArrays[0].text.length} </div> : null}

    </section>
  );
};

export default SceneSeventyThree;
