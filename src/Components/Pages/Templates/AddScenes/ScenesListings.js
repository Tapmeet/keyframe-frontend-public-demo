/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
import React from "react";
import { useRouteMatch } from "react-router-dom";
import FilerobotImageEditor from "filerobot-image-editor";
import axios from "axios";
import backarrow from "../../../Assets/images/templates/back-arrow.svg";
import {
  apiGetCategoryScenes,
  apiPath,
  apiupdateAdminTemplate,
  apigetAdminTemplate,
} from "./../../../Utility/Utility";
import Loader from "./../../../Utility/Loader/Loader";

const ScenesListings = (props) => {
  const [media, setMedia] = React.useState("");
  const [data, setData] = React.useState([]);
  const [scenes, setScenes] = React.useState(false)
  const [templateScenes, setTemplateScenes] = React.useState([]);
  const [catid, setCatid] = React.useState(false)
  const match = useRouteMatch("/template/:templateId/:id/:sceneId");
  const [loader, setLoader] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const {
    params: { templateId },
  } = match;
  const [sceneOrder, setSceneOrder] = React.useState(props.sceneOrder);
  const setImage = (img) => {
    setMedia(img);
  };
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
  const onComplete = function (newUrl) {
    let fileUrl = newUrl.message.replace(/\\/g, "/").substring("public".length);
    let imageUrl = fileUrl.replace("sets/", "");
    let updatedImage = imageUrl;
  };
  const ImageEditor = new FilerobotImageEditor(config, onComplete);
  function filterBtnClick() {
    toggle(true);
  }
  function closeSection(media) {
    props.closeAddScene(false, media);
  }
  function addScene(data) {
    setLoader(true);
    axios
      .put(apiupdateAdminTemplate + templateId, {
        id: templateId,
        data: data,
      })
      .then((response) => {
        console.log(response);
        setSuccessMessage(response.data.message);
        setLoader(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
        setLoader(false);
      });
  }
  React.useEffect(() => {
    setLoader(true);
    axios
      .get(`${apiGetCategoryScenes}?categoryId=${props.categoryId}`, {})
      .then(function (response) {
        console.log(props.categoryId)
        setData(response.data.scenes);
        axios
          .get(
            `${apigetAdminTemplate}` + "?templateId=" + props.parenttemplateId,
            {}
          )
          .then(function (response2) {
            console.log(response2.data)
            var Templates = [];
            response.data.scenes.map((data, index) => {
              response2.data.data[0].templateScenes.map((templates, index2) => {
                if (templates.id == data._id) {
                  // console.log("herere")
                  Templates.push(data)
                  setTemplateScenes(Templates)
                }
                if (response2.data.data[0].templateScenes.length == index2 + 1) {
                  //  console.log(Templates)
                   setLoader(true);
                   setLoader(false);
                  setScenes(true)
                }
              });
            });
          });
      });

  }, [props.categoryId]);
  return (
    <div className="rightPanel addscenes">
      <Loader open={loader} />
      {scenes ? (
        <ul>
          {templateScenes.map((data, index) => {
            console.log(data._id)
            return (
              <li
                key={data._id}
                className={media == data.sceneThumbnail ? "active" : null}
              >
                <img src={apiPath + data.sceneThumbnail} alt="thumbnail" />
                <h4>{data.sceneTitle} </h4>
                <button onClick={() => addScene(data)}>Add Scene</button>
              </li>
            )
          })}
        </ul>
      ) : (
        !loader ?
          <div className="col-12">
            <div className="alert alert-primary"> No scenes available</div>
          </div>
          : null)}
    </div>
  );
};
export default ScenesListings;
