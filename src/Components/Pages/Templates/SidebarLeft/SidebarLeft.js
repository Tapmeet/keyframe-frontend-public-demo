import React from "react";
import windowImage from "./../../../Assets/images/templates/window-of-four-rounded-squares.svg";
import style from "./../../../Assets/images/templates/color-picker.svg";
import edit from "./../../../Assets/images/templates/edit.svg";
import exportIcon from "./../../../Assets/images/templates/setting.png";
import mediaIcon from "./../../../Assets/images/templates/image.png";
import axios from "axios";
import { useRouteMatch, Link } from "react-router-dom";
import { apiPreviewVideo, apiMergeVideo } from "./../../../Utility/Utility";
import ReactTooltip from "react-tooltip";
const SidebarLeft = (props) => {
  const [addMusic, setAddMusic] = React.useState(props.addMusic);
  const [showMedia, setShowMedia] = React.useState(false);
  const [showglobal, setshowglobal] = React.useState(false);
  const match = useRouteMatch("/template/:templateId/:id/:sceneId");
  const {
    params: { templateId },
  } = match;
  React.useEffect(() => {
    setshowMedia();
    console.log("here");
  }, []);
  function addScene() {
    setShowMedia(false);
    props.showAddScene("true", props.scene);
    props.showMusic("false");
    setAddMusic(false);
    setShowMedia(false);
    props.showGlobal(false);
    setshowglobal(false);
  }
  function hideScene() {
    props.showAddScene(false, "");
    setAddMusic(false);
    props.showMusic(false);
    setShowMedia(false);
    props.showGlobal(false);
    setshowglobal(false);
  }
  function showMusic() {
    setShowMedia(false);
    props.showGlobal(false);
    setshowglobal(false);
    setAddMusic(true);
    props.showAddScene(false, "");
    props.showMusic(true);
  }
  function setshowMedia() {
    setShowMedia(!showMedia);
    props.showAddScene(false, "");
    props.showMusic(false);
    props.showBg(true, "", "data.type", false, "");
    props.showGlobal(false);
    setshowglobal(false);
  }
  function setshowGlobal() {
    setshowglobal(true);
    setShowMedia(false);
    props.showAddScene(false, "");
    props.showMusic(false);
    props.showBg(false, "", "data.type", false, "");
    props.showGlobal(true);
  }
  return (
    <section className="template-new-wrapper-sidebar">
      <nav>
        <ul>
          <li
            data-tip=""
            data-for="global"
            className={showglobal ? "active" : ""}
            data-tut="reactour__8"
          >
            <button onClick={() => setshowGlobal()}>
              <img src={exportIcon} alt="Export" />
              <span>Global Options</span>
              <ReactTooltip
                backgroundColor="#ee6352"
                place="top"
                effect="solid"
                id="global"
                multiline={true}
                offset={{ top: -20, right: 0 }}
              >
                Edit fonts <br />& colors
              </ReactTooltip>
            </button>
          </li>
          <li
            data-tip=""
            data-for="Media"
            className={showMedia ? "active" : ""}

          >
            <button onClick={() => setshowMedia(!showMedia)}>
              <img src={mediaIcon} alt="add" />
              <span>Media</span>
              <ReactTooltip
                backgroundColor="#ee6352"
                place="top"
                effect="solid"
                id="Media"
                offset={{ top: -20, right: 0 }}
              >
                Add media
              </ReactTooltip>
            </button>
          </li>
          <li
            data-tip=""
            data-for="Scene"
            className={props.addScene || props.addMedia ? "active" : ""}
            data-tut="reactour__6"
          >
            <button onClick={addScene}>
              <img src={windowImage} alt="add" />
              <span>Add</span>
              <ReactTooltip
                backgroundColor="#ee6352"
                place="top"
                effect="solid"
                id="Scene"
                offset={{ top: -20, right: 0 }}
              >
                Add Scene
              </ReactTooltip>
            </button>
          </li>
          <li data-tip="" data-for="Music" className={addMusic ? "active" : ""}   data-tut="reactour__7">
            <button onClick={showMusic}>
              {/* <img src={style} alt="Style" /> */}
              <svg
                width="25"
                height="25"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
              >
                <title>Music</title>
                <path d="M21.94 16.31V1.9L7 3.58l-.1 13.48a2.93 2.93 0 00-1.9-.72 3 3 0 00-1.57 5.55 3 3 0 001.57.45 3 3 0 002.78-1.88 3 3 0 00.14-2L8 9.3l13-1.73V15a2.83 2.83 0 00-.47-.29 3 3 0 101.41 4 3 3 0 000-2.4zM6.82 20.09A2 2 0 015 21.34a1.92 1.92 0 01-.74-.15A2 2 0 015 17.34a2 2 0 011.8 1.22 2 2 0 01.02 1.53zM8 8.29V4.48L20.94 3v3.57zm13 10a2 2 0 01-1.8 1.14 2 2 0 01-.86-.2 2 2 0 01.86-3.8 2 2 0 01.86.19 2 2 0 011 1.14A2 2 0 0121 18.3z"></path>
              </svg>
              <span>Music</span>
              <ReactTooltip
                backgroundColor="#ee6352"
                place="top"
                effect="solid"
                id="Music"
                offset={{ top: -20, right: 0 }}
              
              >
                Add Music
              </ReactTooltip>
            </button>
          </li>
          <li data-tip="" data-for="text" 
            className={
              props.addScene || props.addMedia || props.addMusic || showMedia
                ? ""
                : "active"
            }
            data-tut="reactour__9"
          >
            <button onClick={hideScene}>
              <img src={edit} alt="Edit" />
              <span>Edit</span>
              <ReactTooltip
                backgroundColor="#ee6352"
                place="top"
                effect="solid"
                id="text"
                multiline={true}
                offset={{ top: -20, right: 0 }}
              >
                Edit text
              </ReactTooltip>
            </button>
          </li>
          {/* <li>
            <button>
              <Link to={`/export-video/${templateId}/download/`}>
                <img src={exportIcon} alt="Export" />
                <span>Export</span>
              </Link>
            </button>
          </li> */}
        </ul>
      </nav>
    </section>
  );
};
export default SidebarLeft;
