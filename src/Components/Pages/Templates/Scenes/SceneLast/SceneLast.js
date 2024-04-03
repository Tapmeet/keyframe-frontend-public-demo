/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import DragResizeContainer from "react-drag-resize";
import { apiPath } from "./../../../../Utility/Utility";
// import userImg from "../../../../../assets/images/User/Template/user.png";
// import LogoImg from "../../../../../assets/images/User/Template/Resizer.webp";
import Loader from "./../../../../Utility/Loader/Loader";
const SceneLast = (props) => {
  const [mediaArray, setMediaArray] = React.useState(props.mediaArray);
  const [dragoverId, setDragoverId] = React.useState(0);
  var textArrays = props.textArray;
  function setshowbg(option, scene, type, titleColor, index, textIndex) {
    props.showBg(option, type, scene, titleColor, index, textIndex);
  }
  function setsctiveFontFamily(option) {
    props.setActiveFontFamily(option);
  }
  React.useEffect(() => {
    if (props.mediaArray) {
      setMediaArray(props.mediaArray);
    }
  }, [textArrays, props.data]);

  function getcontent(e, index) {
    let newArr = [...textArrays]; // copying the old datas array
    newArr[index] = {
      text: e.target.value,
      fontSize: newArr[index].fontSize,
      fontFamily: newArr[index].fontFamily,
      fontWeight: newArr[index].fontWeight,
      fontLineHeight: newArr[index].fontLineHeight,
      fontAlignment: newArr[index].fontAlignment,
      fontColor: newArr[index].fontColor,
      fontCapitalize: newArr[index].fontCapitalize,
    };
    props.getContent(newArr);
  }
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDropComplete = (e, index) => {
    let imgUrl = e.dataTransfer.getData("img");
 
    let newArr = [...mediaArray]; // copying the old datas array
    newArr[index] = {
      type: "img",
      url: imgUrl,
    };
    console.log(newArr)
    setMediaArray(newArr);
    setDragoverId(0);
    props.dropMedia(false, imgUrl, "img", index, newArr) ;
  };
  const handleDrag = (e, id) => {
    console.log(id);
    setDragoverId(id);
  };
  const removeDrag = (e, id) => {
    setDragoverId(0);
  };
  const endDrag = (e, id) => {
    setDragoverId(0);
  };

  return (
    <section className="template-new-wrapper-scene1 lastScene-section">
      <div className="d-flex">
        <div className="img-section d-flex bg-gray align-items-center">
          <div className="col-12 col-sm-6">
            <img
              src={apiPath + mediaArray[0].url}
              onClick={() =>
                setshowbg(
                  true,
                  mediaArray[0].url,
                  mediaArray[0].type,
                  false,
                  "0"
                )
              }
              onDragEnter={(e) => handleDrag(e, 1)}
              onDragLeave={(e) => removeDrag()}
              onDragOver={(e) => handleDrop(e)}
              onDrop={(e) => handleDropComplete(e, 0)}
              className={
                dragoverId == 1
                  ? "img-fluid userimg opacity"
                  : "img-fluid userimg "
              }
              alt="userImg"
            />
          </div>
          <div className="col-12 col-sm-6">
            {textArrays.map((data, index) => {
              return (
                <div
                  className="text-content"
                  key={index}
                  onClick={() => setsctiveFontFamily(index)}
                >
                  <input
                    type="text"
                    style={{
                      fontSize: data.fontSize + "px",
                      color: data.fontColor,
                      lineHeight: data.fontLineHeight,
                      fontWeight: data.fontWeight,
                      fontFamily: data.fontFamily,
                    }}
                    className={
                      "child-container form-control border  size-auto " +
                      data.fontAlignment +
                      " " +
                      data.fontCapitalize
                    }
                    value={data.text}
                    onChange={(e) => getcontent(e, index)}
                  ></input>
                </div>
              );
            })}
            <img
              src={apiPath + mediaArray[1].url}
              onDragEnter={(e) => handleDrag(e, 2)}
              onDragLeave={(e) => removeDrag()}
              onDragOver={(e) => handleDrop(e)}
              onDrop={(e) => handleDropComplete(e, 1)}
              onClick={() =>
                setshowbg(
                  true,
                  mediaArray[1].url,
                  mediaArray[1].type,
                  false,
                  "1"
                )
              }
              className={
                dragoverId == 2
                  ? "img-fluid logo-img opacity"
                  : "img-fluid logo-img "
              }
            
              alt="userImg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default SceneLast;
