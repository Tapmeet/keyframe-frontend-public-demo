import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { useRouteMatch } from "react-router-dom";
import Loader from "./../../../Utility/Loader/Loader";
import {
  apiUploadMedia,
  apigetMusicUploads,
  apiupdateAdminTemplate,
  apiPath,
} from "./../../../Utility/Utility";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Row,
  Col,
  CardTitle,
  CardText,
} from "reactstrap";
import classnames from "classnames";
import { Checkboard } from "react-color";
const MediaUpload = (props) => {
  const { buttonLabel, className } = props;
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  const [userId, setUserId] = React.useState("");
  const [audioPlayId, setAudioPlayId] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [mediaList, setMediaList] = React.useState([]);
  const [mediaListEmpty, setMediaListEmpty] = React.useState(true);
  const [usermediaList, setUserMediaList] = React.useState([]);
  const [usermediaListEmpty, setUserMediaListEmpty] = React.useState(true);
  const [selectedMedia, setSelectedMedia] = React.useState("");
  const match = useRouteMatch("/template/:templateId/:id/:sceneId");
  const [x, setX] = React.useState("");
  const [y, setY] = React.useState(0);
  const [audioId, setAudioId] = React.useState("");
  const {
    params: { templateId },
  } = match;
  const {
    params: { sceneId },
  } = match;
  function getUploads() {
    axios.get(`${apigetMusicUploads}`, {}).then(function (response) {
      if (response.data.data) {
       // console.log(response.data.data);
        setMediaList(response.data.data);
        setMediaListEmpty(false);
      } else {
        setMediaListEmpty(true);
      }
    });
    axios
      .get(`${apigetMusicUploads}` + "?userId=" + userId, {})
      .then(function (response) {
        if (response.data.data) {
         // console.log(response.data.data);
          setUserMediaList(response.data.data);
          setUserMediaListEmpty(false);
        } else {
          setUserMediaListEmpty(true);
        }
      });
  }
  React.useEffect(() => {
    const tokens = localStorage.getItem('token');
    // if (cookies.get("token")) {
    if (tokens != null) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      // console.log(decoded.id)
      setUserId(decoded.id);
    }
    getUploads();
  }, [userId]);
  function setformImage(e) {
    var parts = e.target.files[0].type.split("/");
    var result = parts[0];
    if (e.target.files[0] != "") {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("userId", userId);
      data.append("adminMedia", false);
      setProcessing(true);
      axios
        .post(`${apiUploadMedia}`, data)
        .then((response) => {
          setProcessing(false);
          let fileUrl = response.data.message
            .replace(/\\/g, "/")
            .substring("public".length);
          let imageUrl = fileUrl.replace("sets/", "");
          let updatedImage = imageUrl;
          getUploads();
        })
        .catch((error) => {});
    }
  }
  const playAudio = (audio) => {
    if (audioId != "") {
      if (audioId == audio) {
        if (y == 1) {
          pauseAudio(x);
          setY(0);
          setAudioPlayId("");
        } else {
          playAudio(x);
          setY(1);
          setAudioPlayId(audio);
        }
      } else {
        pauseAudio(x);
        setAudioId(audio);
        let audiox = document.getElementById(audio);
        setX(audiox);
        playAudio(audiox);
        setAudioPlayId(audio);
        setY(1);
      }
    } else {
      setAudioId(audio);
      setAudioPlayId(audio);
      let audiox = document.getElementById(audio);
      setAudioId(audio);
      setX(audiox);
      playAudio(audiox);
      setY(1);
    }

    function playAudio(audioToplay) {
      audioToplay.play();
    }
  };
  function pauseAudio(audioTopause) {
    audioTopause.pause();
  }
  function savemedia() {
    if (selectedMedia) {
      axios
        .put(`${apiupdateAdminTemplate}${templateId}`, {
          id: templateId,
          musicFile: selectedMedia,
        })
        .then(function (response) {
          props.saveMedia();
          if (audioPlayId) {
            pauseAudio(x);
            setAudioPlayId("");
            setY(0);
          }
          props.toggle2();
        });
    }
  }
  function setMusicFile(e) {
    setSelectedMedia(e.target.value);
  }
  function closeModal() {
    if (audioPlayId) {
      pauseAudio(x);
      setAudioPlayId("");
      setY(0);
    }

    props.toggle2();
  }
  return (
    <Modal isOpen={props.modal2} toggle={props.toggle2} className={className}>
      <ModalHeader toggle={props.toggle2}>Project music</ModalHeader>
      <ModalBody>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: props.activeTab === "1" })}
                onClick={() => {
                  props.toggles("1");
                }}
              >
                Music
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: props.activeTab === "2" })}
                onClick={() => {
                  props.toggles("2");
                }}
              >
                Uploads
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={props.activeTab}>
            <TabPane tabId="1">
              <Row className="customtabs">
                <Col sm="12">
                  <h4>Music List</h4>
                  <div className="listMedia">
                    <div className="listBox">
                      <div className="radioSection">
                        <input
                          type="radio"
                          name="music"
                          onChange={setMusicFile}
                          value=""
                        />
                      </div>
                      <div className="mediaMute">
                        <svg
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="__36674"
                        >
                          <path
                            d="M10.927 6.073A.25.25 0 0111 6.25v11.503a.25.25 0 01-.427.177L9.13 16.285 4 21.415 2.586 20l4.999-5H5a1 1 0 01-1-1v-4a1 1 0 011-1h3l2.573-2.927a.25.25 0 01.354 0zm10.05-4.487l1.418 1.41-4.244 4.265A7 7 0 0113 19v-2.001a5 5 0 000-10V5c1.314 0 2.543.362 3.594.992l4.383-4.406zM13 9a3 3 0 010 6v-2a1 1 0 000-2V9z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="mediaName">No music</div>
                      <div className="__366b7__Right"></div>
                    </div>
                    {mediaList.map((block, index) => {
                      let fileUrl = block.path
                        .replace(/\\/g, "/")
                        .substring("public".length);
                      let mediaurl = fileUrl.replace("sets/", "");
                      let updatedImage = mediaurl;
                      let mediaName = block.originalname.replace(".mp3", "");
                      return (
                        <div className="listBox" key={index}>
                          <div className="radioSection">
                            <input
                              type="radio"
                              onChange={setMusicFile}
                              name="music"
                              value={updatedImage}
                            />
                          </div>

                          <audio
                            id={`audio${index}`}
                            src={apiPath + updatedImage}
                          ></audio>
                          <button
                            onClick={() => playAudio("audio" + index)}
                            className="mediaPlayback"
                            type="button"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="__36674"
                            >
                              <path
                                d={
                                  audioPlayId == "audio" + index
                                    ? "M6 4h4v16H6V4zm8 0h4v16h-4V4z"
                                    : "M7 4v16l12-8z"
                                }
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>

                          <div className="mediaName">{mediaName}</div>
                          {/* <div className="mediaDuration">4:51</div> */}
                          <div className="__366b7__Right"></div>
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row className="customtabs">
                <Col sm="12">
                  <Card body>
                    <CardTitle></CardTitle>
                    <div>
                      <div className="uploadMusic">
                        <div className="fsp-drop-pane__container">
                          <input
                            type="file"
                            accept="audio/*"
                            className="fsp-drop-pane__input"
                            onChange={(e) => setformImage(e)}
                          />
                          <div className="fsp-drop-pane__drop-zone"></div>
                          <div className="fsp-drop-pane__icon"></div>
                          <div className="fsp-drop-pane__text">Add music</div>
                        </div>
                      </div>
                      <h4>My Uploads</h4>
                      {usermediaListEmpty ? (
                        <div className="emptyList">
                          You have no previous uploads
                        </div>
                      ) : (
                        <div className="listMedia">
                          {usermediaList.map((block, index) => {
                            let fileUrl = block.path
                              .replace(/\\/g, "/")
                              .substring("public".length);
                            let mediaurl = fileUrl.replace("sets/", "");
                            let updatedImage = mediaurl;
                            let mediaName = block.originalname.replace(
                              ".mp3",
                              ""
                            );
                            return (
                              <div className="listBox" key={index}>
                                <div className="radioSection">
                                  <input
                                    type="radio"
                                    name="music"
                                    onChange={setMusicFile}
                                    value={updatedImage}
                                  />
                                </div>
                                <button
                                  onClick={() => playAudio("audio-" + index)}
                                  className="mediaPlayback"
                                  type="button"
                                >
                                  <audio
                                    id={`audio-${index}`}
                                    src={apiPath + updatedImage}
                                  ></audio>
                                  <svg
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="__36674"
                                  >
                                    <path
                                      d={
                                        audioPlayId == "audio-" + index
                                          ? "M6 4h4v16H6V4zm8 0h4v16h-4V4z"
                                          : "M7 4v16l12-8z"
                                      }
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </button>
                                <div className="mediaName">{mediaName}</div>
                                {/* <div className="mediaDuration">4:51</div> */}
                                <div className="__366b7__Right"></div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="container">
          <div className="row modal-block">
            <div className="col-12 col-sm-6">
              <Button color="primary" onClick={savemedia}>
                Save
              </Button>
            </div>
            <div className="col-12 col-sm-6">
              <Button color="secondary" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
};
export default MediaUpload;
