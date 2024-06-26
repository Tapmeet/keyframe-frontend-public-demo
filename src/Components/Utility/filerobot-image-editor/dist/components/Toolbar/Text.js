"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Shapes = require("../../styledComponents/Shapes.ui");

var _config = require("../../config");

var _styledComponents = require("../../styledComponents");

var _Range = _interopRequireDefault(require("../Range"));

var _Select = _interopRequireDefault(require("../Shared/Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Text = /*#__PURE__*/function (_Component) {
  _inherits(Text, _Component);

  var _super = _createSuper(Text);

  function Text() {
    var _this;

    _classCallCheck(this, Text);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "updateOpacity", function (newVal) {
      return _this.props.shapeOperations.updateShape({
        opacity: newVal
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateStroke", function (property, value) {
      var _this$props = _this.props,
          shapeOperations = _this$props.shapeOperations,
          _this$props$selectedS = _this$props.selectedShape.stroke,
          stroke = _this$props$selectedS === void 0 ? {} : _this$props$selectedS;
      shapeOperations.updateShape({
        stroke: _objectSpread(_objectSpread({}, stroke), {}, _defineProperty({}, property, value))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updatePropertyFromEvent", function (e) {
      return _this.props.shapeOperations.updateShape(_defineProperty({}, e.target.name, e.target.value));
    });

    return _this;
  }

  _createClass(Text, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var shapeOperations = this.props.shapeOperations;
      shapeOperations.addText();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          t = _this$props2.t,
          _this$props2$selected = _this$props2.selectedShape,
          selectedShape = _this$props2$selected === void 0 ? {} : _this$props2$selected;
      var _selectedShape$text = selectedShape.text,
          text = _selectedShape$text === void 0 ? '' : _selectedShape$text,
          _selectedShape$textFo = selectedShape.textFont,
          textFont = _selectedShape$textFo === void 0 ? 'Arial' : _selectedShape$textFo,
          _selectedShape$textSi = selectedShape.textSize,
          textSize = _selectedShape$textSi === void 0 ? 62 : _selectedShape$textSi,
          _selectedShape$stroke = selectedShape.stroke,
          stroke = _selectedShape$stroke === void 0 ? {} : _selectedShape$stroke,
          _selectedShape$color = selectedShape.color,
          color = _selectedShape$color === void 0 ? '#000000' : _selectedShape$color,
          _selectedShape$opacit = selectedShape.opacity,
          opacity = _selectedShape$opacit === void 0 ? 1 : _selectedShape$opacit;
      return /*#__PURE__*/_react.default.createElement(_Shapes.AddWrapper, null, /*#__PURE__*/_react.default.createElement(_Shapes.SettingsWrapper, null, /*#__PURE__*/_react.default.createElement(_Shapes.FieldGroup, null, /*#__PURE__*/_react.default.createElement(_Shapes.FieldCustomLabel, null, "Text"), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldInput, {
        id: "text",
        value: text,
        name: "text",
        style: {
          minWidth: 111
        },
        onChange: this.updatePropertyFromEvent
      })), /*#__PURE__*/_react.default.createElement(_Shapes.FieldGroup, null, /*#__PURE__*/_react.default.createElement(_Shapes.FieldCustomLabel, null, "Font family"), /*#__PURE__*/_react.default.createElement(_Select.default, {
        list: _config.STANDARD_FONTS,
        valueProp: "value",
        id: "textFont",
        value: textFont,
        style: {
          width: 111
        },
        onChange: function onChange(value) {
          return _this2.updatePropertyFromEvent({
            target: {
              name: 'textFont',
              value: value
            }
          });
        },
        color: "text-font",
        notRelativePosition: true
      })), /*#__PURE__*/_react.default.createElement(_Shapes.FieldGroup, null, /*#__PURE__*/_react.default.createElement(_Shapes.FieldCustomLabel, null, "Font size"), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldInput, {
        value: textSize,
        type: "number",
        style: {
          width: 60
        },
        name: "textSize",
        onChange: this.updatePropertyFromEvent,
        min: 0
      })), /*#__PURE__*/_react.default.createElement(_Shapes.FieldGroup, null, /*#__PURE__*/_react.default.createElement(_Shapes.FieldCustomLabel, null, "Fill Color"), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldInput, {
        value: color,
        type: "color",
        style: {
          width: 30,
          padding: 0,
          background: 'transparent',
          boxShadow: 'none'
        },
        name: "color",
        onChange: this.updatePropertyFromEvent
      })), /*#__PURE__*/_react.default.createElement(_Range.default, {
        label: t['common.opacity'],
        min: 0,
        max: 1,
        step: 0.05,
        range: opacity,
        updateRange: this.updateOpacity,
        labelBefore: true,
        labelStyles: {
          color: '#fff'
        }
      }), /*#__PURE__*/_react.default.createElement(_Shapes.FieldGroup, null, /*#__PURE__*/_react.default.createElement(_Shapes.FieldCustomLabel, null, "Stroke Color"), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldInput, {
        value: stroke.color || '#000000',
        type: "color",
        style: {
          width: 30,
          padding: 0,
          background: 'transparent',
          boxShadow: 'none'
        },
        onChange: function onChange(_ref) {
          var value = _ref.target.value;
          return _this2.updateStroke('color', value);
        }
      })), /*#__PURE__*/_react.default.createElement(_Shapes.FieldGroup, null, /*#__PURE__*/_react.default.createElement(_Shapes.FieldCustomLabel, null, "Stroke width"), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldInput, {
        value: stroke.width || 0,
        type: "number",
        style: {
          width: 60
        },
        onChange: function onChange(_ref2) {
          var value = _ref2.target.value;
          return _this2.updateStroke('width', value);
        },
        min: 0
      }))));
    }
  }]);

  return Text;
}(_react.Component);

exports.default = Text;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Text, "Text", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/components/Toolbar/Text.js");
}();

;