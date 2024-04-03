"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWatermarkPosition = void 0;

var getWatermarkPosition = function getWatermarkPosition() {
  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'center';
  var canvas = arguments.length > 1 ? arguments[1] : undefined;
  var width = arguments.length > 2 ? arguments[2] : undefined;
  var height = arguments.length > 3 ? arguments[3] : undefined;
  var canvasRect = canvas.getBoundingClientRect();
  var centerPositionX = canvasRect.width / 2 - width / 2;
  var centerPositionY = canvasRect.height / 2 - height / 2;

  if (position === 'center') {
    return [centerPositionX, centerPositionY];
  }

  position = position.split('-');
  var rightPosition = canvasRect.width - width;
  var bottomPosition = canvasRect.height - height;
  return position.map(function (p, i) {
    if (p === 'center') {
      return i === 0 ? centerPositionX : centerPositionY;
    }

    if (p === 'right') {
      return rightPosition;
    }

    if (p === 'bottom') {
      return bottomPosition;
    } // If top or left or unknown value would return 0 as 0 the right position for left & top.


    return 0;
  });
};

exports.getWatermarkPosition = getWatermarkPosition;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getWatermarkPosition, "getWatermarkPosition", "/Users/dmitrystremous/Scaleflex/plugins/filerobot-image-editor/projects/react/utils/get-watermark-position.js");
}();

;