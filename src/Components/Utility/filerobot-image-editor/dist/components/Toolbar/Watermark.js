"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("../../styledComponents");

var _throttleDebounce = require("throttle-debounce");

var _Range = _interopRequireDefault(require("../Range"));

var _Select = _interopRequireDefault(require("../Shared/Select"));

var _config = require("../../config");

var _utils = require("../../utils");

var _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var _default = (_temp = /*#__PURE__*/function (_Component) {
  _inherits(_default, _Component);

  var _super = _createSuper(_default);

  function _default(props) {
    var _this;

    _classCallCheck(this, _default);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "changeOpacity", function (opacity) {
      _this.updateWatermarkProperty({
        opacity: opacity
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateWatermarkProperty", function (data, shapeData, watermarkObjectData) {
      var shapeOperations = _this.props.shapeOperations;

      if (!shapeData) {
        shapeData = data;
      }

      if (!watermarkObjectData) {
        watermarkObjectData = data;
      }

      var watermark = _this.getWatermarkLayer();

      _this.setState(data, function () {
        shapeOperations.addOrUpdate(_objectSpread(_objectSpread({}, shapeData), {}, {
          key: _config.WATERMARK_UNIQUE_KEY,
          index: watermark.index
        }), {
          watermark: _objectSpread(_objectSpread({}, _this.props.watermark), watermarkObjectData),
          selectedShape: _objectSpread(_objectSpread({}, _this.props.selectedShape), shapeData)
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getWatermarkLayer", function () {
      var shapeOperations = _this.props.shapeOperations;
      return shapeOperations.getShape({
        key: _config.WATERMARK_UNIQUE_KEY
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeURL", function (event) {
      var nextValue = event.target.value;

      if (_this.props.watermark.text) {
        _this.initWatermarkImage(nextValue);

        return;
      }

      _this.updateWatermarkProperty({
        url: nextValue
      }, {
        img: nextValue
      }, {
        url: '',
        text: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeTextProperty", function (event) {
      var updatedProperty = _defineProperty({}, event.target.name, event.target.value);

      if (_this.props.watermark.text) {
        _this.updateWatermarkProperty(updatedProperty);

        return;
      }

      var _this$state = _this.state,
          text = _this$state.text,
          color = _this$state.color,
          textSize = _this$state.textSize,
          textFont = _this$state.textFont,
          opacity = _this$state.opacity;

      var newWatermarkData = _objectSpread({
        text: text,
        color: color,
        textSize: textSize,
        textFont: textFont,
        opacity: opacity,
        variant: _config.SHAPES_VARIANTS.TEXT,
        tab: 'watermark'
      }, updatedProperty);

      _this.updateWatermarkProperty(_objectSpread({}, updatedProperty), _objectSpread(_objectSpread({}, newWatermarkData), {}, {
        resizingBox: true
      }), {
        text: _objectSpread(_objectSpread({}, _this.props.watermark.text), newWatermarkData)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "readFile", function (event) {
      var config = _this.props.config; // Disable uploading file processing if it's through cloudimage

      if (config.processWithCloudimage) return null;
      var input = event.target;

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          _this.changeURL({
            target: {
              value: e.target.result
            }
          });
        };

        reader.readAsDataURL(input.files[0]);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPositionChange", function (value) {
      var _this$getWatermarkLay = _this.getWatermarkLayer(),
          width = _this$getWatermarkLay.width,
          height = _this$getWatermarkLay.height;

      var _getWatermarkPosition = (0, _utils.getWatermarkPosition)(value, (0, _utils.getCanvasNode)(), width, height),
          _getWatermarkPosition2 = _slicedToArray(_getWatermarkPosition, 2),
          x = _getWatermarkPosition2[0],
          y = _getWatermarkPosition2[1];

      _this.updateWatermarkProperty({
        position: value
      }, {
        x: x,
        y: y
      }, {
        position: value,
        x: x,
        y: y
      });
    });

    _defineProperty(_assertThisInitialized(_this), "initWatermarkImage", (0, _throttleDebounce.debounce)(500, function (url) {
      var updateState = _this.props.updateState;
      var logoImage = null;
      updateState({
        isShowSpinner: true
      });

      var watermarkImageState = function watermarkImageState(newImage) {
        return {
          logoImage: newImage,
          isShowSpinner: false,
          watermark: _objectSpread(_objectSpread({}, _this.props.watermark), {}, {
            url: newImage.src
          })
        };
      };

      if (url) {
        var shapeOperations = _this.props.shapeOperations;
        var opacity = _this.state.opacity;
        logoImage = new Image();
        logoImage.setAttribute('crossOrigin', 'Anonymous');

        logoImage.onload = function () {
          var imageFilter = _this.props.watermark.imageFilter;
          var watermarkImageStateObj;

          if (imageFilter && typeof imageFilter === 'function') {
            logoImage.onload = null;
            watermarkImageStateObj = watermarkImageState(imageFilter(logoImage));
          } else {
            watermarkImageStateObj = watermarkImageState(logoImage);
          }

          var index = (_this.getWatermarkLayer() || {}).index;
          shapeOperations.addOrUpdate({
            img: logoImage,
            opacity: opacity,
            index: index,
            variant: _config.SHAPES_VARIANTS.IMAGE,
            key: _config.WATERMARK_UNIQUE_KEY,
            tab: 'watermark'
          }, watermarkImageStateObj);
        };

        logoImage.onerror = function () {
          updateState({
            isShowSpinner: false
          });
        };

        if (url.match(/^https?:\/\/./)) {
          // if the url is a HTTP URL add a cache breaker
          logoImage.src = url + '?' + new Date().getTime();
        } else {
          logoImage.src = url;
        }
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "showWatermarkList", function () {
      _this.setState({
        showWaterMarkList: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hideWatermarkList", function () {
      _this.setState({
        showWaterMarkList: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeWatermark", function (url) {
      _this.changeURL({
        target: {
          value: url
        }
      });

      _this.hideWatermarkList();
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputTypeChange", function (_ref) {
      var target = _ref.target;
      var updateState = _this.props.updateState;
      updateState({
        isShowSpinner: true
      });

      _this.setState({
        selectedInputType: target.value
      });

      if (target.value === 'text') {
        _this.changeTextProperty({
          target: {
            name: 'text',
            value: 'Filerobot'
          }
        });

        updateState({
          isShowSpinner: false
        });
      } else {
        updateState({
          watermark: _objectSpread(_objectSpread({}, _this.props.watermark), {}, {
            text: null
          })
        });

        _this.initWatermarkImage(_this.props.watermark.url || '');
      }
    });

    var _props$watermark = props.watermark,
        _opacity = _props$watermark.opacity,
        position = _props$watermark.position,
        _url = _props$watermark.url,
        applyByDefault = _props$watermark.applyByDefault,
        activePositions = _props$watermark.activePositions,
        handleOpacity = _props$watermark.handleOpacity;
    var _props$watermark2 = props.watermark,
        urls = _props$watermark2.urls,
        fonts = _props$watermark2.fonts;
    var setActivePositions = [];
    var activePosition = position || 'center'; // check if a preset was selected

    if (typeof activePositions === 'string' && _config.WATERMARK_POSITIONS_PRESET.hasOwnProperty(activePositions)) {
      setActivePositions = _config.WATERMARK_POSITIONS_PRESET[activePositions];
    } // check if activePositons is an array
    else if (Array.isArray(activePositions)) {
        var fullPos = Array(9).fill(0); // merge with an default of 9 to prevent errors when the length is lower 9

        activePositions.map(function (val, i) {
          return fullPos[i] = val;
        });
        setActivePositions = fullPos; // return the default that all positions are active
      } else {
        setActivePositions = Array(9).fill(1);
      } // check if position is active else set the first upcomming active as the new active position


    if (setActivePositions[_config.WATERMARK_POSITIONS.indexOf(activePosition)] !== 1) {
      activePosition = _config.WATERMARK_POSITIONS[setActivePositions.indexOf(1)];
    }

    if (urls) {
      urls = urls.map(function () {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (typeof url === 'string') {
          var splittedURL = url.split('/');
          return {
            url: url,
            label: splittedURL[splittedURL.length - 1]
          };
        } else {
          return url;
        }
      });
    }

    _this.initWatermarkImage(_url);

    _this.state = {
      isBlockRatio: false,
      opacity: _opacity || 0.7,
      handleOpacity: typeof handleOpacity === 'boolean' ? handleOpacity : true,
      position: activePosition,
      url: _url || urls && urls.length > 1 ? urls[0] && urls[0].url : '',
      urls: urls || [],
      activePositions: setActivePositions,
      isWatermarkList: urls && urls.length > 1,
      applyByDefault: applyByDefault || false,
      showWaterMarkList: false,
      selectedInputType: urls && urls.length > 1 ? 'gallery' : 'upload',
      text: '',
      color: '#000000',
      textSize: 62,
      textFont: 'Arial',
      fonts: fonts || _config.STANDARD_FONTS
    };
    return _this;
  }

  _createClass(_default, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      // check if position has ben modified and update
      if (nextProps.watermark.position !== this.state.position) {
        this.onPositionChange(this.state.position);
      }

      if (nextProps.watermark.applyByDefault !== this.props.watermark.applyByDefault) {
        if (this.getWatermarkLayer()) {
          this.updateWatermarkProperty({
            applyByDefault: false
          }, {
            hidden: true,
            resizingBox: false
          }, {
            applyByDefault: false
          });
        } else {
          this.setState({
            applyByDefault: nextProps.watermark.applyByDefault
          });
        }

        if (nextProps.watermark.applyByDefault) {
          if (!this.getWatermarkLayer()) {
            this.initWatermarkImage(nextProps.watermark.url);
          } else {
            this.updateWatermarkProperty({
              applyByDefault: true
            }, {
              hidden: false,
              resizingBox: true
            }, {
              applyByDefault: true
            });
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          isWatermarkList = _this$state2.isWatermarkList,
          url = _this$state2.url,
          urls = _this$state2.urls,
          opacity = _this$state2.opacity,
          handleOpacity = _this$state2.handleOpacity,
          position = _this$state2.position,
          activePositions = _this$state2.activePositions,
          applyByDefault = _this$state2.applyByDefault,
          showWaterMarkList = _this$state2.showWaterMarkList,
          selectedInputType = _this$state2.selectedInputType,
          text = _this$state2.text,
          color = _this$state2.color,
          textFont = _this$state2.textFont,
          textSize = _this$state2.textSize,
          fonts = _this$state2.fonts;
      var config = this.props.config;
      var fileUploadInput = selectedInputType === 'upload';
      var galleryInput = selectedInputType === 'gallery';
      var urlInput = selectedInputType === 'url';
      var textInput = selectedInputType === 'text';
      var t = this.props.t;
      return /*#__PURE__*/_react.default.createElement(_styledComponents.WatermarkWrapper, null, /*#__PURE__*/_react.default.createElement(_styledComponents.WatermarkInputTypes, null, /*#__PURE__*/_react.default.createElement("label", null, t['common.gallery'], /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        value: "gallery",
        checked: selectedInputType === 'gallery',
        onChange: this.handleInputTypeChange
      }), /*#__PURE__*/_react.default.createElement("span", null)), /*#__PURE__*/_react.default.createElement("label", {
        style: {
          cursor: config.processWithCloudimage ? 'not-allowed' : 'auto'
        }
      }, t['common.upload'], /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        value: "upload",
        checked: selectedInputType === 'upload',
        disabled: config.processWithCloudimage,
        onChange: this.handleInputTypeChange
      }), /*#__PURE__*/_react.default.createElement("span", null)), /*#__PURE__*/_react.default.createElement("label", null, t['common.url'], /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        value: "url",
        checked: selectedInputType === 'url',
        onChange: this.handleInputTypeChange
      }), /*#__PURE__*/_react.default.createElement("span", null)), /*#__PURE__*/_react.default.createElement("label", null, t['common.text'], /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        value: "text",
        checked: selectedInputType === 'text',
        onChange: this.handleInputTypeChange
      }), /*#__PURE__*/_react.default.createElement("span", null))), /*#__PURE__*/_react.default.createElement(_styledComponents.WatermarkInputs, null, /*#__PURE__*/_react.default.createElement(_styledComponents.WrapperForURL, null, galleryInput && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "url"
      }, "Watermark Gallery"), /*#__PURE__*/_react.default.createElement(_Select.default, {
        width: "100%",
        list: urls,
        valueProp: "url",
        id: "gallery",
        value: url,
        style: {
          width: 'calc(100% - 120px)'
        },
        onChange: function onChange(url) {
          console.log('chosen', url);

          _this2.changeURL({
            target: {
              value: url
            }
          });
        }
      })), urlInput && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "url"
      }, "Watermark URL"), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldInput, {
        id: "url",
        value: url,
        style: {
          width: 'calc(100% - 120px)'
        },
        onChange: this.changeURL
      })), fileUploadInput && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "image-upload"
      }, "Watermark Image"), /*#__PURE__*/_react.default.createElement(_styledComponents.FileInput, {
        id: "image-upload",
        style: {
          width: 'calc(100% - 120px)'
        },
        onChange: this.readFile
      })), textInput && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "text"
      }, "Watermark Text"), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldInput, {
        id: "text",
        value: text,
        style: {
          width: 'calc(65% - 135px)'
        },
        name: "text",
        onChange: this.changeTextProperty
      }), /*#__PURE__*/_react.default.createElement(_Select.default, {
        list: config.processWithCloudimage ? _config.WATERMARK_CLOUDIMAGE_FONTS : fonts,
        valueProp: "value",
        id: "textFont",
        value: textFont,
        style: {
          width: 111,
          display: 'inline-block',
          marginLeft: 8
        },
        onChange: function onChange(value) {
          return _this2.changeTextProperty({
            target: {
              name: 'textFont',
              value: value
            }
          });
        }
      }), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldInput, {
        value: textSize,
        type: "number",
        name: "textSize",
        style: {
          width: 60,
          marginLeft: 8
        },
        onChange: this.changeTextProperty
      }), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldInput, {
        value: color,
        type: "color",
        style: {
          width: 30,
          marginLeft: 8,
          padding: 0,
          background: 'transparent',
          boxShadow: 'none'
        },
        name: "color",
        onChange: this.changeTextProperty
      }))), /*#__PURE__*/_react.default.createElement(_styledComponents.WrapperForControls, {
        switcherPosition: handleOpacity ? 'right' : 'left'
      }, handleOpacity && /*#__PURE__*/_react.default.createElement(_styledComponents.WrapperForOpacity, null, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "opacity"
      }, "Opacity"), /*#__PURE__*/_react.default.createElement(_Range.default, {
        label: t['common.opacity'],
        min: 0,
        max: 1,
        step: 0.05,
        range: opacity,
        updateRange: this.changeOpacity
      })))), /*#__PURE__*/_react.default.createElement(_styledComponents.WatermarkPositionWrapper, null, _config.WATERMARK_POSITIONS.map(function (value, index) {
        return /*#__PURE__*/_react.default.createElement(_styledComponents.PositionSquare, {
          key: value,
          value: value,
          active: value === position,
          clickable: activePositions[index],
          onClick: function onClick() {
            if (activePositions[index]) {
              _this2.onPositionChange(value);
            }
          }
        });
      })), isWatermarkList && showWaterMarkList && /*#__PURE__*/_react.default.createElement(_styledComponents.Watermarks, null, urls.map(function (url) {
        return /*#__PURE__*/_react.default.createElement(_styledComponents.WatermarkIcon, {
          key: url,
          src: url,
          onClick: function onClick() {
            _this2.onChangeWatermark(url);
          }
        });
      })));
    }
  }]);

  return _default;
}(_react.Component), _temp);

var _default2 = _default;
exports.default = _default2;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, "default", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/components/Toolbar/Watermark.js");
}();

;