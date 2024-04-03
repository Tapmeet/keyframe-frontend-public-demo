/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import FontPicker from "font-picker-react";
import { SketchPicker } from "react-color";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import Loader from "../../../Utility/Loader/Loader";
import {
  apiUploadMedia,
  apigetMusicUploads,
  apiupdateAdminTemplate,
  apiPath,
} from "../../../Utility/Utility";

const GlobalOptions = (props) => {
  const [titleColor, setTitleColor] = React.useState("");
  const [titleColorShow, setTitleColorShow] = React.useState(false);
  const [activeFontFamily, setState] = React.useState("Raleway");
  const [fontWeight, setFontWeight] = React.useState("");
  const [activeFontSize, setactiveFontSize] = React.useState("24");
  const [processing, setProcessing] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);

  const toggleTitle = () => setTitleColorShow((prevState) => !prevState);

  React.useEffect(() => {
    console.log(props);
    if (props.bottomData.fontColor) {
      setTitleColor(props.bottomData.fontColor)
    }
    if (props.bottomData.fontFamily) {
      setTitleColor(props.bottomData.fontFamily)
    }
    if (props.bottomData.fontWeight) {
      setTitleColor(props.bottomData.fontWeight)
    }
    if (props.bottomData.fontSize) {
      setTitleColor(props.bottomData.fontSize)
    }
  }, []);

  function handleChangeComplete(color) {
    setTitleColor(color.hex);
    savemedia();
    savemedia(color.hex, fontWeight, activeFontFamily, activeFontSize);
    //props.getTextColor(color.hex);
  }
  function setGlobalTitleSize(e) {
    setactiveFontSize(e);
    savemedia(titleColor, fontWeight, activeFontFamily, e);
    //activeFontSize = e;
    // props.getTextSize(e);
  }
  function setFontfamilys(e) {
    setState(e);
    // props.getFontfamily(e);
    savemedia(titleColor, fontWeight, e, activeFontSize);
  }
  function setfontWeight(e) {
    console.log(e.target.value);
    setFontWeight(e.target.value);
    //props.getFontWeight(e.target.value);
    savemedia(titleColor, e.target.value, activeFontFamily, activeFontSize);
  }

  function savemedia(
    titleColors,
    fontWeights,
    activeFontFamilys,
    activeFontSizes
  ) {
    setSuccessMessage(false);
    setProcessing(true);
    axios
      .put(`${apiupdateAdminTemplate}${props.templateId}`, {
        id: props.templateId,
        fontColor: titleColors,
        fontWeight: fontWeights,
        fontFamily: activeFontFamilys,
        fontSize: activeFontSizes,
      })
      .then(function (response) {
        setSuccessMessage("true");
        setProcessing(false);
        props.reFetchData();
      });
  }
  return (
    <section className="template-new-wrapper-text-editor">
      <Loader open={processing} />
      <div className="text-editor" >
        <h4 className="black">Global Properties</h4>
        <div className="upload-media design-pane">
          <div className="color-explanation">
            Changes made here will be applied to your entire video.
          </div>
          <div className="separator separator-1"></div>
          <div className="box">
            <h4 className="black">Font Size </h4>
            <div className="title title-size">
              Text Size <span>{activeFontSize}</span>
            </div>
            <div className=" size-section title-size-section">
              <input
                type="range"
                onChange={(e) => setGlobalTitleSize(e.target.value)}
                min="20"
                max="40"
                value={activeFontSize}
                className="custom-range"
              />
            </div>
          </div>
          <div className="separator separator-1 seprate-3"></div>
          <div className="box">
            <h4 className="black">Fonts Family</h4>
            <div className="font-wrapper">
              <FontPicker
                families={
                  "Raleway, Arimo, Lato, Montserrat, Noto Serif, Oswald, Roboto, Josefin Sans, Barlow, Open Sans , Poppins, Hurricane, Inspiration, Cairo, Saira Condensed, Asap"
                }
                apiKey="AIzaSyDaztQYmJQDMP2mVUtrHIq4XRBpLEr0dzk"
                activeFontFamily={activeFontFamily}
                onChange={(nextFont) => setFontfamilys(nextFont.family)}
              />
            </div>
            <div className="separator separator-1 seprate-3"></div>
            <div className="box ">
              <h4 className="black">Fonts Weight</h4>
              <div className="sectionOne">
                <select
                  name="fontweight"
                  onChange={(e) => setfontWeight(e)}
                  value={fontWeight}
                >
                  <option value="">Set Fonts Weight</option>
                  <option value="lighter">Light</option>
                  <option value="normal">Regular</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>
            <div className="separator separator-1 seprate-3"></div>
            <div className="box">
              <h4 className="black">Fonts Color</h4>
              <div className="font-color" onClick={toggleTitle}>
                <div
                  className="color"
                  style={{ backgroundColor: titleColor }}
                ></div>
                {titleColorShow ? (
                  <SketchPicker
                    color={titleColor}
                    onChangeComplete={handleChangeComplete}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="sectionOne">
          <input
            type="number"
            min="18"
            value={activeFontSize}
            onChange={(e) => setFontsize(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>
        <div className="sectionOne">
          <select
            name="fontweight"
            onChange={(e) => setfontWeight(e)}
            value={fontWeight}
          >
            <option value="">Set Fonts Weight</option>
            <option value="lighter">Light</option>
            <option value="normal">Regular</option>
            <option value="bold">Bold</option>
          </select>
          <input
            value={activeFontlineHeight}
            onChange={(e) => setFontlineHeight(e.target.value)}
            type="number"
            min="1"
            step="0.1"
            className="form-control"
            disabled={props.disabled}
          />
        </div> */}

        {/* <div className="sectionTwo">
          <ul>
            <li>
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
            </li>
            <li>
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
            <li>
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
            </li>
          </ul>
        </div> */}
        {/* <div className="text-editor animation-section">
          <h4>Text Animations</h4>
          <select>
            <option value="">No Animations</option>
            <option value="1.2">Slide in with Reveal</option>
            <option value="1.4">Swipe from left</option>
            <option value="1.6">Scale Down</option>
            <option value="2">Simple fade</option>
          </select>
        </div> */}
      </div>
    </section>
  );
};
export default GlobalOptions;
