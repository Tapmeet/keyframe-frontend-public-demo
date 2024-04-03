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

import home from "./../../../../Assets/images/home-con.png";
import Slider from "@material-ui/core/Slider";
import getCroppedImg from "../../../../Utility/cropImage";
import Cropper from "react-easy-crop";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import Loader from "../../../../Utility/Loader/Loader";
const SceneSixtyTwo = (props) => {
  const match = useRouteMatch("/template/:templateId/:id/:sceneId");
  const {
    params: { templateId },
  } = match;
  const {
    params: { sceneId },
  } = match;
  const [userToken, setUserToken] = React.useState("");
  const [usertext1, setUsertext1] = React.useState("");
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
      setUsertext1(textArrays[0].text);
      console.log(textArrays)
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
  function getcontent(e, index, count) {
    let newArr = [...textArrays]; // copying the old datas array
    const maxlimit = count;
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
    console.log(index)
    if (index >= 0 && index <= 5) {
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
    <section className="template-new-wrapper-scene1 lastScene-section lastscene2 scene62 ">
      {showSlider ? (
        <div className="img-section d-flex align-items-center">
          <div className="col-12 height100 first">
            <div
              className="bg box-1"
              style={{
                "background-image": "url(" + apiPath + mediaArray[2].url + ") ",
              }}
              onClick={() =>
                setshowbg(
                  true,
                  mediaArray[2].url,
                  mediaArray[2].type,
                  false,
                  "2"
                )
              }
              onDragEnter={(e) => handleDrag(e, 3)}
              onDragLeave={(e) => removeDrag()}
              onDragOver={(e) => handleDrop(e)}
              onDrop={(e) => handleDropComplete(e, 2)}
            />
          </div>
          <div className="col-12 col-sm-6 height100">
            <img
              src={apiPath + mediaArray[1].url}
              onClick={() =>
                setshowbg(
                  true,
                  mediaArray[1].url,
                  mediaArray[1].type,
                  false,
                  "1"
                )
              }
              onDragEnter={(e) => handleDrag(e, 2)}
              onDragLeave={(e) => removeDrag()}
              onDragOver={(e) => handleDrop(e)}
              onDrop={(e) => handleDropComplete(e, 1)}
              className={
                dragoverId == 1
                  ? "img-fluid userimg opacity"
                  : "img-fluid userimg "
              }
              alt="userImg"
            />
          </div>
          <div className="col-12 col-sm-6 height100 right-section-last">
            <div>
              {textArrays.map((data, index) => {
                return (
                  index <= 3 ?
                    <div
                      className="text-content"
                      key={index}
                      onClick={() => setsctiveFontFamily(index)}
                    >
                      <input
                        type="text"
                        style={{
                          fontSize: data.fontSize + "px",
                          color: data.fontColor,
                          lineHeight: data.fontLineHeight,
                          fontWeight: data.fontWeight,
                          fontFamily: data.fontFamily,
                        }}
                        className={
                          "child-container form-control border  size-auto " +
                          data.fontAlignment +
                          " " +
                          data.fontCapitalize
                        }
                        value={data.text}
                        onChange={(e) => getcontent(e, index)}
                      ></input>
                    </div>
                    : null
                )
              })}
              <img
                src={apiPath + mediaArray[0].url}
                onClick={() =>
                  setshowbg(
                    true,
                    mediaArray[0].url,
                    mediaArray[0].type,
                    false,
                    "0"
                  )
                }
                onDragEnter={(e) => handleDrag(e, 1)}
                onDragLeave={(e) => removeDrag()}
                onDragOver={(e) => handleDrop(e)}
                onDrop={(e) => handleDropComplete(e, 0)}
                className={
                  dragoverId == 1
                    ? "img-fluid userimg opacity"
                    : "img-fluid userimg "
                }
                alt="userImg"
              />
            </div>
          </div>
        </div>

      ) : null
      }
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
    </section >
  );
};

export default SceneSixtyTwo;
