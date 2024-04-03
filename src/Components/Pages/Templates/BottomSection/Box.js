import React from "react";
import { Link } from "react-router-dom";
import trash from "./../../../Assets/images/templates/trash.svg";
import { useRouteMatch } from "react-router-dom";
import PlayerSceneOne from "./../Player/Scene1";
import PlayerSceneTwo from "./../Player/Scene2";
import PlayerSceneThree from "./../Player/Scene3";
import PlayerSceneFour from "./../Player/Scene4";
import PlayerSceneFive from "./../Player/Scene5";
import PlayerSceneSix from "./../Player/Scene6";
import PlayerSceneSeven from "./../Player/Scene7";
import PlayerSceneEight from "./../Player/Scene8";
import PlayerSceneNine from "./../Player/Scene9";
import PlayerSceneTen from "./../Player/Scene10";
import PlayerSceneEleven from "./../Player/Scene11";
import PlayerSceneTwelve from "./../Player/Scene12";
import PlayerSceneThirteen from "./../Player/Scene13";
import PlayerSceneFourteen from "./../Player/Scene14";
import PlayerSceneFifteen from "./../Player/Scene15";
import PlayerSceneSixteen from "./../Player/Scene16";
import PlayerSceneSeventeen from "./../Player/Scene17";
import PlayerSceneEighteen from "./../Player/Scene18";
import PlayerSceneNineteen from "./../Player/Scene19";
import PlayerSceneTwenty from "./../Player/Scene20";
import PlayerSceneTwentyOne from "./../Player/Scene21";
import PlayerSceneTwentyTwo from "./../Player/Scene22";

