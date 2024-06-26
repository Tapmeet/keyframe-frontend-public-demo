"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorSchemes = exports.default = void 0;
var _default = {
  colors: {
    text: {
      base: '#F9FAFB',
      dark: '#F4F6F8',
      mute: '#aaa',
      light: '#fff'
    },
    dark: {
      base: '#1e262c',
      light: '#454F5B',
      lighter: '#637381'
    },
    primary: {
      base: '#181830',
      light: '#263138',
      lighter: '#34444c',
      dark: '#101021',
      darker: '#090912',
      text: '#F9FAFB'
    },
    secondary: {
      base: '#00707c',
      light: '#007E8A',
      lighter: '#008D99',
      dark: '#00616D',
      darker: '#005662',
      text: '#F9FAFB'
    }
  },
  textFontSize: '14px',
  borderColor: '#70777f',
  borderDarkColor: '#161e23',
  textColor: '#e7f1f4',
  textColorHover: '#fff',
  textMuted: '#70777f',
  fieldWidth: '120px'
};
var _default2 = _default;
exports.default = _default2;
var colorSchemes = {
  default: {
    mainBackground: '#f5f5f5',
    navBackground: '#181830',
    buttonBackground: '#00707C',
    hoverButtonBackground: '#096868',
    inputBackground: '#fff',
    inputOutlineColor: '#4d90fe',
    activeTabBackground: '#40545b',
    tagsBackground: '#fb3640',
    tagsColor: '#fff',
    text: '#5d636b',
    title: '#1e262c',
    inputTextColor: '#555555',
    tabTextColor: '#c0c1c1',
    activeTabTextColor: '#fff',
    buttonTextColor: '#fff',
    border: '#d8d8d8'
  },
  test: {
    mainBackground: '',
    navBackground: 'orange',
    buttonBackground: '#fb3640',
    hoverButtonBackground: '#E04241',
    inputBackground: 'yellow',
    inputOutlineColor: 'black',
    activeTabBackground: 'red',
    text: 'pink',
    inputTextColor: 'grey',
    tabTextColor: 'green',
    activeTabTextColor: 'yellow',
    buttonTextColor: 'black'
  }
};
exports.colorSchemes = colorSchemes;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(colorSchemes, "colorSchemes", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/assets/styles/colorScheme.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/assets/styles/colorScheme.js");
}();

;