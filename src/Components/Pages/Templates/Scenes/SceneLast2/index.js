import React from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import SiteHeader from "../../../../Header/HeaderUser";
import SidebarLeft from "../../SidebarLeft/SidebarLeft";
import TextEditor from "../../TextEditor/TextEditor";
import ChangeBg from "../../ChangeBg";
import SceneLast2 from "./SceneLast2";
import AddMedia from "../../AddMedia/AddMedia";
import AddScenes from "../../AddScenes/AddScenes";
import TopSection from "../../TopSection/TopSection";
import BottomSection from "../../BottomSection/BottomSection";
import GlobalOptions from "./../../GlobalOptions/GlobalOptions";
// import userImg from "../../../../../assets/images/User/Template/user.png";
// import LogoImg from "../../../../../assets/images/User/Template/Resizer.webp";
import {
  apigetAdminTemplate,
  apiUpdatLastScene,
  apiUpdateScene,
  apiGetLastScene,
  apiUpdateBlock
} from "./../../../../Utility/Utility";
import Player from "../../Player";
import AddMusic from "./../../AddMusic/AddMusic";
const TemplateSceneLast2 = (props) => {
  const [sceneOrder, setSceneOrder] = React.useState("");
  const [parenttemplateId, setParenttemplateId] = React.useState("");
  const [bottomData, setBottomData] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const match = useRouteMatch("/template/:templateId/last2/:sceneId");
  const {
    params: { templateId },
  } = match;
  const {
    params: { sceneId },
  } = match;
  const [templateTitle, setTemplateTitle] = React.useState("");
  const [data, setData] = React.useState("");
  const [blocks, setBlocks] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  // const [textAligmnet, setTextAligmnet] = React.useState("text-center");
  const [bgType, setBgType] = React.useState("");
  const [bgScene, setBgScene] = React.useState("");
  const [textColor, setTextColor] = React.useState("");
  const [content, setContent] = React.useState("");
  const [textlineHeight, setTextlineHeight] = React.useState("1.4");
  const [textSize, setTextSize] = React.useState("");
  // const [textTransform, setTexttransform] = React.useState("");
  const [changeBg, setChangeBg] = React.useState(false);
  const [addMedia, setAddMedia] = React.useState(false);
  const [addScene, setAddScene] = React.useState(false);
  const [addMusic, setAddMusic] = React.useState(false);
  const [container, setContainer] = React.useState("");
  const [arrayIndex, setArrayIndex] = React.useState(0);
  const [showEditbutton, setShowEditbutton] = React.useState(false);
  const [playActive, setPlayActive] = React.useState(false);
  const [sceneThumbnail, setSceneThumbnail] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [bottomsectionActive, setBottomsectionActive] = React.useState(false);
  const [fontFamily, setFontFamily] = React.useState("");
  const [fontWeight, setFontWeight] = React.useState("");
  const [showGlobal, setShowGlobal] = React.useState(false);
  const [undoData, setUndoData] = React.useState([]);
  const [redoData, setRedoData] = React.useState([]);
  const [upatedData, setUpatedData] = React.useState([]);
  // const [mediaArray, setMediaArray] = React.useState([
  //   {
  //     url: userImg,
  //     type: "image/png",
  //   },
  //   {
  //     url: LogoImg,
  //     type: "image/png",
  //   },
  // ]);
  // const [textArray, setTextArray] = React.useState([
  //   {
  //     text: "Devon Carrick",
  //     fontSize: "35",
  //     fontFamily: "",
  //     fontWeight: "600",
  //     fontLineHeight: "1.4",
  //     fontAlignment: "text-left",
  //     fontColor: "#333",
  //     fontCapitalize: "",
  //   },
  //   {
  //     text: "devon-carrick.kw.com",
  //     fontSize: "22",
  //     fontFamily: "",
  //     fontWeight: "500",
  //     fontLineHeight: "1.4",
  //     fontAlignment: "text-left",
  //     fontColor: "#333",
  //     fontCapitalize: "",
  //   },
  //   {
  //     text: "devoncarrick@kw.com",
  //     fontSize: "22",
  //     fontFamily: "",
  //     fontWeight: "500",
  //     fontLineHeight: "1.4",
  //     fontAlignment: "text-left",
  //     fontColor: "#333",
  //     fontCapitalize: "",
  //   },
  //   {
  //     text: "99-628-32220",
  //     fontSize: "22",
  //     fontFamily: "",
  //     fontWeight: "500",
  //     fontLineHeight: "1.4",
  //     fontAlignment: "text-left",
  //     fontColor: "#333",
  //     fontCapitalize: "",
  //   },
  // ]);
  const [mediaArray, setMediaArray] = React.useState([]);
  const [textArray, setTextArray] = React.useState([]);

  function getFontfamily(fontfamily) {
    setUndoData((prevState) => [...prevState, upatedData]);
    let newArr = [...textArray]; // copying the old datas array
    newArr[arrayIndex] = {
      text: newArr[arrayIndex].text,
      fontSize: newArr[arrayIndex].fontSize,
      fontFamily: fontfamily,
      fontWeight: newArr[arrayIndex].fontWeight,
      fontLineHeight: newArr[arrayIndex].fontLineHeight,
      fontAlignment: newArr[arrayIndex].fontAlignment,
      fontColor: newArr[arrayIndex].fontColor,
      fontCapitalize: newArr[arrayIndex].texttransform,
      x: newArr[arrayIndex].x,
      y: newArr[arrayIndex].y,
      boxWidth: newArr[arrayIndex].boxWidth,
      boxHeight: newArr[arrayIndex].boxHeight,
    };
    setTextArray(newArr);
    const data = {
      media: mediaArray,
      time: 4,
      textArray: newArr,
    };
    updateData(data);
  }
  function getFontWeight(fontweight) {
    setUndoData((prevState) => [...prevState, upatedData]);
    let newArr = [...textArray]; // copying the old datas array
    newArr[arrayIndex] = {
      text: newArr[arrayIndex].text,
      fontSize: newArr[arrayIndex].fontSize,
      fontFamily: newArr[arrayIndex].fontFamily,
      fontWeight: fontweight,
      fontLineHeight: newArr[arrayIndex].fontLineHeight,
      fontAlignment: newArr[arrayIndex].fontAlignment,
      fontColor: newArr[arrayIndex].fontColor,
      fontCapitalize: newArr[arrayIndex].texttransform,
      x: newArr[arrayIndex].x,
      y: newArr[arrayIndex].y,
      boxWidth: newArr[arrayIndex].boxWidth,
      boxHeight: newArr[arrayIndex].boxHeight,
    };
    setTextArray(newArr);
    const data = {
      media: mediaArray,
      time: 4,
      textArray: newArr,
    };
    updateData(data);
  }

  function getAlignment(alignment) {
    setUndoData((prevState) => [...prevState, upatedData]);
    let newArr = [...textArray]; // copying the old datas array
    newArr[arrayIndex] = {
      text: newArr[arrayIndex].text,
      fontSize: newArr[arrayIndex].fontSize,
      fontFamily: newArr[arrayIndex].fontFamily,
      fontWeight: newArr[arrayIndex].fontWeight,
      fontLineHeight: newArr[arrayIndex].fontLineHeight,
      fontAlignment: alignment,
      fontColor: newArr[arrayIndex].fontColor,
      fontCapitalize: newArr[arrayIndex].texttransform,
      x: newArr[arrayIndex].x,
      y: newArr[arrayIndex].y,
      boxWidth: newArr[arrayIndex].boxWidth,
      boxHeight: newArr[arrayIndex].boxHeight,
    };
    setTextArray(newArr);
    const data = {
      media: mediaArray,
      time: 4,
      textArray: newArr,
    };
    updateData(data);
  }

  function getTextTransform(texttransform) {
    setUndoData((prevState) => [...prevState, upatedData]);
    let newArr = [...textArray]; // copying the old datas array
    newArr[arrayIndex] = {
      text: newArr[arrayIndex].text,
      fontSize: newArr[arrayIndex].fontSize,
      fontFamily: newArr[arrayIndex].fontFamily,
      fontWeight: newArr[arrayIndex].fontWeight,
      fontLineHeight: newArr[arrayIndex].fontLineHeight,
      fontAlignment: newArr[arrayIndex].fontAlignment,
      fontColor: newArr[arrayIndex].fontColor,
      fontCapitalize: texttransform,
      x: newArr[arrayIndex].x,
      y: newArr[arrayIndex].y,
      boxWidth: newArr[arrayIndex].boxWidth,
      boxHeight: newArr[arrayIndex].boxHeight,
    };
    setTextArray(newArr);
    const data = {
      media: mediaArray,
      time: 4,
      textArray: newArr,
    };
    updateData(data);
  }
  function getTextColor(color) {
    setUndoData((prevState) => [...prevState, upatedData]);
    let newArr = [...textArray]; // copying the old datas array
    newArr[arrayIndex] = {
      text: newArr[arrayIndex].text,
      fontSize: newArr[arrayIndex].fontSize,
      fontFamily: newArr[arrayIndex].fontFamily,
      fontWeight: newArr[arrayIndex].fontWeight,
      fontLineHeight: newArr[arrayIndex].fontLineHeight,
      fontAlignment: newArr[arrayIndex].fontAlignment,
      fontColor: color,
      fontCapitalize: newArr[arrayIndex].fontCapitalize,
      x: newArr[arrayIndex].x,
      y: newArr[arrayIndex].y,
      boxWidth: newArr[arrayIndex].boxWidth,
      boxHeight: newArr[arrayIndex].boxHeight,
    };
    setTextArray(newArr);
    const data = {
      media: mediaArray,
      time: 4,
      textArray: newArr,
    };
    updateData(data);
  }
  function getTextlineHeight(lineHeight) {
    setUndoData((prevState) => [...prevState, upatedData]);
    setTextlineHeight(lineHeight);
    let newArr = [...textArray]; // copying the old datas array
    newArr[arrayIndex] = {
      text: newArr[arrayIndex].text,
      fontSize: newArr[arrayIndex].fontSize,
      fontFamily: newArr[arrayIndex].fontFamily,
      fontWeight: newArr[arrayIndex].fontWeight,
      fontLineHeight: lineHeight,
      fontAlignment: newArr[arrayIndex].fontAlignment,
      fontColor: newArr[arrayIndex].fontColor,
      fontCapitalize: newArr[arrayIndex].fontCapitalize,
      x: newArr[arrayIndex].x,
      y: newArr[arrayIndex].y,
      boxWidth: newArr[arrayIndex].boxWidth,
      boxHeight: newArr[arrayIndex].boxHeight,
    };
    setTextArray(newArr);
    const data = {
      media: mediaArray,
      time: 4,
      textArray: newArr,
    };
    updateData(data);
  }
  function getTextSize(size) {
    setUndoData((prevState) => [...prevState, upatedData]);
    setTextSize(size);
    console.log(arrayIndex);
    let newArr = [...textArray]; // copying the old datas array
    newArr[arrayIndex] = {
      text: newArr[arrayIndex].text,
      fontSize: size,
      fontFamily: newArr[arrayIndex].fontFamily,
      fontWeight: newArr[arrayIndex].fontWeight,
      fontLineHeight: newArr[arrayIndex].fontLineHeight,
      fontAlignment: newArr[arrayIndex].fontAlignment,
      fontColor: newArr[arrayIndex].fontColor,
      fontCapitalize: newArr[arrayIndex].fontCapitalize,
      x: newArr[arrayIndex].x,
      y: newArr[arrayIndex].y,
      boxWidth: newArr[arrayIndex].boxWidth,
      boxHeight: newArr[arrayIndex].boxHeight,
    };
    setTextArray(newArr);
    //console.log(newArr)
    const data = {
      media: mediaArray,
      time: 4,
      textArray: newArr,
    };
    updateData(data);
  }
  function showBg(changeBg, type, scene, titleColor, container, index) {

    setChangeBg(changeBg);
    setBgType(type);
    setBgScene(scene);
    setShowGlobal(false);
    setContainer(container);
  }
  function setActiveFontFamily(index) {
    setChangeBg(false);
    setShowGlobal(false);
    setArrayIndex(index);
    setTextSize(textArray[index].fontSize);
    setFontWeight(textArray[index].fontWeight);
    setFontFamily(textArray[index].fontFamily);
    setTextColor(textArray[index].fontColor)
  }
  function showAddMedia(media, mediaFile) {
    setAddMedia(media);
    setAddMusic(false);
    setShowGlobal(false);
  }
  function showMusic(media) {
    setAddMusic(media);
    setAddMedia(false);
    setShowGlobal(false);
  }
  function closeAddMedia(media, mediaFile, mediaType) {
    if (mediaFile) {
      setUndoData((prevState) => [...prevState, upatedData]);
      setBgType(mediaType);
      setBgScene(mediaFile);
      let newArr = [...mediaArray]; // copying the old datas array
      newArr[container] = {
        type: mediaType,
        url: mediaFile,
      };
      setMediaArray(newArr);
      const data = {
        media: newArr,
        time: 4,
        textArray: textArray,
      };
      updateData(data);
    }
    setAddMedia(media);
  }
  function dropMedia(media, mediaFile, mediaType, index, newArr) {
    if (mediaFile) {
      setUndoData((prevState) => [...prevState, upatedData]);
      setBgType(mediaType);
      setBgScene(mediaFile);
      // let newArr = [...mediaArray]; // copying the old datas array
      // newArr[container] = {
      //   type: mediaType,
      //   url: mediaFile,
      // };
      setMediaArray(newArr);
      const data = {
        media: newArr,
        time: 4,
        textArray: textArray,
      };
      updateData(data);
    }
    setAddMedia(media);
  }
  function showAddScene(mediaactive, scene) {
    setAddScene(mediaactive);
    setAddMusic(false);
    setShowGlobal(false);
  }
  function closeAddScene(media) {
    setAddScene(media);
    setShowEditbutton(false);
    setShowGlobal(false);
  }
  function showglobal(global) {
    setShowGlobal(global);
    setAddMusic(false);
    setAddMedia(false);
  }
  function getContent(content) {
    setUndoData((prevState) => [...prevState, upatedData]);
    setTextArray(content);
    const data = {
      textArray: content,
      time: 4,
      media: mediaArray,
    };
    updateData(data);
  }
  function updateData(data, norefresh) {
    setData(data);
    setUpatedData(data);
    axios
      .put(`${apiUpdateBlock}/${sceneId}`, {
        id: sceneId,
        sceneData: data,
      })
      .then(function (response) {
        // getData();
        console.log(response);
        reFetchData(true)
      });
  }

  React.useEffect(() => {
    const tokens = localStorage.getItem('token');
    // if (cookies.get("token")) {
    if (tokens != null) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      setUserId(decoded.id);
      //console.log(decoded.id)
      getData();
    }
    // console.log(textSize);
  }, [userId]);

  function getData(check) {
    axios
      .get(`${apigetAdminTemplate}` + "?templateId=" + templateId, {})
      .then(function (response) {
        if (response.data.data.length > 0) {
          setBlocks(response.data.data[0].blocks);
          if (typeof response.data.data[0] !== undefined) {
            if (check != true) {
              setParenttemplateId(response.data.data[0].templateId);
              setTemplateTitle(response.data.data[0].title);
              setBottomsectionActive(false);
              setBottomData(response.data.data[0]);
              setBottomsectionActive(true);
              setSceneOrder(response.data.data[0].sceneOrder);
              setSceneThumbnail(response.data.data[0].templateImage);
              setSelectedCategory(response.data.data[0].templateCategory);
              if (response.data.data[0].blocks.length > 0) {
                //setBlocks(response.data.data[0].blocks);
                response.data.data[0].blocks.map((block) => {
                  console.log(block)
                  if (block.sceneId == 'last2') {
                    setUpatedData(block.sceneData);
                    console.log(block.sceneData);
                    setMediaArray(block.sceneData.media);
                    setTextArray(block.sceneData.textArray);
                    if (arrayIndex == 0) {
                      setTextSize(block.sceneData.textArray[0].fontSize);
                      setFontFamily(block.sceneData.textArray[0].fontFamily);
                      setFontWeight(block.sceneData.textArray[0].fontWeight);
                      setTextColor(block.sceneData.textArray[0].fontColor);
                    } else {
                      setTextSize(
                        block.sceneData.textArray[1].fontSize
                      );
                      setFontFamily(
                        block.sceneData.textArray[1].fontFamily
                      );
                      setFontWeight(
                        block.sceneData.textArray[1].fontWeight
                      );
                      setTextColor(
                        block.sceneData.textArray[1].fontColor
                      );
                    }
                    setData(block.sceneData);
                  }
                });
              }
            } else {
              setBottomsectionActive(false);
              setBottomData(response.data.data[0]);
              //console.log(response.data.data[0]);
              setBottomsectionActive(true);
            }
          }
        }
      });
  }
  function playVideo(click) {
    setPlayActive(click);
  }
  function reFetchData() {
    getData();
  }
  function undodata() {
    let productindex = parseInt(undoData.length) - 1;
    //console.log(undoData);
    let data = undoData[productindex];
    setRedoData((prevState) => [...prevState, upatedData]);
    updateData(data);
    let popped = undoData;
    let newRetails = popped.filter(function (item, index) {
      return index != productindex;
    });
    // updateData(popped)
    console.log(newRetails);
    // setUndoData([popped]);
    setUndoData(newRetails);
    setTimeout(function () {
      getData();
    }, 1000);
  }
  function redodata() {
    let popped = redoData;
    let productindex = parseInt(redoData.length) - 1;
    setUndoData((prevState) => [...prevState, upatedData]);
    updateData(redoData[productindex]);
    let newRetails = popped.filter(function (item, index) {
      return index != productindex;
    });
    setRedoData(newRetails);
    getData();
  }
  return (
    <section className="home-wrapper">
      <SiteHeader fontFamily={fontFamily} />
      <section className="template-new-wrapper">
        {templateTitle ? (
          <TopSection
            templateTitle={templateTitle}
            template={true}
            templateId={templateId}
            undoData={undoData}
            redoData={redoData}
            undodata={undodata}
            redodata={redodata}
          />
        ) : null}
        <div className="d-flex justify-content-between outervh">
          <SidebarLeft
            showAddScene={showAddScene}
            addScene={addScene}
            addMedia={addMedia}
            showMusic={showMusic}
            addMusic={addMusic}
            showBg={showBg}
            showGlobal={showglobal}
          />
          {addMedia ? (
            <AddMedia closeAddMedia={closeAddMedia} />
          ) : addScene ? (
            <AddScenes
              parenttemplateId={parenttemplateId}
              closeAddScene={closeAddScene}
              sceneOrder={sceneOrder}
            />
          ) : addMusic ? (
            <AddMusic
              reFetchData={reFetchData}
              showMusic={showMusic}
              closeAddScene={closeAddScene}
            />
          ) : textArray != "" ? (
            playActive ? (
              <Player blocks={blocks} />
            ) : (
              <SceneLast2
                showBg={showBg}
                setActiveFontFamily={setActiveFontFamily}
                changeBg={changeBg}
                container={container}
                mediaArray={mediaArray}
                textArray={textArray}
                settextArray={textArray}
                data={data}
                getContent={getContent}
                textSize={textSize}
                dropMedia={dropMedia}
              />
            )
          ) : null}

          {addMedia ? null : addScene ? null : addMusic ? null : showGlobal ? null : changeBg ===
            false ? (
            data != "" ? (
              <TextEditor
                getTextTransform={getTextTransform}
                getAlignment={getAlignment}
                getTextColor={getTextColor}
                getTextlineHeight={getTextlineHeight}
                getTextSize={getTextSize}
                textSize={textSize}
                textlineHeight={textlineHeight}
                id={4}
                thumbnails={sceneThumbnail}
                category={selectedCategory}
                template={true}
                templateId={templateId}
                getFontfamily={getFontfamily}
                getFontWeight={getFontWeight}
                fontFamily={fontFamily}
                fontWeight={fontWeight}
                textColor={textColor}
              />
            ) : null
          ) : (
            <ChangeBg
              showAddMedia={showAddMedia}
              type={bgType}
              scene={bgScene}
            />
          )}
          {showGlobal && !changeBg && !addMedia && !addScene && !addMusic ? (
            data != "" ? (
              <GlobalOptions
                bottomData={bottomData}
                templateId={templateId}
                reFetchData={reFetchData}
              />
            ) : null
          ) : null}
        </div>
        <div className="template-bottom ">
          {bottomsectionActive ? (
            <BottomSection
              showEditbutton={showEditbutton}
              showAddScene={showAddScene}
              playVideo={playVideo}
              bottomData={bottomData}
              reFetchData={reFetchData}
              lastsceneExclude={1}
            />
          ) : null}
        </div>
      </section>
    </section>
  );
};
export default TemplateSceneLast2;
