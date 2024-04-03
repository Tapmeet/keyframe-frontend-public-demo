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
import ChangeBg from "./../../ChangeBg";
import SceneTwentySeven from "./Scene27";
import AddMedia from "./../../AddMedia/AddMedia";
import AddScenes from "./../../AddScenes/AddScenes";
import BottomSection from "./../../BottomSection/BottomSection";
import AddMusic from "./../../AddMusic/AddMusic";
import GlobalOptions from "./../../GlobalOptions/GlobalOptions";
import {
  apiUpdateBlock,
  apigetAdminTemplate,
} from "./../../../../Utility/Utility";
import Player from "../../Player";
const TemplateScene27 = (props) => {
  const [parenttemplateId, setParenttemplateId] = React.useState("");
  const [bottomData, setBottomData] = React.useState("");
  const [sceneOrder, setSceneOrder] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [blocks, setBlocks] = React.useState("");
  const match = useRouteMatch("/template/:templateId/27/:sceneId");
  const {
    params: { templateId },
  } = match;
  const {
    params: { sceneId },
  } = match;
  const [templateTitle, setTemplateTitle] = React.useState("");
  const [bottomsectionActive, setBottomsectionActive] = React.useState(false);
  const [content, setContent] = React.useState([]);
  const [data, setData] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  const [textAligmnet, setTextAligmnet] = React.useState("text-left");
  const [bgType, setBgType] = React.useState("");
  const [bgScene, setBgScene] = React.useState("");
  const [textSize, setTextSize] = React.useState("18");
  const [container, setContainer] = React.useState("");
  const [textlineHeight, setTextlineHeight] = React.useState("1.4");
  const [textColor, setTextColor] = React.useState("");
  const [texAreatextColor, setTexAreatextColor] = React.useState("");
  const [titletextColor, setTitletextColor] = React.useState("");
  const [titletextSize, setTitletextSize] = React.useState("");

  const [fontfamilySet, setFontfamilySet] = React.useState("");
  const [fontweightSet, setFontweightSet] = React.useState("");

  const [textTransform, setTexttransform] = React.useState("");
  const [changeBg, setChangeBg] = React.useState(false);
  const [titleactive, setTitleactive] = React.useState(false);
  const [addMedia, setAddMedia] = React.useState(false);
  const [addScene, setAddScene] = React.useState(false);
  const [addMusic, setAddMusic] = React.useState(false);
  const [showEditbutton, setShowEditbutton] = React.useState(false);
  const [mediaArray, setMediaArray] = React.useState([]);
  const [playActive, setPlayActive] = React.useState(false);
  const [sceneThumbnail, setSceneThumbnail] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const [fontFamily, setFontFamily] = React.useState("");
  const [fontWeight, setFontWeight] = React.useState("");
  const [titleFontFamily, setTitleFontFamily] = React.useState("");
  const [titleFontWeight, setTitleFontWeight] = React.useState("");
  const [showGlobal, setShowGlobal] = React.useState(false);
  const [setInitials, setSetInitials] = React.useState(false);
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
      titleColor: titletextColor,
      titletextSize: titletextSize,
      textTransform: textTransform,
      media: mediaArray,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      titleFontFamily: fontFamily,
      titleFontWeight: titleFontWeight,
      time: scenetime,
    };

    updateData(data);
  }
  function setActiveFontFamily(fontfamily) {
    setChangeBg(false);
    setShowGlobal(false);
    setTitleactive(fontfamily);
    if (fontfamily) {
      setTexAreatextColor(titletextColor);
      setFontfamilySet(titleFontFamily);
    } else {
      setFontfamilySet(fontFamily);
      setTexAreatextColor(textColor);
    }
  }
  function getFontfamily(fontfamily) {
    setFontfamilySet(fontfamily);
    if (titleactive) {
      setTitleFontFamily(fontfamily);
      setUndoData((prevState) => [...prevState, upatedData]);
      const data = {
        content: content,
        textAligmnet: textAligmnet,
        textColor: textColor,
        textlineHeight: textlineHeight,
        textSize: textSize,
        titleColor: titletextColor,
        titletextSize: titletextSize,
        textTransform: textTransform,
        media: mediaArray,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        titleFontFamily: fontfamily,
        titleFontWeight: titleFontWeight,
        time: time,
      };
      console.log(data);
      updateData(data);
    } else {
      setFontFamily(fontfamily);
      setUndoData((prevState) => [...prevState, upatedData]);
      const data = {
        content: content,
        textAligmnet: textAligmnet,
        textColor: textColor,
        textlineHeight: textlineHeight,
        textSize: textSize,
        titleColor: titletextColor,
        titletextSize: titletextSize,
        textTransform: textTransform,
        media: mediaArray,
        fontFamily: fontfamily,
        fontWeight: fontWeight,
        titleFontFamily: titleFontFamily,
        titleFontWeight: titleFontWeight,
        time: time,
      };
      console.log(data);
      updateData(data);
    }
  }
  function getFontWeight(fontweight) {
    setUndoData((prevState) => [...prevState, upatedData]);
    setFontweightSet(fontweight);
    if (titleactive) {
      setTitleFontWeight(fontweight);

      const data = {
        content: content,
        textAligmnet: textAligmnet,
        textColor: textColor,
        textlineHeight: textlineHeight,
        textSize: textSize,
        titleColor: titletextColor,
        titletextSize: titletextSize,
        textTransform: textTransform,
        media: mediaArray,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        titleFontFamily: titleFontFamily,
        titleFontWeight: fontweight,
        time: time,
      };
      updateData(data);
    } else {
      setFontWeight(fontweight);
      const data = {
        content: content,
        textAligmnet: textAligmnet,
        textColor: textColor,
        textlineHeight: textlineHeight,
        textSize: textSize,
        titleColor: titletextColor,
        titletextSize: titletextSize,
        textTransform: textTransform,
        media: mediaArray,
        fontFamily: fontFamily,
        fontWeight: fontweight,
        titleFontFamily: titleFontFamily,
        titleFontWeight: titleFontWeight,
        time: time,
      };
      updateData(data);
    }
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
      titleColor: titletextColor,
      titletextSize: titletextSize,
      textTransform: textTransform,
      media: mediaArray,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      titleFontFamily: titleFontFamily,
      titleFontWeight: titleFontWeight,
      time: time,
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
      titleColor: titletextColor,
      titletextSize: titletextSize,
      textlineHeight: textlineHeight,
      textSize: textSize,
      textTransform: texttransform,
      media: mediaArray,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      titleFontFamily: titleFontFamily,
      titleFontWeight: titleFontWeight,
      time: time,
    };
    updateData(data);
  }
  function getTextColor(color) {
    setUndoData((prevState) => [...prevState, upatedData]);
    if (titleactive) {
      setTitletextColor(color);
      setTexAreatextColor(color);
      const data = {
        content: content,
        textAligmnet: textAligmnet,
        textColor: textColor,
        titleColor: color,
        titletextSize: titletextSize,
        textlineHeight: textlineHeight,
        textSize: textSize,
        textTransform: textTransform,
        media: mediaArray,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        time: time,
      };
      updateData(data);
    } else {
      const data = {
        content: content,
        textAligmnet: textAligmnet,
        textColor: color,
        titleColor: titletextColor,
        titletextSize: titletextSize,
        textlineHeight: textlineHeight,
        textSize: textSize,
        textTransform: textTransform,
        media: mediaArray,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        time: time,
      };
      updateData(data);
      setTextColor(color);
      setTexAreatextColor(color);
    }
  }

  function getContent(content) {
    setUndoData((prevState) => [...prevState, upatedData]);
    setContent(content);
    const data = {
      content: content,
      textAligmnet: textAligmnet,
      textColor: textColor,
      titleColor: titletextColor,
      titletextSize: titletextSize,
      textlineHeight: textlineHeight,
      textSize: textSize,
      textTransform: textTransform,
      media: mediaArray,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      titleFontFamily: titleFontFamily,
      titleFontWeight: titleFontWeight,
      time: time,
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
      titleColor: titletextColor,
      titletextSize: titletextSize,
      textlineHeight: textlineHeight,
      textSize: textSize,
      textTransform: textTransform,
      media: mediaArray,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      titleFontFamily: titleFontFamily,
      titleFontWeight: titleFontWeight,
      time: time,
    };
    updateData(data);
  }
  function getTextSize(size) {
    if (titleactive) {
      setTitletextSize(size);
      const data = {
        content: content,
        textAligmnet: textAligmnet,
        textColor: textColor,
        titleColor: titletextColor,
        titletextSize: size,
        textlineHeight: textlineHeight,
        textSize: textSize,
        textTransform: textTransform,
        media: mediaArray,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        titleFontFamily: titleFontFamily,
        titleFontWeight: titleFontWeight,
        time: time,
      };

      setUndoData((prevState) => [...prevState, upatedData]);
      updateData(data);
    } else {
      setTextSize(size);
      const data = {
        content: content,
        textAligmnet: textAligmnet,
        textColor: textColor,
        titleColor: titletextColor,
        titletextSize: titletextSize,
        textlineHeight: textlineHeight,
        textSize: size,
        textTransform: textTransform,
        media: mediaArray,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        titleFontFamily: titleFontFamily,
        titleFontWeight: titleFontWeight,
        time: time,
      };

      setUndoData((prevState) => [...prevState, upatedData]);
      updateData(data);
    }
  }
  function showBg(changeBg, type, scene, titleColor, container) {
    setChangeBg(changeBg);
    setBgType(type);
    setBgScene(scene);
    setTitleactive(titleColor);
    setShowGlobal(false);
    setContainer(container);
    if (titleColor) {
      setTexAreatextColor(titletextColor);
      setFontfamilySet(titleFontFamily);
    } else {
      setFontfamilySet(titleFontFamily);
      setTexAreatextColor(fontFamily);
    }
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
    setAddMusic(media);
    setAddMedia(false);
    setShowGlobal(false);
  }
  function closeAddMedia(media, mediaFile) {
    setAddMedia(media);
  }

  function showAddScene(mediaactive, scene) {
    // console.log(mediaactive);
    setShowGlobal(false);
    setAddScene(mediaactive);
  }
  function closeAddScene(media) {
    setAddScene(media);
    setShowEditbutton(false);
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
        titleColor: titletextColor,
        textSize: textSize,
        titletextSize: titletextSize,
        textTransform: textTransform,
        media: newArr,
        time: time,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        titleFontFamily: titleFontFamily,
        titleFontWeight: titleFontWeight,
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
        titleColor: titletextColor,
        textSize: textSize,
        titletextSize: titletextSize,
        textTransform: textTransform,
        media: newArr,
        time: time,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        titleFontFamily: titleFontFamily,
        titleFontWeight: titleFontWeight,
      };
      updateData(data);
    }
    setAddMedia(media);
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
              setSceneOrder(response.data.data[0].sceneOrder);
              setSceneThumbnail(response.data.data[0].templateImage);
              setSelectedCategory(response.data.data[0].templateCategory);
              if (response.data.data[0].blocks.length > 0) {
                setBlocks(response.data.data[0].blocks);
                response.data.data[0].blocks.map((block) => {
                  if (block.sceneId == 27) {
                    setUpatedData(block.sceneData);
                    setMediaArray(block.sceneData.media);
                    setTextSize(block.sceneData.textSize);
                    setTextlineHeight(block.sceneData.textlineHeight);
                    setTextColor(block.sceneData.textColor);
                    setTitletextColor(block.sceneData.titleColor);
                    setTitletextSize(block.sceneData.titletextSize);
                    setTexttransform(block.sceneData.textTransform);
                    setTextAligmnet(block.sceneData.textAligmnet);
                    setFontWeight(block.sceneData.fontWeight);
                    if (!setInitials) {
                      setSetInitials(true);
                      setFontfamilySet(block.sceneData.titleFontFamily);
                    }
                    // else{
                    //   setFontfamilySet(block.sceneData.fontFamily);
                    // }
                    setFontFamily(block.sceneData.fontFamily);
                    setTitleFontWeight(block.sceneData.titleFontWeight);
                    setTitleFontFamily(block.sceneData.titleFontFamily);
                    // setFontfamilySet(block.sceneData.fontFamily);
                    setFontweightSet(block.sceneData.fontWeight);
                    setContent(block.sceneData.content);
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
        //  getData();
        reFetchData(true)
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
          ) : data != "" && content != "" ? (
            playActive ? (
              <Player blocks={blocks} />
            ) : (
              <SceneTwentySeven
                setColor={textColor}
                setTitleColor={titletextColor}
                setAlignment={textAligmnet}
                setTextTransform={textTransform}
                showBg={showBg}
                changeBg={changeBg}
                bgType={bgType}
                bgScene={bgScene}
                container={container}
                mediaArray={mediaArray}
                data={data}
                getContent={getContent}
                content={content}
                dropMedia={dropMedia}
                setActiveFontFamily={setActiveFontFamily}
              />
            )
          ) : null}
          {addMedia ? null : addScene ? null : showGlobal ? null : addMusic ? null : changeBg ===
            false ? (
            data != "" ? (
              <TextEditor
                getTextTransform={getTextTransform}
                getAlignment={getAlignment}
                getTextColor={getTextColor}
                textColor={titleactive ? titletextColor : textColor}
                getTextlineHeight={getTextlineHeight}
                getTextSize={getTextSize}
                textSize={titleactive ? titletextSize : textSize}
                textlineHeight={textlineHeight}
                id={27}
                thumbnails={sceneThumbnail}
                category={selectedCategory}
                template={true}
                templateId={templateId}
                disabled={true}
                getFontfamily={getFontfamily}
                getFontWeight={getFontWeight}
                fontFamily={fontfamilySet}
                fontWeight={fontweightSet}
                hide={true}
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
export default TemplateScene27;
