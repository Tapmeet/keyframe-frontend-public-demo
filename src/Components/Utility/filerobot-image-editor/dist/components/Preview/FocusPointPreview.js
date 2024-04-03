"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _throttleDebounce = require("throttle-debounce");

var _Preview = require("../../styledComponents/Preview.ui");

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function FocusPointPreview(_ref) {
  var original = _ref.original,
      focusPoint = _ref.focusPoint,
      updateState = _ref.updateState,
      src = _ref.src;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoaded = _useState2[0],
      setIsLoaded = _useState2[1];

  var ref = (0, _react.useRef)(null);
  var refRect = ref.current ? ref.current.getBoundingClientRect() : {};
  var getInnerBoxSizeCallback = (0, _react.useCallback)(function () {
    var _getInnerBoxSize = (0, _utils.getInnerBoxSize)((document.getElementById('preview-img-box') || {}).parentElement, original),
        _getInnerBoxSize$widt = _getInnerBoxSize.width,
        width = _getInnerBoxSize$widt === void 0 ? 0 : _getInnerBoxSize$widt,
        _getInnerBoxSize$heig = _getInnerBoxSize.height,
        height = _getInnerBoxSize$heig === void 0 ? 0 : _getInnerBoxSize$heig;

    return {
      width: width,
      height: height
    };
  }, [original]);

  var _useState3 = (0, _react.useState)(getInnerBoxSizeCallback()),
      _useState4 = _slicedToArray(_useState3, 2),
      innerBoxSize = _useState4[0],
      setInnerBoxSize = _useState4[1];

  var debounceUpdateInnerBoxSize = (0, _react.useMemo)(function () {
    return (0, _throttleDebounce.debounce)(100, function () {
      setInnerBoxSize(getInnerBoxSizeCallback());
    });
  }, [getInnerBoxSizeCallback]);

  function handleMouseDown(e) {
    var dragX = e.clientX - refRect.x;
    var dragY = e.clientY - refRect.y;
    var xVal = Math.round(dragX * original.width / innerBoxSize.width);
    var yVal = Math.round(dragY * original.height / innerBoxSize.height);
    var x = Math.min(Math.max(xVal, 0), original.width);
    var y = Math.min(Math.max(yVal, 0), original.height);
    updateState({
      focusPoint: {
        x: x,
        y: y
      }
    });
  }

  function handleImageLoaded() {
    updateState({
      isShowSpinner: false
    });
    setIsLoaded(true);
  }

  function handleImageError() {
    updateState({
      isShowSpinner: false
    });
  }

  (0, _react.useEffect)(function () {
    var active = true;

    var handleResize = function handleResize() {
      if (active) {
        debounceUpdateInnerBoxSize();
      }
    };

    window.addEventListener('resize', handleResize);
    return function () {
      active = false;
      window.removeEventListener('resize', handleResize);
    };
  }, [debounceUpdateInnerBoxSize]);
  return /*#__PURE__*/_react.default.createElement(_Preview.FocusPointWrap, {
    ref: ref,
    width: innerBoxSize.width,
    height: innerBoxSize.height
  }, /*#__PURE__*/_react.default.createElement(_Preview.FocusPointContainer, {
    onMouseDown: handleMouseDown
  }, /*#__PURE__*/_react.default.createElement(_Preview.FocusPointImg, {
    visible: isLoaded,
    src: src,
    onLoad: handleImageLoaded,
    onError: handleImageError
  }), /*#__PURE__*/_react.default.createElement(_Preview.FocusPoint, {
    visible: isLoaded,
    x: focusPoint.x * innerBoxSize.width / original.width,
    y: focusPoint.y * innerBoxSize.height / original.height
  })));
}

var _default = FocusPointPreview;
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FocusPointPreview, "FocusPointPreview", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/components/Preview/FocusPointPreview.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/components/Preview/FocusPointPreview.js");
}();

;