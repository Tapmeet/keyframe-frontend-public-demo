/* eslint-disable eqeqeq */
import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import Loader from "./../../../Utility/Loader/Loader";
import {
  apiUploadImage,
  apigetUploads,
  apiPath,
  apideleteMedia,
} from "./../../../Utility/Utility";
import FilerobotImageEditor from "filerobot-image-editor";
import img1 from "./../../../Assets/images/templates/img11.png";
import img2 from "./../../../Assets/images/templates/img12.png";
import img3 from "./../../../Assets/images/templates/img13.png";
import img4 from "./../../../Assets/images/templates/img14.png";
import backarrow from "./../../../Assets/images/templates/back-arrow.svg";
const AddMedia = (props) => {
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  const [userId, setUserId] = React.useState("");
  const [mediaId, setMediaId] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const [mediaList, setMediaList] = React.useState([]);
  const [mediaListEmpty, setMediaListEmpty] = React.useState(true);
  const [media, setMedia] = React.useState("");
  const [mediaType, setMediaType] = React.useState("");
  const setImage = (img, type, mediaId) => {
    setMedia(img);
    setMediaType(type);
    setMediaId(mediaId);
  };
  function getUploads() {
    setProcessing(true);
    axios
      .get(`${apigetUploads}` + "?userId=" + userId, {})
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
  function deleteMedia() {
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
        getUploads();
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
    if (userId) {
      getUploads();
    }
  }, [userId]);
  const [show, toggle] = React.useState(false);
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

  function filterBtnClick() {
    toggle(true);
  }
  function closeSection(media, mediatype) {
    props.closeAddMedia(false, media, mediaType);
  }

  function setformImage(e) {
    console.log(e.target.files.length);
    for (var i = 0; i < e.target.files.length; i++) {
      var parts = e.target.files[i].type.split("/");
      var result = parts[0];
      if (result == "image") {
        const data = new FormData();
        data.append("file", e.target.files[i]);
        data.append("userId", userId);
        setProcessing(true);
        axios
          .post(`${apiUploadImage}`, data)
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

    // var parts = e.target.files[0].type.split("/");
    // var result = parts[0];
    // if (e.target.files[0] != "") {
    //   const data = new FormData();
    //   data.append("file", e.target.files[0]);
    //   data.append("userId", userId);
    //   setProcessing(true);
    //   axios
    //     .post(`${apiUploadImage}`, data)
    //     .then((response) => {
    //       setProcessing(false);
    //       let fileUrl = response.data.message
    //         .replace(/\\/g, "/")
    //         .substring("public".length);
    //       let imageUrl = fileUrl.replace("sets/", "");
    //       let updatedImage = imageUrl;
    //       getUploads();
    //     })
    //     .catch((error) => {});
    // }
  }
  return (
    <section className="template-new-media d-flex">
      <Loader open={processing} />
      <div className="leftPanel">
        <ul>
          <li>
            <button className="btns">Images</button>
          </li>
          <li>
            <button className="btns">Videos</button>
          </li>
        </ul>
        {media ? (
          <ul>
            <li>
              <button className="btn" onClick={() => closeSection(media)}>
                Select Media
              </button>
            </li>
            <li>
              <button className="btn" onClick={deleteMedia}>
                Delete Media
              </button>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="rightPanel">
        <div className="button-section d-flex">
          <div>
            <h2>Media Library</h2>
            <button className="btn " onChange={(e) => setformImage(e)}>
              <input type="file" multiple /> Add Media
            </button>
          </div>
          <div onClick={() => closeSection(media)}>
            <img src={backarrow} alt="back" /> Back
          </div>
        </div>
        {mediaListEmpty ? (
          <div className="col-12">
            <div className="alert alert-primary">No Media Found</div>
          </div>
        ) : (
          <ul>
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
                  {block.mimetype == "image/jpeg" ||
                  block.mimetype == "image/png" ||
                  block.mimetype == "image/jpg" ||
                  block.mimetype == "image/svg" ? (
                    <img
                      src={apiPath + updatedImage}
                      alt="Thumbnail"
                      onClick={() => setImage(updatedImage, "image", block._id)}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
export default AddMedia;
