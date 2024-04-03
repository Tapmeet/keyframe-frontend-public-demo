import React from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import SiteHeader from "../../../../Header/HeaderUser";
import Footer from "../../../../Footer";
import SidebarLeft from "../../SidebarLeft/SidebarLeft";
import TopSection from "../../TopSection/TopSection";
import TextEditor from "../../TextEditor/TextEditor";
import ChangeBg from "../../ChangeBg";
import SceneTwentyEight from "./Scene28";
import AddMedia from "../../AddMedia/AddMedia";
import AddScenes from "../../AddScenes/AddScenes";
import BottomSection from "../../BottomSection/BottomSection";
import AddMusic from "../../AddMusic/AddMusic";
import GlobalOptions from "../../GlobalOptions/GlobalOptions";
import {
  apigetAdminTemplate,
  apiUpdateBlock,
} from "../../../../Utility/Utility";
import Scene from "./../../../../Assets/images/templates/img11.png";
import Scene2 from "./../../../../Assets/images/templates/img12.png";
import Player from "../../Player";
const TemplateScene28 = (props) => {
  const [bottomData, setBottomData] = React.useState("");
  const [sceneOrder, setSceneOrder] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [blocks, setBlocks] = React.useState("");
  const match = useRouteMatch("/template/:templateId/28/:sceneId");
  const {
    params: { templateId },
  } = match;
  const {
    params: { sceneId },
  } = match;
  const [parenttemplateId, setParenttemplateId] = React.useState("");
  const [templateTitle, setTemplateTitle] = React.useState("");
  const [data, setData] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  const [textAligmnet, setTextAligmnet] = React.useState("text-center");
  const [bgType, setBgType] = React.useState("");
  const [bgScene, setBgScene] = React.useState("");
  const [textColor, setTextColor] = React.useState("#333");
  const [content, setContent] = React.useState("");
  const [textlineHeight, setTextlineHeight] = React.useState("1.4");
  const [textSize, setTextSize] = React.useState("18");
  const [textTransform, setTexttransform] = React.useState("");

  const [fontFamily, setFontFamily] = React.useState("");
  const [fontWeight, setFontWeight] = React.useState("");
  const [bottomsectionActive, setBottomsectionActive] = React.useState(false);
  const [changeBg, setChangeBg] = React.useState(false);
  const [addMedia, setAddMedia] = React.useState(false);
  const [addScene, setAddScene] = React.useState(false);
  const [addMusic, setAddMusic] = React.useState(false);
  const [container, setContainer] = React.useState("");
  const [showEditbutton, setShowEditbutton] = React.useState(false);
  const [playActive, setPlayActive] = React.useState(false);
  const [sceneThumbnail, setSceneThumbnail] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [showGlobal, setShowGlobal] = React.useState(false);
  // const [mediaArray, setMediaArray] = React.useState([
  //   {
  //     url: Scene,
  //     type:'image/png'
  //   },
  //   {
  //     url: Scene2,
  //     type:'image/png'
  //   },
  //   {
  //     url: Scene3,
  //     type:'image/png'
  //   },
  //   {
  //     url: Scene4,
  //     type:'image/png'
  //   }
  // ]);
  const [mediaArray, setMediaArray] = React.useState([]);
  const [transformX, setTransformX] = React.useState(0);
  const [transformY, setTransformY] = React.useState(0);
  const [width, setWidth] = React.useState(350);
  const [height, setHeight] = React.useState(100);
  const [undoData, setUndoData] = React.useState([]);
  const [redoData, setRedoData] = React.useState([]);
  const [upatedData, setUpatedData] = React.useState([]);
  const [time, setTime] = React.useState(6.5);

  function getTime(scenetime) {
    setTime(scenetime);
    setUndoData((prevState) => [...prevState, upatedData]);
    const data = {
      content: content,
      textAligmnet: textAligmnet,
      textColor: textColor,
      textlineHeight: textlineHeight,
      textSize: textSize,
      x: transformX,
      y: transformY,
      boxwidth: width,
      boxheight: height,
      textTransform: textTransform,
      media: mediaArray,
      time: scenetime,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
    };

    updateData(data);
  }
  function getFontfamily(fontfamily) {
    setUndoData((prevState) => [...prevState, upatedData]);
    setFontFamily(fontfamily);
    const data = {
      content: content,
      textAligmnet: textAligmnet,
      textColor: textColor,
      textlineHeight: textlineHeight,
      textSize: textSize,
      x: transformX,
      y: transformY,
      boxwidth: width,
      boxheight: height,
      textTransform: textTransform,
      media: mediaArray,
      time: time,
      fontFamily: fontfamily,
      fontWeight: fontWeight,
    };
    updateData(data);
  }
  function getFontWeight(fontweight) {
    setUndoData((prevState) => [...prevState, upatedData]);
    setFontWeight(fontweight);
    const data = {
      content: content,
      textAligmnet: textAligmnet,
      textColor: textColor,
      textlineHeight: textlineHeight,
      textSize: textSize,
      x: transformX,
      y: transformY,
      boxwidth: width,
      boxheight: height,
      textTransform: textTransform,
      media: mediaArray,
      time: time,
      fontFamily: fontFamily,
      fontWeight: fontweight,
    };
    updateData(data);
  }

  function getAlignment(alignment) {
    setUndoData((prevState) => [...prevState, upatedData]);
    setTextAligmnet(alignment);
    const data = {
      content: content,
      textAligmnet: alignment,
      textColor: textColor,
      textlineHeight: textlineHeight,
      textSize: textSize,
      x: transformX,
      y: transformY,
      boxwidth: width,
      boxheight: height,
      textTransform: textTransform,
      media: mediaArray,
      time: time,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
    };
    updateData(data);
  }
  function getContent(content) {
    setUndoData((prevState) => [...prevState, upatedData]);
    setContent(content);
    const data = {
      content: content,
      textAligmnet: textAligmnet,
      textColor: textColor,
      textlineHeight: textlineHeight,
      textSize: textSize,
      x: transformX,
      y: transformY,
      boxwidth: width,
      boxheight: height,
      textTransform: textTransform,
      media: mediaArray,
      time: time,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
    };
    updateData(data, true);
  }
  function getTextTransform(texttransform) {
    setUndoData((prevState) => [...prevState, upatedData]);
    // console.log(texttransform);
    setTexttransform(texttransform);
    const data = {
      content: content,
      textAligmnet: textAligmnet,
      textColor: textColor,
      textlineHeight: textlineHeight,
      textSize: textSize,
      x: transformX,
      y: transformY,
      boxwidth: width,
      boxheight: height,
      textTransform: texttransform,
      media: mediaArray,
      time: time,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
    };
    updateData(data);
  }
  function getTextColor(color) {
    setUndoData((prevState) => [...prevState, upatedData]);
    setTextColor(color);
    const data = {
      content: content,
      textAligmnet: textAligmnet,
      textColor: color,
      textlineHeight: textlineHeight,
      textSize: textSize,
      x: transformX,
      y: transformY,
      boxwidth: width,
      boxheight: height,
      textTransform: textTransform,
      media: mediaArray,
      time: time,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
    };
    updateData(data);
  }
  function getTextlineHeight(lineHeight) {
    setUndoData((prevState) => [...prevState, upatedData]);
    setTextlineHeight(lineHeight);
    const data = {
      content: content,
      textAligmnet: textAligmnet,
      textColor: textColor,
      textlineHeight: lineHeight,
      textSize: textSize,
      x: transformX,
      y: transformY,
      boxwidth: width,
      boxheight: height,
      textTransform: textTransform,
      media: mediaArray,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      time: time,
    };
    updateData(data);
  }
  function getTextSize(size) {
    setUndoData((prevState) => [...prevState, upatedData]);
    setTextSize(size);
    const data = {
      content: content,
      textAligmnet: textAligmnet,
      textColor: textColor,
      textlineHeight: textlineHeight,
      textSize: size,
      x: transformX,
      y: transformY,
      boxwidth: width,
      boxheight: height,
      textTransform: textTransform,
      media: mediaArray,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      time: time,
    };
    updateData(data);
  }
  function showBg(changeBg, type, scene, titleColor, container) {
    setChangeBg(changeBg);
    setBgType(type);
    setBgScene(scene);
    setContainer(container);
    setShowGlobal(false);
  }
  function showAddMedia(media, mediaFile) {
    setAddMedia(media);
    setAddMusic(false);
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
        content: content,
        textAligmnet: textAligmnet,
        textColor: textColor,
        textlineHeight: textlineHeight,
        textSize: textSize,
        x: transformX,
        y: transformY,
        boxwidth: width,
        boxheight: height,
        textTransform: textTransform,
        media: newArr,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        time: time,
      };
      updateData(data);
    }
    setAddMedia(media);
  }
  function dropMedia(media, mediaFile, mediaType, index) {
    if (mediaFile) {
      setUndoData((prevState) => [...prevState, upatedData]);
      setBgType(mediaType);
      setBgScene(mediaFile);
      let newArr = [...mediaArray]; // copying the old datas array
      newArr[index] = {
        type: mediaType,
        url: mediaFile,
      };
      setMediaArray(newArr);
      const data = {
        content: content,
        textAligmnet: textAligmnet,
        textColor: textColor,
        textlineHeight: textlineHeight,
        textSize: textSize,
        x: transformX,
        y: transformY,
        boxwidth: width,
        boxheight: height,
        textTransform: textTransform,
        media: newArr,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        time: time,
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
  function showMusic(media) {
    setAddMusic(media);
    setAddMedia(false);
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
  function getData(check) {
    axios
      .get(`${apigetAdminTemplate}` + "?templateId=" + templateId, {})
      .then(function (response) {
        if (response.data.data.length > 0) {
          if (typeof response.data.data[0] !== undefined) {
            if (check != true) {
              setParenttemplateId(response.data.data[0].templateId);
              setTemplateTitle(response.data.data[0].title);
              setBottomsectionActive(false);
              setBottomData(response.data.data[0]);
              setBottomsectionActive(true);
              setSceneThumbnail(response.data.data[0].templateImage);
              setSelectedCategory(response.data.data[0].templateCategory);
              setSceneOrder(response.data.data[0].sceneOrder);
              if (response.data.data[0].blocks.length > 0) {
                setBlocks(response.data.data[0].blocks);
                response.data.data[0].blocks.map((block) => {
                  if (block.sceneId == 28) {
                    setUpatedData(block.sceneData);
                    setMediaArray(block.sceneData.media);
                    setTextSize(block.sceneData.textSize);
                    setTextlineHeight(block.sceneData.textlineHeight);
                    setTextColor(block.sceneData.textColor);
                    setTexttransform(block.sceneData.textTransform);
                    setTextAligmnet(block.sceneData.textAligmnet);
                    setTransformX(block.sceneData.x);
                    setTransformY(block.sceneData.y);
                    setWidth(block.sceneData.boxwidth);
                    setHeight(block.sceneData.boxheight);
                    setContent(block.sceneData.content);
                    setFontWeight(block.sceneData.fontWeight);
                    setFontFamily(block.sceneData.fontFamily);
                    setData(block.sceneData);
                    setTime(block.sceneData.time)
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
  React.useEffect(() => {
    const tokens = localStorage.getItem('token');
    // if (cookies.get("token")) {
    if (tokens != null) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(tokens);
      //setUserId(decoded.id);
      setUserId(decoded.id);
      getData();
    }
  }, [userId]);

  function updateData(data, norefresh) {
    setUpatedData(data);
    setData(data);
    axios
      .put(`${apiUpdateBlock}/${sceneId}`, {
        id: sceneId,
        sceneData: data,
      })
      .then(function (response) {
        console.log(response);
        if (!norefresh) {
          reFetchData(true);
        }
      });
  }

  function getTextAreaData(obj) {
    setUndoData((prevState) => [...prevState, upatedData]);
    const data = {
      content: content,
      textAligmnet: textAligmnet,
      textColor: textColor,
      textlineHeight: textlineHeight,
      textSize: textSize,
      x: obj.x,
      y: obj.y,
      boxwidth: obj.boxwidth,
      boxheight: obj.boxheight,
      textTransform: textTransform,
      media: mediaArray,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      time: time,
    };
    setTransformX(obj.x);
    setTransformY(obj.y);
    setWidth(obj.boxwidth);
    setHeight(obj.boxheight);
    updateData(data);
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
    }, 800);
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
    setTimeout(function () {
      getData();
    }, 800);
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
              sceneOrder={sceneOrder}
              closeAddScene={closeAddScene}
            />
          ) : addMusic ? (
            <AddMusic reFetchData={reFetchData} showMusic={showMusic} />
          ) : data != "" ? (
            playActive ? (
              <Player blocks={blocks} />
            ) : (
              <SceneTwentyEight
                setColor={textColor}
                setAlignment={textAligmnet}
                setTextTransform={textTransform}
                setTextLineHeight={textlineHeight}
                settextSize={textSize}
                showBg={showBg}
                changeBg={changeBg}
                bgType={bgType}
                bgScene={bgScene}
                container={container}
                mediaArray={mediaArray}
                data={data}
                getTextAreaData={getTextAreaData}
                getContent={getContent}
                dropMedia={dropMedia}
                content={content}
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
                id={28}
                thumbnails={sceneThumbnail}
                category={selectedCategory}
                template={true}
                templateId={templateId}
                getFontfamily={getFontfamily}
                getFontWeight={getFontWeight}
                fontFamily={fontFamily}
                fontWeight={fontWeight}
                textColor={textColor}
                getTime={getTime}
                time={time}
                mintime="6.5"
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
            />
          ) : null}
        </div>
      </section>
    </section>
  );
};
export default TemplateScene28;