import PlayerSceneThirtySeven from "./../Player/Scene37";
import PlayerSceneThirtyEight from "./../Player/Scene38";
import PlayerSceneThirtyNine from "./../Player/Scene39";
import PlayerSceneFourty from "./../Player/Scene40";
import PlayerSceneFourtyOne from "./../Player/Scene41";
import PlayerSceneTwentyThree from "./../Player/Scene23";
import PlayerSceneTwentyFive from "./../Player/Scene25";
import PlayerSceneTwentyFour from "./../Player/Scene24";
import PlayerSceneTwentySix from "./../Player/Scene26";
import PlayerSceneTwentySeven from "./../Player/Scene27";
import PlayerSceneTwentyEight from "./../Player/Scene28";
import PlayerSceneTwentyNine from "./../Player/Scene29";
import PlayerSceneThirty from "./../Player/Scene30";
import PlayerSceneThirtyOne from "./../Player/Scene31";
import PlayerSceneThirtyTwo from "./../Player/Scene32";
import PlayerSceneFourtySeven from "./../Player/Scene47";
import PlayerSceneFourtyEight from "./../Player/Scene48";
import PlayerSceneFourtyNine from "./../Player/Scene49";
import PlayerSceneFifty from "./../Player/Scene50";
import PlayerSceneThirtyThree from "./../Player/Scene33";
import PlayerSceneThirtySix from "./../Player/Scene36";
import PlayerSceneThirtyFour from "./../Player/Scene34";
import PlayerSceneThirtyFive from "./../Player/Scene35";
import PlayerSceneFourtyTwo from "./../Player/Scene42";
import PlayerSceneFourtyThree from "./../Player/Scene43";
import PlayerSceneFourtyFour from "./../Player/Scene44";
import PlayerSceneFourtyFive from "./../Player/Scene45";
import PlayerSceneFourtySix from "./../Player/Scene46";
const Box = ({
  boxWidth,
  boxBg,
  boxId,
  sceneId,
  boxLink,
  handleDrag,
  handleDrop,
  confirmDelete,
  deleteFalse,
  length,
  sceneData,
  sceneNumber,
}) => {
  //console.log(sceneId);
  return (
    <div
      id={boxId}
      className="thumb-section "
      draggable={deleteFalse != false ? true : false}
      id={boxId}
      onDragOver={deleteFalse == false ? null : (ev) => ev.preventDefault()}
      onDragStart={deleteFalse == false ? null : handleDrag}
      onDrop={deleteFalse == false ? null : handleDrop}
      style={{
        backgroundImage: "url(" + boxBg + ") ",
        width: boxWidth + "px",
        minWidth: boxWidth + "px",
      }}
    >
      {sceneNumber == 1 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneOne data={sceneData} index={1} timer={1} time={"40000"} />
        </div>
      ) : null}
      {sceneNumber == 2 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTwo data={sceneData} index={2} timer={1} time={"40000"} />
        </div>
      ) : null}
      {sceneNumber == 3 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneThree
            data={sceneData}
            index={3}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 4 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFour
            data={sceneData}
            index={4}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 5 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFive
            data={sceneData}
            index={5}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 6 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneSix data={sceneData} index={6} timer={1} time={"40000"} />
        </div>
      ) : null}
      {sceneNumber == 7 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneSeven
            data={sceneData}
            index={7}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}

      {sceneNumber == 8 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneEight
            data={sceneData}
            index={8}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 9 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneNine
            data={sceneData}
            index={9}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 10 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTen
            data={sceneData}
            index={10}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 11 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneEleven
            data={sceneData}
            index={11}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 12 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTwelve
            data={sceneData}
            index={12}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 13 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneThirteen
            data={sceneData}
            index={13}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 14 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFourteen
            data={sceneData}
            index={14}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 15 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFifteen
            data={sceneData}
            index={15}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 16 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneSixteen
            data={sceneData}
            index={16}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 17 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneSeventeen
            data={sceneData}
            index={17}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 18 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneEighteen
            data={sceneData}
            index={18}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 19 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneNineteen
            data={sceneData}
            index={19}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 20 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTwenty
            data={sceneData}
            index={20}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 21 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTwentyOne
            data={sceneData}
            index={21}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 22 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTwentyTwo
            data={sceneData}
            index={22}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 23 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTwentyThree
            data={sceneData}
            index={23}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 24 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTwentyFour
            data={sceneData}
            index={24}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 25 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTwentyFive
            data={sceneData}
            index={25}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 26 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTwentySix
            data={sceneData}
            index={26}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 27 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTwentySeven
            data={sceneData}
            index={27}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 28 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTwentyEight
            data={sceneData}
            index={28}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 29 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneTwentyNine
            data={sceneData}
            index={29}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 30 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneThirty
            data={sceneData}
            index={30}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 31 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneThirtyOne
            data={sceneData}
            index={31}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 32 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneThirtyTwo
            data={sceneData}
            index={32}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 33 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneThirtyThree
            data={sceneData}
            index={33}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 34 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneThirtyFour
            data={sceneData}
            index={34}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 35 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneThirtyFive
            data={sceneData}
            index={35}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 36 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneThirtySix
            data={sceneData}
            index={36}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 37 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneThirtySeven
            data={sceneData}
            index={37}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 38 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneThirtyEight
            data={sceneData}
            index={38}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 39 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneThirtyNine
            data={sceneData}
            index={39}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 40 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFourty
            data={sceneData}
            index={40}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 41 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFourtyOne
            data={sceneData}
            index={41}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 42 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFourtyTwo
            data={sceneData}
            index={42}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 43 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFourtyThree
            data={sceneData}
            index={43}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 44 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFourtyFour
            data={sceneData}
            index={44}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 45 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFourtyFive
            data={sceneData}
            index={45}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 46 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFourtySix
            data={sceneData}
            index={46}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 47 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFourtySeven
            data={sceneData}
            index={47}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 48 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFourtyEight
            data={sceneData}
            index={48}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 49 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFourtyNine
            data={sceneData}
            index={49}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {sceneNumber == 50 ? (
        <div className="playerscene template-new-wrapper-scene1 player-new ">
          <PlayerSceneFifty
            data={sceneData}
            index={50}
            timer={1}
            time={"40000"}
          />
        </div>
      ) : null}
      {boxId != sceneId && length > 1 ? (
        deleteFalse != false ? (
          <img
            src={trash}
            alt="Delete Section"
            className="closebtn"
            onClick={() => confirmDelete(boxId)}
          />
        ) : null
      ) : null}
      <Link to={boxLink} />
    </div>
  );
};

export default Box;
