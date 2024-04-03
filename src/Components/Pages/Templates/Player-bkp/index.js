/* eslint-disable no-unreachable */
/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
import React from "react";
import { useRouteMatch } from "react-router-dom";
import PlayerSceneOne from "./Scene1";
import PlayerSceneTwo from "./Scene2";
import PlayerSceneThree from "./Scene3";
import PlayerSceneFour from "./Scene4";
import PlayerSceneFive from "./Scene5";
import PlayerSceneSix from "./Scene6";
import PlayerSceneSeven from "./Scene7";
import PlayerSceneEight from "./Scene8";
import PlayerSceneNine from "./Scene9";
import PlayerSceneTen from "./Scene10";
import PlayerSceneEleven from "./Scene11";
import PlayerSceneTwelve from "./Scene12";
import PlayerSceneThirteen from "./Scene13";
import PlayerSceneFourteen from "./Scene14";
import PlayerSceneFifteen from "./Scene15";
import PlayerSceneSixteen from "./Scene16";
import PlayerSceneSeventeen from "./Scene17";
import PlayerSceneEighteen from "./Scene18";
import PlayerSceneNineteen from "./Scene19";
import PlayerSceneTwenty from "./Scene20";
import PlayerSceneTwentyOne from "./Scene21";
import PlayerSceneTwentyTwo from "./Scene22";

import PlayerSceneThirtySeven from "./Scene37";
import PlayerSceneThirtyEight from "./Scene38";
import PlayerSceneThirtyNine from "./Scene39";
import PlayerSceneFourty from "./Scene40";
import PlayerSceneFourtyOne from "./Scene41";
import PlayerSceneTwentyThree from "./Scene23";
import PlayerSceneTwentyFive from "./Scene25";
import PlayerSceneTwentyFour from "./Scene24";
import PlayerSceneTwentySix from "./Scene26";
import PlayerSceneTwentySeven from "./Scene27";
import PlayerSceneTwentyEight from "./Scene28";
import PlayerSceneTwentyNine from "./Scene29";
import PlayerSceneThirty from "./Scene30";
import PlayerSceneThirtyOne from "./Scene31";
import PlayerSceneThirtyTwo from "./Scene32";
import PlayerSceneFourtySeven from "./Scene47";
import PlayerSceneFourtyEight from "./Scene48";
import PlayerSceneFourtyNine from "./Scene49";
import PlayerSceneFifty from "./Scene50";
import PlayerSceneThirtyThree from "./Scene33";
import PlayerSceneThirtySix from "./Scene36";
import PlayerSceneThirtyFour from "./Scene34";
import PlayerSceneThirtyFive from "./Scene35";
import PlayerSceneFourtyTwo from "./Scene42";
import PlayerSceneFourtyThree from "./Scene43";
import PlayerSceneFourtyFour from "./Scene44";
import PlayerSceneFourtyFive from "./Scene45";
import PlayerSceneFourtySix from "./Scene46";
import PlayerSceneLast from "./SceneLast";
import axios from "axios";
import HOC from "./HOC";
import $ from "jquery";
import { apiGetLastScene } from "./../../../Utility/Utility";


