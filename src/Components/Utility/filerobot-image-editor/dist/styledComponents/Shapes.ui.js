"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldGroup = exports.FieldCustomLabel = exports.ItemIcon = exports.ItemGroup = exports.SettingsWrapper = exports.ItemsWrapper = exports.AddWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  color: #fff;\n  display: inline-block;\n  margin-bottom: 0;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  jutifyContent: center;\n  alignItems: center;\n  margin: 20px;\n\n  input {\n    margin-left: auto;\n    margin-right: auto;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  width: 50px;\n  height: 50px;\n  max-width: 50px;\n  max-height: 50px;\n  padding-bottom: 3px;\n  cursor: pointer;\n  margin-left: auto;\n  margin-right: auto;\n\n  ", "\n\n  img {\n    max-width: 100%;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  padding: 8px 25px;\n\n  * {\n    cursor: pointer;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  height: 100%;\n  padding: 0 15px;\n  display: flex;\n  align-items: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  text-align: center; \n  width: fit-content;\n  min-width: 111px;\n  max-width: 100%;\n  height: 100%;\n  margin-left: auto;\n  margin-right: auto;\n  \n  ::-webkit-scrollbar {\n    height: 10px !important;\n  }\n   \n  ::-webkit-scrollbar-thumb {\n    background: #3b4d54;\n    border-radius: 5px;\n  }\n  \n  @media (min-width: 768px) {\n    overflow-x: auto;\n    overflow-y: hidden;\n    white-space: nowrap;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var AddWrapper = _styledComponents.default.div(_templateObject());

exports.AddWrapper = AddWrapper;

var ItemsWrapper = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.theme.colors.text;
});

exports.ItemsWrapper = ItemsWrapper;

var SettingsWrapper = _styledComponents.default.div(_templateObject3());

exports.SettingsWrapper = SettingsWrapper;

var ItemGroup = _styledComponents.default.div(_templateObject4());

exports.ItemGroup = ItemGroup;

var ItemIcon = _styledComponents.default.div(_templateObject5(), function (p) {
  return p.isIconNotProvided && "\n    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQ5NSA0OTUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5NSA0OTU7IiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSJ3aGl0ZSI+DQo8Zz4NCgk8cGF0aCBkPSJNNDk1LDEwMy41MTNWOTUuNWMwLTIxLjc4LTE3LjcyLTM5LjUtMzkuNS0zOS41aC00MTZDMTcuNzIsNTYsMCw3My43MiwwLDk1LjV2MzAzLjk5N2MwLDAuMDAzLDAsMC4wMDUsMCwwLjAwOA0KCQlDMC4wMDMsNDIxLjI4MywxNy43MjIsNDM5LDM5LjUsNDM5aDQxNmMyMS43OCwwLDM5LjUtMTcuNzIsMzkuNS0zOS41VjEwMy41MjFDNDk1LDEwMy41MTgsNDk1LDEwMy41MTYsNDk1LDEwMy41MTN6IE0zOS41LDcxaDQxNg0KCQljMTMuNTA5LDAsMjQuNSwxMC45OSwyNC41LDI0LjV2NC44ODNjLTM1LjEyMSwzNC45NjMtOTIuODUsOTIuNDY0LTE0MC43MjEsMTQwLjI4OWwtNzUuMTYyLTc1LjE2Mg0KCQljLTkuMTYyLTkuMTYyLTI0LjA3MS05LjE2Mi0zMy4yMzMsMEwxNSwzODEuMzkzVjk1LjVDMTUsODEuOTksMjUuOTkxLDcxLDM5LjUsNzF6IE00NTUuNSw0MjRoLTQxNg0KCQljLTEyLjUxOSwwLTIyLjg2OC05LjQzOS0yNC4zMTktMjEuNTc0TDI0MS40OSwxNzYuMTE3YzMuMzE0LTMuMzE0LDguNzA2LTMuMzE0LDEyLjAyMSwwbDc1LjE1OCw3NS4xNTgNCgkJQzI4OS4yNiwyOTAuNjcsMjU4LjgxMywzMjEuMjQ5LDI1Ny41LDMyM2MtMi40ODUsMy4zMTMtMS44MTQsOC4wMTUsMS41LDEwLjVjMS4zNDksMS4wMTIsMi45MjgsMS41LDQuNDk0LDEuNQ0KCQljMi4xODcsMCw0LjM0OS0wLjk1Myw1LjgyMi0yLjc2NEMyNzUuMDc1LDMyNS43Nyw0MTIuOTYyLDE4OC4zMDgsNDgwLDEyMS41NTFWMzk5LjVDNDgwLDQxMy4wMSw0NjkuMDA5LDQyNCw0NTUuNSw0MjR6Ii8+DQoJPHBhdGggZD0iTTEwMy41LDE5OWMyMS43OCwwLDM5LjUtMTcuNzIsMzkuNS0zOS41UzEyNS4yOCwxMjAsMTAzLjUsMTIwUzY0LDEzNy43Miw2NCwxNTkuNVM4MS43MiwxOTksMTAzLjUsMTk5eiBNMTAzLjUsMTM1DQoJCWMxMy41MDksMCwyNC41LDEwLjk5LDI0LjUsMjQuNVMxMTcuMDA5LDE4NCwxMDMuNSwxODRTNzksMTczLjAxLDc5LDE1OS41Uzg5Ljk5MSwxMzUsMTAzLjUsMTM1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=');\n    background-size: cover;\n    background-repeat: no-repeat;\n  ";
});

exports.ItemIcon = ItemIcon;

var FieldGroup = _styledComponents.default.div(_templateObject6());

exports.FieldGroup = FieldGroup;

var FieldCustomLabel = _styledComponents.default.label(_templateObject7());

exports.FieldCustomLabel = FieldCustomLabel;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(AddWrapper, "AddWrapper", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/styledComponents/Shapes.ui.js");

  __REACT_HOT_LOADER__.register(ItemsWrapper, "ItemsWrapper", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/styledComponents/Shapes.ui.js");

  __REACT_HOT_LOADER__.register(SettingsWrapper, "SettingsWrapper", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/styledComponents/Shapes.ui.js");

  __REACT_HOT_LOADER__.register(ItemGroup, "ItemGroup", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/styledComponents/Shapes.ui.js");

  __REACT_HOT_LOADER__.register(ItemIcon, "ItemIcon", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/styledComponents/Shapes.ui.js");

  __REACT_HOT_LOADER__.register(FieldGroup, "FieldGroup", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/styledComponents/Shapes.ui.js");

  __REACT_HOT_LOADER__.register(FieldCustomLabel, "FieldCustomLabel", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/styledComponents/Shapes.ui.js");
}();

;