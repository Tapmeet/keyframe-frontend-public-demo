import React from "react";

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
const Scene1 = (props) => {
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
  const [transformX, setTransformX] = React.useState(0);
  const [content, setContent] = React.useState(props.data.content);

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
            console.log(response)
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
    // return {
    //   top: isResize,
    //   right: isResize,
    //   bottom: isResize,
    //   left: isResize,
    //   topRight: isResize,
    //   bottomRight: isResize,
    //   bottomLeft: isResize,
    //   topLeft: isResize,
    // };
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
    console.log(container)
    if (textshows) {
      setTextShow(true)
    }
    else {
      setTextShow(false)
    }
    props.showBg(option, type, scene, false, container);
    setImageSrc(apiPath + scene);
    setImgindex(container);
    setZoomToggle(false);
    if (container != imgindex) {
      setZoom(1);
    }
  }

  React.useEffect(() => {
    //setMediaArray(props.mediaArray);

    // console.log("props.content");
    if (props.data) {
      console.log(props.data.media);
      setWidth(props.data.boxwidth);
      setHeight(props.data.boxheight);
      setTransformX(props.data.x);
      setTransformY(props.data.y);
      //setContent(props.data.content);
      setContent(props.content);
    }
  }, [props.data]);

  function getcontent(e) {
    const maxlimit = 60;
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

    let newArr = [...mediaArray]; // copying the old datas array
    newArr[index] = {
      type: "img",
      url: imgUrl,
    };
    setMediaArray(newArr);
    props.dropMedia(false, imgUrl, "img", index, newArr);
    setDragoverId(0);
  };

  return (
    <section className="template-new-wrapper-scene1 scene1" data-tut="reactour__1">
      <Loader open={processing} />
      <div className="d-flex">
        <div className="img-section" height="1020" width="1920">

          {props.mediaArray ? (
            <DragResizeContainer

              className="resize-container"
              resizeProps={{
                minWidth: 100,
                minHeight: 120,
                enable: canResizable(50),
              }}
              onClick={() => setshowbg(false, "", "", false, '10', true)}
              layout={layout}
              onLayoutChange={onLayoutChange}
              dragProps={{ disabled: true }}
              scale={1}
            >
              {layout.map((single) => {
                return (
                  <textarea
                    data-tut="reactour__3"
                    key={single.key}
                    style={{
                      fontSize: props.settextSize + "px",
                      color: props.setColor,
                      lineHeight: props.setTextLineHeight,
                      fontFamily: props.data.fontFamily,
                      fontWeight: props.data.fontWeight,
                    }}
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
            </DragResizeContainer>
          ) : null}
          {textShow && content.length >= 40 ? <div class={content.length >= 60 ? "char-counter red" : "char-counter"}>  {60 - content.length} </div> : null}
          {/* {textShow ? <div class="char-counter"> {80 - content.length}  </div> : null} */}
          <div className="bg-section">
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

            {mediaArray.map((data, index) => {
              return (
                <div
                  onClick={() =>
                    setshowbg(true, data.url, data.type, false, index)
                  }
                  onDragEnter={(e) => handleDrag(e, index + 1)}
                  onDragLeave={(e) => removeDrag()}
                  onDragOver={(e) => handleDrop(e)}
                  onDrop={(e) => handleDropComplete(e, index)}
                  // className="bg box-1"
                  data-tut={index == 0 ? "reactour__5" : null}
                  className={
                    dragoverId == index + 1 && imgindex == index
                      ? "bg box-1 opacity active "
                      : imgindex == index
                        ? "bg box-1 active"
                        : "bg box-1 "
                  }
                  style={{
                    backgroundImage: "url(" + apiPath + data.url + ") ",
                  }}
                  key={index}
                >
                  {imgindex == index ? (
                    <div className="editbox">
                      <div className="buttonsection_zoom d-flex">
                        <div className="scale" onClick={() => setzoomToggle()}>
                          Scale
                        </div>
                        <div className="scale-edit">
                          <img
                            src={editing}
                            alt="Thumbnail"
                            className="img-fluid trash"
                            onClick={() => filterBtnClick(data.url, index)}
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
                        aspect={16 / 9}
                        onCropChange={setCrop}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Scene1;
