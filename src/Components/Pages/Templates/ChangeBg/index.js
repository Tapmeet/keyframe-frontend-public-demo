/* eslint-disable eqeqeq */

import React from "react";
import { useRouteMatch } from "react-router-dom";
import {
  apiPath,
  apigetUploads,
  apiUploadImage,
  apideleteMedia,
} from "./../../../Utility/Utility";
import trash from "./../../../Assets/images/templates/trash.svg";
import processingimg from "./../../../Assets/images/templates/Ellipsise.gif";
import Loader from "./../../../Utility/Loader/Loader";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import FilerobotImageEditor from "filerobot-image-editor";
import Dropzone from "react-dropzone";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
const ChangeBg = (props) => {
  const match = useRouteMatch("/template/:templateId/:id/:sceneId");
  const {
    params: { templateId },
  } = match;
  const {
    params: { sceneId },
  } = match;
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle2 = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [uploadingCounter, setUploadingCounter] = React.useState(0);
  const [uploadingCounterStatus, setUploadingCounterStatus] = React.useState(1);
  const [mediaList, setMediaList] = React.useState([]);
  const [mediaListEmpty, setMediaListEmpty] = React.useState(true);
  const [media, setMedia] = React.useState("");
  const [show, toggle] = React.useState(false);
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  const [userId, setUserId] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [thumbnailSize, setThumbnailSize] = React.useState(1);
  React.useEffect(() => {
    const tokens = localStorage.getItem('token');
    if (tokens != null) {
      
      setUserToken(tokens);
    //  setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      // console.log(decoded.id)
      setUserId(decoded.id);
      if (userId) {
        getUploads();
      }
    }
  }, [userId]);
  function getUploads() {
    // setProcessing(true);
    axios
      .get(
        `${apigetUploads}` + "?userId=" + userId + "&&templateId=" + templateId,
        {}
      )
      .then(function (response) {
        setProcessing(false);
        if (response.data.data) {
          console.log(response.data.data);
          setMediaList(response.data.data);
          setMediaListEmpty(false);
        } else {
          setMediaListEmpty(true);
        }
      });
  }
  function deleteMedia(media, mediaId) {
    setProcessing(true);
    axios
      .delete(`${apideleteMedia}`, {
        params: {
          mediaId: mediaId,
          media: media,
        },
      })
      .then(function (response) {
        //console.log(response.data.message)
        if (response.data.message) {
          setProcessing(false);
        } else {
          setProcessing(false);
        }
        window.location.reload();
        getUploads();
      });
  }
  const handleDrop = (acceptedFiles) => {
    let fileUrl, imageUrl, updatedImage;
    //  setProcessing(true);
    var i = acceptedFiles.length;
    setUploadingCounterStatus(1)
    setUploadingCounter(i);
    console.log(i);
    acceptedFiles.map((file, index) => {
      console.log(index);
      var parts = file.type.split("/");
      var result = parts[0];
      console.log(result);
      // if (result == "image") {
      if (file != "") {
        const data = new FormData();

        data.append("file", file);
        data.append("userId", userId);
        data.append("templateId", templateId);
        // API Call
        // setProcessing(true);
        axios
          .post(`${apiUploadImage}`, data)
          .then((response) => {
            var conter = index;
            // console.log(conter)

            // setProcessing(false);
            fileUrl = response.data.message
              .replace(/\\/g, "/")
              .substring("public".length);
            imageUrl = fileUrl.replace("sets/", "");
            updatedImage = imageUrl;
            getUploads();
            toggle2("1");
            //console.log(uploadingCounter);
            if (i - 1 == index) {
              i = 0;
              setUploadingCounterStatus(0);
              setUploadingCounter(0);
            }
            setUploadingCounterStatus(conter + 2);
          })
          .catch((error) => { });
        //}
      }
    });
  };
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
        primaryBg: "#5fcec6",
        primaryBgHover: "#637381",
        secondaryBg: "#509691",
        secondaryBgHover: "#ee6352",
        text: "#F9FAFB",
        textHover: "#ffffff",
        textMute: "#aaaaaa",
        textWarn: "#f7931e",
        secondaryBgOpacity: "rgba(0, 0, 0, 0.75)",
        border: "#5fcec6",
        borderLight: "#637381",
        tagsBackground: "#fb3640",
        buttonBackground: "#fb3640",
        hoverButtonBackground: "#E04241",
      },
    },
  };
  const onComplete = function (newUrl) {
    let fileUrl = newUrl.message.replace(/\\/g, "/").substring("public".length);
    let imageUrl = fileUrl.replace("sets/", "");
    let updatedImage = imageUrl;
    props.showAddMedia("true", updatedImage);
    props.closeAddMedia(false, updatedImage, "image");
  };
  const ImageEditor = new FilerobotImageEditor(config, onComplete);
  function filterBtnClick() {
    toggle(true);
  }

  function changebgMedia() {
    props.showAddMedia("true", props.scene);
  }
  const handleDragStart = (e, img) => {
    //e.preventDefault();
    e.dataTransfer.setData("img", img);
  };
  const handleDragStartVideo = (e, img) => {
    //e.preventDefault();
    e.dataTransfer.setData("video", img);
  };
  function setThumbnail(e) {

    if (e.target.value == 1) {
      setThumbnailSize(e.target.value)
    } else if (e.target.value == 2) {
      setThumbnailSize(e.target.value)
    }
    else if (e.target.value == 3) {
      setThumbnailSize(e.target.value)
    }
  }
  return (
    <section className="template-new-changebg template-new-wrapper-text-editor" >
      <Loader open={processing} />
      <div className="change-wrapper" data-tut="reactour__2">
        <select onChange={e => setThumbnail(e)}>
          <option value="1">Small</option>
          <option value="2">Medium</option>
          <option value="3">Large</option>
        </select>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle2("1");
              }}
            >
              Media
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle2("2");
              }}
            >
              Upload New
            </NavLink>
          </NavItem> */}
        </Nav>

        {/* {props.type == "image" ? (
          <div>
            <FilerobotImageEditor
              show={show}
              config={config}
              src={apiPath + props.scene}
              onClose={() => {
                toggle(false);
              }}
              onComplete={onComplete}
            />
            <img
              src={apiPath + props.scene}
              className="img-fluid"
              alt="imagebg"
            />
          </div>
        ) : null}
        <div className="d-flex">
          <button className="btn " onClick={changebgMedia}>
            Change Image
          </button>
          <button className="btn " onClick={filterBtnClick}>
            Edit Image
          </button>
        </div> */}
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="rightPanel">
              <div className="button-section d-flex">
                <div className="bg-grays left-panel">
                  {uploadingCounter > 0
                    ? "Uploading  & Compressing Media (" +
                    uploadingCounter + ")"
                    : null}
                  {uploadingCounter > 0 ? (
                    <img
                      className="img-processing"
                      src={processingimg}
                      alt="processing"
                    />
                  ) : null}
                  <div className="upload-pane">
                    <Dropzone accept="image/*, video/* " onDrop={handleDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input {...getInputProps()} />
                          <p>Click or Drag Your Media to Upload</p>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </div>
                {mediaListEmpty ? (
                  <div className="col-12">
                    <div className="alert alert-primary">No Media Found</div>
                  </div>
                ) : (
                  <ul className={thumbnailSize == 1 ? 'small' : thumbnailSize == 2 ? 'medium' : 'large'}>
                    {mediaList.map((block) => {
                      let fileUrl = block.path
                        .replace(/\\/g, "/")
                        .substring("public".length);
                      let mediaurl = fileUrl.replace("sets/", "");
                      let updatedImage = mediaurl;
                      return (
                        <li
                          key={block.path}
                          className={media == updatedImage ? "active" : null}
                        >
                          <img
                            src={trash}
                            alt="Thumbnail"
                            className="img-fluid trash"
                            onClick={() => deleteMedia(updatedImage, block._id)}
                          />

                          {block.mimetype == "image/jpeg" ||
                            block.mimetype == "image/png" ||
                            block.mimetype == "image/jpg" ||
                            block.mimetype == "image/svg" ? (
                            <div
                              className="draggablediv"
                              draggable="true"
                              onDragStart={(e) =>
                                handleDragStart(e, updatedImage)
                              }
                            >
                              <div
                                src={apiPath + updatedImage}
                                alt="Thumbnail"
                                className="imgfluid bg"
                                style={{
                                  backgroundImage:
                                    "url(" + apiPath + updatedImage + ") ",
                                }}
                              //onClick={() => setImage(updatedImage, "image", block._id)}
                              />
                              <div className="overlayDiv"></div>
                            </div>
                          ) : (
                            <video
                              onDragStart={(e) =>
                                handleDragStartVideo(e, updatedImage)
                              }
                              key={apiPath + updatedImage}
                              className="video-container "
                              draggable="true"
                              autoPlay={true}
                              controls={false}
                              muted={true}
                            >
                              <source
                                type="video/mp4"
                                src={apiPath + updatedImage}
                              />
                            </video>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="bg-grays">
              <div className="upload-pane">
                <Dropzone accept="image/*, video/* " onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <p>Click or Drag Your Media to Upload</p>
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </section>
  );
};
export default ChangeBg;
