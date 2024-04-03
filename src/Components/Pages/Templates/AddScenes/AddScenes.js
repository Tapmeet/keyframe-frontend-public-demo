/* eslint-disable eqeqeq */
import React from "react";
import FilerobotImageEditor from "filerobot-image-editor";
import axios from "axios";
// import img1 from "../../../../assets/images/templates/img11.png";
// import img2 from "../../../../assets/images/templates/img12.png";
// import img3 from "../../../../assets/images/templates/img13.png";
// import img4 from "../../../../assets/images/templates/img14.png";
import backarrow from "../../../Assets/images/templates/back-arrow.svg";
import { apiGetSceneCategories, apiPath } from "./../../../Utility/Utility";
import ScenesListings from "./ScenesListings";
const AddScene = (props) => {
  const [media, setMedia] = React.useState("");
  const [data, setData] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [showScenes, setShowScenes] = React.useState(false);
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
  React.useEffect(() => {
    axios.get(`${apiGetSceneCategories}`, {}).then(function (response) {
      console.log(response.data.scenes);
      setData(response.data.scenes);
      console.log(response.data.scenes[0]._id)
      //setSelectedCategory(response.data.scenes[0]._id);
      setCategory(response.data.scenes[0]._id)
    });
  }, []);
  function setCategory(categoryId) {
    setShowScenes(true);
    setSelectedCategory(categoryId);
  }
  return (
    <section className="template-new-media d-flex">
      <div className="rightPanel addscenes col-12">
        <div className="button-section d-flex">
          <div>
            <h2>Media Scenes</h2>
          </div>
          <div onClick={() => closeSection(media)}>
            <img src={backarrow} alt="back" /> Back
          </div>
        </div>
        {showScenes ? (
         <ScenesListings categoryId={selectedCategory} parenttemplateId={props.parenttemplateId} sceneOrder={props.sceneOrder}/>
        ) : (
          <ul>
            {data.map((data, index) => {
              return (
                <li
                  key={data._id}
                  className={media == data.categoryImage ? "active" : null}
                  onClick={() => setCategory(data._id)}
                >
                  <img src={apiPath + data.categoryImage} alt="thumbnail" />
                  <h4>
                    {data.title} 
                  </h4>
                  <button>View Scenes</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
export default AddScene;
