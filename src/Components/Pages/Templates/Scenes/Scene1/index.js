/* eslint-disable eqeqeq */
import React from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import SiteHeader from "../../../../Header/HeaderUser";
import Footer from "../../../../Footer";
import SidebarLeft from "./../../SidebarLeft/SidebarLeft";
import TopSection from "./../../TopSection/TopSection";
import TextEditor from "./../../TextEditor/TextEditor";
import GlobalOptions from "./../../GlobalOptions/GlobalOptions";
import ChangeBg from "./../../ChangeBg";
import Scene1 from "./Scene1";
import AddMedia from "./../../AddMedia/AddMedia";
import AddScenes from "./../../AddScenes/AddScenes";
import BottomSection from "./../../BottomSection/BottomSection";
import AddMusic from "./../../AddMusic/AddMusic";
import Loader from "./../../../../Utility/Loader/Loader";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import steps from "./../../Guide/steps"
import Tour from "reactour";
import {
  apigetAdminTemplate,
  apiUpdateBlock,
} from "./../../../../Utility/Utility";
import Player from "../../Player";

const TemplateNew1 = (props) => {
  const disableBody = target => disableBodyScroll(target);
  const enableBody = target => enableBodyScroll(target);
  const [userId, setUserId] = React.useState("");
  const match = useRouteMatch("/template/:templateId/1/:sceneId");
  const {
    params: { templateId },
  } = match;
  const {
    params: { sceneId },
  } = match;
  const [isTourOpen, setIsTourOpen] = React.useState(false);
  const [isShowingMore, setIsShowingMore] = React.useState(false);

  const [templateTitle, setTemplateTitle] = React.useState("");
  const [parenttemplateId, setParenttemplateId] = React.useState("");
  const [data, setData] = React.useState("");
  const [blocks, setBlocks] = React.useState("");
  const [bottomData, setBottomData] = React.useState("");
  const [sceneOrder, setSceneOrder] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const [bottomsectionActive, setBottomsectionActive] = React.useState(false);
  const cookies = new Cookies();
  const [textAligmnet, setTextAligmnet] = React.useState("text-center");
  const [processing, setProcessing] = React.useState(true);
  const [bgType, setBgType] = React.useState("");
  const [sceneThumbnail, setSceneThumbnail] = React.useState("");
  const [bgScene, setBgScene] = React.useState("");
  const [textColor, setTextColor] = React.useState("#333");
  const [content, setContent] = React.useState("");
  const [textlineHeight, setTextlineHeight] = React.useState("1.4");
  const [textSize, setTextSize] = React.useState("18");
  const [textTransform, setTexttransform] = React.useState("");
  const [changeBg, setChangeBg] = React.useState(false);
  const [addMedia, setAddMedia] = React.useState(false);
  const [addScene, setAddScene] = React.useState(false);
  const [addMusic, setAddMusic] = React.useState(false);
  const [container, setContainer] = React.useState("");
  const [showEditbutton, setShowEditbutton] = React.useState(false);
  const [showGlobal, setShowGlobal] = React.useState(false);
  const [playActive, setPlayActive] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [mediaArray, setMediaArray] = React.useState([]);
  const [transformX, setTransformX] = React.useState(0);
  const [transformY, setTransformY] = React.useState(0);
  const [width, setWidth] = React.useState(350);
  const [height, setHeight] = React.useState(100);

  const [fontFamily, setFontFamily] = React.useState("");
  const [fontWeight, setFontWeight] = React.useState("");
  const [undoData, setUndoData] = React.useState([]);
  const [redoData, setRedoData] = React.useState([]);
  const [upatedData, setUpatedData] = React.useState([]);
  const [time, setTime] = React.useState(5.5);

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
      fontFamily: fontfamily,
      fontWeight: fontWeight,
      time: time,
    };

    updateData(data);
  }
  function getFontWeight(fontweight) {
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
      fontFamily: fontFamily,
      fontWeight: fontweight,
      time: time,
    };
    setUndoData((prevState) => [...prevState, upatedData]);
    updateData(data);
  }

  function getAlignment(alignment) {
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
    setUndoData((prevState) => [...prevState, upatedData]);
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
    setTextlineHeight(lineHeight);
    setUndoData((prevState) => [...prevState, upatedData]);
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
      time: time,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
    };

    updateData(data);
  }

  function getTextSize(size) {
    setTextSize(size);

    setUndoData((prevState) => [...prevState, upatedData]);

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
      time: time,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
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
  function showglobal(global) {
    setShowGlobal(global);
    setAddMusic(false);
    setAddMedia(false);
  }

  function showMusic(media) {
    console.log(media);
    setAddMedia(false);
    setShowGlobal(false);
    // setAddScene(false)
    setAddMusic(media);
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
        time: time,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
      };

      updateData(data);
      // getData()
    }
    setAddMedia(media);

    getData();
  }
  function dropMedia(media, mediaFile, mediaType, index, newArrs) {
    if (mediaFile) {
      setUndoData((prevState) => [...prevState, upatedData]);
      // setBgType(mediaType);
      // setBgScene(mediaFile);
      // let newArr = [...mediaArray]; // copying the old datas array
      // newArr[index] = {
      //   type: mediaType,
      //   url: mediaFile,
      // };
      // console.log(newArr)
      // // setMediaArray(newArr);
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
        media: newArrs,
        time: time,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
      };
      updateData(data);
    }
    setAddMedia(media);
    getData();
  }
  function showAddScene(mediaactive, scene) {
    setAddScene(mediaactive);
    setAddMusic(false);
  }
  function closeAddScene(media) {
    setAddScene(media);
    setShowEditbutton(false);
  }
  function getData(check) {
    axios
      .get(`${apigetAdminTemplate}` + "?templateId=" + templateId, {})
      .then(function (response) {
        setProcessing(false);
        if (response.data.data.length > 0) {
          // console.log(response.data.data);
          if (typeof response.data.data[0] !== undefined) {
            if (check != true) {

              if (response.data.data[0].blocks.length > 0) {
                setTemplateTitle(response.data.data[0].title);
                setParenttemplateId(response.data.data[0].templateId);
                setBlocks(response.data.data[0].blocks);
                setSceneOrder(response.data.data[0].sceneOrder);
                setSceneThumbnail(response.data.data[0].templateImage);
                setSelectedCategory(response.data.data[0].templateCategory);
                setBottomsectionActive(false);
                setBottomData(response.data.data[0]);
                setBottomsectionActive(true);
                response.data.data[0].blocks.map((block) => {
                  if (block.sceneId == 1) {
                    // if (undoData.length == 0) {
                    setUpatedData(block.sceneData);
                    //}
                    //console.log("herer");
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

                    // console.log(block)
                  }
                });
              }
            }
            else {
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
      setUserId(decoded.id);
      getData();
    }
    // getData();
  }, [userId]);
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
  function updateData(data, norefresh) {
    setUpatedData(data);
    setData(data);
    console.log(data);
    setMediaArray(data.media);
    axios
      .put(`${apiUpdateBlock}/${sceneId}`, {
        id: sceneId,
        sceneData: data,
      })
      .then(function (response) {
        // if (data != "undefined" && undoCount == true) {
        //   setUndoData((prevState) => [...prevState, upatedData]);
        // }
        // getData();\
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
      time: time,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
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
  const toggleShowMore = () => {
    setIsShowingMore(!isShowingMore)
  };

  const closeTour = () => {
    setIsTourOpen(false)
  };
  const showTour = () => {
    setIsTourOpen(true)
  };
  const accentColor = "#5cb7b7";
  return (
    <section className="home-wrapper">

      <Tour
        steps={steps}
        onRequestClose={closeTour}
        isOpen={isTourOpen}
        maskClassName="mask"
        className="helper"
        rounded={5}
        onAfterOpen={disableBody}
        accentColor={accentColor}
        onBeforeClose={enableBody}
      />
      <SiteHeader fontFamily={fontFamily} />
      <Loader open={processing} />
      <section className="template-new-wrapper "
        //openTour={openTour}
        toggleShowMore={toggleShowMore}
      >
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
              sceneOrder={sceneOrder}
              parenttemplateId={parenttemplateId}
              closeAddScene={closeAddScene}
            />
          ) : addMusic ? (
            <AddMusic
              reFetchData={reFetchData}
              showMusic={showMusic}
              closeAddScene={closeAddScene}
            />
          ) : data != "" ? (
            playActive ? (
              <Player blocks={blocks} />
            ) : mediaArray && data ? (
              <Scene1

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
                content={content}
                undoData={undoData}
                dropMedia={dropMedia}
              />
            ) : null
          ) : null}
          <div className="guid-btn" onClick={showTour}>Guide</div>
          {addMedia ? null : addScene ? null : addMusic ? null : showGlobal ? null : changeBg ===
            false ? (
            data != "" ? (
              <TextEditor
                getTextTransform={getTextTransform}
                getAlignment={getAlignment}
                getTextColor={getTextColor}
                getTextlineHeight={getTextlineHeight}
                getFontfamily={getFontfamily}
                getFontWeight={getFontWeight}
                fontFamily={fontFamily}
                fontWeight={fontWeight}
                getTextSize={getTextSize}
                textSize={textSize}
                textlineHeight={textlineHeight}
                id={1}
                thumbnails={sceneThumbnail}
                category={selectedCategory}
                template={true}
                templateId={templateId}
                textColor={textColor}
                hide={true}
                getTime={getTime}
                time={time}
                mintime="5.5"
              />
            ) : null
          ) : (
            <ChangeBg
              closeAddMedia={closeAddMedia}
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
export default TemplateNew1;
