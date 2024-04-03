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
} from "./../../../../Utility/Utility";
import FilerobotImageEditor from "filerobot-image-editor";
import editing from "./../../../../Assets/images/templates/editing.png";
import check from "./../../../../Assets/images/templates/check.png";
import Slider from "@material-ui/core/Slider";
import getCroppedImg from "../../../../Utility/cropImage";
import Cropper from "react-easy-crop";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import Loader from "./../../../../Utility/Loader/Loader";
const SceneFour = (props) => {
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
  var textArrays = props.textArray;
  const [mediaArray1, setMediaArray1] = React.useState([]);
  const [mediaArray2, setMediaArray2] = React.useState([]);
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

  function setshowbg(option, scene, type, titleColor, index, textIndex) {
    props.showBg(option, type, scene, titleColor, index, textIndex);
    setImageSrc(apiPath + scene);
    setImgindex(index);
    setZoomToggle(false);
    if (index != imgindex) {
      setZoom(1);
    }
  }
  function setsctiveFontFamily(option) {
    props.setActiveFontFamily(option);
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

  React.useEffect(() => {
    // props.mediaArray.map((data, index) => {
    //   {
    //     index <= 1
    //       ? setMediaArray1((medias) => [...medias, data])
    //       : index > 1 && index <= 3
    //       ? setMediaArray2((media) => [...media, data])
    //       : null;
    //   }
    // });
    if (props.data) {
      mediaArray.map((data, index) => {
        {
          index <= 1
            ? setMediaArray1((media2) => [...media2, data])
            : index > 1 && index <= 3
              ? setMediaArray2((media3) => [...media3, data])
              : null;
        }
      });
    }
  }, [textArrays, props.data]);
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
    const maxlimit = 100;
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
      setMediaArray1([]);
      setMediaArray2([]);
      newArr.map((data, index) => {
        {
          index <= 1
            ? setMediaArray1((media2) => [...media2, data])
            : index > 1 && index <= 3
              ? setMediaArray2((media3) => [...media3, data])
              : null;
        }
        if (index == 3) {
          setshowSlider(true);
        }
      });
    }
    setDragoverId(0);
    //console.log(index)
  };
  return (
    <section className="template-new-wrapper-scene1 scene-4 slider-section">
      {showSlider ? (
        <div className="d-flex">
          <div className="img-section d-flex">
            <div className="half-width">
              {textArrays.map((data, index) => {
                return index == 0 ? (
                  <DragResizeContainer
                    className="resize-container"
                    resizeProps={{
                      minWidth: 100,
                      minHeight: 70,
                      enable: global.canResizable0(50),
                    }}
                    onClick={() => setsctiveFontFamily(index)}
                    layout={global.layout0}
                    onLayoutChange={(e) => global.onLayoutChange0(e, 0)}
                    dragProps={{ disabled: false }}
                    scale={1}
                  >
                    {global.layout0.map((single) => {
                      return (
                        <textarea
                          key={single.key}
                          rows={2}
                          style={{
                            "font-size": data.fontSize + "px",
                            color: data.fontColor,
                            "line-height": data.fontLineHeight,
                            fontWeight: data.fontWeight,
                            fontFamily: data.fontFamily,
                            "max-width": "100%",
                          }}
                          className={
                            "child-container form-control border  size-auto  " + " "
                            +

                            data.fontAlignment 
                            
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
                {mediaArray1.length > 0 ? (
                  <Carousel axis="vertical" {...settings}>
                    {mediaArray1.map((data, index) => {
                      return (
                        <div key={index} id={index}>
                          <div className="slider-box">
                            <div
                              onClick={() =>
                                setshowbg(
                                  true,
                                  data.url,
                                  data.type,
                                  false,
                                  index
                                )
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
                                backgroundImage:
                                  "url(" + apiPath + data.url + ") ",
                              }}
                            >
                              {imgindex == index ? (
                                <div className="editbox">
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
                                        onClick={() =>
                                          showCroppedImage(data.url)
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

                                  {imgindex == index && zoomToggle ? (
                                    <div className="slider-zoom">
                                      <Slider
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
                      );
                    })}
                  </Carousel>
                ) : null}
              </div>
            </div>

            <div className="half-width">
              {textArrays.map((data, index) => {
                return index == 1 ? (
                  <DragResizeContainer
                    className="resize-container"
                    resizeProps={{
                      minWidth: 100,
                      minHeight: 70,
                      enable: global.canResizable1(50),
                    }}
                    onClick={() => setsctiveFontFamily(index)}
                    layout={global.layout1}
                    onLayoutChange={(e) => global.onLayoutChange1(e, 1)}
                    dragProps={{ disabled: false }}
                    scale={1}
                  >
                    {global.layout1.map((single) => {
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
                          rows={2}
                          className={
                            "child-container form-control border  size-auto  " + " "
                            +
                            data.fontAlignment 
                          }
                          value={data.text}
                          onChange={(e) => getcontent(e, index)}
                        ></textarea>
                      );
                    })}
                  </DragResizeContainer>
                ) : null;
              })}
              <div className="bg-section">
                {mediaArray2.length > 0 ? (
                  <Carousel axis="vertical" {...settings2}>
                    {mediaArray2.map((data, index) => {
                      return (
                        <div key={index} id={mediaArray2.length}>
                          <div className="slider-box">
                            <div
                              onClick={() =>
                                setshowbg(
                                  true,
                                  data.url,
                                  data.type,
                                  false,
                                  index + 2
                                )
                              }
                              onDragEnter={(e) => handleDrag(e, index + 2)}
                              onDragLeave={(e) => removeDrag()}
                              onDragOver={(e) => handleDrop(e)}
                              onDrop={(e) => handleDropComplete(e, index + 2)}
                              className={
                                dragoverId == index + 2
                                  ? "bg box-1 opacity"
                                  : "bg box-1 "
                              }
                              style={{
                                backgroundImage:
                                  "url(" + apiPath + data.url + ") ",
                              }}
                            >
                              {imgindex == index + 2 ? (
                                <div className="editbox">
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
                                          filterBtnClick(data.url, index + 2)
                                        }
                                        data-tip=""
                                        data-for="edits"
                                      />
                                      <ReactTooltip
                                        backgroundColor="#ee6352"
                                        effect="solid"
                                        id="edits"
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
                                          showCroppedImage(data.url)
                                        }
                                        data-tip=""
                                        data-for="dones"
                                      />
                                      <ReactTooltip
                                        backgroundColor="#3feab7"
                                        effect="solid"
                                        id="dones"
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

                                  {imgindex == index + 2 && zoomToggle ? (
                                    <div className="slider-zoom">
                                      <Slider
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
                      );
                    })}
                  </Carousel>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
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

export default SceneFour;
