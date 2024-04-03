/* eslint-disable eqeqeq */
import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import SiteHeader from "../../../Header/HeaderUser";
import Footer from "../../../Footer";
import TopSection from "../../HomeV2/TopSection";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import trash from "./../../../Assets/images/templates/trash.svg";
import downloagimg from "./../../../Assets/images/templates/download.svg";
import {
  apigetVideos,
  apiPath,
  apideleteVideos,
} from "../../../Utility/Utility";
import Loader from "../../../Utility/Loader/Loader";
import download from "downloadjs";
const MyVideos = (props) => {
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [media, setMedia] = React.useState("");
  const [data, setData] = React.useState([]);
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  const [userId, setUserId] = React.useState("");
  const [loader, setLoader] = React.useState(true);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const { buttonLabel, className } = props;
  const [blockToDelete, setblockToDelete] = React.useState("");
  const [processing, setProcessing] = React.useState(true);
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
    if (userId) {
      axios
        .get(`${apigetVideos}?userId=${userId}`, {})
        .then(function (response) {
          setProcessing(false);
          console.log(response.data.data);
          setData(response.data.data);
        });
    }
  }, [userId]);
  function confirmDelete(id, media) {
    setModal(!modal);
    setblockToDelete(id);
    setMedia(media);
    // console.log(id);
  }
  function deleteBlock() {
    setModal(!modal);
    setProcessing(true);
    let blockId = blockToDelete;
    axios
      .delete(`${apideleteVideos}`, {
        params: {
          mediaId: blockId,
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
      });
  }
  function downloadVideo(videoUrl) {
    download(apiPath + videoUrl);
  }
  return (
    <section className="home-wrapper">
      <Loader open={processing} />
      <SiteHeader />
      <div className="inner-box-area ">
        <TopSection name="myvideos" />
        <div className=" container section my-template">
          {data != undefined && data.length > 0 ? (
            <div className="row">
              {data
                .sort((a, b) => a.order - b.order)
                .map((data, index) => {
                  return (
                    <div className="col-sm-4 col-12" key={index}>
                      <div key={data._id} className="box-template my-videos">
                        <video
                          className="video-container video-container-overlay"
                          controls={true}
                          loop=""
                          poster={apiPath + data.templateImage}
                        >
                          <source type="video/mp4" src={apiPath + data.path} />
                        </video>
                        <div className="d-flex">
                          <h4>{data.videoTitle} </h4>
                          <div className="icon">
                            <div
                              className="download-buton"
                              style={{ marginRight: '-10px' }}
                            //onClick={() => downloadVideo(data.path)}
                            >
                              <Link to={"/share/" + data._id}
                                className="download-buton"
                              >
                                <svg
                                  width="25"
                                  height="25"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                  role="img"
                                >
                                  <title>Share</title>
                                  <path d="M14.7 2a2.3 2.3 0 11-1.597 3.955l-5.63 3.379a2.297 2.297 0 01.047 1.36l5.577 3.347a2.3 2.3 0 11-.549.836L7.052 11.58a2.3 2.3 0 11-.106-3.096l5.605-3.362A2.3 2.3 0 0114.7 2zm0 12.39a1.3 1.3 0 100 2.6 1.3 1.3 0 000-2.6zm-9.4-5.6a1.3 1.3 0 100 2.6 1.3 1.3 0 000-2.6zM14.7 3a1.3 1.3 0 100 2.6 1.3 1.3 0 000-2.6z"></path>
                                </svg>
                              </Link>
                            </div>
                            <div
                              className="download-buton"
                              onClick={() => downloadVideo(data.path)}
                            >
                              <img src={downloagimg} alt="Download Section" />
                            </div>
                            <div className="delete-icon">
                              <img
                                src={trash}
                                alt="Delete Section"
                                onClick={() =>
                                  confirmDelete(data._id, data.path)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            !processing ?
              <div className="col-12">
                <div className="alert alert-primary"> No Videos in the List</div>
              </div>
              : null
          )}
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className + " modal-custom"}
      >
        <ModalHeader toggle={toggle}>Delete Video</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this video?</p>
        </ModalBody>
        <ModalFooter>
          <div className="container">
            <div className="row modal-block">
              <div className="col-12 col-sm-6">
                <Button color="primary" onClick={deleteBlock}>
                  confirm
                </Button>
              </div>
              <div className="col-12 col-sm-6">
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </section>
  );
};
export default MyVideos;
