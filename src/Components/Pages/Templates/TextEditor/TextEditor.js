/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import FontPicker from "font-picker-react";
import { SketchPicker } from "react-color";
var rows = [];
const TextEditor = (props) => {
  const [titleColor, setTitleColor] = React.useState(props.textColor);
  const [titleColorShow, setTitleColorShow] = React.useState(false);
  const [activeCapitalize, setactiveCapitalize] = React.useState(false);
  const [activeLeftAlign, setactiveLeftAlign] = React.useState(false);
  const [activeRightAlign, setactiveRightAlign] = React.useState(false);
  const [activeCenterAlign, setactiveCenterAlign] = React.useState(false);
  const [activeFontFamily, setActiveFontFamily] = React.useState(props.fontFamily);
  const [sceneTime, setSceneTime] = React.useState(props.time);
  const [sceneMinTime, setsceneMinTime] = React.useState(4);
  // console.log(props.fontFamily)
  const [fontWeight, setFontWeight] = React.useState("");
  const [activeFontlineHeight, setactiveFontlineHeight] = React.useState(
    props.textlineHeight
  );
  const [activeFontSize, setactiveFontSize] = React.useState('');
  //var activeFontSize = props.textSize;
  const toggleTitle = () => setTitleColorShow((prevState) => !prevState);

  React.useEffect(() => {
    //console.log(props.textSize)
    if (props.setTexttransform === "text-uppercase") {
      setactiveCapitalize(true);
    } else {
      setactiveCapitalize(false);
    }
    setTitleColor(props.textColor);
    setactiveFontSize(props.textSize)
    setActiveFontFamily(props.fontFamily);
    setFontWeight(props.fontWeight);
    setSceneTime(parseFloat(props.time))
    setsceneMinTime(props.mintime)
    const mintime = parseFloat(props.mintime);
    console.log(mintime)
    if (mintime) {
      for (let i = mintime; i <= 10; i = i + 0.5) {
        console.log(i)
        rows.push(i)
      }
      console.log(props.time)
    }
    //activeFontSize = props.textSize;
  }, [props.fontFamily, props.textColor, props.textSize]);
  function setcapitalize() {
    if (activeCapitalize === true) {
      props.getTextTransform("");
    } else {
      props.getTextTransform("text-uppercase");
    }
    setactiveCapitalize(!activeCapitalize);
  }
  function setAlignment(align) {
    if (align === "left") {
      setactiveLeftAlign(true);
      setactiveCenterAlign(false);
      setactiveRightAlign(false);
      props.getAlignment("text-left");
    } else if (align === "center") {
      setactiveLeftAlign(false);
      setactiveCenterAlign(true);
      setactiveRightAlign(false);
      props.getAlignment("text-center");
    } else {
      setactiveLeftAlign(false);
      setactiveCenterAlign(false);
      setactiveRightAlign(true);
      props.getAlignment("text-right");
    }
  }
  function handleChangeComplete(color) {
    setTitleColor(color.hex);
    props.getTextColor(color.hex);
  }
  function setFontsize(e) {
    setactiveFontSize(e);
    props.getTextSize(e);
  }
  function setTime(e) {
    setSceneTime(e.target.value);
    props.getTime(e.target.value);
  }
  function setFontfamily(e) {

    setActiveFontFamily(e);
    props.getFontfamily(e);
  }
  function setfontWeight(e) {

    setFontWeight(e.target.value)
    props.getFontWeight(e.target.value);

  }
  function setFontlineHeight(e) {
    setactiveFontlineHeight(e);
    props.getTextlineHeight(e);
  }


  return (
    <section className="template-new-wrapper-text-editor">
      <div className="text-editor" data-tut="reactour__4">
        <h4>Text Properties</h4>
        <div className="sectionOne">
          <div className="headings">Font Family</div>
          <FontPicker
            families={
              "Raleway, Arimo, Lato, Montserrat, Noto Serif, DM Serif Display ,Oswald,Merriweather, Roboto, Josefin Sans, Barlow, Open Sans , Poppins, Hurricane, Inspiration, Cairo, Saira Condensed, Asap"
            }
            apiKey="AIzaSyDaztQYmJQDMP2mVUtrHIq4XRBpLEr0dzk"
            activeFontFamily={activeFontFamily}
            onChange={(nextFont) => setFontfamily(nextFont.family)}
          />
          <div className="headings">Font Size</div>
          <input
            type="number"
            min="18"
            max="26"
            value={activeFontSize}
            onChange={(e) => setFontsize(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>
        <div className="sectionOne">
          <div className="headings">Font Weight</div>
          <select name="fontweight" onChange={e => setfontWeight(e)} value={fontWeight}>
            <option value="">Set Fonts Weight</option>
            <option value="lighter">Light</option>
            <option value="normal">Regular</option>
            <option value="bold">Bold</option>
          </select>
          {/* <div className="headings">Font Spacing</div>
          <input
            value={activeFontlineHeight}
            onChange={(e) => setFontlineHeight(e.target.value)}
            type="number"
            min="1"
            step="0.1"
            className="form-control"
            disabled={props.disabled}
          /> */}
        </div>

        <div className="sectionTwo">
          <ul>
            {/* <li>
              <div
                className={
                  activeCapitalize
                    ? "capitalise borders active"
                    : "capitalise borders "
                }
                onClick={setcapitalize}
              >
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path d="M6 1H0v3h1l1-1h3v11l-2 1v1h6v-1l-2-1V3h3l1 1h1V1z"></path>
                  <path d="M8 6v3h1l1-1h1v6l-1 1v1h4v-1l-1-1V8h1l1 1h1V6z"></path>
                </svg>
              </div>
            </li> */}
            <li>
              <div className="headings">Choose text color</div>
              <div className="font-color" onClick={toggleTitle}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="__36674"
                >
                  <path
                    d="M4 18h6v2H4v-2zm9.05-14l4.67 14H20v2h-6v-2h1.61l-1-3H9.4l-1.44 4.32-1.9-.64L10.95 4h2.1zM12 7.16L10.05 13h3.9L12 7.16z"
                    fill="currentColor"
                  ></path>
                </svg>
                <svg viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id="chequer"
                      x="0"
                      y="0"
                      width="0.25"
                      height="0.25"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="0.25"
                        height="0.25"
                        fill="#ffffff"
                      ></rect>
                      <rect
                        x="0.25"
                        y="0"
                        width="0.25"
                        height="0.25"
                        fill="#ccceda"
                      ></rect>
                      <rect
                        x="0.25"
                        y="0.25"
                        width="0.25"
                        height="0.25"
                        fill="#ffffff"
                      ></rect>
                      <rect
                        x="0"
                        y="0.25"
                        width="0.25"
                        height="0.25"
                        fill="#ccceda"
                      ></rect>
                    </pattern>
                  </defs>
                  <circle
                    className="base"
                    r="1"
                    cx="0"
                    cy="0"
                    fill="url(#chequer)"
                  ></circle>
                  <circle
                    id="segment-1"
                    r="1"
                    cx="0"
                    cy="0"
                    fill={titleColor}
                  ></circle>
                  <circle
                    className="outline"
                    r="0.95"
                    cx="0"
                    cy="0"
                    fill="none"
                    stroke="#ccceda"
                    strokeWidth="0.05"
                  ></circle>
                </svg>
                {titleColorShow ? (
                  <SketchPicker
                    color={titleColor}
                    onChangeComplete={handleChangeComplete}
                  />
                ) : null}
              </div>
            </li>
          </ul>
        </div>
        {!props.hide ?
          <div className="sectionTwo sectionThree">
            <div className="headings">Choose text placement</div>
            <ul>
              <li>

                <div
                  className={
                    activeLeftAlign
                      ? "capitalise borders active "
                      : "capitalise borders "
                  }
                  onClick={() => setAlignment("left")}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <g fill="currentColor">
                      <path d="M23 4H1a1 1 0 0 1 0-2h22a1 1 0 0 1 0 2z"></path>
                      <path d="M13 10H1a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z"></path>
                      <path d="M23 16H1a1 1 0 0 1 0-2h22a1 1 0 0 1 0 2z"></path>
                      <path d="M13 22H1a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z"></path>
                    </g>
                  </svg>
                </div>
              </li>
              <li>
                <div
                  className={
                    activeCenterAlign
                      ? "capitalise borders active"
                      : "capitalise borders "
                  }
                  onClick={() => setAlignment("center")}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <g fill="currentColor">
                      <path d="M23 4H1a1 1 0 0 1 0-2h22a1 1 0 0 1 0 2z"></path>
                      <path d="M18 10H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z"></path>
                      <path d="M23 16H1a1 1 0 0 1 0-2h22a1 1 0 0 1 0 2z"></path>
                      <path d="M18 22H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z"></path>
                    </g>
                  </svg>
                </div>
              </li>

              {/* <li>
              <div
                className={
                  activeRightAlign
                    ? "capitalise borders active"
                    : "capitalise borders "
                }
                onClick={() => setAlignment("right")}
              >
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <g fill="currentColor">
                    <path d="M23 4H1a1 1 0 1 1 0-2h22a1 1 0 1 1 0 2z"></path>
                    <path d="M23 10H11a1 1 0 1 1 0-2h12a1 1 0 1 1 0 2z"></path>
                    <path d="M23 16H1a1 1 0 1 1 0-2h22a1 1 0 1 1 0 2z"></path>
                    <path d="M23 22H11a1 1 0 1 1 0-2h12a1 1 0 1 1 0 2z"></path>
                  </g>
                </svg>
              </div>
            </li> */}
            </ul>
          </div>
          : null}
        <div className="text-editor animation-section">
          <h4>Scene Time</h4>
          <select onChange={e => setTime(e)} value={sceneTime}>
            {rows.map((row, index) => {
              return <option key={index} value={row}>{row} Sec</option>
            }
            )
            }
          </select>
        </div>
      </div>
    </section>
  );
};
export default TextEditor;