const Player = (props) => {
  const match = useRouteMatch("/template/:templateId/:id/:sceneId");
  const {
    params: { templateId },
  } = match;
  const [blocks, setBlocks] = React.useState(props.blocks);
  React.useEffect(() => {
    // var myInterval, myVar;
    // $(".player-new section:first-of-type").addClass("active");
    // clearTimeout(myVar);
    // var myFunc = function () {
    //   var cur = $(".player-new section.active");
    //   if (cur.index() == $(".player-new section").length - 1) {
    //     cur.removeClass("active");
    //     $(".player-new section:first-of-type").addClass("active");
    //     clearInterval(myInterval);
    //   } else {
    //     cur.removeClass("active").next().addClass("active");
    //   }
    // };
    // //Start Interval
    //  myVar = setTimeout(function () {
    //   myInterval = setInterval(myFunc, 4000);
    // }, 500);
    {
      // blocks.map((data, index) => {
      // });
    }
  
    axios
      .get(`${apiGetLastScene}` + "?id=" + templateId, {})
      .then(function (response) {
        setBlocks((oldArray) => [...oldArray, response.data.scene]);
      });
  }, []);
  var timer = 0;
  return (
    <section className="template-new-wrapper-scene1 player-new ">
      {blocks.map((data, index) => {
        return (
          <HOC>
            {data.sceneId == 1 ? (
              <PlayerSceneOne
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 2 ? (
              <PlayerSceneTwo
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 3 ? (
              <PlayerSceneThree
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 4 ? (
              <PlayerSceneFour
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 5 ? (
              <PlayerSceneFive
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 6 ? (
              <PlayerSceneSix
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 7 ? (
              <PlayerSceneSeven
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}

            {data.sceneId == 8 ? (
              <PlayerSceneEight
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 9 ? (
              <PlayerSceneNine
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 10 ? (
              <PlayerSceneTen
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 11 ? (
              <PlayerSceneEleven
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 12 ? (
              <PlayerSceneTwelve
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 13 ? (
              <PlayerSceneThirteen
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 14 ? (
              <PlayerSceneFourteen
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 15 ? (
              <PlayerSceneFifteen
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 16 ? (
              <PlayerSceneSixteen
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 17 ? (
              <PlayerSceneSeventeen
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 18 ? (
              <PlayerSceneEighteen
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 19 ? (
              <PlayerSceneNineteen
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 20 ? (
              <PlayerSceneTwenty
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 21 ? (
              <PlayerSceneTwentyOne
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 22 ? (
              <PlayerSceneTwentyTwo
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 23 ? (
              <PlayerSceneTwentyThree
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 24 ? (
              <PlayerSceneTwentyFour
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 25 ? (
              <PlayerSceneTwentyFive
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 26 ? (
              <PlayerSceneTwentySix
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 27 ? (
              <PlayerSceneTwentySeven
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 28 ? (
              <PlayerSceneTwentyEight
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 29 ? (
              <PlayerSceneTwentyNine
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 30 ? (
              <PlayerSceneThirty
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 31 ? (
              <PlayerSceneThirtyOne
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 32 ? (
              <PlayerSceneThirtyTwo
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 33 ? (
              <PlayerSceneThirtyThree
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 34 ? (
              <PlayerSceneThirtyFour
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
             {data.sceneId == 35 ? (
              <PlayerSceneThirtyFive
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
             {data.sceneId == 36 ? (
              <PlayerSceneThirtySix
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 37 ? (
              <PlayerSceneThirtySeven
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 38 ? (
              <PlayerSceneThirtyEight
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 39 ? (
              <PlayerSceneThirtyNine
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 40 ? (
              <PlayerSceneFourty
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 41 ? (
              <PlayerSceneFourtyOne
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
              {data.sceneId == 42 ? (
              <PlayerSceneFourtyTwo
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
              {data.sceneId == 43 ? (
              <PlayerSceneFourtyThree
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 44 ? (
              <PlayerSceneFourtyFour
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
              {data.sceneId == 45 ? (
              <PlayerSceneFourtyFive
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
             {data.sceneId == 46 ? (
              <PlayerSceneFourtySix
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 47 ? (
              <PlayerSceneFourtySeven
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 48 ? (
              <PlayerSceneFourtyEight
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == 49 ? (
              <PlayerSceneFourtyNine
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
             {data.sceneId == 50 ? (
              <PlayerSceneFifty
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}
            {data.sceneId == "last" ? (
              <PlayerSceneLast
                data={data.sceneData}
                index={index}
                timer={timer}
                time={data.sceneData.time}
              />
            ) : null}

            <div className="d-none">
              {" "}
              {(timer = parseFloat(timer) + parseFloat(data.sceneData.time))}
            </div>
          </HOC>
        );
      })}
    </section>
  );
};
export default Player;
